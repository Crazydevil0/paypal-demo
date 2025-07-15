import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Star, CheckCircle2 } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { useHelper } from '@/context/HelperProvider'
import { SOLUTIONS_CONTENT } from '@/lib/content'
import { GradientHighlight } from '@/components/ui/GradientHighlight'
import { useBackground } from '@/hooks/useBackground'

export default function BraintreeBenefitsExperience() {
  const navigate = useNavigate()
  const { settings } = useHelper()
  const { getBackgroundStyle, isGradientBackground } = useBackground()

  const braintreeData = SOLUTIONS_CONTENT.solutions.braintree
  
  // Use mainBenefits from content.ts (3 benefits)
  const BRAINTREE_MAIN_BENEFITS = braintreeData.mainBenefits
  
  // Use moreBenefits from content.ts (12 benefits)
  const BRAINTREE_MORE_BENEFITS = braintreeData.moreBenefits

  const handleContinue = () => {
    navigate({ to: '/contact' })
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
          {settings.solutionsPage.elements.showSubtitle && (
            <p className="text-2xl md:text-3xl font-semibold text-blue-400 mb-4">
              {braintreeData.title}
            </p>
          )}
          
          {settings.solutionsPage.elements.showDescription && (
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 max-w-6xl mx-auto leading-tight">
              A plataforma de pagamentos mais avançada para empresas que precisam de controle total
            </h1>
          )}
        </motion.div>

        {/* Main Benefits Grid */}
        {settings.solutionsPage.elements.showMainBenefits && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {BRAINTREE_MAIN_BENEFITS.map((benefit, index) => (
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
                  <CardContent>
                    <p className="text-gray-300 text-center leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* More Benefits from content.ts */}
        {settings.solutionsPage.elements.showMoreBenefits && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-12"
        >
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader className="text-center">
              <div className="inline-flex items-center gap-2 mb-4">
                <h3 className="text-2xl font-bold text-white">
                  Recursos Avançados Inclusos
                </h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {braintreeData.moreBenefits.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.05, duration: 0.4 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <span className="text-white font-medium text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        )}

        {/* Special Callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-blue-500/20 to-blue-400/20 border-blue-400/30">
            <CardContent className="text-center py-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <img src="/assets/icons/headphones.svg" alt="Headphones" className="w-8 h-8 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">
                  Suporte Empresarial Dedicado
                </h3>
              </div>
              <p className="text-lg text-gray-300 mb-4">
                Equipe técnica especializada, gerente de conta dedicado e suporte prioritário 24/7
              </p>
              <div className="text-sm text-blue-300">
                * Recursos disponíveis sob aprovação e conforme contrato
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
          <div className="max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Pronto para escalar seu negócio?
            </h2>
            <p className="text-xl text-gray-300">
              Fale com nossos especialistas em soluções empresariais e descubra como o Braintree pode transformar seus pagamentos
            </p>
          </div>

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