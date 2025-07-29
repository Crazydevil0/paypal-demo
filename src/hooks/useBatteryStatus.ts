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
    // Check if battery API is supported
    if (!('getBattery' in navigator)) {
      return
    }

    let battery: any = null

    const updateBatteryInfo = (batteryManager: any) => {
      setBatteryStatus({
        supported: true,
        level: batteryManager.level,
        charging: batteryManager.charging,
        chargingTime: batteryManager.chargingTime,
        dischargingTime: batteryManager.dischargingTime,
      })
    }

    const initBattery = async () => {
      try {
        battery = await (navigator as any).getBattery()
        updateBatteryInfo(battery)

        // Add event listeners for battery changes
        battery.addEventListener('levelchange', () => updateBatteryInfo(battery))
        battery.addEventListener('chargingchange', () => updateBatteryInfo(battery))
        battery.addEventListener('chargingtimechange', () => updateBatteryInfo(battery))
        battery.addEventListener('dischargingtimechange', () => updateBatteryInfo(battery))
      } catch (error) {
        console.warn('Battery Status API access denied or failed:', error)
      }
    }

    initBattery()

    return () => {
      if (battery) {
        battery.removeEventListener('levelchange', updateBatteryInfo)
        battery.removeEventListener('chargingchange', updateBatteryInfo) 
        battery.removeEventListener('chargingtimechange', updateBatteryInfo)
        battery.removeEventListener('dischargingtimechange', updateBatteryInfo)
      }
    }
  }, [])

  return batteryStatus
}