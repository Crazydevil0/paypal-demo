import { useState, useEffect } from 'react'

export function useTabletOptimization() {
  const [isTablet, setIsTablet] = useState(false)
  const [isKeyboardActive, setIsKeyboardActive] = useState(false)
  const [focusedInput, setFocusedInput] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const checkTabletResolution = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      // Check for 1280x800 tablet resolution (with some tolerance)
      const isTabletResolution = 
        width >= 1200 && width <= 1350 && 
        height >= 750 && height <= 850
      
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

  // Keyboard detection for tablets
  useEffect(() => {
    if (!isTablet) return

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        setIsKeyboardActive(true)
        setFocusedInput(target)
        
        // Scroll the focused input into view with offset for keyboard
        setTimeout(() => {
          target.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          })
        }, 300) // Delay to allow keyboard to appear
      }
    }

    const handleFocusOut = (e: FocusEvent) => {
      const target = e.target as HTMLElement
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        // Delay to avoid flickering when moving between inputs
        setTimeout(() => {
          if (!document.activeElement || 
              (document.activeElement.tagName !== 'INPUT' && 
               document.activeElement.tagName !== 'TEXTAREA')) {
            setIsKeyboardActive(false)
            setFocusedInput(null)
          }
        }, 100)
      }
    }

    // Alternative: Listen for viewport height changes (more reliable for iOS)
    const initialViewportHeight = window.visualViewport?.height || window.innerHeight
    
    const handleViewportChange = () => {
      const currentHeight = window.visualViewport?.height || window.innerHeight
      const heightDifference = initialViewportHeight - currentHeight
      
      // If viewport shrunk by more than 150px, assume keyboard is open
      if (heightDifference > 150) {
        setIsKeyboardActive(true)
      } else {
        setIsKeyboardActive(false)
        setFocusedInput(null)
      }
    }

    document.addEventListener('focusin', handleFocusIn)
    document.addEventListener('focusout', handleFocusOut)
    
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange)
    }

    return () => {
      document.removeEventListener('focusin', handleFocusIn)
      document.removeEventListener('focusout', handleFocusOut)
      
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportChange)
      }
    }
  }, [isTablet])

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

  // Contact page specific methods
  const getContactContainerClass = (baseClass: string = '') => {
    const contactClass = isTablet ? 'contact-page' : ''
    const keyboardClass = isTablet && isKeyboardActive ? 'keyboard-active' : ''
    return `${baseClass} ${contactClass} ${keyboardClass}`.trim()
  }

  // Helper method to handle input focus for smooth keyboard experience
  const handleInputFocus = (inputElement: HTMLInputElement) => {
    if (!isTablet) return
    
    // iOS Safari workaround: briefly hide input to prevent scroll jump
    const originalOpacity = inputElement.style.opacity
    inputElement.style.opacity = '0'
    
    // Restore opacity immediately
    setTimeout(() => {
      inputElement.style.opacity = originalOpacity || '1'
      
      // Then scroll into view with proper timing
      setTimeout(() => {
        inputElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        })
      }, 100)
    }, 1)
  }

  return {
    isTablet,
    isKeyboardActive,
    focusedInput,
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
    getProfileCardTitleClass,
    getContactContainerClass,
    handleInputFocus
  }
}