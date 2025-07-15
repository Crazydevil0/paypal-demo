import { createContext, useContext, useState } from 'react'
import { useLocation } from '@tanstack/react-router'
import type { ReactNode } from 'react'

// Helper settings types
export type LogoVariant = 'logo' | 'monogram' | 'both'
export type AvatarVariant = 'avatars' | 'icons'
export type ChannelsDisplayVariant = 'full' | 'title-description-only'
export type ChannelsContentVariant = 'default' | 'image-style'
export type ChallengesDisplayVariant = 'full' | 'title-description-only'
export type ChallengesContentVariant = 'default' | 'image-style'
export type BackgroundVariant = 'gradient' | 'solid-navy'

// Solutions page settings
export interface SolutionsPageElements {
  showMainBenefits: boolean
  showMoreBenefits: boolean
  showDescription: boolean
  showSubtitle: boolean
}

// Profile card element toggles
export interface ProfileCardElements {
  showIcon: boolean
  showTitle: boolean
  showDescription: boolean
  showLabels: boolean
}

// Page-specific settings
interface HomePageSettings {
  logoVariant: LogoVariant
}

interface ProfilePageSettings {
  avatarVariant: AvatarVariant
  cardElements: ProfileCardElements
}

interface ChannelsPageSettings {
  displayVariant: ChannelsDisplayVariant
  contentVariant: ChannelsContentVariant
}

interface ChallengesPageSettings {
  displayVariant: ChallengesDisplayVariant
  contentVariant: ChallengesContentVariant
  showSolucaoPaypal: boolean
  showImpactoAtual: boolean
}

interface SolutionsPageSettings {
  elements: SolutionsPageElements
}

// Global settings (applies to all pages)
interface GlobalSettings {
  backgroundVariant: BackgroundVariant
}

interface HelperSettings {
  global: GlobalSettings
  homePage: HomePageSettings
  profilePage: ProfilePageSettings
  channelsPage: ChannelsPageSettings
  challengesPage: ChallengesPageSettings
  solutionsPage: SolutionsPageSettings
}

interface HelperContextType {
  settings: HelperSettings
  currentPage: string
  updatePageSettings: <T extends keyof HelperSettings>(page: T, newSettings: Partial<HelperSettings[T]>) => void
  resetPageSettings: (page: keyof HelperSettings) => void
  resetAllSettings: () => void
}

const defaultSettings: HelperSettings = {
  global: {
    backgroundVariant: 'gradient'
  },
  homePage: {
    logoVariant: 'both'
  },
  profilePage: {
    avatarVariant: 'avatars',
    cardElements: {
      showIcon: true,
      showTitle: true,
      showDescription: true,
      showLabels: true
    }
  },
  channelsPage: {
    displayVariant: 'full',
    contentVariant: 'default'
  },
  challengesPage: {
    displayVariant: 'full',
    contentVariant: 'default',
    showSolucaoPaypal: true,
    showImpactoAtual: true
  },
  solutionsPage: {
    elements: {
      showMainBenefits: true,
      showMoreBenefits: true,
      showDescription: true,
      showSubtitle: true
    }
  }
}

const HelperContext = createContext<HelperContextType | undefined>(undefined)

interface HelperProviderProps {
  children: ReactNode
}

export function HelperProvider({ children }: HelperProviderProps) {
  const location = useLocation()
  const [settings, setSettings] = useState<HelperSettings>(defaultSettings)

  // Get current page from location (reactive to route changes)
  const getCurrentPage = (pathname: string) => {
    switch (pathname) {
      case '/': return 'homePage'
      case '/profile': return 'profilePage'
      case '/channels': return 'channelsPage'
      case '/challenges': return 'challengesPage'
      case '/solutions': return 'solutionsPage'
      case '/ppcp-benefits': return 'solutionsPage'
      case '/braintree-benefits': return 'solutionsPage'
      case '/ppcp-intro': return 'solutionsPage'
      case '/braintree-intro': return 'solutionsPage'
      default: return 'otherPage'
    }
  }
  
  const currentPage = getCurrentPage(location.pathname)

  const updatePageSettings = <T extends keyof HelperSettings>(
    page: T, 
    newSettings: Partial<HelperSettings[T]>
  ) => {
    setSettings(prev => ({
      ...prev,
      [page]: { ...prev[page], ...newSettings }
    }))
  }

  const resetPageSettings = (page: keyof HelperSettings) => {
    setSettings(prev => ({
      ...prev,
      [page]: defaultSettings[page]
    }))
  }

  const resetAllSettings = () => {
    setSettings(defaultSettings)
  }

  return (
    <HelperContext.Provider value={{ 
      settings, 
      currentPage,
      updatePageSettings, 
      resetPageSettings, 
      resetAllSettings 
    }}>
      {children}
    </HelperContext.Provider>
  )
}

export function useHelper() {
  const context = useContext(HelperContext)
  if (context === undefined) {
    throw new Error('useHelper must be used within a HelperProvider')
  }
  return context
} 