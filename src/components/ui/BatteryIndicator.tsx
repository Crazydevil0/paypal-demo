import { motion } from 'framer-motion'
import { Battery, BatteryLow, Zap } from 'lucide-react'
import { useBatteryStatus } from '@/hooks/useBatteryStatus'
import { useTabletOptimization } from '@/hooks/useTabletOptimization'
import { useLocation } from '@tanstack/react-router'

export function BatteryIndicator() {
  const { supported, level, charging } = useBatteryStatus()
  const { isTablet } = useTabletOptimization()
  const location = useLocation()

  // Only show on tablets when API is supported and level is available
  if (!isTablet || !supported || level === null) {
    return null
  }

  const batteryPercentage = Math.round(level * 100)
  const isLow = batteryPercentage <= 20
  const isCritical = batteryPercentage <= 10

  // Check if we're on the welcome page to adjust positioning
  const isWelcomePage = location.pathname === '/'

  const getBatteryColor = () => {
    if (isCritical) return 'text-red-400'
    if (isLow) return 'text-yellow-400'
    return 'text-green-400'
  }

  const getBatteryFillColor = () => {
    if (isCritical) return 'bg-red-400'
    if (isLow) return 'bg-yellow-400'
    return 'bg-green-400'
  }

  const getBatteryIcon = () => {
    if (charging) return <Zap className="w-4 h-4" />
    if (isLow) return <BatteryLow className="w-4 h-4" />
    return <Battery className="w-4 h-4" />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: isWelcomePage ? 2 : 0 }}
      className={`fixed z-40 ${
        isWelcomePage 
          ? 'top-4 left-20' // Position to the right of fullscreen button on welcome page
          : 'top-4 left-4'  // Normal top-left position on other pages
      }`}
    >
      <div className="bg-black/30 backdrop-blur-xl rounded-full border border-white/10 px-4 py-2 shadow-lg">
        <div className="flex items-center gap-3">
          {/* Battery Icon */}
          <div className={`${getBatteryColor()} ${charging ? 'animate-pulse' : ''}`}>
            {getBatteryIcon()}
          </div>
          
          {/* Modern Battery Level Bar */}
          <div className="relative">
            {/* Background track */}
            <div className="w-12 h-2 bg-white/20 rounded-full overflow-hidden">
              {/* Fill bar with smooth animation */}
              <motion.div 
                className={`h-full rounded-full ${getBatteryFillColor()} ${
                  charging ? 'animate-pulse' : ''
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${batteryPercentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            
            {/* Charging shimmer effect */}
            {charging && (
              <motion.div
                className="absolute inset-0 w-12 h-2 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: [-48, 48] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5, 
                    ease: "easeInOut" 
                  }}
                />
              </motion.div>
            )}
          </div>
          
          {/* Percentage Text */}
          <span className="text-xs text-white/90 font-medium min-w-[32px] text-right">
            {batteryPercentage}%
          </span>
        </div>
      </div>
    </motion.div>
  )
}