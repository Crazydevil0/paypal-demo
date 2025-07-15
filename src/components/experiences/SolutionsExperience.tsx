import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Zap, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  CreditCard,
  Globe,
  Shield,
  TrendingUp,
  Users,
  Building,
  Rocket
} from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { useJourney } from '@/context/JourneyProvider'
import { useDesignSystem } from '@/providers/ThemeProvider'
import { GradientHighlight } from '@/components/ui/GradientHighlight'
import { SOLUTIONS_CONTENT } from '@/lib/content'
import { useHelper } from '@/context/HelperProvider'
import { useBackground } from '@/hooks/useBackground'

// Icon mapping for solution header icons (Lucide icons)
const solutionIconMap: Record<string, any> = {
  CreditCard,
  Building,
  Globe,
  Shield,
  TrendingUp,
  Users,
  Rocket,
  Sparkles
}

export default function SolutionsExperience() {
  const navigate = useNavigate()
  const { data, updateData } = useJourney()
  const { settings } = useHelper()
  const { getBackgroundStyle, isGradientBackground } = useBackground()
  const [selectedSolution, setSelectedSolution] = useState<'complete-payments' | 'braintree' | null>(null)

  // Determine recommended solution based on profile
  const recommendedSolution = data.profile === 'large-enterprise' ? 'braintree' : 'complete-payments'
  const solutions = Object.values(SOLUTIONS_CONTENT.solutions)

  // Select recommended solution by default on mount
  useEffect(() => {
    setSelectedSolution(recommendedSolution)
  }, [recommendedSolution])

  const handleSolutionSelect = (solutionId: 'complete-payments' | 'braintree') => {
    setSelectedSolution(solutionId)
    updateData({ solution: solutionId })
  }

  const handleContinue = () => {
    if (selectedSolution) {
      const targetRoute = selectedSolution === 'complete-payments' ? '/ppcp-intro' : '/braintree-intro'
      navigate({ to: targetRoute })
    }
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Sua solução{' '}
            <GradientHighlight direction="reverse">personalizada</GradientHighlight>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Com base no seu perfil e desafios, estas são as melhores opções PayPal para você
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {solutions.map((solution, index) => {
            const isRecommended = solution.id === recommendedSolution
            const isSelected = selectedSolution === solution.id
                            const IconComponent = solutionIconMap[solution.icon as keyof typeof solutionIconMap]

            return (
              <div key={solution.id} className="relative flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="w-full"
                >
                  <Card 
                    className={`
                      relative overflow-visible cursor-pointer transition-all duration-500 border-2 h-full origin-center
                      ${isSelected 
                        ? 'border-yellow-400 shadow-2xl shadow-yellow-400/20 scale-105' 
                        : isRecommended
                          ? 'border-yellow-400/50 shadow-xl shadow-yellow-400/10'
                          : 'border-white/10 hover:border-blue-400/50'
                      }
                      bg-white/5 backdrop-blur-xl hover:bg-white/10
                    `}
                    onClick={() => handleSolutionSelect(solution.id as 'complete-payments' | 'braintree')}
                  >
                    {/* Recommended Badge - positioned relative to the Card */}
                    {isRecommended && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 }}
                        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-30"
                      >
                        <Badge 
                          className="text-slate-900 px-4 py-2 text-sm font-bold shadow-lg border-0 bg-yellow-400"
                        >
                          <Sparkles className="w-4 h-4 mr-1" />
                          Recomendado para você
                        </Badge>
                      </motion.div>
                    )}

                    {/* Selection Indicator */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute top-4 right-4 z-20"
                        >
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <CardHeader className={`relative z-10 ${settings.solutionsPage.elements.showDescription ? 'pb-6' : (settings.solutionsPage.elements.showMainBenefits || settings.solutionsPage.elements.showMoreBenefits) ? 'pb-2' : 'pb-0'}`}>
                      <div className={`flex ${settings.solutionsPage.elements.showSubtitle ? 'items-start' : 'items-center'} gap-4 ${settings.solutionsPage.elements.showDescription ? 'mb-4' : 'mb-0'}`}>
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${solution.color} shadow-lg`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className={`text-2xl font-bold text-white ${settings.solutionsPage.elements.showSubtitle ? 'mb-2' : 'mb-0'}`}>
                            {solution.title}
                          </CardTitle>
                          {settings.solutionsPage.elements.showSubtitle && (
                            <p className="text-blue-300 font-medium">
                              {solution.subtitle}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {settings.solutionsPage.elements.showDescription && (
                        <p className="text-gray-300 leading-relaxed text-lg">
                          {solution.description}
                        </p>
                      )}
                    </CardHeader>

                    {(settings.solutionsPage.elements.showMainBenefits || settings.solutionsPage.elements.showMoreBenefits) && (
                      <CardContent className="relative z-10 space-y-6">
                        {/* Main Benefits */}
                        {settings.solutionsPage.elements.showMainBenefits && (
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                              <Zap className="w-5 h-5 text-blue-300" />
                              Principais Benefícios
                            </h4>
                            <div className="grid gap-4">
                              {solution.mainBenefits.map((benefit) => (
                                <div key={benefit.title} className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                                  <img src={benefit.icon} alt={benefit.title} className="w-12 h-12 object-contain flex-shrink-0" />
                                  <div>
                                    <h5 className="text-white font-semibold mb-1">{benefit.title}</h5>
                                    <p className="text-gray-300 text-sm">{benefit.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* More Benefits - Two Column List */}
                        {settings.solutionsPage.elements.showMoreBenefits && (
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-4">
                              Recursos Inclusos
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                              {solution.moreBenefits.map((benefit) => (
                                <div key={benefit} className="flex items-center gap-2 text-sm text-gray-300">
                                  <div className="w-1.5 h-1.5 bg-blue-300 rounded-full flex-shrink-0" />
                                  <span>{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              </div>
            )
          })}
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Button
            onClick={handleContinue}
            variant="paypal-primary"
            disabled={!selectedSolution}
          >
            {selectedSolution ? (
              <>
                Continuar com {selectedSolution && SOLUTIONS_CONTENT.solutions[selectedSolution].title}
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            ) : (
              'Selecione uma solução para continuar'
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  )
} 