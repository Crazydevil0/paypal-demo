import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Building2, Store, ArrowRight, Users } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { useJourney } from '@/context/JourneyProvider'
import type { BusinessProfile } from '@/types/journey'

const PROFILE_OPTIONS = [
  {
    id: 'small-medium' as BusinessProfile,
    title: 'Pequena/média empresa',
    description: 'Até 100 funcionários, faturamento até R$ 50M',
    icon: Store,
    features: ['Vendas online', 'Redes sociais', 'Checkout simples'],
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'large-enterprise' as BusinessProfile,
    title: 'Grande empresa',
    description: 'Mais de 100 funcionários, alto volume de transações',
    icon: Building2,
    features: ['Operações globais', 'Integração complexa', 'Múltiplos canais'],
    color: 'from-purple-500 to-purple-600',
  },
]

export default function ProfileExperience() {
  const navigate = useNavigate()
  const { updateData } = useJourney()

  const selectProfile = (profile: BusinessProfile) => {
    updateData({ profile })
    navigate({ to: '/channels' })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 max-w-4xl"
      >
        <p className="text-2xl md:text-3xl font-semibold text-paypal-light mb-4">
          Conte mais sobre você.
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Como você se identifica no mercado hoje?
        </h1>
      </motion.div>

      {/* Profile Cards */}
      <div className="grid gap-8 w-full max-w-5xl">
        {PROFILE_OPTIONS.map((option, index) => {
          const IconComponent = option.icon
          
          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.2, duration: 0.8 }}
            >
              <Card 
                className="p-8 bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer group"
                onClick={() => selectProfile(option.id)}
              >
                <div className="flex items-center gap-8">
                  {/* Icon */}
                  <div className={`p-6 rounded-2xl bg-gradient-to-br ${option.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-16 h-16 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-paypal-dark mb-2">
                      {option.title}
                    </h3>
                    <p className="text-xl text-gray-600 mb-4">
                      {option.description}
                    </p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {option.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 bg-paypal-light/10 text-paypal-primary rounded-full text-sm font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="text-paypal-primary group-hover:translate-x-2 transition-transform duration-300">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Helper Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="flex items-center gap-3 mt-12 text-white/80"
      >
        <Users className="w-5 h-5" />
        <p className="text-lg">
          Clique na opção que melhor descreve seu negócio
        </p>
      </motion.div>
    </div>
  )
} 