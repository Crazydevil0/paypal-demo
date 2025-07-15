export const useBackground = () => {
  const getBackgroundStyle = () => {
    return {
      className: "min-h-screen bg-[#003087] relative overflow-hidden flex items-center justify-center",
      style: { backgroundColor: '#011436' }
    }
  }
  
  const isGradientBackground = () => {
    return false
  }
  
  return {
    backgroundVariant: 'solid-navy',
    getBackgroundStyle,
    isGradientBackground
  }
} 