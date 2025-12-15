/**
 * Tax RAG Retriever - Upgraded Version
 * =====================================
 * 
 * Uses:
 * - PII redaction (strip sensitive data before processing)
 * - Query classification (detect query type, extract forms/years)
 * - Hybrid search (semantic + BM25 via PostgreSQL)
 * - MMR deduplication (remove redundant chunks)
 * - Confidence scoring (rate answer quality)
 */

import { embedText } from './embeddings';
import { searchSimilar, SearchResult } from './vectorStore';
import { config } from '../config';

// Conversation message type (defined locally to avoid circular deps)
export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

import { redactPII, RedactionResult } from './piiRedactor';
import { classifyQuery, ClassificationResult, QueryType } from './queryClassifier';
import { hybridSearch, isHybridSearchAvailable, HybridSearchResult } from './hybridRetrieval';
import { applyMMR, removeExactDuplicates } from './mmrDedup';
import { calculateConfidence, ConfidenceResult, getConfidencePrefix, getConfidenceSuffix } from './confidenceScorer';

// =============================================================================
// QUEBEC BOOST - Fix #3
// =============================================================================
const QUEBEC_QUERY_TERMS = [
  'quebec', 'qc', 'montreal', 'qst', 'qpp', 'revenu',
  'tp-1', 'solidarity', 'work premium', 'rl-1', 'rl-31',
  'qpip', 'retraite québec', 'revenu québec'
];

function boostQuebecRelevance(query: string, results: HybridSearchResult[]): HybridSearchResult[] {
  const queryLower = query.toLowerCase();
  const isQuebecQuery = QUEBEC_QUERY_TERMS.some(term => queryLower.includes(term));
  
  if (!isQuebecQuery) return results;
  
  console.log('[TAX] Quebec query detected - boosting Quebec chunks');
  
  return results.map(chunk => {
    const contentLower = chunk.content.toLowerCase();
    const sourceDoc = chunk.source_doc?.toLowerCase() || '';
    
    if (sourceDoc.includes('quebec') || 
        sourceDoc.includes('qc') ||
        contentLower.includes('quebec') ||
        contentLower.includes('qst') ||
        contentLower.includes('revenu québec') ||
        contentLower.includes('qpp')) {
      return { ...chunk, rrf_score: (chunk.rrf_score || 0) * 1.3 }; // 30% boost
    }
    return chunk;
  }).sort((a, b) => (b.rrf_score || 0) - (a.rrf_score || 0));
}

