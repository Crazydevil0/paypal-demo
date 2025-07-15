import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { HelperProvider } from '@/context/HelperProvider'
import HelperPopover from '@/components/ui/HelperPopover'

function RootLayout() {
  return (
    <div className="min-h-screen relative">
      <Outlet />
      <HelperPopover />
    </div>
  )
}

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider>
      <HelperProvider>
        <RootLayout />
        <TanStackRouterDevtools />
      </HelperProvider>
    </ThemeProvider>
  ),
}) 