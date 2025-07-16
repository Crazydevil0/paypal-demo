import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import { JourneyProvider } from '@/context/JourneyProvider'
import { routeTree } from './routeTree.gen'
import { useEffect, useState, lazy, Suspense } from 'react'
import { initializeSyncService } from '@/lib/sync-service'

// Create Convex client
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL!)

// Create router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function AppContent() {
  const [tabletSetup, setTabletSetup] = useState<boolean | null>(null)

  useEffect(() => {
    // Initialize sync service when app loads
    initializeSyncService(convex)
    
    // Check if tablet is already set up
    const checkTabletSetup = async () => {
      const { offlineStorage } = await import('@/lib/offline-storage')
      const tablet = await offlineStorage.getTabletInfo()
      setTabletSetup(!!tablet)
    }
    
    checkTabletSetup()
  }, [])

  // Show loading while checking setup
  if (tabletSetup === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  // Show setup if tablet is not configured
  if (!tabletSetup) {
    const TabletSetup = lazy(() => import('@/components/setup/TabletSetup'))
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando configuração...</p>
          </div>
        </div>
      }>
        <TabletSetup onSetupComplete={() => setTabletSetup(true)} />
      </Suspense>
    )
  }

  return (
    <JourneyProvider>
      <RouterProvider router={router} />
    </JourneyProvider>
  )
}

function App() {
  return (
    <ConvexProvider client={convex}>
      <AppContent />
    </ConvexProvider>
  )
}

export default App