// =============================================================================
// CRITICAL FACTS INJECTION - Fix #5 (Improved keyword matching)
// =============================================================================
const CRITICAL_FACTS: Record<string, string> = {
  // RRSP - trigger on "rrsp" alone
  'rrsp': 'RRSP 2024: Maximum contribution limit is $31,560 or 18% of previous year earned income (whichever is less), minus pension adjustment. Unused room carries forward. Contribution deadline: March 1, 2025 for 2024 tax year.',
  
  // TFSA - trigger on "tfsa" alone
  'tfsa': 'TFSA 2024: Annual limit $7,000. Cumulative room since 2009: $95,000. Historical: 2009-2012 $5,000, 2013-2014 $5,500, 2015 $10,000, 2016-2018 $5,500, 2019-2022 $6,000, 2023 $6,500, 2024 $7,000.',
  
  // Tax brackets - trigger on "bracket" or "tax rate"
  'bracket': 'Federal tax brackets 2024: $0-$55,867 = 15%, $55,867-$111,733 = 20.5%, $111,733-$173,205 = 26%, $173,205-$246,752 = 29%, over $246,752 = 33%.',
  'tax rate': 'Federal tax brackets 2024: $0-$55,867 = 15%, $55,867-$111,733 = 20.5%, $111,733-$173,205 = 26%, $173,205-$246,752 = 29%, over $246,752 = 33%.',
  
  // Deadlines
  'deadline': 'Tax deadlines: April 30 for most individuals. June 15 for self-employed (but payment still due April 30). RRSP contribution deadline: March 1.',
  'when are taxes due': 'Tax deadlines: April 30 for most individuals. June 15 for self-employed (but payment still due April 30).',
  'april': 'Tax deadlines: April 30 for most individuals. June 15 for self-employed (but payment still due April 30).',
  
  // GST
  'gst': 'GST/HST registration required when taxable supplies exceed $30,000 in four consecutive calendar quarters (small supplier threshold).',
  
  // CCA
  'cca': 'CCA classes: Class 50 (55%) for computers/laptops. Class 10 (30%) for vehicles. Class 8 (20%) for furniture/equipment. Class 12 (100%) for small tools under $500.',
  'computer': 'Computers/laptops for business: Class 50 CCA at 55% depreciation rate.',
  'laptop': 'Computers/laptops for business: Class 50 CCA at 55% depreciation rate.',
  
  // Home office
  'home office': 'Home office 2024: Simplified method = $2/day, max 250 days, max $500. No receipts needed. Or detailed method with T2200.',
  'work from home': 'Home office 2024: Simplified method = $2/day, max 250 days, max $500. No receipts needed. Or detailed method with T2200.',
  
  // HBP / First Home
  'first home': 'First home buyer benefits: HBP allows $60,000 RRSP withdrawal (increased 2024), 15-year repayment. FHSA: $8,000/year, $40,000 lifetime. First-Time Home Buyer Credit: $10,000 ($1,500 tax credit).',
  'hbp': 'Home Buyers Plan (HBP) 2024: Withdraw up to $60,000 from RRSP tax-free. 15-year repayment starting 2nd year after withdrawal.',
  'fhsa': 'FHSA (First Home Savings Account) 2024: Annual limit $8,000, lifetime limit $40,000. Tax-deductible contributions, tax-free withdrawals for first home.',
  
  // RRSP withdrawal
  'withdraw': 'RRSP withdrawal withholding tax: $0-$5,000 = 10%, $5,001-$15,000 = 20%, over $15,000 = 30%. Amount added to taxable income.',
  'withholding': 'RRSP withdrawal withholding tax: $0-$5,000 = 10%, $5,001-$15,000 = 20%, over $15,000 = 30%.',
  
  // LCGE
  'lcge': 'Lifetime Capital Gains Exemption 2024: $1,016,836 for qualified small business corporation (QSBC) shares and qualified farm/fishing property.',
  'capital gains exemption': 'Lifetime Capital Gains Exemption 2024: $1,016,836 for QSBC shares.',
  
  // Quebec
  'qst': 'Quebec sales tax: QST 9.975% + GST 5% = 14.975% combined. Both administered by Revenu Québec. Small supplier threshold: $30,000.',
  'qpp': 'Quebec Pension Plan (QPP) 2024: Employee rate 6.4% (higher than CPP 5.95%). Administered by Retraite Québec.',
  
  // CPP/EI
  'cpp': 'CPP 2024: Employee contribution rate 5.95%, maximum contribution $3,867.50, on earnings up to $68,500. Self-employed pay both portions (11.9%).',
  'ei ': 'EI 2024: Employee premium rate 1.66%, maximum premium $1,049.12, on earnings up to $63,200.',
  
  // Basic Personal Amount
  'basic personal': 'Federal Basic Personal Amount 2024: $15,705 (reduced for high incomes over $173,205).',
  'bpa': 'Federal Basic Personal Amount 2024: $15,705 (reduced for high incomes over $173,205).',
  
  // Pension Splitting
  'pension': 'Pension income splitting: Up to 50% of eligible pension income can be split with spouse using Form T1032. Age 65+ required for most pension types (RPP, RRIF, annuity). Life annuity from RPP can be split at any age.',
  'split': 'Pension income splitting: Up to 50% of eligible pension income can be split with spouse using Form T1032. Age 65+ required for most pension types.',
  
  // OAS
  'oas': 'Old Age Security (OAS) 2024: Maximum $713.34/month (65-74), $784.67/month (75+). Clawback starts at $90,997 income. Full clawback at ~$148,000.',
  
  // RRIF
  'rrif': 'RRIF minimum withdrawal: Must convert RRSP to RRIF by Dec 31 of year you turn 71. Minimum annual withdrawal based on age. RRIF income can be split with spouse at age 65+.',
  
  // Rental vs Business Income
  'airbnb': 'Airbnb/short-term rentals: If providing services (cleaning, meals) = Business Income (T2125), subject to CPP. Basic rentals = Rental Income (T776), no CPP. Short-term (<30 days) subject to GST/HST if over $30,000.',
  'rental income': 'Rental Income (T776) vs Business Income (T2125): Basic services (heat, light, parking) = Rental. Additional services (cleaning, meals, daily housekeeping) = Business, subject to CPP.',
  
  // Superficial Loss
  'superficial': 'Superficial Loss Rule (30-day rule): Capital loss DENIED if you buy same shares within 30 days before/after sale (61-day window). Denied loss added to ACB of new shares.',
  'loss': 'Superficial Loss Rule: If you sell at a loss and repurchase within 30 days, loss is DENIED. Also applies if spouse or RRSP/TFSA buys it.',
  '30 day': 'Superficial Loss Rule (30-day rule): Capital loss DENIED if same property repurchased within 30 days before or after sale. Loss added to new ACB.',
  
  // Quebec Childcare
  'childcare': 'Quebec childcare: Uses REFUNDABLE TAX CREDIT (26-78% based on income), not deduction like federal. Credit rate higher for lower incomes. Form: Schedule C of TP-1.',
};

