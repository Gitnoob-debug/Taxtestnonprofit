export const config = {
  databaseUrl: process.env.DATABASE_URL || '',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  openrouterApiKey: process.env.OPENROUTER_API_KEY || '',
  
  // Model settings
  embeddingModel: 'text-embedding-3-small',
  llmModel: 'anthropic/claude-3.5-sonnet',
  
  // Chunking parameters
  chunkSize: 500,
  chunkOverlap: 50,
  
  // Retrieval parameters
  topK: 5,
  
  // Data paths (for ingestion - optional)
  manifestPath: process.env.MANIFEST_PATH || './data/manifest.json',
  corpusPath: process.env.CORPUS_PATH || './data/tax_corpus',
};
