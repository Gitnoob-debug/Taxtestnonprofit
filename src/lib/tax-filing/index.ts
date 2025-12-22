/**
 * Tax Filing Module
 * Complete end-to-end tax preparation system
 */

// Types
export * from './types'

// Tax Engine
export * from './tax-engine'

// Conversation Engine
export * from './conversation-engine'

// Hooks
export { useTaxReturn } from './useTaxReturn'
export type { TaxReturnHook } from './useTaxReturn'

// Components
export { FilingWizard } from './components/FilingWizard'
export { ConversationalFiling } from './components/ConversationalFiling'
export { LiveTaxForm } from './components/LiveTaxForm'