function injectCriticalFacts(query: string, context: string): string {
  const queryLower = query.toLowerCase();
  const injections: string[] = [];
  const matchedKeywords: string[] = [];
  
  for (const [keyword, fact] of Object.entries(CRITICAL_FACTS)) {
    // Simple includes matching - trigger if keyword appears anywhere in query
    if (queryLower.includes(keyword)) {
      // Avoid duplicate facts (e.g., both "bracket" and "tax rate" matched)
      if (!injections.includes(`[CRITICAL TAX FACT: ${fact}]`)) {
        injections.push(`[CRITICAL TAX FACT: ${fact}]`);
        matchedKeywords.push(keyword);
      }
    }
  }
  
  if (injections.length > 0) {
    console.log(`[TAX] Query: "${query}"`);
    console.log(`[TAX] Injecting ${injections.length} critical facts for keywords: ${matchedKeywords.join(', ')}`);
    // Put at START of context so model sees it first
    return injections.join('\n\n') + '\n\n---\n\n' + context;
  }
  return context;
}

export interface TaxQuery {
  question: string;
  tax_year?: number;
  province?: string;
  conversationHistory?: ConversationMessage[];
}

export interface EnhancedSearchResult extends SearchResult {
  hierarchy_path?: string[];
  forms_mentioned?: string[];
  confidence?: ConfidenceResult;
  queryClassification?: ClassificationResult;
  piiRedaction?: RedactionResult;
}

let hybridAvailable: boolean | null = null;

function buildEnrichedQuery(question: string, history: ConversationMessage[]): string {
  if (!history || history.length === 0) {
    return question;
  }
  
  const recentHistory = history.slice(-4);
  const contextParts: string[] = [];
  
  for (const msg of recentHistory) {
    contextParts.push(msg.content.slice(0, 100));
  }
  
  const enrichedQuery = `Context: ${contextParts.join(' ')} Question: ${question}`;
  return enrichedQuery;
}

