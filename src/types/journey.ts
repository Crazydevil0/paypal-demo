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

export interface JourneyContextType {
  data: JourneyData
  updateData: (updates: Partial<JourneyData>) => void
  resetJourney: () => void
  saveJourney: () => Promise<void>
} 