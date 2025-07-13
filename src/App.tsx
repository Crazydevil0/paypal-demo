import { RouterProvider, createRouter } from '@tanstack/react-router'
import { JourneyProvider } from '@/context/JourneyProvider'
import { routeTree } from './routeTree.gen'

// Create router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  return (
    <JourneyProvider>
      <RouterProvider router={router} />
    </JourneyProvider>
  )
}

export default App