function convertToSearchResult(hybrid: HybridSearchResult, index: number): SearchResult {
  const sourceTitle = hybrid.hierarchy_path.length > 0 
    ? hybrid.hierarchy_path[0]
    : hybrid.source_doc.replace(/_/g, ' ');

  const firstPath = hybrid.hierarchy_path[0] || '';
  const isValidTitle = firstPath.length > 15 && !firstPath.startsWith('(') && !firstPath.startsWith('N/A') && !firstPath.startsWith('Source:');
  
  let displayTitle = '';
  if (isValidTitle) {
    displayTitle = firstPath;
  } else if (hybrid.source_doc) {
    const docType = hybrid.source_doc.split('_')[0]?.toUpperCase() || '';
    if (docType.match(/^(RC|T|IT|IC|S\d)/i)) {
      displayTitle = `${docType} - CRA Publication`;
    } else {
      displayTitle = hybrid.source_doc.replace(/_/g, ' ').replace(/,/g, ', ');
    }
  }

  const normalizedScore = Math.min(1, (hybrid.rrf_score || 0) * 50);

  return {
    chunk: {
      id: index,
      document_id: index,
      text: hybrid.content,
      source_title: displayTitle || sourceTitle,
      source_type: hybrid.source_doc?.split('_')[0]?.toLowerCase() || 'unknown',
      source_url: '',
      metadata: {
        chunk_id: hybrid.chunk_id,
        hierarchy_path: hybrid.hierarchy_path,
        source_doc: hybrid.source_doc,
        forms_mentioned: hybrid.forms_mentioned || [],
        tax_year: hybrid.tax_year,
        semantic_rank: hybrid.semantic_rank,
        bm25_rank: hybrid.bm25_rank,
        rrf_score: hybrid.rrf_score
      }
    },
    score: normalizedScore,
  };
}

async function fallbackRetrieval(cleanQuestion: string, conversationHistory: ConversationMessage[]): Promise<SearchResult[]> {
  console.log('[TAX] Using fallback (semantic-only) retrieval');
  
  const searchQuery = buildEnrichedQuery(cleanQuestion, conversationHistory);
  const queryEmbedding = await embedText(searchQuery);
  const results = await searchSimilar(queryEmbedding, config.topK * 2);
  
  return diversifyResults(results, config.topK);
}

function diversifyResults(results: SearchResult[], topK: number): SearchResult[] {
  const selected: SearchResult[] = [];
  const seenDocs = new Set<string>();
  
  for (const result of results) {
    const docKey = result.chunk.metadata?.source_doc || result.chunk.source_title || String(result.chunk.document_id);
    if (!seenDocs.has(docKey)) {
      selected.push(result);
      seenDocs.add(docKey);
    }
    if (selected.length >= topK) break;
  }
  
  if (selected.length < topK) {
    for (const result of results) {
      const chunkKey = result.chunk.metadata?.chunk_id || String(result.chunk.id);
      if (!selected.find(s => (s.chunk.metadata?.chunk_id || String(s.chunk.id)) === chunkKey)) {
        selected.push(result);
      }
      if (selected.length >= topK) break;
    }
  }
  
  return selected;
}

