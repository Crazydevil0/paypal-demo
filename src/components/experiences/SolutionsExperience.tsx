import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { useJourney } from '@/context/JourneyProvider'
import { useDesignSystem } from '@/providers/ThemeProvider'
import { SOLUTIONS_CONTENT } from '@/lib/content'
import { useBackground } from '@/hooks/useBackground'

export default function SolutionsExperience() {
  const navigate = useNavigate()
  const { data, updateData } = useJourney()
  const { colors } = useDesignSystem()
  const { getBackgroundStyle } = useBackground()

  // Determine recommended solution based on profile
  const recommendedSolution = data.profile === 'large-enterprise' ? 'braintree' : 'complete-payments'
  const solution = SOLUTIONS_CONTENT.solutions[recommendedSolution]

  // Set the recommended solution automatically
  useEffect(() => {
    updateData({ solution: recommendedSolution })
  }, [recommendedSolution, updateData])

  const handleContinue = () => {
    const targetRoute = recommendedSolution === 'complete-payments' ? '/ppcp-intro' : '/braintree-intro'
    navigate({ to: targetRoute })
  }

  const backgroundStyle = getBackgroundStyle()

  return (
    <div 
      className={backgroundStyle.className}
      style={backgroundStyle.style}
    >
      <div className="relative z-10 w-full max-w-none mx-auto py-12 min-h-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Sua empresa está pronta para o futuro?
          </h1>
          
          <p className="text-xl md:text-3xl lg:text-4xl leading-relaxed font-semibold"
             style={{ color: colors.paypal.lightBlue }}>
            Descubra a solução ideal para seu negócio:
          </p>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button
            onClick={handleContinue}
            variant="paypal-primary"
            size="lg"
            className="text-xl px-8 py-4"
          >
            {solution.title}
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
} 