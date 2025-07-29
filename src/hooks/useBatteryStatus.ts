import { useState, useEffect } from 'react'

interface BatteryStatus {
  supported: boolean
  level: number | null           // 0.0 to 1.0
  charging: boolean | null
  chargingTime: number | null    // seconds
  dischargingTime: number | null // seconds
  debug?: {
    navigatorBatteryExists: boolean
    isSecureContext: boolean
    protocol: string
    userAgent: string
    isAndroid: boolean
    isSamsung: boolean
    chromeVersion: number | null
    errors: string[]
  }
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
    const debug = {
      navigatorBatteryExists: 'getBattery' in navigator,
      isSecureContext: window.isSecureContext || window.location.protocol === 'https:' || window.location.hostname === 'localhost',
      protocol: window.location.protocol,
      userAgent: navigator.userAgent,
      isAndroid: /Android/i.test(navigator.userAgent),
      isSamsung: /Samsung/i.test(navigator.userAgent) || /SM-/i.test(navigator.userAgent),
      chromeVersion: null as number | null,
      errors: [] as string[]
    }

    // Extract Chrome version
    const chromeMatch = navigator.userAgent.match(/Chrome\/(\d+)/)
    if (chromeMatch) {
      debug.chromeVersion = parseInt(chromeMatch[1], 10)
    }

    // Log detailed debug information for troubleshooting
    console.log('🔋 Battery API Debug Info:', {
      batteryApiExists: debug.navigatorBatteryExists,
      isSecureContext: debug.isSecureContext,
      protocol: debug.protocol,
      hostname: window.location.hostname,
      isAndroid: debug.isAndroid,
      isSamsung: debug.isSamsung,
      chromeVersion: debug.chromeVersion,
      userAgent: debug.userAgent.substring(0, 100) + '...'
    })

    // Check basic requirements
    if (!debug.navigatorBatteryExists) {
      debug.errors.push('navigator.getBattery() not available')
      console.warn('❌ Battery API: navigator.getBattery() not available')
      setBatteryStatus(prev => ({ ...prev, debug }))
      return
    }

    if (!debug.isSecureContext) {
      debug.errors.push('Not in secure context (HTTPS required)')
      console.warn('❌ Battery API: Secure context required (HTTPS)')
      setBatteryStatus(prev => ({ ...prev, debug }))
      return
    }

    // Chrome 103+ requirement for secure context
    if (debug.chromeVersion && debug.chromeVersion < 103) {
      debug.errors.push(`Chrome version ${debug.chromeVersion} too old (103+ required for secure context)`)
      console.warn(`❌ Battery API: Chrome ${debug.chromeVersion} too old for secure context requirement`)
      setBatteryStatus(prev => ({ ...prev, debug }))
      return
    }

    let battery: any = null

    const updateBatteryInfo = (batteryManager: any) => {
      console.log('🔋 Battery Manager:', {
        level: batteryManager.level,
        charging: batteryManager.charging,
        chargingTime: batteryManager.chargingTime,
        dischargingTime: batteryManager.dischargingTime
      })

      setBatteryStatus({
        supported: true,
        level: batteryManager.level,
        charging: batteryManager.charging,
        chargingTime: batteryManager.chargingTime,
        dischargingTime: batteryManager.dischargingTime,
        debug
      })
    }

    const initBattery = async () => {
      try {
        console.log('🔋 Attempting to get battery...')
        battery = await (navigator as any).getBattery()
        console.log('✅ Battery API: Successfully got battery manager', battery)
        updateBatteryInfo(battery)

        // Add event listeners for battery changes
        battery.addEventListener('levelchange', () => {
          console.log('🔋 Battery level changed:', battery.level)
          updateBatteryInfo(battery)
        })
        battery.addEventListener('chargingchange', () => {
          console.log('🔋 Charging state changed:', battery.charging)
          updateBatteryInfo(battery)
        })
        battery.addEventListener('chargingtimechange', () => {
          console.log('🔋 Charging time changed:', battery.chargingTime)
          updateBatteryInfo(battery)
        })
        battery.addEventListener('dischargingtimechange', () => {
          console.log('🔋 Discharging time changed:', battery.dischargingTime)
          updateBatteryInfo(battery)
        })

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error)
        debug.errors.push(`getBattery() failed: ${errorMessage}`)
        console.error('❌ Battery API failed:', error)
        console.log('🔍 This might be due to:')
        console.log('  - Device/browser permissions')
        console.log('  - Samsung-specific restrictions')
        console.log('  - Network/security policies')
        console.log('  - Try accessing via HTTPS if on HTTP')
        
        setBatteryStatus(prev => ({ ...prev, debug }))
      }
    }

    initBattery()

    return () => {
      if (battery) {
        try {
          battery.removeEventListener('levelchange', updateBatteryInfo)
          battery.removeEventListener('chargingchange', updateBatteryInfo) 
          battery.removeEventListener('chargingtimechange', updateBatteryInfo)
          battery.removeEventListener('dischargingtimechange', updateBatteryInfo)
        } catch (error) {
          console.warn('Error removing battery event listeners:', error)
        }
      }
    }
  }, [])

  return batteryStatus
}