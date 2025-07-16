import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import { JourneyProvider } from '@/context/JourneyProvider'
import { routeTree } from './routeTree.gen'
import { useEffect } from 'react'
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
  useEffect(() => {
    // Initialize sync service when app loads
    initializeSyncService(convex as any)
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
