import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import { JourneyProvider } from '@/context/JourneyProvider'
import { routeTree } from './routeTree.gen'
import { useEffect } from 'react'
import { initializeSyncService } from '@/lib/sync-service'
import { serviceWorkerManager } from '@/lib/service-worker'

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
  useEffect(() => {
    // Initialize sync service when app loads
    initializeSyncService(convex as any)
    
    // Service worker is initialized automatically via its constructor
    // but we can add network status monitoring here if needed
    const handleOnline = () => {
      console.log('[App] Network: Online')
    }
    
    const handleOffline = () => {
      console.log('[App] Network: Offline')
    }
    
    serviceWorkerManager.addNetworkListeners(handleOnline, handleOffline)
    
    return () => {
      serviceWorkerManager.removeNetworkListeners(handleOnline, handleOffline)
    }
  }, [])

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
