/**
 * MMR Deduplication Service
 * ==========================
 * Maximal Marginal Relevance removes redundant chunks while
 * maintaining diversity in results.
 * 
 * Formula: MMR = λ * sim(chunk, query) - (1-λ) * max(sim(chunk, selected))
 * 
 * Higher λ = more relevance-focused
 * Lower λ = more diversity-focused
 * Default λ = 0.7 (balance with slight relevance preference)
 */

import { HybridSearchResult } from './hybridRetrieval';

export interface MMROptions {
  lambda?: number;
  similarityThreshold?: number;
}

function jaccardSimilarity(text1: string, text2: string): number {
  const words1 = new Set(text1.toLowerCase().split(/\s+/).filter(w => w.length > 2));
  const words2 = new Set(text2.toLowerCase().split(/\s+/).filter(w => w.length > 2));
  
  if (words1.size === 0 || words2.size === 0) return 0;
  
  const intersection = new Set(Array.from(words1).filter(w => words2.has(w)));
  const union = new Set([...Array.from(words1), ...Array.from(words2)]);
  
  return intersection.size / union.size;
}

function isSameSection(chunk1: HybridSearchResult, chunk2: HybridSearchResult): boolean {
  if (chunk1.source_doc !== chunk2.source_doc) return false;
  
  const path1 = chunk1.hierarchy_path;
  const path2 = chunk2.hierarchy_path;
  
  if (path1.length === 0 || path2.length === 0) return false;
  
  const matchLevels = Math.min(2, Math.min(path1.length, path2.length));
  for (let i = 0; i < matchLevels; i++) {
    if (path1[i] !== path2[i]) return false;
  }
  
  return true;
}

export function applyMMR(
  chunks: HybridSearchResult[],
  targetCount: number,
  options: MMROptions = {}
): HybridSearchResult[] {
  const { 
    lambda = 0.9, 
    similarityThreshold = 0.95 
  } = options;

  if (chunks.length === 0) return [];
  if (chunks.length <= targetCount) return chunks;

  const selected: HybridSearchResult[] = [];
  const remaining = [...chunks];

  selected.push(remaining.shift()!);

  while (selected.length < targetCount && remaining.length > 0) {
    let bestIdx = -1;
    let bestScore = -Infinity;

    for (let i = 0; i < remaining.length; i++) {
      const candidate = remaining[i];
      const relevance = candidate.rrf_score;

      let maxSimilarity = 0;
      for (const selectedChunk of selected) {
        if (isSameSection(candidate, selectedChunk)) {
          maxSimilarity = Math.max(maxSimilarity, 0.9);
        }
        
        const contentSim = jaccardSimilarity(candidate.content, selectedChunk.content);
        maxSimilarity = Math.max(maxSimilarity, contentSim);
      }

      if (maxSimilarity > similarityThreshold) {
        continue;
      }

      const mmrScore = lambda * relevance - (1 - lambda) * maxSimilarity;

      if (mmrScore > bestScore) {
        bestScore = mmrScore;
        bestIdx = i;
      }
    }

    if (bestIdx >= 0) {
      selected.push(remaining[bestIdx]);
      remaining.splice(bestIdx, 1);
    } else {
      break;
    }
  }

  return selected;
}

export function dedupeBySource(
  chunks: HybridSearchResult[],
  maxPerSource: number = 2
): HybridSearchResult[] {
  const sourceCounts = new Map<string, number>();
  const result: HybridSearchResult[] = [];

  for (const chunk of chunks) {
    const source = chunk.source_doc;
    const count = sourceCounts.get(source) || 0;
    
    if (count < maxPerSource) {
      result.push(chunk);
      sourceCounts.set(source, count + 1);
    }
  }

  return result;
}

export function removeExactDuplicates(chunks: HybridSearchResult[]): HybridSearchResult[] {
  const seen = new Set<string>();
  const result: HybridSearchResult[] = [];

  for (const chunk of chunks) {
    const hash = `${chunk.source_doc}:${chunk.content.slice(0, 200)}`;
    
    if (!seen.has(hash)) {
      seen.add(hash);
      result.push(chunk);
    }
  }

  return result;
}
