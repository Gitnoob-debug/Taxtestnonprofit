/**
 * Tax RAG Personalization Module - Exports
 */

export {
  TaxRAGGenerator,
  enrichQueryForSearch,
  preflightCheck,
  type GeneratorConfig,
  type GeneratorInput,
  type GeneratorOutput,
  type ConversationMessage
} from './generator';

export {
  type UserProfile,
  generateProfileContext,
  calculateProfileRelevance,
  enrichQueryWithProfile,
  getProfileFlags,
  mapDBProfileToUserProfile
} from './profileUtils';

export {
  calculateConfidence,
  getResponseStrategy,
  formatConfidenceDisplay,
  type ConfidenceResult,
  type SearchResult
} from './confidenceScoring';

export {
  buildSystemPrompt,
  buildFallbackPrompt,
  type PromptContext
} from './promptBuilder';
