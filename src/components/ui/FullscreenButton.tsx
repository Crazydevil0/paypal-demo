import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize, Minimize } from 'lucide-react'
import { useLocation } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const checkFullscreen = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    // Listen for fullscreen changes
    document.addEventListener('fullscreenchange', checkFullscreen)
    document.addEventListener('webkitfullscreenchange', checkFullscreen)
    document.addEventListener('mozfullscreenchange', checkFullscreen)
    document.addEventListener('msfullscreenchange', checkFullscreen)

    // Check initial state
    checkFullscreen()

    return () => {
      document.removeEventListener('fullscreenchange', checkFullscreen)
      document.removeEventListener('webkitfullscreenchange', checkFullscreen)
      document.removeEventListener('mozfullscreenchange', checkFullscreen)
      document.removeEventListener('msfullscreenchange', checkFullscreen)
    }
  }, [])

  const handleFullscreen = async () => {
    try {
      if (isFullscreen) {
        // Exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen()
        } else if ((document as any).mozCancelFullScreen) {
          await (document as any).mozCancelFullScreen()
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen()
        }
      } else {
        // Enter fullscreen
        const element = document.documentElement
        if (element.requestFullscreen) {
          await element.requestFullscreen()
        } else if ((element as any).webkitRequestFullscreen) {
          await (element as any).webkitRequestFullscreen()
        } else if ((element as any).mozRequestFullScreen) {
          await (element as any).mozRequestFullScreen()
        } else if ((element as any).msRequestFullscreen) {
          await (element as any).msRequestFullscreen()
        }
      }
    } catch (error) {
      console.log('Fullscreen operation failed:', error)
    }
  }

  // Position based on page - avoid home button and battery indicator
  const isWelcomePage = location.pathname === '/'
  const buttonPosition = isWelcomePage 
    ? 'top-4 left-4'  // Welcome page: top-left (same as existing)
    : 'top-4 left-16' // Other pages: next to home button

  return (
    <AnimatePresence>
      {!isFullscreen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, delay: isWelcomePage ? 1.5 : 0.4 }}
          className={`fixed ${buttonPosition} z-50`}
        >
          <Button
            onClick={handleFullscreen}
            size="sm"
            variant="ghost"
            className="bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/40 backdrop-blur-sm"
            title={isFullscreen ? "Sair da tela cheia" : "Entrar em tela cheia"}
          >
            {isFullscreen ? (
              <Minimize className="w-4 h-4" />
            ) : (
              <Maximize className="w-4 h-4" />
            )}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}