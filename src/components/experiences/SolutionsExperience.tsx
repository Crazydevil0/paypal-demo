import { useState } from 'react'
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

const PAYPAL_SOLUTIONS = {
  'complete-payments': {
    id: 'complete-payments',
    title: 'PayPal Complete Payments',
    subtitle: 'Solução ideal para pequenas e médias empresas',
    description: 'Plataforma completa de pagamentos com checkout otimizado, proteção contra fraudes e ferramentas de crescimento.',
    icon: CreditCard,
    color: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-500/10 to-purple-500/10',
    features: [
      'Checkout em uma página',
      'Pagamento com 1 clique',
      'Proteção do vendedor',
      'Analytics integrado',
      'Suporte 24/7',
      'APIs simples'
    ],
    benefits: [
      { icon: TrendingUp, text: 'Até 30% mais conversões' },
      { icon: Shield, text: 'Proteção total contra fraudes' },
      { icon: Globe, text: 'Vendas para 200+ países' }
    ]
  },
  'braintree': {
    id: 'braintree',
    title: 'Braintree by PayPal',
    subtitle: 'Solução avançada para grandes empresas',
    description: 'Plataforma de pagamentos de nível empresarial com controle total, customização avançada e infraestrutura global.',
    icon: Building,
    color: 'from-purple-500 to-purple-600',
    bgGradient: 'from-purple-500/10 to-pink-500/10',
    features: [
      'APIs personalizáveis',
      'Checkout customizado',
      'Múltiplos processadores',
      'Análise avançada',
      'Suporte dedicado',
      'Certificação PCI'
    ],
    benefits: [
      { icon: Rocket, text: 'Escalabilidade ilimitada' },
      { icon: Users, text: 'Suporte técnico dedicado' },
      { icon: Shield, text: 'Segurança de nível bancário' }
    ]
  }
}

export default function SolutionsExperience() {
  const navigate = useNavigate()
  const { data, updateData } = useJourney()
  const [selectedSolution, setSelectedSolution] = useState<'complete-payments' | 'braintree' | null>(null)

  // Determine recommended solution based on profile
  const recommendedSolution = data.profile === 'large-enterprise' ? 'braintree' : 'complete-payments'
  const solutions = Object.values(PAYPAL_SOLUTIONS)

  const handleSolutionSelect = (solutionId: 'complete-payments' | 'braintree') => {
    setSelectedSolution(solutionId)
    updateData({ solution: solutionId })
  }

  const handleContinue = () => {
    if (selectedSolution) {
      navigate({ to: '/contact' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
            <Badge className="text-lg px-4 py-2 bg-purple-500/20 text-purple-200 border-purple-500/30">
              Passo 4 de 5
            </Badge>
            <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Sua solução{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              personalizada
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Com base no seu perfil e desafios, estas são as melhores opções PayPal para você
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {solutions.map((solution, index) => {
            const isRecommended = solution.id === recommendedSolution
            const isSelected = selectedSolution === solution.id
            const IconComponent = solution.icon

            return (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Recommended Badge */}
                {isRecommended && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
                  >
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 text-sm font-bold shadow-lg">
                      <Sparkles className="w-4 h-4 mr-1" />
                      Recomendado para você
                    </Badge>
                  </motion.div>
                )}

                <Card 
                  className={`
                    relative overflow-hidden cursor-pointer transition-all duration-500 border-2 h-full
                    ${isSelected 
                      ? 'border-purple-400 shadow-2xl shadow-purple-400/20 scale-105' 
                      : isRecommended
                        ? 'border-yellow-400/50 shadow-xl shadow-yellow-400/10'
                        : 'border-white/10 hover:border-purple-400/50'
                    }
                    bg-white/5 backdrop-blur-xl hover:bg-white/10
                  `}
                  onClick={() => handleSolutionSelect(solution.id as 'complete-payments' | 'braintree')}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${solution.bgGradient} opacity-50`} />
                  
                  {/* Selection Indicator */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute top-4 right-4 z-20"
                      >
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <CardHeader className="relative z-10 pb-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${solution.color} shadow-lg`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl font-bold text-white mb-2">
                          {solution.title}
                        </CardTitle>
                        <p className="text-purple-300 font-medium">
                          {solution.subtitle}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {solution.description}
                    </p>
                  </CardHeader>

                  <CardContent className="relative z-10 space-y-6">
                    {/* Key Benefits */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-purple-400" />
                        Principais Benefícios
                      </h4>
                      <div className="grid gap-3">
                        {solution.benefits.map((benefit) => {
                          const BenefitIcon = benefit.icon
                          return (
                            <div key={benefit.text} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                              <div className="p-2 rounded-lg bg-purple-500/20">
                                <BenefitIcon className="w-4 h-4 text-purple-400" />
                              </div>
                              <span className="text-white font-medium">{benefit.text}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Features List */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">
                        Recursos Inclusos
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {solution.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
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
            disabled={!selectedSolution}
            size="lg"
            className={`
              px-12 py-6 text-lg font-semibold rounded-2xl shadow-2xl transition-all duration-300
              ${selectedSolution
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 text-white transform hover:scale-105 shadow-purple-500/30'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {selectedSolution ? (
              <>
                Continuar com {PAYPAL_SOLUTIONS[selectedSolution].title}
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            ) : (
              'Selecione uma solução para continuar'
            )}
          </Button>

          {selectedSolution && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-400 mt-4"
            >
              Próximo passo: informações de contato para demonstração personalizada
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  )
} 