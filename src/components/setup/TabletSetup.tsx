import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Tablet,
  CheckCircle2,
  AlertCircle,
  Wifi,
  WifiOff
} from 'lucide-react'
import { offlineStorage, type TabletInfo } from '@/lib/offline-storage'
import { getSyncService } from '@/lib/sync-service'

interface TabletSetupProps {
  onSetupComplete: () => void
}

export default function TabletSetup({ onSetupComplete }: TabletSetupProps) {
  const [tabletName, setTabletName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [existingTablet, setExistingTablet] = useState<TabletInfo | null>(null)
  const [tabletId, setTabletId] = useState<string>('')
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    // Check for existing tablet setup
    const checkExistingTablet = async () => {
      const tablet = await offlineStorage.getTabletInfo()
      const currentTabletId = await offlineStorage.getTabletId()
      
      setExistingTablet(tablet)
      setTabletId(currentTabletId)
      
      if (tablet?.name) {
        setTabletName(tablet.name)
      }
    }

    checkExistingTablet()

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleSetup = async () => {
    setIsLoading(true)
    
    try {
      const currentTabletId = await offlineStorage.getTabletId()
      
      const tabletInfo: TabletInfo = {
        tabletId: currentTabletId,
        name: tabletName || undefined,
        createdAt: new Date(),
        lastActiveAt: new Date(),
      }

      // Save to offline storage
      await offlineStorage.setTabletInfo(tabletInfo)

      // Try to register with Convex if online
      if (isOnline) {
        const syncService = getSyncService()
        if (syncService) {
          try {
            await syncService.ensureTabletRegistered()
          } catch (error) {
            console.warn('Failed to register online, will sync later:', error)
          }
        }
      }

      onSetupComplete()
    } catch (error) {
      console.error('Failed to setup tablet:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleContinue = () => {
    onSetupComplete()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Tablet className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {existingTablet ? 'Tablet Configurado' : 'Configuração do Tablet'}
            </CardTitle>
            <p className="text-gray-600 mt-2">
              {existingTablet 
                ? 'Seu tablet está pronto para demonstrações' 
                : 'Configure seu tablet para começar as demonstrações'
              }
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Connection Status */}
            <div className={`flex items-center gap-2 p-3 rounded-lg ${
              isOnline ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'
            }`}>
              {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              <span className="text-sm font-medium">
                {isOnline ? 'Online - dados serão sincronizados' : 'Offline - dados salvos localmente'}
              </span>
            </div>

            {/* Tablet ID Display */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <Label className="text-xs text-gray-500 uppercase tracking-wide">
                ID do Tablet
              </Label>
              <p className="text-sm font-mono text-gray-700 mt-1 break-all">
                {tabletId}
              </p>
            </div>

            {existingTablet ? (
              /* Existing Tablet Display */
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">
                      {existingTablet.name || 'Tablet sem nome'}
                    </p>
                    <p className="text-sm text-green-700">Configurado e pronto</p>
                  </div>
                </div>

                <Button 
                  onClick={handleContinue}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Iniciar Demonstrações
                </Button>

                <Button 
                  variant="outline" 
                  onClick={() => setExistingTablet(null)}
                  className="w-full"
                >
                  Alterar Configuração
                </Button>
              </div>
            ) : (
              /* Setup Form */
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Nome do Tablet (opcional)
                  </Label>
                  <Input
                    id="name"
                    value={tabletName}
                    onChange={(e) => setTabletName(e.target.value)}
                    placeholder="Ex: Tablet Vendas 01, Loja Centro..."
                  />
                  <p className="text-xs text-gray-500">
                    Ajuda a identificar este tablet nos relatórios
                  </p>
                </div>

                <Button 
                  onClick={handleSetup}
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isLoading ? 'Configurando...' : 'Configurar Tablet'}
                </Button>
              </div>
            )}

            {!isOnline && (
              <div className="flex items-start gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-orange-800">
                  <p className="font-medium">Modo Offline</p>
                  <p>Demonstrações serão salvas localmente e sincronizadas quando conectar à internet.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
} 