export async function retrieveContext(query: TaxQuery): Promise<SearchResult[]> {
  const startTime = Date.now();
  
  const piiResult = redactPII(query.question);
  if (piiResult.hadPII) {
    console.log(`[TAX] PII detected and redacted: ${piiResult.detectedTypes.join(', ')}`);
  }
  const cleanQuestion = piiResult.redactedText;

  const classification = classifyQuery(cleanQuestion);
  console.log(`[TAX] Query type: ${classification.queryType}, confidence: ${classification.confidence.toFixed(2)}`);
  
  if (classification.extractedForms.length > 0) {
    console.log(`[TAX] Detected forms: ${classification.extractedForms.join(', ')}`);
  }
  
  if (classification.skipRetrieval) {
    console.log('[TAX] Skipping retrieval (greeting/off-topic)');
    return [];
  }

  if (hybridAvailable === null) {
    hybridAvailable = await isHybridSearchAvailable();
    console.log(`[TAX] Hybrid search available: ${hybridAvailable}`);
  }

  if (!hybridAvailable) {
    const fallbackResults = await fallbackRetrieval(cleanQuestion, query.conversationHistory || []);
    
    if (fallbackResults.length > 0) {
      const fallbackConfidence: ConfidenceResult = {
        score: 0.5,
        level: 'MEDIUM',
        responseMode: 'HEDGED',
        factors: {
          topChunkRelevance: 0.5,
          chunkConsistency: 0.5,
          queryClarity: classification.confidence,
          sourceAuthority: 0.7,
        },
        warnings: ['Using semantic-only search (hybrid unavailable)'],
      };
      
      (fallbackResults[0] as EnhancedSearchResult).confidence = fallbackConfidence;
      (fallbackResults[0] as EnhancedSearchResult).queryClassification = classification;
      (fallbackResults[0] as EnhancedSearchResult).piiRedaction = piiResult;
    }
    
    const elapsed = Date.now() - startTime;
    console.log(`[TAX] Fallback retrieval completed in ${elapsed}ms`);
    return fallbackResults;
  }

  const searchQuery = buildEnrichedQuery(cleanQuestion, query.conversationHistory || []);
  
  const { semantic, bm25 } = classification.searchWeights;
  console.log(`[TAX] Search weights - semantic: ${semantic}, bm25: ${bm25}`);
  
  let hybridResults = await hybridSearch({
    query: searchQuery,
    semanticWeight: semantic,
    bm25Weight: bm25,
    topK: config.topK * 2,
    filterForms: classification.extractedForms.length > 0 ? classification.extractedForms : undefined,
    filterTaxYear: query.tax_year,
  });

  console.log(`[TAX] Hybrid search returned ${hybridResults.length} results`);

  hybridResults = removeExactDuplicates(hybridResults);

  // Apply Quebec boost for Quebec-related queries (Fix #3)
  hybridResults = boostQuebecRelevance(searchQuery, hybridResults);

  hybridResults = applyMMR(hybridResults, config.topK, { lambda: 0.7 });
  console.log(`[TAX] After MMR: ${hybridResults.length} results`);
  console.log('[TAX] Final chunks:', hybridResults.map(r => r.chunk_id));

  const confidence = calculateConfidence(hybridResults, classification);
  console.log(`[TAX] Confidence: ${confidence.level} (${confidence.score.toFixed(2)})`);
  
  if (confidence.warnings.length > 0) {
    console.log(`[TAX] Warnings: ${confidence.warnings.join(', ')}`);
  }

  const results: SearchResult[] = hybridResults.map((h, i) => convertToSearchResult(h, i));

  if (results.length > 0) {
    (results[0] as EnhancedSearchResult).confidence = confidence;
    (results[0] as EnhancedSearchResult).queryClassification = classification;
    (results[0] as EnhancedSearchResult).piiRedaction = piiResult;
  }

  const elapsed = Date.now() - startTime;
  console.log(`[TAX] Retrieval completed in ${elapsed}ms`);

  return results;
}

export function formatContextForPrompt(results: SearchResult[], question?: string): string {
  const baseContext = results
    .map((r, i) => {
      const enhanced = r as EnhancedSearchResult;
      
      let header: string;
      if (enhanced.hierarchy_path && enhanced.hierarchy_path.length > 0) {
        header = `[Source ${i + 1}: ${enhanced.hierarchy_path.join(' > ')}]`;
      } else {
        header = `[Source ${i + 1}: ${r.chunk.source_title}]`;
      }
      
      const score = `(relevance: ${(r.score * 100).toFixed(1)}%)`;
      return `${header} ${score}\n${r.chunk.text}`;
    })
    .join('\n\n---\n\n');
  
  // Apply critical facts injection (Fix #5) - pass question directly, no global state
  if (question) {
    return injectCriticalFacts(question, baseContext);
  }
  return baseContext;
}

export function getConfidenceFromResults(results: SearchResult[]): ConfidenceResult | null {
  if (results.length === 0) return null;
  return (results[0] as EnhancedSearchResult).confidence || null;
}

export function getClassificationFromResults(results: SearchResult[]): ClassificationResult | null {
  if (results.length === 0) return null;
  return (results[0] as EnhancedSearchResult).queryClassification || null;
}

export { getConfidencePrefix, getConfidenceSuffix } from './confidenceScorer';
export type { ConfidenceResult, ClassificationResult, QueryType };
export type { ConfidenceLevel } from './confidenceScorer';
