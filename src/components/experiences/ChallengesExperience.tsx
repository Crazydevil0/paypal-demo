import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ShoppingCart, 
  Clock, 
  Globe2, 
  ShieldAlert, 
  Users2, 
  CreditCard,
  ArrowRight, 
  CheckCircle2,
  Zap,
  TrendingDown
} from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { useJourney } from '@/context/JourneyProvider'
import { useDesignSystem } from '@/providers/ThemeProvider'
import { useHelper } from '@/context/HelperProvider'
import { CHALLENGES_CONTENT } from '@/lib/content'
import type { BusinessChallenge } from '@/types/journey'

export default function ChallengesExperience() {
  const navigate = useNavigate()
  const { data, updateData } = useJourney()
  const { colors, animations } = useDesignSystem()
  const { settings } = useHelper()
  const [selectedChallenges, setSelectedChallenges] = useState<BusinessChallenge[]>(data.challenges || [])
  const [hoveredChallenge, setHoveredChallenge] = useState<string | null>(null)

  // Get current helper settings for challenges page
  const displayVariant = settings.challengesPage.displayVariant
  const contentVariant = settings.challengesPage.contentVariant
  const showSolucaoPaypal = settings.challengesPage.showSolucaoPaypal
  const showImpactoAtual = settings.challengesPage.showImpactoAtual

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
  const renderImageStyleCard = (challenge: any, index: number) => {
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
                 style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
              <IconComponent className="w-16 h-16 text-white" />
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

  // Render Default Cards
  const renderDefaultCard = (challenge: any, index: number) => {
    const isSelected = selectedChallenges.includes(challenge.id)
    const isHovered = hoveredChallenge === challenge.id
    const IconComponent = iconMap[challenge.id as keyof typeof iconMap]

    return (
      <motion.div
        key={challenge.id}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        onHoverStart={() => setHoveredChallenge(challenge.id)}
        onHoverEnd={() => setHoveredChallenge(null)}
        className="relative group"
      >
        <Card 
          className={`
            relative overflow-hidden cursor-pointer transition-all duration-500 border-2 h-full
            ${isSelected 
              ? `shadow-2xl scale-105` 
              : `border-white/10 hover:scale-102`
            }
            bg-white/5 backdrop-blur-xl hover:bg-white/10
          `}
          style={{
            borderColor: isSelected ? colors.paypal.blue : 'rgba(255,255,255,0.1)',
            boxShadow: isSelected ? `0 25px 50px -12px ${colors.paypal.blue}20` : undefined
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

          <CardHeader className="relative z-10 p-6">
            {/* Challenge Icon and Title */}
            <div className="flex items-start gap-4 mb-4">
              <div className="p-4 rounded-2xl shadow-lg" 
                   style={{ backgroundColor: `${colors.paypal.blue}20` }}>
                <IconComponent className="w-8 h-8" style={{ color: colors.paypal.blue }} />
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl font-bold text-white mb-2">
                  {challenge.title}
                </CardTitle>
                {(displayVariant === 'full' || displayVariant === 'title-description-only') && (
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {challenge.description}
                  </p>
                )}
              </div>
            </div>

            {displayVariant === 'full' && (
              <div className="space-y-3">
                {/* Statistics - Only show if enabled */}
                {showImpactoAtual && (
                  <div className={`p-3 rounded-lg border border-white/10`}
                       style={{ backgroundColor: `${colors.paypal.yellow}10` }}>
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingDown className="w-4 h-4 text-gray-400" />
                      <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                        Impacto Atual
                      </span>
                    </div>
                    <p className="text-white font-semibold">
                      {challenge.stats}
                    </p>
                  </div>
                )}

                {/* Solution Preview - Only show if enabled */}
                {showSolucaoPaypal && (
                  <div className="p-3 rounded-lg border border-white/20"
                       style={{ 
                         background: `linear-gradient(to right, ${colors.paypal.blue}10, ${colors.paypal.lightBlue}10)`,
                         borderColor: `${colors.paypal.lightBlue}20`
                       }}>
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-4 h-4" style={{ color: colors.paypal.lightBlue }} />
                      <span className="text-xs font-medium uppercase tracking-wide"
                            style={{ color: colors.paypal.lightBlue }}>
                        Solução PayPal
                      </span>
                    </div>
                    <p className="text-white font-semibold text-sm">
                      {challenge.solution}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardHeader>
        </Card>
      </motion.div>
    )
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${colors.paypal.dark}, ${colors.paypal.navy}, ${colors.paypal.dark})`
      }}
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
            return contentVariant === 'image-style' 
              ? renderImageStyleCard(challenge, index)
              : renderDefaultCard(challenge, index)
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