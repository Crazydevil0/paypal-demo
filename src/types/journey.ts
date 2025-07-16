export type BusinessProfile = 'small-medium' | 'large-enterprise' | null

export type SalesChannel = 'website' | 'social-media' | 'ecommerce'

export type BusinessChallenge = 
  | 'cart-abandonment'
  | 'slow-checkout'
  | 'global-scaling'
  | 'payment-reliability'
  | 'social-commerce'
  | 'fraud-chargebacks'

export type PayPalSolution = 'complete-payments' | 'braintree'

export type SyncStatus = 'synced' | 'pending' | 'syncing' | 'error' | 'offline'

export interface ContactInfo {
  fullName?: string
  email?: string
  phone?: string
  company?: string
}

export interface JourneyData {
  profile: BusinessProfile
  channels: SalesChannel[]
  challenges: BusinessChallenge[]
  solution?: PayPalSolution
  contact?: ContactInfo
  startedAt: Date
  completedAt?: Date
}

// Alias for backward compatibility
export type Journey = JourneyData

export interface JourneyContextType {
  data: JourneyData
  updateData: (updates: Partial<JourneyData>) => void
  resetJourney: () => void
  saveJourney: (overrideData?: Partial<JourneyData>) => Promise<void>
} 