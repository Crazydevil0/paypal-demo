import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  ArrowRight, 
  CheckCircle2
} from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { useJourney } from '@/context/JourneyProvider'
import { useDesignSystem } from '@/providers/ThemeProvider'
import { useHelper } from '@/context/HelperProvider'
import { CHANNELS_CONTENT } from '@/lib/content'
import type { SalesChannel } from '@/types/journey'
import { useBackground } from '@/hooks/useBackground'

// Import custom icons
import iconSite from '@/assets/icon-site.png'
import iconRedes from '@/assets/icon-redes.png'
import iconCartao from '@/assets/icon-cartao.png'

export default function ChannelsExperience() {
  const navigate = useNavigate()
  const { data, updateData } = useJourney()
  const { colors } = useDesignSystem()
  const { settings } = useHelper()
  const { getBackgroundStyle } = useBackground()
  const [selectedChannels, setSelectedChannels] = useState<SalesChannel[]>(data.channels || [])

  // Get current helper settings for channels page (unused but kept for consistency)
  const { displayVariant } = settings.channelsPage

  const backgroundStyle = getBackgroundStyle()

  const iconMap = {
    'website': iconSite,
    'social-media': iconRedes, 
    'ecommerce': iconCartao
  }

  // Image-style content (based on the image you provided)
  const imageStyleContent = {
    options: [
      {
        id: 'website' as const,
        text: "Tenho um site, mas vendo mais fora dele.",
        bgColor: colors.paypal.blue
      },
      {
        id: 'social-media' as const,
        text: "Não tenho site, meu negócio vive nas redes sociais.",
        bgColor: colors.paypal.lightBlue
      },
      {
        id: 'ecommerce' as const,
        text: "Tenho site com grande volume de vendas.",
        bgColor: colors.paypal.qrBlue
      }
    ]
  }

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

  // Render Image Style Cards
  const renderCard = (channel: any, index: number) => {
    const isSelected = selectedChannels.includes(channel.id)
    const imageStyleData = imageStyleContent.options.find(opt => opt.id === channel.id)
    const iconSrc = iconMap[channel.id as keyof typeof iconMap]

    return (
      <motion.div
        key={channel.id}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        className="relative group h-full"
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
          onClick={() => handleChannelToggle(channel.id)}
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
              <img 
                src={iconSrc} 
                alt={channel.title}
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* Main Text */}
            <p className="text-xl font-bold text-white leading-relaxed">
              {imageStyleData?.text || channel.description}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div 
      className={backgroundStyle.className}
      style={backgroundStyle.style}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full filter blur-3xl animate-pulse"
             style={{ backgroundColor: colors.paypal.lightBlue }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full filter blur-3xl animate-pulse delay-1000"
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
            {CHANNELS_CONTENT.subtitle} {/* "Onde sua história acontece?" */}
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed"
             style={{ color: colors.paypal.lightBlue }}>
            {CHANNELS_CONTENT.title} {/* "Todo herói tem seu território..." */}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {CHANNELS_CONTENT.options.map((channel, index) => {
            return renderCard(channel, index)
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
            disabled={selectedChannels.length === 0}
          >
            Avançar
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
} 