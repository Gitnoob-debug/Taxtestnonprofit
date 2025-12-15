/**
 * PII Redactor Service
 * =====================
 * Detects and redacts personally identifiable information before processing.
 * 
 * Detects:
 * - Social Insurance Numbers (SIN) with Luhn validation
 * - Canadian phone numbers
 * - Email addresses
 * - Postal codes
 * - Bank account numbers
 * - Credit card numbers
 */

export interface RedactionResult {
  redactedText: string;
  hadPII: boolean;
  detectedTypes: string[];
}

interface PIIPattern {
  name: string;
  pattern: RegExp;
  replacement: string;
  validate?: (match: string) => boolean;
}

/**
 * Luhn algorithm to validate SIN numbers
 */
function isValidSIN(sin: string): boolean {
  const digits = sin.replace(/\D/g, '');
  if (digits.length !== 9) return false;
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let digit = parseInt(digits[i], 10);
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}

/**
 * PII patterns for Canadian tax context
 */
const PII_PATTERNS: PIIPattern[] = [
  {
    name: 'SIN',
    pattern: /\b(\d{3}[-\s]?\d{3}[-\s]?\d{3})\b/g,
    replacement: '[SIN REDACTED]',
    validate: isValidSIN,
  },
  {
    name: 'PHONE',
    pattern: /(?:\+?1[-.\s]?)?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
    replacement: '[PHONE REDACTED]',
  },
  {
    name: 'EMAIL',
    pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    replacement: '[EMAIL REDACTED]',
  },
  {
    name: 'POSTAL_CODE',
    pattern: /\b[A-Za-z]\d[A-Za-z][-\s]?\d[A-Za-z]\d\b/g,
    replacement: '[POSTAL CODE REDACTED]',
  },
  {
    name: 'BANK_ACCOUNT',
    pattern: /\b(?:account|acct)[-\s#:]*(\d{5,12})\b/gi,
    replacement: '[BANK ACCOUNT REDACTED]',
  },
  {
    name: 'CREDIT_CARD',
    pattern: /\b(?:\d{4}[-\s]?){3,4}\d{1,4}\b/g,
    replacement: '[CREDIT CARD REDACTED]',
    validate: (match: string) => {
      const digits = match.replace(/\D/g, '');
      return digits.length >= 13 && digits.length <= 19;
    },
  },
  {
    name: 'ADDRESS',
    pattern: /\b\d{1,5}\s+(?:[A-Za-z]+\s+){1,3}(?:Street|St|Avenue|Ave|Road|Rd|Drive|Dr|Boulevard|Blvd|Lane|Ln|Court|Ct|Crescent|Cres|Way|Place|Pl)\.?\b/gi,
    replacement: '[ADDRESS REDACTED]',
  },
];

/**
 * Redact PII from text
 */
export function redactPII(text: string): RedactionResult {
  let redactedText = text;
  const detectedTypes: string[] = [];

  for (const piiPattern of PII_PATTERNS) {
    const matches = redactedText.match(piiPattern.pattern);
    
    if (matches) {
      for (const match of matches) {
        if (piiPattern.validate && !piiPattern.validate(match)) {
          continue;
        }
        
        redactedText = redactedText.replace(match, piiPattern.replacement);
        
        if (!detectedTypes.includes(piiPattern.name)) {
          detectedTypes.push(piiPattern.name);
        }
      }
    }
  }

  return {
    redactedText,
    hadPII: detectedTypes.length > 0,
    detectedTypes,
  };
}

/**
 * Check if text contains PII without redacting
 */
export function containsPII(text: string): boolean {
  for (const piiPattern of PII_PATTERNS) {
    const matches = text.match(piiPattern.pattern);
    if (matches) {
      for (const match of matches) {
        if (!piiPattern.validate || piiPattern.validate(match)) {
          return true;
        }
      }
    }
  }
  return false;
}
