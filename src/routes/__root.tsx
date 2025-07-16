import { createRootRoute, Outlet } from '@tanstack/react-router'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { OfflineIndicator } from '@/components/ui/OfflineIndicator'

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <Outlet />
        <OfflineIndicator />
      </div>
    </ThemeProvider>
  ),
}) 