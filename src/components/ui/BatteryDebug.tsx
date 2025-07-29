import { useBatteryStatus } from '@/hooks/useBatteryStatus'
import { useTabletOptimization } from '@/hooks/useTabletOptimization'

export function BatteryDebug() {
  const batteryStatus = useBatteryStatus()
  const { isTablet } = useTabletOptimization()

  // Always show debug info when this component is rendered
  return (
    <div className="fixed top-4 right-4 z-50 bg-black/80 text-white p-4 rounded-lg text-xs max-w-md">
      <h3 className="font-bold mb-2">🔋 Battery API Debug</h3>
      
      <div className="space-y-1">
        <div>✅ Tablet detected: {isTablet ? 'Yes' : 'No'}</div>
        <div>🔋 API supported: {batteryStatus.supported ? 'Yes' : 'No'}</div>
        {batteryStatus.level !== null && (
          <div>📊 Battery level: {Math.round(batteryStatus.level * 100)}%</div>
        )}
        {batteryStatus.charging !== null && (
          <div>⚡ Charging: {batteryStatus.charging ? 'Yes' : 'No'}</div>
        )}
      </div>

      {batteryStatus.debug && (
        <div className="mt-3 pt-3 border-t border-white/20">
          <div className="font-semibold mb-1">Technical Details:</div>
          <div>🌐 getBattery exists: {batteryStatus.debug.navigatorBatteryExists ? 'Yes' : 'No'}</div>
          <div>🔒 Secure context: {batteryStatus.debug.isSecureContext ? 'Yes' : 'No'}</div>
          <div>📱 Protocol: {batteryStatus.debug.protocol}</div>
          <div>🤖 Android: {batteryStatus.debug.isAndroid ? 'Yes' : 'No'}</div>
          <div>📱 Samsung: {batteryStatus.debug.isSamsung ? 'Yes' : 'No'}</div>
          <div>🌐 Chrome version: {batteryStatus.debug.chromeVersion || 'Unknown'}</div>
          
          {batteryStatus.debug.errors.length > 0 && (
            <div className="mt-2">
              <div className="font-semibold text-red-400">❌ Errors:</div>
              {batteryStatus.debug.errors.map((error, index) => (
                <div key={index} className="text-red-300">{error}</div>
              ))}
            </div>
          )}
          
          <div className="mt-2 text-xs opacity-75">
            UA: {batteryStatus.debug.userAgent.substring(0, 50)}...
          </div>
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-white/20 text-xs opacity-75">
        Open browser console (F12) for detailed logs
      </div>
    </div>
  )
}