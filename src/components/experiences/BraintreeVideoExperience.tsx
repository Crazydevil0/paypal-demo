import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { SOLUTIONS_CONTENT } from '@/lib/content'
import { useBackground } from '@/hooks/useBackground'

export default function BraintreeVideoExperience() {
  const navigate = useNavigate()
  const { videoType } = useParams({ from: '/braintree-video/$videoType' })
  const { getBackgroundStyle, isGradientBackground } = useBackground()
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const [watchedVideos, setWatchedVideos] = useState<Set<string>>(new Set())
  
  // Get video data from content
  const braintreeData = SOLUTIONS_CONTENT.solutions.braintree
  const media = braintreeData.media
  
  // Current video info
  const currentVideoData = videoType === 'customer' 
    ? { 
        title: 'Experiência do Cliente', 
        src: media.dccVideo,
        description: 'Veja como seus clientes vivenciam um checkout rápido e seguro'
      }
    : { 
        title: 'Dashboard do Comerciante', 
        src: media.dashboardVideo,
        description: 'Descubra as ferramentas de gestão e análise disponíveis'
      }
  
  // Other video info
  const otherVideoType = videoType === 'customer' ? 'merchant' : 'customer'
  const otherVideoTitle = otherVideoType === 'customer' ? 'Experiência do Cliente' : 'Dashboard do Comerciante'

  useEffect(() => {
    // Auto-play the video when component mounts
    if (videoRef.current) {
      videoRef.current.load() // Force reload to show new video
    }
  }, [videoType])

  const handleVideoEnd = () => {
    const newWatchedVideos = new Set(watchedVideos)
    newWatchedVideos.add(videoType)
    setWatchedVideos(newWatchedVideos)
    
    // If both videos have been watched, go to benefits
    if (newWatchedVideos.size === 2) {
      navigate({ to: '/braintree-benefits' })
    }
  }

  const handleContinue = () => {
    navigate({ to: '/braintree-benefits' })
  }

  const handleSwitchVideo = () => {
    navigate({ to: `/braintree-video/${otherVideoType}` })
  }

  // Check if both videos have been watched
  const otherVideoWatched = watchedVideos.has(otherVideoType)

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

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 xl:px-16 py-12">
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
              {currentVideoData.title}
            </h2>
            <p className="text-xl text-gray-300">
              {currentVideoData.description}
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
              key={videoType} // Force re-render when video type changes
              ref={videoRef}
              className="max-w-[95vw] max-h-[85vh] w-auto h-auto rounded-2xl shadow-2xl border border-white/10"
              controls
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
            >
              <source src={currentVideoData.src} type="video/mp4" />
              Seu navegador não suporta o elemento de vídeo.
            </video>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Button
              onClick={handleSwitchVideo}
              variant="ghost"
              className="border border-white/30 text-white hover:bg-white/10 hover:border-white/50 hover:text-white"
            >
              {otherVideoWatched ? 'Ver novamente: ' : 'Próximo: '}{otherVideoTitle}
            </Button>

            <Button
              onClick={handleContinue}
              variant="paypal-primary"
              className="group"
            >
              Continuar
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 