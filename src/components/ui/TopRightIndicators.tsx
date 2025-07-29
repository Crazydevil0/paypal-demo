import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WifiOff, Wifi, HardDrive } from 'lucide-react'
import { serviceWorkerManager, type CacheStatus } from '@/lib/service-worker'
import { BatteryIndicator } from './BatteryIndicator'
import { useBatteryStatus } from '@/hooks/useBatteryStatus'
import { useTabletOptimization } from '@/hooks/useTabletOptimization'

export function TopRightIndicators() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [cacheStatus, setCacheStatus] = useState<CacheStatus | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const { supported: batterySupported } = useBatteryStatus()
  const { isTablet } = useTabletOptimization()

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    serviceWorkerManager.addNetworkListeners(handleOnline, handleOffline)
    
    // Get initial cache status
    serviceWorkerManager.getCacheStatus().then(setCacheStatus)

    return () => {
      serviceWorkerManager.removeNetworkListeners(handleOnline, handleOffline)
    }
  }, [])

  // Auto-hide after 3 seconds when online
  useEffect(() => {
    if (isOnline && showDetails) {
      const timer = setTimeout(() => setShowDetails(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isOnline, showDetails])

  const handleClick = () => {
    setShowDetails(!showDetails)
    if (!cacheStatus) {
      serviceWorkerManager.getCacheStatus().then(setCacheStatus)
    }
  }

  const showBattery = isTablet && batterySupported
  // Always show online status when online, or show offline when offline
  const showOffline = true // Show online status for demonstration

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center gap-3">
        {/* Battery Indicator - Left side */}
        {showBattery && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <BatteryIndicator />
          </motion.div>
        )}

        {/* Offline Indicator - Right side */}
        <AnimatePresence>
          {showOffline && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden"
            >
              {/* Main Status */}
              <div 
                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-white/5 transition-colors"
                onClick={handleClick}
              >
                {isOnline ? (
                  <Wifi className="w-4 h-4 text-green-400" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-400" />
                )}
                <span className="text-sm font-medium text-white">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>

              {/* Cache Details */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="border-t border-white/10"
                  >
                    <div className="px-3 py-2 bg-white/5">
                      <div className="flex items-center gap-2 mb-1">
                        <HardDrive className="w-3 h-3 text-blue-400" />
                        <span className="text-xs text-white/80">Cache Status</span>
                      </div>
                      {cacheStatus ? (
                        <div className="text-xs text-white/60">
                          {cacheStatus.cacheSize} assets cached
                        </div>
                      ) : (
                        <div className="text-xs text-white/60">
                          Loading cache info...
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}