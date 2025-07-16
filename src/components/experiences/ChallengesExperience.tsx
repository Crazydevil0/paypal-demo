import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  ShoppingCart, 
  Clock, 
  Globe2, 
  ShieldAlert, 
  Users2, 
  CreditCard,
  ArrowRight, 
  CheckCircle2
} from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { useJourney } from '@/context/JourneyProvider'
import { useDesignSystem } from '@/providers/ThemeProvider'
import { CHALLENGES_CONTENT } from '@/lib/content'
import type { BusinessChallenge } from '@/types/journey'
import { useBackground } from '@/hooks/useBackground'

export default function ChallengesExperience() {
  const navigate = useNavigate()
  const { data, updateData } = useJourney()
  const { colors } = useDesignSystem()
  const { getBackgroundStyle } = useBackground()
  const [selectedChallenges, setSelectedChallenges] = useState<BusinessChallenge[]>(data.challenges || [])

  // Removed unused display variant settings

  const iconMap = {
    'cart-abandonment': ShoppingCart,
    'slow-checkout': Clock,
    'global-scaling': Globe2,
    'payment-reliability': CreditCard,
    'social-commerce': Users2,
    'fraud-chargebacks': ShieldAlert
  }

  // Image-style content (simplified text from the content structure)
  const imageStyleContent = {
    options: CHALLENGES_CONTENT.options.map((challenge: any, index: number) => ({
      id: challenge.id,
      text: challenge.text || challenge.description,
      bgColor: index % 3 === 0 ? colors.paypal.blue : 
               index % 3 === 1 ? colors.paypal.lightBlue : 
               colors.paypal.qrBlue
    }))
  }

  const handleChallengeToggle = (challengeId: BusinessChallenge) => {
    setSelectedChallenges(prev => 
      prev.includes(challengeId)
        ? prev.filter(id => id !== challengeId)
        : [...prev, challengeId]
    )
  }

  const handleContinue = () => {
    updateData({ challenges: selectedChallenges })
    navigate({ to: '/solutions' })
  }

  // Render Image Style Cards
  const renderCard = (challenge: any, index: number) => {
    const isSelected = selectedChallenges.includes(challenge.id)
    const imageStyleData = imageStyleContent.options.find(opt => opt.id === challenge.id)
    const IconComponent = iconMap[challenge.id as keyof typeof iconMap]

    return (
      <motion.div
        key={challenge.id}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="relative group"
      >
        <Card 
          className={`
            relative overflow-hidden cursor-pointer transition-all duration-500 border-3 h-full min-h-[200px]
            ${isSelected 
              ? 'shadow-2xl scale-105' 
              : 'border-white/20 hover:scale-102'
            }
            bg-white/10 backdrop-blur-xl hover:bg-white/15
          `}
          style={{
            borderColor: isSelected ? colors.paypal.blue : 'rgba(255,255,255,0.2)',
            backgroundColor: imageStyleData?.bgColor + '20',
            boxShadow: isSelected ? `0 0 0 4px ${colors.paypal.blue}40` : undefined
          }}
          onClick={() => handleChallengeToggle(challenge.id)}
        >
          {/* Selection Indicator */}
          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ scale: 0, opacity: 0, rotate: -180 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0, opacity: 0, rotate: 180 }}
                className="absolute top-4 right-4 z-20"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                     style={{ backgroundColor: colors.paypal.blue }}>
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <CardContent className="relative z-10 p-8 h-full flex flex-col items-center justify-center text-center">
            {/* Icon */}
            <div className="p-6 rounded-full mb-6 shadow-xl"
                 style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}>
              <IconComponent className="w-16 h-16 text-gray-700" />
            </div>

            {/* Main Text */}
            <p className="text-xl font-bold text-white leading-relaxed">
              {imageStyleData?.text || challenge.description}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  const backgroundStyle = getBackgroundStyle()

  return (
    <div 
      className={backgroundStyle.className}
      style={backgroundStyle.style}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full filter blur-3xl animate-pulse"
             style={{ backgroundColor: colors.paypal.blue }} />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full filter blur-3xl animate-pulse delay-1000"
             style={{ backgroundColor: colors.paypal.qrBlue }} />
      </div>

      <div className="relative z-10 w-full max-w-1440 mx-auto px-4 md:px-8 xl:px-16 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {CHALLENGES_CONTENT.title}
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed"
             style={{ color: colors.paypal.lightBlue }}>
            {CHALLENGES_CONTENT.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {CHALLENGES_CONTENT.options.map((challenge, index) => {
            return renderCard(challenge, index)
          })}
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Button
            onClick={handleContinue}
            variant="paypal-primary"
            disabled={selectedChallenges.length === 0}
          >
            Avançar
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
} 