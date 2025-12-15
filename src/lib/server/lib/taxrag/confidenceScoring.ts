/**
 * Confidence Scoring for Tax RAG - Profile Aware
 */

import { UserProfile, calculateProfileRelevance } from './profileUtils';

export interface ConfidenceResult {
  level: 'high' | 'medium' | 'low';
  ragScore: number;
  profileRelevance: number;
  strongMatches: number;
  reasoning: string;
}

export interface SearchResult {
  score: number;
  content: string;
  metadata?: Record<string, any>;
}

export function calculateConfidence(
  searchResults: SearchResult[],
  query: string,
  profile: UserProfile | null
): ConfidenceResult {
  
  const scores = searchResults.map(r => r.score);
  const profileRelevance = profile ? calculateProfileRelevance(query, profile) : 0;
  
  if (!scores || scores.length === 0) {
    if (profileRelevance > 0.5) {
      return {
        level: 'medium',
        ragScore: 0,
        profileRelevance,
        strongMatches: 0,
        reasoning: 'No documents retrieved, but question relates to user profile. Will provide personalized general guidance.'
      };
    }
    
    return {
      level: 'low',
      ragScore: 0,
      profileRelevance,
      strongMatches: 0,
      reasoning: 'No documents retrieved and question is not profile-specific.'
    };
  }
  
  const topScore = Math.max(...scores);
  const avgScore = scores.reduce((sum, s) => sum + s, 0) / scores.length;
  const strongMatches = scores.filter(s => s > 0.50).length;
  
  const profileBoost = profileRelevance * 0.08;
  
  const adjustedTopScore = topScore + profileBoost;
  const adjustedAvgScore = avgScore + (profileBoost / 2);
  
  if (adjustedTopScore > 0.58 && adjustedAvgScore > 0.50 && strongMatches >= 3) {
    return {
      level: 'high',
      ragScore: topScore,
      profileRelevance,
      strongMatches,
      reasoning: `Strong retrieval (top: ${topScore.toFixed(3)}, avg: ${avgScore.toFixed(3)}) with ${strongMatches} strong matches.`
    };
  }
  
  if (adjustedTopScore > 0.50 && adjustedAvgScore > 0.45) {
    return {
      level: 'medium',
      ragScore: topScore,
      profileRelevance,
      strongMatches,
      reasoning: `Moderate retrieval (top: ${topScore.toFixed(3)}) with profile relevance ${profileRelevance.toFixed(2)}.`
    };
  }
  
  if (profileRelevance > 0.4 && topScore > 0.35) {
    return {
      level: 'medium',
      ragScore: topScore,
      profileRelevance,
      strongMatches,
      reasoning: `Weak retrieval but high profile relevance (${profileRelevance.toFixed(2)}). Will personalize with available context.`
    };
  }
  
  return {
    level: 'low',
    ragScore: topScore,
    profileRelevance,
    strongMatches,
    reasoning: `Weak retrieval (top: ${topScore.toFixed(3)}) and low profile relevance.`
  };
}

export function getResponseStrategy(confidence: ConfidenceResult): {
  useRetrievedContext: boolean;
  useGeneralKnowledge: boolean;
  requiresDisclaimer: boolean;
  personalize: boolean;
  recommendProfessional: boolean;
} {
  switch (confidence.level) {
    case 'high':
      return {
        useRetrievedContext: true,
        useGeneralKnowledge: false,
        requiresDisclaimer: false,
        personalize: confidence.profileRelevance > 0.2,
        recommendProfessional: false
      };
      
    case 'medium':
      return {
        useRetrievedContext: confidence.ragScore > 0.4,
        useGeneralKnowledge: true,
        requiresDisclaimer: confidence.ragScore < 0.5,
        personalize: true,
        recommendProfessional: confidence.ragScore < 0.45
      };
      
    case 'low':
      return {
        useRetrievedContext: confidence.ragScore > 0.35,
        useGeneralKnowledge: true,
        requiresDisclaimer: true,
        personalize: confidence.profileRelevance > 0.3,
        recommendProfessional: true
      };
  }
}

export function formatConfidenceDisplay(confidence: ConfidenceResult): string {
  const emoji = {
    high: '🟢',
    medium: '🟡', 
    low: '🔴'
  }[confidence.level];
  
  return `${emoji} ${confidence.level.toUpperCase()} | RAG: ${confidence.ragScore.toFixed(3)} | Profile: ${confidence.profileRelevance.toFixed(2)} | ${confidence.reasoning}`;
}
