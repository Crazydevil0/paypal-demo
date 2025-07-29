import { motion } from 'framer-motion'
import { Battery, BatteryLow, Zap, AlertTriangle } from 'lucide-react'
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`fixed z-50 ${
        isWelcomePage ? 'top-4 left-20' : 'top-4 left-4'
      } backdrop-blur-xl bg-black/30 border border-white/20 rounded-full px-4 py-2 shadow-lg`}
    >
      <div className="flex items-center gap-3">
        {/* Charging indicator */}
        {charging && (
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Zap 
              className="w-4 h-4 text-yellow-400" 
              fill="currentColor"
            />
          </motion.div>
        )}

        {/* Modern circular battery indicator */}
        <div className="relative">
          {/* Background circle */}
          <div className="w-8 h-8 rounded-full border-2 border-white/30" />
          
          {/* Battery fill with smooth animation */}
          <motion.div
            className={`absolute inset-0 rounded-full border-2 ${
              isCritical
                ? 'border-red-400 bg-red-400/20'
                : isLow
                ? 'border-orange-400 bg-orange-400/20'
                : 'border-green-400 bg-green-400/20'
            }`}
            style={{
              background: `conic-gradient(from 0deg, ${
                isCritical
                  ? '#f87171'
                  : isLow
                  ? '#fb923c'
                  : '#4ade80'
              } 0deg, ${
                isCritical
                  ? '#f87171'
                  : isLow
                  ? '#fb923c'
                  : '#4ade80'
              } ${batteryPercentage * 3.6}deg, transparent ${batteryPercentage * 3.6}deg)`,
            }}
            animate={charging ? {
              opacity: [0.6, 1, 0.6],
            } : {}}
            transition={{
              duration: 1.5,
              repeat: charging ? Infinity : 0,
              ease: "easeInOut"
            }}
          />
          
          {/* Center percentage */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-xs font-bold ${
              isCritical
                ? 'text-red-200'
                : isLow
                ? 'text-orange-200'
                : 'text-green-200'
            }`}>
              {batteryPercentage}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Debug helper function (can be called from console)
export function enableBatteryAPI() {
  const instructions = `
🔋 SAMSUNG TABLET BATTERY API TROUBLESHOOTING

Your Samsung tablet (SM-X205, Chrome 138, Android 14) might need these steps:

📱 METHOD 1: Enable Chrome Flags
1. Open Chrome and go to: chrome://flags
2. Search for "Experimental Web Platform Features" 
3. Set it to "ENABLED"
4. Restart Chrome

🔧 METHOD 2: Alternative URLs to try
• about://flags/#enable-experimental-web-platform-features
• chrome://flags/#enable-experimental-web-platform-features

⚡ METHOD 3: Force enable specific features
Search for these flags in chrome://flags:
• "Web Platform Features"
• "Battery Status API" (if available)
• "Device API"

🌐 METHOD 4: Check HTTPS requirement
• Battery API requires HTTPS in Chrome 103+
• Make sure you're accessing via HTTPS, not HTTP
• localhost is usually exempt from this requirement

🛠️ METHOD 5: Reset Chrome flags (if issues occur)
• Go to chrome://flags
• Click "Reset all to default"
• Restart Chrome

📋 METHOD 6: Check permissions
• Go to Settings > Site Settings > Additional permissions
• Look for "Battery" or "Device information"

🔍 METHOD 7: Test directly
Visit: https://googlechrome.github.io/samples/battery-status/
This is Google's official battery API test page

⚠️ NOTE: Some Samsung devices have manufacturer restrictions
on certain APIs for privacy/security reasons.

Try these methods in order and restart Chrome after each change.
  `
  
  console.log(instructions)
  return instructions
}

// Make it globally available for debugging
if (typeof window !== 'undefined') {
  (window as any).enableBatteryAPI = enableBatteryAPI
}