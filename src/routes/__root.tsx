import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ThemeProvider } from '@/providers/ThemeProvider'

function RootLayout() {
  return (
    <div className="min-h-screen relative">
      <Outlet />
    </div>
  )
}

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider>
      <RootLayout />
      <TanStackRouterDevtools />
    </ThemeProvider>
  ),
}) 