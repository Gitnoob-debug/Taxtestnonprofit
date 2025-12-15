/**
 * Confidence Scorer Service
 * ==========================
 * Evaluates retrieval quality and determines confidence level
 * for the response. Used to decide response mode (standard/hedged/failure).
 * 
 * Factors:
 * - Top chunk relevance score
 * - Consistency across chunks (same topic?)
 * - Query clarity (did we understand it?)
 * - Source authority (Income Tax Folios > random guides)
 */

import { HybridSearchResult } from './hybridRetrieval';
import { ClassificationResult } from './queryClassifier';

export type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export type ResponseMode = 'STANDARD' | 'HEDGED' | 'GRACEFUL_FAILURE';

export interface ConfidenceResult {
  score: number;
  level: ConfidenceLevel;
  responseMode: ResponseMode;
  factors: {
    topChunkRelevance: number;
    chunkConsistency: number;
    queryClarity: number;
    sourceAuthority: number;
  };
  warnings: string[];
}

const THRESHOLDS = {
  HIGH: 0.6,
  MEDIUM: 0.4,
};

const SOURCE_AUTHORITY: Record<string, number> = {
  'folio': 1.0,
  's1-f': 1.0,
  's2-f': 1.0,
  's3-f': 1.0,
  's4-f': 1.0,
  's5-f': 1.0,
  'tech_interp': 0.95,
  'interpretation': 0.95,
  'guide': 0.9,
  'rc4': 0.9,
  't4': 0.85,
  'bulletin': 0.85,
  'it-': 0.85,
  'form': 0.8,
  'gst': 0.85,
  'hst': 0.85,
  'provincial': 0.8,
  'quebec': 0.8,
  'benefit': 0.8,
  'default': 0.7,
};

function getSourceAuthority(sourceDoc: string): number {
  const lower = sourceDoc.toLowerCase();
  
  for (const [key, score] of Object.entries(SOURCE_AUTHORITY)) {
    if (lower.includes(key)) {
      return score;
    }
  }
  
  return SOURCE_AUTHORITY.default;
}

function calculateConsistency(chunks: HybridSearchResult[]): number {
  if (chunks.length < 2) return 1.0;

  const sources = new Set(chunks.map(c => c.source_doc));
  const sourceOverlap = 1 - (sources.size - 1) / chunks.length;

  let pathOverlap = 0;
  for (let i = 0; i < chunks.length - 1; i++) {
    const path1 = chunks[i].hierarchy_path;
    const path2 = chunks[i + 1].hierarchy_path;
    
    if (path1.length > 0 && path2.length > 0) {
      if (path1[0] === path2[0]) {
        pathOverlap += 1;
      }
    }
  }
  pathOverlap = pathOverlap / (chunks.length - 1);

  const allForms = chunks.flatMap(c => c.forms_mentioned);
  const uniqueForms = new Set(allForms);
  const formConsistency = allForms.length > 0 
    ? 1 - (uniqueForms.size / allForms.length) 
    : 0.5;

  return sourceOverlap * 0.4 + pathOverlap * 0.4 + formConsistency * 0.2;
}

export function calculateConfidence(
  chunks: HybridSearchResult[],
  classification: ClassificationResult
): ConfidenceResult {
  const warnings: string[] = [];

  if (chunks.length === 0) {
    return {
      score: 0,
      level: 'LOW',
      responseMode: 'GRACEFUL_FAILURE',
      factors: {
        topChunkRelevance: 0,
        chunkConsistency: 0,
        queryClarity: classification.confidence,
        sourceAuthority: 0,
      },
      warnings: ['No relevant chunks found'],
    };
  }

  const topScore = chunks[0].rrf_score;
  const topChunkRelevance = Math.min(1, topScore / 0.015);
  
  if (topChunkRelevance < 0.5) {
    warnings.push('Top result has low relevance score');
  }

  const chunkConsistency = calculateConsistency(chunks);
  
  if (chunkConsistency < 0.4) {
    warnings.push('Retrieved chunks are from diverse, possibly unrelated sources');
  }

  const queryClarity = classification.confidence;
  
  if (classification.skipRetrieval) {
    warnings.push('Query appears to be a greeting or off-topic');
  }

  const avgAuthority = chunks.reduce((sum, c) => sum + getSourceAuthority(c.source_doc), 0) / chunks.length;
  const sourceAuthority = avgAuthority;

  const score = 
    topChunkRelevance * 0.40 +
    chunkConsistency * 0.25 +
    queryClarity * 0.20 +
    sourceAuthority * 0.15;

  let level: ConfidenceLevel;
  let responseMode: ResponseMode;

  if (score >= THRESHOLDS.HIGH) {
    level = 'HIGH';
    responseMode = 'STANDARD';
  } else if (score >= THRESHOLDS.MEDIUM) {
    level = 'MEDIUM';
    responseMode = 'HEDGED';
    if (warnings.length === 0) {
      warnings.push('Moderate confidence - verify with CRA sources');
    }
  } else {
    level = 'LOW';
    responseMode = 'GRACEFUL_FAILURE';
    if (warnings.length === 0) {
      warnings.push('Low confidence - information may be incomplete');
    }
  }

  return {
    score,
    level,
    responseMode,
    factors: {
      topChunkRelevance,
      chunkConsistency,
      queryClarity,
      sourceAuthority,
    },
    warnings,
  };
}

export function getConfidencePrefix(level: ConfidenceLevel): string {
  switch (level) {
    case 'HIGH':
      return '';
    case 'MEDIUM':
      return 'Based on the CRA sources I found, ';
    case 'LOW':
      return 'I found limited information on this topic. ';
  }
}

export function getConfidenceSuffix(level: ConfidenceLevel): string {
  switch (level) {
    case 'HIGH':
      return '';
    case 'MEDIUM':
      return '\n\n*For your specific situation, you may want to verify this information on canada.ca or consult a tax professional.*';
    case 'LOW':
      return '\n\n*I couldn\'t find comprehensive information on this topic. Please check canada.ca/taxes or contact the CRA directly at 1-800-959-8281 for accurate guidance.*';
  }
}
