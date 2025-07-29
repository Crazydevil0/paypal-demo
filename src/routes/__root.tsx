import { createRootRoute, Outlet } from '@tanstack/react-router'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { JourneyProvider } from '@/context/JourneyProvider'
import { TopRightIndicators } from '@/components/ui/TopRightIndicators'
import { HomeButton } from '@/components/ui/HomeButton'

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider>
      <JourneyProvider>
        <div className="min-h-screen bg-background">
          <TopRightIndicators />
          <HomeButton />
          <Outlet />
        </div>
      </JourneyProvider>
    </ThemeProvider>
  ),
}) 