import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Cloud, 
  CloudOff, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Clock,
  Database,
  Wifi,
  WifiOff
} from 'lucide-react'
import { getSyncService } from '@/lib/sync-service'
import { offlineStorage } from '@/lib/offline-storage'

export default function SyncStatus() {
  const [syncStatus, setSyncStatus] = useState({
    isOnline: false,
    syncInProgress: false,
    pendingSync: 0,
    failedSync: 0,
    lastSync: null as Date | null,
    tabletRegistered: false,
  })
  const [isManualSyncing, setIsManualSyncing] = useState(false)
  const [syncMessage, setSyncMessage] = useState('')

  const updateSyncStatus = async () => {
    const syncService = getSyncService()
    if (syncService) {
      const status = await syncService.getSyncStatus()
      setSyncStatus(status)
    }
  }

  useEffect(() => {
    updateSyncStatus()
    
    // Update status every 30 seconds
    const interval = setInterval(updateSyncStatus, 30000)
    
    // Listen for online/offline events
    const handleOnline = () => updateSyncStatus()
    const handleOffline = () => updateSyncStatus()
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleManualSync = async () => {
    const syncService = getSyncService()
    if (!syncService) return

    setIsManualSyncing(true)
    setSyncMessage('')

    try {
      const result = await syncService.manualSync()
      setSyncMessage(result.message)
      await updateSyncStatus()
    } catch (error) {
      setSyncMessage('Erro ao sincronizar. Tente novamente.')
    } finally {
      setIsManualSyncing(false)
    }
  }

  const getStatusColor = () => {
    if (!syncStatus.isOnline) return 'text-orange-600'
    if (syncStatus.syncInProgress) return 'text-blue-600'
    if (syncStatus.failedSync > 0) return 'text-red-600'
    if (syncStatus.pendingSync > 0) return 'text-yellow-600'
    return 'text-green-600'
  }

  const getStatusIcon = () => {
    if (!syncStatus.isOnline) return <WifiOff className="w-4 h-4" />
    if (syncStatus.syncInProgress || isManualSyncing) return <RefreshCw className="w-4 h-4 animate-spin" />
    if (syncStatus.failedSync > 0) return <AlertCircle className="w-4 h-4" />
    if (syncStatus.pendingSync > 0) return <Clock className="w-4 h-4" />
    return <CheckCircle2 className="w-4 h-4" />
  }

  const getStatusText = () => {
    if (!syncStatus.isOnline) return 'Offline'
    if (syncStatus.syncInProgress || isManualSyncing) return 'Sincronizando...'
    if (syncStatus.failedSync > 0) return `${syncStatus.failedSync} falhas`
    if (syncStatus.pendingSync > 0) return `${syncStatus.pendingSync} pendentes`
    return 'Sincronizado'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-4 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 ${getStatusColor()}`}>
            {getStatusIcon()}
            <span className="text-sm font-medium">{getStatusText()}</span>
          </div>
          
          <div className="flex gap-2">
            {syncStatus.pendingSync > 0 && (
              <Badge variant="outline" className="text-xs">
                {syncStatus.pendingSync} pendentes
              </Badge>
            )}
            {syncStatus.failedSync > 0 && (
              <Badge variant="destructive" className="text-xs">
                {syncStatus.failedSync} falhas
              </Badge>
            )}
            {!syncStatus.tabletRegistered && syncStatus.isOnline && (
              <Badge variant="secondary" className="text-xs">
                Registrando...
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {syncStatus.lastSync && (
            <span className="text-xs text-gray-500">
              Última: {syncStatus.lastSync.toLocaleTimeString()}
            </span>
          )}
          
          <Button
            size="sm"
            variant="outline"
            onClick={handleManualSync}
            disabled={!syncStatus.isOnline || isManualSyncing || syncStatus.syncInProgress}
            className="h-8 px-3"
          >
            {isManualSyncing ? (
              <RefreshCw className="w-3 h-3 animate-spin" />
            ) : (
              <Cloud className="w-3 h-3" />
            )}
            <span className="ml-1 text-xs">Sync</span>
          </Button>
        </div>
      </div>

      {syncMessage && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800"
        >
          {syncMessage}
        </motion.div>
      )}

      {!syncStatus.isOnline && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded text-sm text-orange-800"
        >
          <div className="flex items-center gap-2">
            <Database className="w-3 h-3" />
            <span>Dados salvos localmente. Sincronização automática quando conectar.</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
} 