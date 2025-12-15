/**
 * Query Classifier Service
 * =========================
 * Analyzes user queries to determine:
 * - Query type (form lookup, calculation, deadline, general, etc.)
 * - Extracted entities (form numbers, tax years)
 * - Recommended search weights (semantic vs BM25)
 */

export type QueryType = 
  | 'FORM_LOOKUP'
  | 'CALCULATION'
  | 'DEADLINE'
  | 'ELIGIBILITY'
  | 'DEFINITION'
  | 'PROCEDURE'
  | 'COMPARISON'
  | 'GENERAL';

export interface ClassificationResult {
  queryType: QueryType;
  confidence: number;
  extractedForms: string[];
  extractedYears: number[];
  searchWeights: {
    semantic: number;
    bm25: number;
  };
  skipRetrieval: boolean;
}

const FORM_PATTERN = /\b([A-Z]{1,2}\d{1,4}[A-Z]?(?:-[A-Z]{1,3})?)\b/gi;
const YEAR_PATTERN = /\b(20\d{2})\b/g;

const QUERY_PATTERNS: Array<{ type: QueryType; patterns: RegExp[]; weight: number }> = [
  {
    type: 'FORM_LOOKUP',
    patterns: [
      /\b(?:what is|explain|tell me about|how (?:do i|to) (?:fill|complete|use))\b.*\b[A-Z]{1,2}\d{1,4}\b/i,
      /\b[A-Z]{1,2}\d{1,4}\b.*\b(?:form|schedule|slip)\b/i,
      /\bform\s+[A-Z]{1,2}\d{1,4}\b/i,
      /\b(?:T[1-5]\d{0,3}|RC\d+|NR\d+|T777|TD1)\b/i,
    ],
    weight: 1.0,
  },
  {
    type: 'CALCULATION',
    patterns: [
      /\b(?:how much|calculate|compute|what (?:is|are) my)\b/i,
      /\b(?:amount|limit|maximum|minimum|threshold)\b/i,
      /\b(?:rrsp|tfsa|cpp|ei)\s+(?:room|limit|contribution|deduction)\b/i,
      /\b(?:tax (?:owing|refund|bracket|rate))\b/i,
    ],
    weight: 0.8,
  },
  {
    type: 'DEADLINE',
    patterns: [
      /\b(?:when|what date|deadline|due date)\b/i,
      /\b(?:file|filing|submit|payment)\s+(?:deadline|date|by)\b/i,
      /\blast day\b/i,
    ],
    weight: 0.9,
  },
  {
    type: 'ELIGIBILITY',
    patterns: [
      /\b(?:am i|can i|do i|eligible|qualify|eligibility)\b/i,
      /\b(?:who can|requirements? for)\b/i,
      /\bcan (?:i|we|you) claim\b/i,
    ],
    weight: 0.7,
  },
  {
    type: 'DEFINITION',
    patterns: [
      /\b(?:what (?:is|does|are)|define|definition|meaning of)\b/i,
      /\b(?:explain|describe)\s+(?:the\s+)?(?:term|concept)\b/i,
    ],
    weight: 0.6,
  },
  {
    type: 'PROCEDURE',
    patterns: [
      /\b(?:how (?:do|can|to)|steps? to|process for)\b/i,
      /\b(?:file|claim|report|declare|submit)\b/i,
      /\bwhat do i need to\b/i,
    ],
    weight: 0.7,
  },
  {
    type: 'COMPARISON',
    patterns: [
      /\b(?:difference between|compare|vs\.?|versus|or)\b/i,
      /\b(?:better|which (?:is|should))\b/i,
      /\brrsp\s+(?:vs\.?|or)\s+tfsa\b/i,
    ],
    weight: 0.7,
  },
];

const SKIP_PATTERNS = [
  /^(?:hi|hello|hey|thanks|thank you|bye|goodbye)[\s!?.]*$/i,
  /^(?:ok|okay|yes|no|sure|got it)[\s!?.]*$/i,
];

