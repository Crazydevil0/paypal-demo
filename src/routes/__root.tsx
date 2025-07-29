import { createRootRoute, Outlet } from '@tanstack/react-router'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { OfflineIndicator } from '@/components/ui/OfflineIndicator'
import { BatteryIndicator } from '@/components/ui/BatteryIndicator'
import { BatteryDebug } from '@/components/ui/BatteryDebug'

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <Outlet />
        <OfflineIndicator />
        <BatteryIndicator />
        <BatteryDebug />
      </div>
    </ThemeProvider>
  ),
}) 