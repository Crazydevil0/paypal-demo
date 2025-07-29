import { motion } from 'framer-motion'
import { Home } from 'lucide-react'
import { useNavigate, useLocation } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export function HomeButton() {
  const navigate = useNavigate()
  const location = useLocation()

  // Don't show on the welcome page (home)
  if (location.pathname === '/') {
    return null
  }

  const handleGoHome = () => {
    navigate({ to: '/' })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-4 left-4 z-50"
    >
      <Button
        onClick={handleGoHome}
        size="sm"
        variant="ghost"
        className="bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/40 backdrop-blur-sm"
        title="Voltar ao início"
      >
        <Home className="w-4 h-4" />
      </Button>
    </motion.div>
  )
}