import { useState, useEffect } from 'react'

interface BatteryStatus {
  supported: boolean
  level: number | null           // 0.0 to 1.0
  charging: boolean | null
  chargingTime: number | null    // seconds
  dischargingTime: number | null // seconds
}

export function useBatteryStatus(): BatteryStatus {
  const [batteryStatus, setBatteryStatus] = useState<BatteryStatus>({
    supported: false,
    level: null,
    charging: null,
    chargingTime: null,
    dischargingTime: null,
  })

  useEffect(() => {
    // Wrap everything in a try-catch to prevent crashes
    try {
      // Basic checks
      if (!window || !navigator) {
        console.warn('🔋 Battery API: Window or navigator not available')
        return
      }

      if (!('getBattery' in navigator)) {
        console.warn('🔋 Battery API: navigator.getBattery() not available')
        return
      }

      // Check for secure context (required for Chrome 103+)
      const isSecureContext = window.isSecureContext || 
                             window.location.protocol === 'https:' || 
                             window.location.hostname === 'localhost'

      if (!isSecureContext) {
        console.warn('🔋 Battery API: Secure context required (HTTPS)')
        return
      }

      console.log('🔋 Battery API: Attempting to initialize...')

      let battery: any = null

      const updateBatteryInfo = (batteryManager: any) => {
        try {
          if (!batteryManager) {
            console.warn('🔋 Battery Manager is null')
            return
          }

          setBatteryStatus({
            supported: true,
            level: typeof batteryManager.level === 'number' ? batteryManager.level : null,
            charging: typeof batteryManager.charging === 'boolean' ? batteryManager.charging : null,
            chargingTime: typeof batteryManager.chargingTime === 'number' ? batteryManager.chargingTime : null,
            dischargingTime: typeof batteryManager.dischargingTime === 'number' ? batteryManager.dischargingTime : null,
          })

          console.log('🔋 Battery updated:', {
            level: batteryManager.level,
            charging: batteryManager.charging
          })
        } catch (error) {
          console.warn('🔋 Error updating battery info:', error)
        }
      }

      const initBattery = async () => {
        try {
          battery = await (navigator as any).getBattery()
          
          if (!battery) {
            console.warn('🔋 Battery API returned null')
            return
          }

          console.log('✅ Battery API: Successfully initialized')
          updateBatteryInfo(battery)

          // Add event listeners with error handling
          const safeAddListener = (event: string, handler: () => void) => {
            try {
              battery.addEventListener(event, handler)
            } catch (error) {
              console.warn(`🔋 Failed to add ${event} listener:`, error)
            }
          }

          safeAddListener('levelchange', () => updateBatteryInfo(battery))
          safeAddListener('chargingchange', () => updateBatteryInfo(battery))
          safeAddListener('chargingtimechange', () => updateBatteryInfo(battery))
          safeAddListener('dischargingtimechange', () => updateBatteryInfo(battery))

        } catch (error) {
          console.warn('🔋 Battery API initialization failed:', error)
          // Don't set any error state that might cause rendering issues
        }
      }

      initBattery()

      return () => {
        if (battery) {
          try {
            // Safe cleanup
            const events = ['levelchange', 'chargingchange', 'chargingtimechange', 'dischargingtimechange']
            events.forEach(event => {
              try {
                battery.removeEventListener(event, updateBatteryInfo)
              } catch (error) {
                // Ignore cleanup errors
              }
            })
          } catch (error) {
            // Ignore cleanup errors
          }
        }
      }
    } catch (error) {
      // Top-level error catch to prevent any crashes
      console.warn('🔋 Battery hook error:', error)
      return
    }
  }, [])

  return batteryStatus
}

// Export a function to get cache status
export const useCacheStatus = () => {
  const [cacheStatus, setCacheStatus] = useState<{
    cacheSize: number
    cachedAssets: string[]
    cachedVideos: string[]
    cachedStatic: string[]
    videoCacheSize: number
    assetCacheSize: number
    staticCacheSize: number
  } | null>(null)
  const [loading, setLoading] = useState(true)

  const updateCacheStatus = async () => {
    try {
      // Import the service worker manager
      const { serviceWorkerManager } = await import('@/lib/service-worker')
      const status = await serviceWorkerManager.getCacheStatus()
      setCacheStatus(status)
    } catch (error) {
      console.error('Failed to get cache status:', error)
      setCacheStatus(null)
    } finally {
      setLoading(false)
    }
  }

  const cacheVideos = async () => {
    try {
      const { serviceWorkerManager } = await import('@/lib/service-worker')
      await serviceWorkerManager.cacheVideos()
      // Refresh cache status after caching
      setTimeout(() => updateCacheStatus(), 1000)
    } catch (error) {
      console.error('Failed to cache videos:', error)
    }
  }

  useEffect(() => {
    updateCacheStatus()
  }, [])

  return {
    cacheStatus,
    loading,
    updateCacheStatus,
    cacheVideos
  }
}