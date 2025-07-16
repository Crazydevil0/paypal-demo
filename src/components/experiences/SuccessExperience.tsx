import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, ArrowRight, Trophy, Sparkles } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { useJourney } from '@/context/JourneyProvider'
import confetti from 'canvas-confetti'
import { MEDIA } from '@/lib/content'

export default function SuccessExperience() {
  const navigate = useNavigate()
  const { resetJourney } = useJourney()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleRestart = () => {
    resetJourney()
    navigate({ to: '/' })
  }

  useEffect(() => {
    // Trigger confetti animation
    const myCanvas = canvasRef.current
    if (myCanvas) {
      const myConfetti = confetti.create(myCanvas, { 
        resize: true, 
        useWorker: true 
      })
      
      // Multiple confetti bursts
      myConfetti({ 
        particleCount: 150, 
        spread: 90, 
        origin: { y: 0.6 } 
      })
      
      setTimeout(() => {
        myConfetti({ 
          particleCount: 100, 
          spread: 70, 
          origin: { y: 0.7, x: 0.3 } 
        })
      }, 500)
      
      setTimeout(() => {
        myConfetti({ 
          particleCount: 100, 
          spread: 70, 
          origin: { y: 0.7, x: 0.7 } 
        })
      }, 1000)
    }

    // Auto-restart after 15 seconds
    const autoRestartTimer = setTimeout(() => {
      handleRestart()
    }, 15000)

    return () => {
      clearTimeout(autoRestartTimer)
    }
  }, [])

  // Use solid PayPal background
  const successBackgroundStyle = {
    className: "relative min-h-screen overflow-hidden",
    style: { backgroundColor: '#003087' }
  }

  return (
    <div 
      className={successBackgroundStyle.className}
      style={successBackgroundStyle.style}
    >
      {/* Confetti Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      <div className="relative z-20 w-full max-w-4xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-screen">
        {/* Main Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-slate-900/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-left mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Missão<br />
              Cumprida.
            </h1>
          </motion.div>

          {/* Success Message Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-8"
          >
            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                  Sua história de{' '}
                  <span className="text-blue-600">sucesso</span>{' '}
                  está só começando!
                </h2>
                
                <Button
                  onClick={handleRestart}
                  variant="paypal-primary"
                  size="lg"
                  className="px-12 py-4 text-lg font-semibold"
                >
                  Recomeçar jornada
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Celebration Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="w-full"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={MEDIA.products.pay}
                alt="PayPal Payment Success" 
                className="w-full h-auto rounded-xl opacity-90"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 