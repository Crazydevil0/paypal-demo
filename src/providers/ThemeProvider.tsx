import { createContext, useContext, useEffect, useState } from "react"
import type { ReactNode } from 'react'
import { designTokens } from '@/lib/design-tokens'

// Theme context type
interface ThemeContextType {
  tokens: typeof designTokens
  getColor: (colorPath: string) => string
  getSpacing: (size: keyof typeof designTokens.spacing) => string
  getFontSize: (size: keyof typeof designTokens.typography.fontSize) => string
  getShadow: (size: keyof typeof designTokens.shadows) => string
  getBorderRadius: (size: keyof typeof designTokens.borderRadius) => string
  getGradient: (name: keyof typeof designTokens.gradients) => string
  getIcon: (category: keyof typeof designTokens.iconMappings, name: string) => string
  getAnimationVariant: (name: keyof typeof designTokens.animation.variants) => any
}

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Theme provider props
interface ThemeProviderProps {
  children: ReactNode
}

// Helper function to get nested object value by path
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

// Theme provider component
export function ThemeProvider({ children }: ThemeProviderProps) {
  // Helper functions to access design tokens
  const getColor = (colorPath: string): string => {
    const color = getNestedValue(designTokens.colors, colorPath)
    return color || colorPath // fallback to original if not found
  }

  const getSpacing = (size: keyof typeof designTokens.spacing): string => {
    return designTokens.spacing[size]
  }

  const getFontSize = (size: keyof typeof designTokens.typography.fontSize): string => {
    return designTokens.typography.fontSize[size]
  }

  const getShadow = (size: keyof typeof designTokens.shadows): string => {
    return designTokens.shadows[size]
  }

  const getBorderRadius = (size: keyof typeof designTokens.borderRadius): string => {
    return designTokens.borderRadius[size]
  }

  const getGradient = (name: keyof typeof designTokens.gradients): string => {
    return designTokens.gradients[name]
  }

  const getIcon = (category: keyof typeof designTokens.iconMappings, name: string): string => {
    const categoryIcons = designTokens.iconMappings[category] as Record<string, string>
    return categoryIcons?.[name] || ''
  }

  const getAnimationVariant = (name: keyof typeof designTokens.animation.variants): any => {
    return designTokens.animation.variants[name]
  }

  const value: ThemeContextType = {
    tokens: designTokens,
    getColor,
    getSpacing,
    getFontSize,
    getShadow,
    getBorderRadius,
    getGradient,
    getIcon,
    getAnimationVariant,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// Hook to use theme
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Utility hook for common design system patterns
export function useDesignSystem() {
  const { tokens, getColor, getSpacing, getGradient, getAnimationVariant } = useTheme()

  // Common color combinations for PayPal design
  const colors = {
    primary: {
      main: getColor('primary.500'),
      hover: getColor('primary.600'),
      light: getColor('primary.100'),
      dark: getColor('primary.900'),
    },
    paypal: {
      blue: getColor('primary.500'),        // #0070E0
      blueHover: getColor('primary.600'),   // #0059b2
      navy: getColor('dark.800'),           // #003087
      dark: getColor('dark.900'),           // #011436
      lightBlue: getColor('light.500'),     // #6CC3FF
      qrBlue: getColor('light.600'),        // #009CDE
      yellow: getColor('secondary.500'),    // #FFC439
      gray: getColor('neutral.200'),        // #f2f4f7
    },
    text: {
      primary: getColor('text.primary'),    // #1a1a1a
      secondary: getColor('text.secondary'), // #6b7280
      inverse: getColor('text.inverse'),     // #ffffff
      accent: getColor('text.accent'),       // #0070E0
      highlight: getColor('text.highlight'), // #6CC3FF
    },
    background: {
      primary: getColor('background.primary'),   // #ffffff
      secondary: getColor('background.secondary'), // #f2f4f7
      dark: getColor('background.dark'),          // #011436
    },
  }

  // Common spacing values
  const spacing = {
    xs: getSpacing(2),      // 8px
    sm: getSpacing(4),      // 16px
    md: getSpacing(6),      // 24px
    lg: getSpacing(8),      // 32px
    xl: getSpacing(12),     // 48px
    '2xl': getSpacing(16),  // 64px
    '3xl': getSpacing(24),  // 96px
    '4xl': getSpacing(32),  // 128px
  }

  // Common animation variants
  const animations = {
    fadeIn: getAnimationVariant('fadeIn'),
    slideInLeft: getAnimationVariant('slideInLeft'),
    slideInRight: getAnimationVariant('slideInRight'),
    scaleIn: getAnimationVariant('scaleIn'),
    staggerChildren: getAnimationVariant('staggerChildren'),
  }

  // Common gradients
  const gradients = {
    heroBackground: getGradient('heroBackground'),
    paypalPrimary: getGradient('paypalPrimary'),
    paypalDark: getGradient('paypalDark'),
    buttonPrimary: getGradient('buttonPrimary'),
    cardBackground: getGradient('cardBackground'),
  }

  // Component style builders
  const buildButtonStyles = (variant: 'primary' | 'secondary' | 'ghost' = 'primary') => {
    const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2'
    
    const variantStyles = {
      primary: `${baseStyles} bg-[${colors.paypal.blue}] text-white hover:bg-[${colors.paypal.blueHover}] focus:ring-[${colors.paypal.blue}]`,
      secondary: `${baseStyles} bg-white text-[${colors.paypal.blue}] border-2 border-[${colors.paypal.blue}] hover:bg-[${colors.paypal.blue}] hover:text-white focus:ring-[${colors.paypal.blue}]`,
      ghost: `${baseStyles} bg-transparent text-[${colors.text.primary}] hover:bg-gray-100 focus:ring-gray-300`,
    }
    
    return variantStyles[variant]
  }

  const buildCardStyles = (variant: 'default' | 'elevated' = 'default') => {
    const baseStyles = 'bg-white rounded-3xl p-6'
    
    const variantStyles = {
      default: `${baseStyles} shadow-lg border border-gray-200`,
      elevated: `${baseStyles} shadow-2xl`,
    }
    
    return variantStyles[variant]
  }

  return {
    tokens,
    colors,
    spacing,
    gradients,
    animations,
    buildButtonStyles,
    buildCardStyles,
  }
} 