import { useHelper } from '@/context/HelperProvider'

export const useBackground = () => {
  const { settings } = useHelper()
  const backgroundVariant = settings.global.backgroundVariant
  
  const getBackgroundStyle = () => {
    if (backgroundVariant === 'solid-navy') {
      return {
        className: "min-h-screen bg-[#003087] relative overflow-hidden flex items-center justify-center",
        style: { backgroundColor: '#003087' }
      }
    }
    
    // Default gradient background
    return {
      className: "min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 relative overflow-hidden flex items-center justify-center",
      style: {}
    }
  }
  
  const isGradientBackground = () => {
    return backgroundVariant === 'gradient'
  }
  
  return {
    backgroundVariant,
    getBackgroundStyle,
    isGradientBackground
  }
} 