// Contribution limit patterns for registered accounts (TFSA, RRSP, FHSA, etc.)
const CONTRIBUTION_PATTERN = /\b(?:contribut(?:e|ion)|deposit|room|limit|maximum|how much)\b.*\b(TFSA|RRSP|FHSA|RESP|RRIF|pension)\b/i;
const CONTRIBUTION_PATTERN_ALT = /\b(TFSA|RRSP|FHSA|RESP|RRIF)\b.*\b(?:contribut(?:e|ion)|limit|room|maximum|annual)\b/i;

function extractForms(text: string): string[] {
  const matches = text.match(FORM_PATTERN);
  if (!matches) return [];
  
  const forms = new Set<string>();
  for (const match of matches) {
    const upper = match.toUpperCase();
    if (/^(T[1-5]|T4\w|T5\w|T777|T2200|T2201|T2202|RC\d|NR\d|TD1)/i.test(upper)) {
      forms.add(upper);
    }
  }
  
  return Array.from(forms);
}

function extractYears(text: string): number[] {
  const matches = text.match(YEAR_PATTERN);
  if (!matches) return [];
  
  const currentYear = new Date().getFullYear();
  const years = new Set<number>();
  
  for (const match of matches) {
    const year = parseInt(match, 10);
    if (year >= currentYear - 10 && year <= currentYear + 1) {
      years.add(year);
    }
  }
  
  return Array.from(years).sort((a, b) => b - a);
}

function getSearchWeights(queryType: QueryType, hasForms: boolean): { semantic: number; bm25: number } {
  if (hasForms) {
    return { semantic: 0.5, bm25: 0.5 };  // Balanced for form explanations
  }
  
  switch (queryType) {
    case 'FORM_LOOKUP':
      return { semantic: 0.5, bm25: 0.5 };  // Balanced for form explanations
    case 'CALCULATION':
      return { semantic: 0.5, bm25: 0.5 };
    case 'DEADLINE':
      return { semantic: 0.4, bm25: 0.6 };
    case 'ELIGIBILITY':
      return { semantic: 0.6, bm25: 0.4 };
    case 'DEFINITION':
      return { semantic: 0.7, bm25: 0.3 };
    case 'PROCEDURE':
      return { semantic: 0.6, bm25: 0.4 };
    case 'COMPARISON':
      return { semantic: 0.6, bm25: 0.4 };
    case 'GENERAL':
    default:
      return { semantic: 0.6, bm25: 0.4 };
  }
}

export function classifyQuery(question: string): ClassificationResult {
  for (const pattern of SKIP_PATTERNS) {
    if (pattern.test(question.trim())) {
      return {
        queryType: 'GENERAL',
        confidence: 1.0,
        extractedForms: [],
        extractedYears: [],
        searchWeights: { semantic: 0.6, bm25: 0.4 },
        skipRetrieval: true,
      };
    }
  }
  
  const extractedForms = extractForms(question);
  const extractedYears = extractYears(question);
  
  // Check for contribution/room limits for registered accounts - high priority
  if (CONTRIBUTION_PATTERN.test(question) || CONTRIBUTION_PATTERN_ALT.test(question)) {
    return {
      queryType: 'ELIGIBILITY',
      confidence: 0.9,
      extractedForms,
      extractedYears,
      searchWeights: { semantic: 0.6, bm25: 0.4 },
      skipRetrieval: false,
    };
  }
  
  let bestMatch: { type: QueryType; confidence: number } = {
    type: 'GENERAL',
    confidence: 0.5,
  };
  
  for (const { type, patterns, weight } of QUERY_PATTERNS) {
    for (const pattern of patterns) {
      if (pattern.test(question)) {
        const confidence = weight;
        if (confidence > bestMatch.confidence) {
          bestMatch = { type, confidence };
        }
        break;
      }
    }
  }
  
  if (extractedForms.length > 0 && bestMatch.type !== 'FORM_LOOKUP') {
    if (bestMatch.confidence < 0.8) {
      bestMatch = { type: 'FORM_LOOKUP', confidence: 0.85 };
    }
  }
  
  return {
    queryType: bestMatch.type,
    confidence: bestMatch.confidence,
    extractedForms,
    extractedYears,
    searchWeights: getSearchWeights(bestMatch.type, extractedForms.length > 0),
    skipRetrieval: false,
  };
}
