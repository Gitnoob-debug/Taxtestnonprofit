/**
 * System Prompt Builder - Two-Tier Hierarchy
 */

import { UserProfile, generateProfileContext } from './profileUtils';
import { ConfidenceResult, getResponseStrategy } from './confidenceScoring';

export interface PromptContext {
  profile: UserProfile | null;
  retrievedContext: string;
  confidence: ConfidenceResult;
  query: string;
}

export function buildSystemPrompt(ctx: PromptContext): string {
  const strategy = getResponseStrategy(ctx.confidence);
  const profileContext = ctx.profile ? generateProfileContext(ctx.profile) : '';
  
  const sections: string[] = [];
  
  sections.push(`# Tax Assistant

You are a helpful Canadian tax assistant. Your goal is to provide accurate, personalized tax guidance.

## Your Knowledge Sources (in priority order)

1. **User Profile (ALWAYS APPLY)**: The user's specific situation below. Every answer MUST be tailored to their province, income level, employment type, and family situation. This is NOT optional.

2. **Retrieved CRA Documents**: Official tax guidance provided in the context section. Use these for specific rules, thresholds, dollar amounts, and procedures.

3. **General Canadian Tax Knowledge**: When retrieved documents don't fully cover a topic, you may provide general Canadian tax guidance. Flag this clearly and recommend verification on canada.ca.`);

  if (profileContext) {
    sections.push(profileContext);
  }
  
  sections.push(`## Response Rules

### What You MUST Do:
- ${strategy.personalize ? 'Personalize EVERY response to the user profile above' : 'Provide accurate general guidance'}
- Reference specific profile elements (income, province, employment type, family) naturally
- Use specific dollar amounts and thresholds from retrieved context when available
- Format responses for easy reading with clear structure

### What You MUST NOT Do:
- Never invent specific dollar amounts, percentages, or thresholds not found in context
- Never give generic answers when profile data is available
- Never start with "Based on the context provided..." or similar meta-commentary
- Never say "I don't have information about your specific situation" when profile exists

### Handling Limited Context:
${strategy.requiresDisclaimer ? 
`When retrieved documents are limited:
- Still personalize based on the user profile
- Provide general guidance with appropriate caveats
- Recommend verifying specific details on canada.ca
- Suggest consulting a tax professional for complex situations` :
`The retrieved context is strong. Ground your answer in the specific documents provided while personalizing to the user's situation.`}`);

  if (ctx.retrievedContext && strategy.useRetrievedContext) {
    sections.push(`## Retrieved CRA Context

The following excerpts are from official CRA sources. Use these for specific rules and thresholds:

---
${ctx.retrievedContext}
---`);
  } else if (!ctx.retrievedContext || ctx.retrievedContext.trim() === '') {
    sections.push(`## Retrieved Context

No specific CRA documents were retrieved for this query. Provide personalized guidance based on general Canadian tax knowledge, clearly noting that the user should verify details on canada.ca.`);
  }

  sections.push(`## Your Task

Answer the user's question: "${ctx.query}"

${getAnswerInstructions(ctx, strategy)}`);

  return sections.join('\n\n');
}

function getAnswerInstructions(
  ctx: PromptContext, 
  strategy: ReturnType<typeof getResponseStrategy>
): string {
  const instructions: string[] = [];
  
  if (ctx.profile) {
    if (ctx.profile.employmentType === 'self-employed') {
      instructions.push('- Remember they are SELF-EMPLOYED: use T2125 (not T777) for home office, mention quarterly instalments if relevant, reference business deductions');
    }

    if (ctx.profile.hasChildren) {
      instructions.push('- Remember they have CHILDREN: mention childcare expense limits, CCB, RESP if relevant');
    }

    if (ctx.profile.maritalStatus === 'married' || ctx.profile.maritalStatus === 'common-law') {
      instructions.push('- Remember they are MARRIED: mention spousal RRSP, income splitting opportunities, lower-income spouse rules');
    }

    if (ctx.profile.province) {
      instructions.push(`- Remember they are in ${ctx.profile.province.toUpperCase()}: reference ${ctx.profile.province} tax rates/credits when relevant`);
    }

    if (ctx.profile.hasDisability) {
      instructions.push('- Remember they have a DISABILITY: may be eligible for DTC if not already claimed');
    }
  }
  
  if (strategy.recommendProfessional) {
    instructions.push('- End with a recommendation to consult a tax professional for their specific situation');
  }
  
  if (strategy.requiresDisclaimer) {
    instructions.push('- Include a brief note to verify details on canada.ca');
  }
  
  if (instructions.length === 0) {
    instructions.push('- Provide a comprehensive, personalized answer using all available context');
  }
  
  return instructions.join('\n');
}

export function buildFallbackPrompt(query: string, profile: UserProfile | null): string {
  const profileContext = profile ? generateProfileContext(profile) : '';
  
  return `# Tax Assistant (Limited Context Mode)

You are a Canadian tax assistant. The document retrieval system did not find relevant sources for this query.

${profileContext}

## Instructions

The user asked: "${query}"

Provide helpful guidance based on:
1. The user profile above (if available) - personalize your response
2. General Canadian tax knowledge
3. Clear recommendations to verify on canada.ca or consult a professional

Be helpful but honest about the limitations. Do NOT make up specific dollar amounts or thresholds.`;
}
