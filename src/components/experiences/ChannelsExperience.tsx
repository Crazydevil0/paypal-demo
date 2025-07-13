import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Globe, 
  Instagram, 
  ShoppingCart, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Users
} from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { useJourney } from '@/context/JourneyProvider'
import type { SalesChannel } from '@/types/journey'

const CHANNEL_OPTIONS = [
  {
    id: 'website' as SalesChannel,
    title: 'Website/E-commerce',
    description: 'Venda online através do seu site ou loja virtual',
    icon: Globe,
    gradient: 'from-blue-500 via-purple-500 to-pink-500',
    benefits: ['Alcance global', 'Vendas 24/7', 'Escalabilidade'],
    features: ['Checkout integrado', 'Analytics avançado', 'SEO otimizado'],
    bgPattern: '🌐'
  },
  {
    id: 'social-media' as SalesChannel,
    title: 'Redes Sociais',
    description: 'Instagram, Facebook, TikTok e outras plataformas',
    icon: Instagram,
    gradient: 'from-pink-500 via-rose-500 to-orange-500',
    benefits: ['Engajamento direto', 'Audiência jovem', 'Viral marketing'],
    features: ['Stories Shopping', 'Live Commerce', 'Influencer tools'],
    bgPattern: '📱'
  },
  {
    id: 'ecommerce' as SalesChannel,
    title: 'Marketplaces',
    description: 'Amazon, Mercado Livre, Shopee e similares',
    icon: ShoppingCart,
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    benefits: ['Tráfego garantido', 'Confiança do cliente', 'Logística facilitada'],
    features: ['Fulfillment', 'Prime delivery', 'Review system'],
    bgPattern: '🛒'
  }
]

export default function ChannelsExperience() {
  const navigate = useNavigate()
  const { data, updateData } = useJourney()
  const [selectedChannels, setSelectedChannels] = useState<SalesChannel[]>(data.channels || [])
  const [hoveredChannel, setHoveredChannel] = useState<string | null>(null)

  const handleChannelToggle = (channelId: SalesChannel) => {
    setSelectedChannels(prev => 
      prev.includes(channelId)
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    )
  }

  const handleContinue = () => {
    updateData({ channels: selectedChannels })
    navigate({ to: '/challenges' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-paypal-primary rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-paypal-light rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-paypal-light animate-spin" />
            <Badge variant="secondary" className="text-lg px-4 py-2 bg-white/10 text-white border-white/20">
              Passo 2 de 5
            </Badge>
            <Sparkles className="w-6 h-6 text-paypal-light animate-spin" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Onde você{' '}
            <span className="bg-gradient-to-r from-paypal-light to-white bg-clip-text text-transparent">
              vende hoje?
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Selecione todos os canais onde sua empresa atua ou pretende atuar
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <TrendingUp className="w-5 h-5 text-paypal-light" />
            <span className="text-paypal-light font-medium">
              {selectedChannels.length} canal{selectedChannels.length !== 1 ? 'is' : ''} selecionado{selectedChannels.length !== 1 ? 's' : ''}
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {CHANNEL_OPTIONS.map((channel, index) => {
            const isSelected = selectedChannels.includes(channel.id)
            const isHovered = hoveredChannel === channel.id
            const IconComponent = channel.icon

            return (
              <motion.div
                key={channel.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                onHoverStart={() => setHoveredChannel(channel.id)}
                onHoverEnd={() => setHoveredChannel(null)}
                className="relative group"
              >
                <Card 
                  className={`
                    relative overflow-hidden cursor-pointer transition-all duration-500 border-2
                    ${isSelected 
                      ? 'border-paypal-light shadow-2xl shadow-paypal-light/20 scale-105' 
                      : 'border-white/10 hover:border-paypal-light/50 hover:scale-102'
                    }
                    bg-white/5 backdrop-blur-xl hover:bg-white/10
                  `}
                  onClick={() => handleChannelToggle(channel.id)}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="text-9xl absolute top-4 right-4 select-none">
                      {channel.bgPattern}
                    </div>
                  </div>

                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${channel.gradient} opacity-10 transition-opacity duration-500 ${isHovered ? 'opacity-20' : ''}`} />
                  
                  {/* Selection Indicator */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute top-4 right-4 z-20"
                      >
                        <div className="w-8 h-8 bg-paypal-light rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <CardHeader className="relative z-10 pb-4">
                    <div className="flex items-start justify-between">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${channel.gradient} shadow-lg`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      <Checkbox
                        checked={isSelected}
                        onChange={() => handleChannelToggle(channel.id)}
                        className="data-[state=checked]:bg-paypal-light data-[state=checked]:border-paypal-light"
                      />
                    </div>
                    
                    <CardTitle className="text-xl font-bold text-white mt-4">
                      {channel.title}
                    </CardTitle>
                    
                    <p className="text-gray-300 leading-relaxed">
                      {channel.description}
                    </p>
                  </CardHeader>

                  <CardContent className="relative z-10 space-y-6">
                    {/* Benefits */}
                    <div>
                      <h4 className="text-sm font-semibold text-paypal-light mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Benefícios
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {channel.benefits.map((benefit) => (
                          <Badge 
                            key={benefit} 
                            variant="secondary" 
                            className="text-xs bg-white/10 text-white border-white/20 hover:bg-white/20"
                          >
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="text-sm font-semibold text-paypal-light mb-3 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Recursos
                      </h4>
                      <ul className="space-y-2">
                        {channel.features.map((feature) => (
                          <li key={feature} className="text-sm text-gray-300 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-paypal-light rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
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
          className="text-center mt-16"
        >
          <Button
            onClick={handleContinue}
            disabled={selectedChannels.length === 0}
            size="lg"
            className={`
              px-12 py-6 text-lg font-semibold rounded-2xl shadow-2xl transition-all duration-300
              ${selectedChannels.length > 0
                ? 'bg-gradient-to-r from-paypal-primary to-paypal-light hover:from-paypal-light hover:to-paypal-primary text-white transform hover:scale-105 shadow-paypal-primary/30'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {selectedChannels.length > 0 ? (
              <>
                Continuar Jornada
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            ) : (
              'Selecione pelo menos um canal'
            )}
          </Button>

          {selectedChannels.length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-400 mt-4"
            >
              Você pode alterar sua seleção a qualquer momento
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  )
} 