import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Trophy,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Star,
  Rocket,
  Heart,
  RefreshCw
} from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { useJourney } from '@/context/JourneyProvider'
import confetti from 'canvas-confetti'
import { GradientHighlight } from '@/components/ui/GradientHighlight'
import { useBackground } from '@/hooks/useBackground'

export default function SuccessExperience() {
  const navigate = useNavigate()
  const { resetJourney } = useJourney()
  const { getBackgroundStyle, isGradientBackground } = useBackground()
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

  // Use emerald celebration background for success page, but respect solid background setting
  const successBackgroundStyle = isGradientBackground() 
    ? {
        className: "relative min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 overflow-hidden",
        style: {}
      }
    : {
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

      {/* Animated Background */}
      {isGradientBackground() && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>
      )}

      <div className="relative z-20 w-full max-w-1440 mx-auto px-4 md:px-8 xl:px-16 py-12 flex flex-col items-center justify-center min-h-screen">
        {/* Main Success Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <Trophy className="w-8 h-8 text-yellow-500 animate-bounce" />
            <Badge className="text-xl px-6 py-3 bg-emerald-500/20 text-emerald-200 border-emerald-500/30">
              Missão Cumprida
            </Badge>
            <Trophy className="w-8 h-8 text-yellow-500 animate-bounce" />
          </div>
          
          <motion.h1
            className="text-6xl md:text-8xl font-extrabold text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Missão
            <br />
            <GradientHighlight>Cumprida.</GradientHighlight>
          </motion.h1>
        </motion.div>

        {/* Success Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-full mb-8"
        >
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
            <CardContent className="text-center py-12">
              <div className="flex items-center justify-center gap-4 mb-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
                <Heart className="w-10 h-10 text-red-500 animate-pulse" />
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                Sua história de{' '}
                <span className="text-emerald-600">sucesso</span>{' '}
                está só começando!
              </h2>
              
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Obrigado por conhecer as soluções PayPal. Em breve, nossos especialistas entrarão em contato para ajudar você a transformar seu negócio.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                    <Rocket className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Próximos Passos</h3>
                  <p className="text-sm text-slate-600">Demonstração personalizada em até 24h</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Star className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Benefício Exclusivo</h3>
                  <p className="text-sm text-slate-600">Sem taxa de setup para novos clientes</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Suporte Dedicado</h3>
                  <p className="text-sm text-slate-600">Acompanhamento durante implementação</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Restart Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center"
        >
          <Button
            onClick={handleRestart}
            variant="paypal-primary"
          >
            <RefreshCw className="mr-3 w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
            Recomeçar jornada
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <p className="text-white/70 mt-4 text-sm">
            Reinício automático em 15 segundos
          </p>
        </motion.div>

        {/* Celebration Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-3xl blur-xl"></div>
            <img 
              src="/src/assets/pay.jpg" 
              alt="Celebration" 
              className="relative w-full h-auto rounded-3xl shadow-2xl border border-white/20"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
} 