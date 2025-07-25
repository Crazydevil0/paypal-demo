import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { SOLUTIONS_CONTENT } from '@/lib/content'
import { useBackground } from '@/hooks/useBackground'

export default function PPCPVideoExperience() {
  const navigate = useNavigate()
  const { getBackgroundStyle, isGradientBackground } = useBackground()
  const videoRef = useRef<HTMLVideoElement>(null)
  
  // Get video data from content
  const ppcpData = SOLUTIONS_CONTENT.solutions['complete-payments']
  const checkoutVideo = ppcpData.media.checkoutVideo

  useEffect(() => {
    // Auto-play the video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(console.error)
    }
  }, [])

  const handleVideoEnd = () => {
    navigate({ to: '/ppcp-benefits' })
  }

  const handleContinue = () => {
    navigate({ to: '/ppcp-benefits' })
  }

  const backgroundStyle = getBackgroundStyle()

  return (
    <div 
      className={backgroundStyle.className}
      style={backgroundStyle.style}
    >
      {/* Animated Background */}
      {isGradientBackground() && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-1440 mx-auto px-4 md:px-8 xl:px-16 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Title */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Veja como funciona na prática
            </h2>
            <p className="text-xl text-blue-300">
              Experiência completa do checkout PayPal
            </p>
          </motion.div>

          {/* Video Container */}
          <motion.div
            className="flex justify-center w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <video
              ref={videoRef}
              className="max-w-[95vw] max-h-[85vh] w-auto h-auto rounded-2xl shadow-2xl border border-white/10"
              controls
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
              key="ppcp-video"
            >
              <source src={checkoutVideo} type="video/mp4" />
              Seu navegador não suporta o elemento de vídeo.
            </video>
          </motion.div>

          {/* Continue Button */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Button
              onClick={handleContinue}
              variant="paypal-primary"
              className="group"
            >
              Continuar para benefícios
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 