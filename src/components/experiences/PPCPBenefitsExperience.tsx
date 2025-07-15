import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { SOLUTIONS_CONTENT } from '@/lib/content'
import { useBackground } from '@/hooks/useBackground'

export default function PPCPBenefitsExperience() {
  const navigate = useNavigate()
  const { getBackgroundStyle } = useBackground()

  const ppcpData = SOLUTIONS_CONTENT.solutions['complete-payments']
  
  // Use mainBenefits from content.ts (3 benefits)
  const PPCP_MAIN_BENEFITS = ppcpData.mainBenefits
  
  // Use moreBenefits from content.ts (5 benefits)
  const PPCP_MORE_BENEFITS = ppcpData.moreBenefits

  const handleContinue = () => {
    navigate({ to: '/contact' })
  }

  const backgroundStyle = getBackgroundStyle()

  return (
    <div 
      className={backgroundStyle.className}
      style={backgroundStyle.style}
    >
      <div className="relative z-10 w-full max-w-1440 mx-auto px-4 md:px-8 xl:px-16 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 max-w-6xl mx-auto leading-tight">
            O que você ganha com as soluções de pagamento do PayPal
          </h1>
        </motion.div>

        {/* Main Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {PPCP_MAIN_BENEFITS.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <Card className="h-full bg-white/10 backdrop-blur-xl border-white/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                    <img src={benefit.icon} alt={benefit.title} className="w-10 h-10 object-contain" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white mb-2">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* More Benefits from content.ts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-12"
        >
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardContent className="p-6">
              <div className="flex flex-wrap justify-center gap-6">
                {ppcpData.moreBenefits.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.05, duration: 0.4 }}
                    className="flex items-center gap-5 p-6 rounded-lg bg-white/5 hover:bg-white/10 transition-colors w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                  >
                    <CheckCircle2 className="w-8 h-8 text-blue-400 flex-shrink-0" />
                    <span className="text-white font-medium text-lg">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center"
        >
          <Button
            onClick={handleContinue}
            variant="paypal-primary"
          >
            Avançar
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
} 