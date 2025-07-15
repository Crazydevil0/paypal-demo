import { createContext, useContext, useState } from 'react'
import { useLocation } from '@tanstack/react-router'
import type { ReactNode } from 'react'

// Helper settings types
export type LogoVariant = 'logo' | 'monogram' | 'both'
export type ChannelsDisplayVariant = 'full' | 'title-description-only'
export type ChallengesDisplayVariant = 'full' | 'title-description-only'

// Profile card element toggles - simplified to only show icons and titles
export interface ProfileCardElements {
  showIcon: boolean
  showTitle: boolean
}

// Page-specific settings
interface HomePageSettings {
  logoVariant: LogoVariant
}

interface ProfilePageSettings {
  cardElements: ProfileCardElements
}

interface ChannelsPageSettings {
  displayVariant: ChannelsDisplayVariant
}

interface ChallengesPageSettings {
  displayVariant: ChallengesDisplayVariant
}

interface HelperSettings {
  homePage: HomePageSettings
  profilePage: ProfilePageSettings
  channelsPage: ChannelsPageSettings
  challengesPage: ChallengesPageSettings
}

interface HelperContextType {
  settings: HelperSettings
  currentPage: string
  updatePageSettings: <T extends keyof HelperSettings>(page: T, newSettings: Partial<HelperSettings[T]>) => void
  resetPageSettings: (page: keyof HelperSettings) => void
  resetAllSettings: () => void
}

const defaultSettings: HelperSettings = {
  homePage: {
    logoVariant: 'both'
  },
  profilePage: {
    cardElements: {
      showIcon: true,
      showTitle: true
    }
  },
  channelsPage: {
    displayVariant: 'full'
  },
  challengesPage: {
    displayVariant: 'full'
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