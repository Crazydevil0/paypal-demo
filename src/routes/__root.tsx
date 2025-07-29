import { createRootRoute, Outlet } from '@tanstack/react-router'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { TopRightIndicators } from '@/components/ui/TopRightIndicators'
import { HomeButton } from '@/components/ui/HomeButton'
import { FullscreenButton } from '@/components/ui/FullscreenButton'

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <Outlet />
        <TopRightIndicators />
        <HomeButton />
        <FullscreenButton />
      </div>
    </ThemeProvider>
  ),
}) 