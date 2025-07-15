import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  ArrowRight, 
  Play
} from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { useBackground } from '@/hooks/useBackground'
import { SOLUTIONS_CONTENT } from '@/lib/content'

// Get PPCP data from content
const ppcpFeatures = SOLUTIONS_CONTENT.solutions['complete-payments'].mainBenefits

export default function PPCPIntroExperience() {
  const navigate = useNavigate()
  const { getBackgroundStyle } = useBackground()

  const handleVideoSelection = () => {
    navigate({ to: '/ppcp-video' })
  }

  const handleSkipVideo = () => {
    navigate({ to: '/ppcp-benefits' })
  }

  const backgroundStyle = getBackgroundStyle()

  return (
    <div className={backgroundStyle.className} style={backgroundStyle.style}>
      <div className="relative z-10 w-full max-w-1440 mx-auto px-4 md:px-8 xl:px-16 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Com o Paypal Complete Payments:
          </h1>
        </motion.div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {ppcpFeatures.map((feature, index) => (
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
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                <img 
                  src="/src/assets/pagamento1.png" 
                  alt="PayPal Complete Payments Interface" 
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                <img 
                  src="/src/assets/pagamento2.png" 
                  alt="PayPal Mobile Experience" 
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
          className="text-center space-y-6"
        >
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">
              Veja como funciona na prática
            </h3>
            
            <Button
              onClick={handleVideoSelection}
              variant="paypal-primary"
              className="group mb-4"
            >
              <Play className="mr-2 w-5 h-5" />
              Assistir demonstração
            </Button>
          </div>
          
          <Button
            onClick={handleSkipVideo}
            variant="ghost"
            className="text-white hover:text-white hover:bg-white/10"
          >
            Pular vídeo e ver benefícios
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
} 