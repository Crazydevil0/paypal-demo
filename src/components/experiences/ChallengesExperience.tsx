import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  TrendingDown,
  AlertTriangle,
  Target
} from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { useJourney } from '@/context/JourneyProvider'
import type { BusinessChallenge } from '@/types/journey'

const CHALLENGE_OPTIONS = [
  {
    id: 'cart-abandonment' as BusinessChallenge,
    title: 'Abandono de Carrinho',
    description: 'Clientes desistem antes de finalizar a compra',
    icon: ShoppingCart,
    impact: 'Alto',
    severity: 'critical',
    stats: '70% dos carrinhos são abandonados',
    solution: 'Checkout simplificado com PayPal',
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-500/10',
    iconBg: 'bg-red-500'
  },
  {
    id: 'slow-checkout' as BusinessChallenge,
    title: 'Checkout Demorado',
    description: 'Processo de pagamento complexo e lento',
    icon: Clock,
    impact: 'Médio',
    severity: 'warning',
    stats: '3+ minutos para finalizar',
    solution: 'One-Click com PayPal Express',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-500/10',
    iconBg: 'bg-orange-500'
  },
  {
    id: 'global-scaling' as BusinessChallenge,
    title: 'Expansão Global',
    description: 'Dificuldade para vender em outros países',
    icon: Globe2,
    impact: 'Alto',
    severity: 'critical',
    stats: '150+ moedas suportadas',
    solution: 'PayPal Global Solutions',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-500/10',
    iconBg: 'bg-blue-500'
  },
  {
    id: 'payment-reliability' as BusinessChallenge,
    title: 'Falhas de Pagamento',
    description: 'Transações negadas e instabilidade',
    icon: CreditCard,
    impact: 'Crítico',
    severity: 'critical',
    stats: '99.9% de uptime',
    solution: 'Infraestrutura PayPal',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-500/10',
    iconBg: 'bg-purple-500'
  },
  {
    id: 'social-payments' as BusinessChallenge,
    title: 'Vendas Sociais',
    description: 'Dificuldade para monetizar redes sociais',
    icon: Users2,
    impact: 'Médio',
    severity: 'warning',
    stats: 'Integração nativa',
    solution: 'PayPal Social Commerce',
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-500/10',
    iconBg: 'bg-pink-500'
  },
  {
    id: 'fraud-chargebacks' as BusinessChallenge,
    title: 'Fraudes e Chargebacks',
    description: 'Perdas por transações fraudulentas',
    icon: ShieldAlert,
    impact: 'Alto',
    severity: 'critical',
    stats: 'Proteção avançada',
    solution: 'PayPal Seller Protection',
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-500/10',
    iconBg: 'bg-emerald-500'
  }
]

const severityConfig = {
  critical: {
    color: 'text-red-400',
    bg: 'bg-red-500/20',
    border: 'border-red-500/30',
    icon: AlertTriangle
  },
  warning: {
    color: 'text-orange-400',
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/30',
    icon: TrendingDown
  }
}

export default function ChallengesExperience() {
  const navigate = useNavigate()
  const { data, updateData } = useJourney()
  const [selectedChallenges, setSelectedChallenges] = useState<BusinessChallenge[]>(data.challenges || [])
  const [hoveredChallenge, setHoveredChallenge] = useState<string | null>(null)

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-red-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <AlertTriangle className="w-6 h-6 text-red-400 animate-pulse" />
            <Badge variant="destructive" className="text-lg px-4 py-2 bg-red-500/20 text-red-200 border-red-500/30">
              Passo 3 de 5
            </Badge>
            <AlertTriangle className="w-6 h-6 text-red-400 animate-pulse" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Quais são seus{' '}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              desafios?
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Identifique os obstáculos que impedem o crescimento do seu negócio
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <Target className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-medium">
              {selectedChallenges.length} desafio{selectedChallenges.length !== 1 ? 's' : ''} identificado{selectedChallenges.length !== 1 ? 's' : ''}
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {CHALLENGE_OPTIONS.map((challenge, index) => {
            const isSelected = selectedChallenges.includes(challenge.id)
            const isHovered = hoveredChallenge === challenge.id
            const IconComponent = challenge.icon
                         const severityData = severityConfig[challenge.severity as keyof typeof severityConfig]
            const SeverityIcon = severityData.icon

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
                      ? `border-red-400 shadow-2xl shadow-red-400/20 scale-105` 
                      : `border-white/10 hover:border-red-400/50 hover:scale-102`
                    }
                    bg-white/5 backdrop-blur-xl hover:bg-white/10
                  `}
                  onClick={() => handleChallengeToggle(challenge.id)}
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${challenge.color} opacity-5 transition-opacity duration-500 ${isHovered ? 'opacity-15' : ''}`} />
                  
                  {/* Selection Indicator */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0, rotate: -180 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0, opacity: 0, rotate: 180 }}
                        className="absolute top-4 right-4 z-20"
                      >
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <CardHeader className="relative z-10 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${challenge.iconBg} shadow-lg`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${severityData.bg} ${severityData.border} border`}>
                        <SeverityIcon className={`w-3 h-3 ${severityData.color}`} />
                        <span className={`text-xs font-medium ${severityData.color}`}>
                          {challenge.impact}
                        </span>
                      </div>
                    </div>
                    
                    <CardTitle className="text-lg font-bold text-white mb-2">
                      {challenge.title}
                    </CardTitle>
                    
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {challenge.description}
                    </p>

                    <div className="space-y-3">
                      {/* Statistics */}
                      <div className={`p-3 rounded-lg ${challenge.bgColor} border border-white/10`}>
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

                      {/* Solution Preview */}
                      <div className="p-3 rounded-lg bg-gradient-to-r from-paypal-primary/10 to-paypal-light/10 border border-paypal-light/20">
                        <div className="flex items-center gap-2 mb-1">
                          <Zap className="w-4 h-4 text-paypal-light" />
                          <span className="text-xs font-medium text-paypal-light uppercase tracking-wide">
                            Solução PayPal
                          </span>
                        </div>
                        <p className="text-white font-semibold text-sm">
                          {challenge.solution}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
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
          className="text-center mt-16"
        >
          <Button
            onClick={handleContinue}
            disabled={selectedChallenges.length === 0}
            size="lg"
            className={`
              px-12 py-6 text-lg font-semibold rounded-2xl shadow-2xl transition-all duration-300
              ${selectedChallenges.length > 0
                ? 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-orange-500 hover:to-red-500 text-white transform hover:scale-105 shadow-red-500/30'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {selectedChallenges.length > 0 ? (
              <>
                Ver Soluções Personalizadas
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            ) : (
              'Identifique seus desafios primeiro'
            )}
          </Button>

          {selectedChallenges.length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-400 mt-4"
            >
              Vamos mostrar as melhores soluções para seus desafios específicos
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  )
} 