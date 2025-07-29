import { useState, useEffect } from 'react'

export function useTabletOptimization() {
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const checkTabletResolution = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      // Check for 1200x800 tablet resolution (with some tolerance)
      const isTabletResolution = 
        width >= 1100 && width <= 1300 && 
        height >= 700 && height <= 900
      
      setIsTablet(isTabletResolution)
    }

    // Check on mount
    checkTabletResolution()

    // Listen for resize events
    window.addEventListener('resize', checkTabletResolution)

    return () => {
      window.removeEventListener('resize', checkTabletResolution)
    }
  }, [])

  // Return optimized classes for tablet
  const getContainerClass = (baseClass: string = '') => {
    return isTablet 
      ? `${baseClass} tablet-container`.trim()
      : baseClass
  }

  const getHeadingClass = (level: 1 | 2, baseClass: string = '') => {
    if (!isTablet) return baseClass
    
    const tabletClass = level === 1 ? 'tablet-heading-1' : 'tablet-heading-2'
    return `${baseClass} ${tabletClass}`.trim()
  }

  const getTextClass = (baseClass: string = '') => {
    return isTablet 
      ? `${baseClass} tablet-text-large`.trim()
      : baseClass
  }

  const getVideoClass = (baseClass: string = '') => {
    return isTablet 
      ? `${baseClass} tablet-video`.trim()
      : baseClass
  }

  const getGridClass = (cols: 2 | 3, baseClass: string = '') => {
    if (!isTablet) return baseClass
    
    const tabletClass = cols === 3 ? 'tablet-grid-3' : 'tablet-grid-2'
    return `${baseClass} ${tabletClass}`.trim()
  }

  const getFeatureCardClass = (baseClass: string = '') => {
    return isTablet 
      ? `${baseClass} tablet-feature-card`.trim()
      : baseClass
  }

  // Profile page specific methods
  const getProfileContainerClass = (baseClass: string = '') => {
    return isTablet 
      ? `${baseClass} tablet-profile-container`.trim()
      : baseClass
  }

  const getProfileHeaderClass = (baseClass: string = '') => {
    return isTablet 
      ? `${baseClass} tablet-profile-header`.trim()
      : baseClass
  }

  const getProfileSubtitleClass = (baseClass: string = '') => {
    return isTablet 
      ? `${baseClass} tablet-profile-subtitle`.trim()
      : baseClass
  }

  const getProfileTitleClass = (baseClass: string = '') => {
    return isTablet 
      ? `${baseClass} tablet-profile-title`.trim()
      : baseClass
  }

  const getProfileCardsGridClass = (baseClass: string = '') => {
    return isTablet 
      ? `${baseClass} tablet-profile-cards-grid`.trim()
      : baseClass
  }

  const getProfileCardClass = (baseClass: string = '') => {
    return isTablet 
      ? `${baseClass} tablet-profile-card`.trim()
      : baseClass
  }

  const getProfileIconContainerClass = (baseClass: string = '') => {
    return isTablet 
      ? `${baseClass} tablet-profile-icon-container`.trim()
      : baseClass
  }

  const getProfileIconClass = (baseClass: string = '') => {
    return isTablet 
      ? `${baseClass} tablet-profile-icon`.trim()
      : baseClass
  }

  const getProfileCardTitleClass = (baseClass: string = '') => {
    return isTablet 
      ? `${baseClass} tablet-profile-card-title`.trim()
      : baseClass
  }

  return {
    isTablet,
    getContainerClass,
    getHeadingClass,
    getTextClass,
    getVideoClass,
    getGridClass,
    getFeatureCardClass,
    getProfileContainerClass,
    getProfileHeaderClass,
    getProfileSubtitleClass,
    getProfileTitleClass,
    getProfileCardsGridClass,
    getProfileCardClass,
    getProfileIconContainerClass,
    getProfileIconClass,
    getProfileCardTitleClass
  }
}