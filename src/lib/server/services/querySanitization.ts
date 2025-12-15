/**
 * Query Sanitization Service
 * ==========================
 * Validates and sanitizes user queries before they hit the RAG pipeline.
 * Protects against prompt injection, oversized queries, and abuse.
 */

export interface SanitizationResult {
  isValid: boolean;
  sanitizedQuery: string;
  rejectionReason?: string;
}

// Minimum and maximum query lengths
const MIN_QUERY_LENGTH = 10;
const MAX_QUERY_LENGTH = 2000;
const MIN_WORD_COUNT = 2;

// Patterns that suggest prompt injection attempts
const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous\s+)?instructions/i,
  /ignore\s+(your|the)\s+(rules|guidelines|instructions)/i,
  /disregard\s+(all\s+)?(previous\s+)?instructions/i,
  /forget\s+(all\s+)?(previous\s+)?instructions/i,
  /you\s+are\s+now\s+(a|an)\s+/i,
  /pretend\s+(you're|you\s+are|to\s+be)/i,
  /act\s+as\s+(a|an|if)/i,
  /new\s+persona/i,
  /jailbreak/i,
  /bypass\s+(safety|security|filter)/i,
  /reveal\s+(your|the)\s+(system|initial)\s+prompt/i,
  /what\s+(is|are)\s+your\s+(instructions|rules)/i,
  /show\s+me\s+your\s+prompt/i,
  /repeat\s+(your|the)\s+(system|initial)\s+prompt/i,
  /\[system\]/i,
  /\[instruction\]/i,
  /\<\|im_start\|\>/i,
  /\<\|im_end\|\>/i,
  /\{\{.*\}\}/,  // Template injection
  /\$\{.*\}/,    // Variable injection
];

// Patterns that are clearly not tax-related queries
const OFF_TOPIC_PATTERNS = [
  /write\s+(me\s+)?(a\s+)?(poem|song|story|essay|code)/i,
  /generate\s+(a\s+)?(poem|song|story|image)/i,
  /how\s+to\s+(hack|steal|kill|murder)/i,
  /tell\s+me\s+a\s+joke/i,
  /what'?s?\s+the\s+weather/i,
  /who\s+won\s+the\s+(game|election|match)/i,
];

// Tax-related keywords that indicate a legitimate query
const TAX_KEYWORDS = [
  'tax', 'rrsp', 'tfsa', 'income', 'deduction', 'credit', 'cra',
  'return', 'filing', 'claim', 'eligible', 'contribution', 'limit',
  't4', 't1', 'gst', 'hst', 'benefit', 'refund', 'assessment',
  'tuition', 'medical', 'expense', 'capital', 'gain', 'dividend',
  'employment', 'self-employed', 'business', 'rental', 'property',
  'rrif', 'resp', 'fhsa', 'pension', 'cpp', 'ei', 'ontario',
  'quebec', 'provincial', 'federal', 'slip', 'receipt', 'notice',
  'deadline', 'april', 'march', 'withholding', 'installment',
  'spouse', 'dependent', 'child', 'senior', 'disability',
];

/**
 * Check if query contains prompt injection attempts
 */
function containsInjectionAttempt(query: string): boolean {
  return INJECTION_PATTERNS.some(pattern => pattern.test(query));
}

/**
 * Check if query is clearly off-topic
 */
function isOffTopic(query: string): boolean {
  const hasOffTopicPattern = OFF_TOPIC_PATTERNS.some(pattern => pattern.test(query));
  if (!hasOffTopicPattern) return false;
  
  // If it has tax keywords, it might still be legitimate
  const lowerQuery = query.toLowerCase();
  const hasTaxKeyword = TAX_KEYWORDS.some(keyword => lowerQuery.includes(keyword));
  
  return !hasTaxKeyword;
}

/**
 * Check if query has minimum substance
 */
function hasMinimumSubstance(query: string): boolean {
  // Count actual words (not just characters)
  const words = query.trim().split(/\s+/).filter(word => word.length > 1);
  return words.length >= MIN_WORD_COUNT;
}

/**
 * Clean and normalize query text
 */
function cleanQuery(query: string): string {
  return query
    // Remove excessive whitespace
    .replace(/\s+/g, ' ')
    // Remove null bytes and control characters
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Trim whitespace
    .trim();
}

/**
 * Main sanitization function
 */
export function sanitizeQuery(rawQuery: unknown): SanitizationResult {
  // Handle null/undefined/non-string inputs
  if (rawQuery === null || rawQuery === undefined) {
    return {
      isValid: false,
      sanitizedQuery: '',
      rejectionReason: 'Please enter a question.',
    };
  }

  // Handle non-string inputs
  if (typeof rawQuery !== 'string') {
    return {
      isValid: false,
      sanitizedQuery: '',
      rejectionReason: 'Please provide a valid question.',
    };
  }

  // Handle empty strings
  if (rawQuery.trim().length === 0) {
    return {
      isValid: false,
      sanitizedQuery: '',
      rejectionReason: 'Please enter a question.',
    };
  }

  // Clean the query
  const sanitizedQuery = cleanQuery(rawQuery);

  // Check minimum length
  if (sanitizedQuery.length < MIN_QUERY_LENGTH) {
    return {
      isValid: false,
      sanitizedQuery,
      rejectionReason: 'Your question is too short. Please provide more detail.',
    };
  }

  // Check maximum length
  if (sanitizedQuery.length > MAX_QUERY_LENGTH) {
    return {
      isValid: false,
      sanitizedQuery: sanitizedQuery.slice(0, MAX_QUERY_LENGTH),
      rejectionReason: `Your question is too long. Please keep it under ${MAX_QUERY_LENGTH} characters.`,
    };
  }

  // Check for minimum substance
  if (!hasMinimumSubstance(sanitizedQuery)) {
    return {
      isValid: false,
      sanitizedQuery,
      rejectionReason: 'Please ask a complete question.',
    };
  }

  // Check for prompt injection
  if (containsInjectionAttempt(sanitizedQuery)) {
    return {
      isValid: false,
      sanitizedQuery,
      rejectionReason: 'I can only help with Canadian tax questions. Please rephrase your question.',
    };
  }

  // Check for off-topic queries
  if (isOffTopic(sanitizedQuery)) {
    return {
      isValid: false,
      sanitizedQuery,
      rejectionReason: 'I specialize in Canadian tax questions. How can I help with your taxes?',
    };
  }

  // All checks passed
  return {
    isValid: true,
    sanitizedQuery,
  };
}

/**
 * Quick validation check (for rate limiting decisions)
 */
export function isValidQuery(rawQuery: unknown): boolean {
  return sanitizeQuery(rawQuery).isValid;
}

/**
 * Get rejection message for invalid query
 */
export function getRejectionMessage(rawQuery: unknown): string | null {
  const result = sanitizeQuery(rawQuery);
  return result.isValid ? null : (result.rejectionReason || 'Invalid query.');
}
