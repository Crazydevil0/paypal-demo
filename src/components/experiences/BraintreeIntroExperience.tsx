import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  ArrowRight, 
  Play,
  Users,
  BarChart3
} from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { GradientHighlight } from '@/components/ui/GradientHighlight'
import { SOLUTIONS_CONTENT } from '@/lib/content'
import { useJourney } from '@/context/JourneyProvider'
import { useBackground } from '@/hooks/useBackground'

export default function BraintreeIntroExperience() {
  const navigate = useNavigate()
  const { updateData } = useJourney()
  const { getBackgroundStyle } = useBackground()
  const [selectedVideoType, setSelectedVideoType] = useState<'customer' | 'merchant' | null>(null)

  const braintreeData = SOLUTIONS_CONTENT.solutions.braintree
  const braintreeFeatures = braintreeData.mainBenefits

  useEffect(() => {
    updateData({ solution: 'braintree' })
  }, [updateData])

  const handleContinue = () => {
    navigate({ to: '/braintree-benefits' })
  }

  const handleVideoSelect = (videoType: 'customer' | 'merchant') => {
    setSelectedVideoType(videoType)
    navigate({ to: `/braintree-video/${videoType}` })
  }

  const backgroundStyle = getBackgroundStyle()

  return (
    <div 
      className={backgroundStyle.className}
      style={backgroundStyle.style}
    >
      <div className="relative z-10 w-full max-w-1440 mx-auto px-4 md:px-8 xl:px-16 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Com o <GradientHighlight>Paypal Braintree</GradientHighlight>:
          </h1>
        </motion.div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {braintreeFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="py-3 relative overflow-visible cursor-pointer transition-all duration-500 border-2 h-full border-white/10 hover:border-blue-400/50 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:scale-105">
                <CardContent className="relative z-10 p-4">
                  {/* Icon and title only */}
                  <div className="flex items-center gap-4">
                    <img src={feature.icon} alt={feature.title} className="w-12 h-12 object-contain flex-shrink-0" />
                    <h3 className="text-lg font-bold text-white">
                      {feature.title}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Product Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-12"
        >
          <div className="grid md:grid-cols-2 gap-8 md:items-start">
            <div className="relative group h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 h-full flex items-center">
                <img 
                  src="/src/assets/braintree-checkout-1.png" 
                  alt="Braintree Checkout Interface" 
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
            
            <div className="relative group h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 h-full flex items-center">
                <img 
                  src="/src/assets/braintree-checkout-2.png" 
                  alt="Braintree Advanced Features" 
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Video Selection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="space-y-8"
        >
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Escolha sua <GradientHighlight>experiência</GradientHighlight>
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Veja como o PayPal Braintree funciona na prática
            </p>
          </div>

          {/* Video Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Customer Experience Video */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <Card 
                className="cursor-pointer transition-all duration-300 border-2 border-white/10 hover:border-blue-400/50 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:scale-105 group"
                onClick={() => handleVideoSelect('customer')}
              >
                <CardContent className="p-6 text-center">
                  <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 transition-colors">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Experiência do Cliente
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    Veja como seus clientes vivenciam um checkout rápido e seguro com o Braintree
                  </p>
                  <div className="flex items-center justify-center gap-2 text-blue-300 font-semibold">
                    <Play className="w-4 h-4" />
                    <span>Assistir vídeo</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Merchant Dashboard Video */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              <Card 
                className="cursor-pointer transition-all duration-300 border-2 border-white/10 hover:border-blue-400/50 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:scale-105 group"
                onClick={() => handleVideoSelect('merchant')}
              >
                <CardContent className="p-6 text-center">
                  <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 transition-colors">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Dashboard do Comerciante
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    Descubra as ferramentas de gestão e análise disponíveis no painel do Braintree
                  </p>
                  <div className="flex items-center justify-center gap-2 text-blue-300 font-semibold">
                    <Play className="w-4 h-4" />
                    <span>Assistir vídeo</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Skip Option */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="text-center"
          >
            <Button
              onClick={handleContinue}
              variant="ghost"
              className="border border-white/30 text-white hover:bg-white/10 hover:border-white/50 hover:text-white"
            >
              Pular vídeos e continuar
            </Button>
          </motion.div>
        </motion.div>

        {/* Footer with asterisk note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 text-sm">
            * sob aprovação
          </p>
        </motion.div>
      </div>
    </div>
  )
} 