import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Cloud, 
  Check, 
  AlertTriangle, 
  RotateCcw,
  Database
} from "lucide-react"
import { motion } from "framer-motion"
import { syncService } from "@/lib/sync-service"

interface SyncStatusProps {
  className?: string
}

export function SyncStatus({ className }: SyncStatusProps) {
  const [syncStatus, setSyncStatus] = useState<'synced' | 'pending' | 'error' | 'offline' | 'syncing'>('offline')
  const [pendingCount, setPendingCount] = useState(0)
  const [lastSync, setLastSync] = useState<Date | null>(null)
  const [isOnline, setIsOnline] = useState(navigator.onLine !== false)

  // Check sync status periodically
  useEffect(() => {
    const checkStatus = () => {
      const status = syncService.getSyncStatus()
      const pending = syncService.getPendingCount()
      const online = syncService.isConnected()
      
      setSyncStatus(status)
      setPendingCount(pending)
      setIsOnline(online)
    }

    // Check immediately
    checkStatus()

    // Check every 5 seconds
    const interval = setInterval(checkStatus, 5000)

    // Listen for network changes
    window.addEventListener('online', checkStatus)
    window.addEventListener('offline', checkStatus)

    return () => {
      clearInterval(interval)
      window.removeEventListener('online', checkStatus)
      window.removeEventListener('offline', checkStatus)
    }
  }, [])

  const handleForceSync = async () => {
    await syncService.forcSync()
  }

  const getStatusBadge = () => {
    if (!isOnline) {
      return <Badge variant="destructive" className="gap-1">
        <AlertTriangle className="h-3 w-3" />
        Offline
      </Badge>
    }

    switch (syncStatus) {
      case 'synced':
        return <Badge variant="default" className="gap-1 bg-green-600">
          <Check className="h-3 w-3" />
          Sincronizado
        </Badge>
      case 'pending':
        return <Badge variant="secondary" className="gap-1">
          <Cloud className="h-3 w-3" />
          Pendente ({pendingCount})
        </Badge>
      case 'error':
        return <Badge variant="destructive" className="gap-1">
          <AlertTriangle className="h-3 w-3" />
          Erro
        </Badge>
      default:
        return <Badge variant="outline" className="gap-1">
          <Database className="h-3 w-3" />
          Verificando...
        </Badge>
    }
  }

  return (
    <Card className={`w-full ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">Status da Sincronização</span>
              {getStatusBadge()}
            </div>
          </div>
          
          {isOnline && (syncStatus === 'pending' || syncStatus === 'error') && (
            <Button
              onClick={handleForceSync}
              size="sm"
              variant="outline"
              className="gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              Sincronizar
            </Button>
          )}
        </div>
        
        {lastSync && (
          <div className="mt-2 text-xs text-muted-foreground">
            Última sincronização: {lastSync.toLocaleString()}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 