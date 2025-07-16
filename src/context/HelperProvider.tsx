// This file is no longer needed - defaults are now hardcoded in components
// Keeping minimal exports for backwards compatibility during transition

export type LogoVariant = 'logo' | 'monogram' | 'both'

export interface ProfileCardElements {
  showIcon: boolean
  showTitle: boolean
}

// Default values that were being used
export const DEFAULT_LOGO_VARIANT: LogoVariant = 'both'
export const DEFAULT_PROFILE_ELEMENTS: ProfileCardElements = {
  showIcon: true,
  showTitle: true
} 