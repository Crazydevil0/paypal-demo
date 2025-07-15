import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Mail, 
  Phone, 
  Building, 
  User,
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  Trophy,
  Gift,
  Zap,
  QrCode,
  Calendar,
  MessageSquare
} from 'lucide-react'
import { useJourney } from '@/context/JourneyProvider'
import { useNavigate } from '@tanstack/react-router'
import { GradientHighlight } from '@/components/ui/GradientHighlight'
import { useBackground } from '@/hooks/useBackground'
import confetti from 'canvas-confetti'

export default function ContactExperience() {
  const navigate = useNavigate()
  const { data, updateData, saveJourney } = useJourney()
  const { getBackgroundStyle } = useBackground()
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Update journey data
    updateData({ 
      contact: formData,
      completedAt: new Date()
    })
    
    // Save journey
    await saveJourney()
    
    // Simulate API call and navigate to success
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      navigate({ to: '/success' })
    }, 2000)
  }

  const isFormValid = formData.fullName && formData.email && formData.phone && formData.company

  const backgroundStyle = getBackgroundStyle()

  if (isSubmitted) {
    return (
      <div 
        className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-900 relative overflow-hidden flex items-center justify-center"
      >
        {/* Celebration Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-400 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-400 rounded-full filter blur-3xl animate-pulse delay-500"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-400 rounded-full filter blur-3xl animate-bounce"></div>
        </div>

        <div className="relative z-10 text-center w-full max-w-1440 mx-auto px-4 md:px-8 xl:px-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.8, bounce: 0.4 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 shadow-2xl mb-8">
              <Trophy className="w-16 h-16 text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-6 mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Parabéns!
            </h1>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <Sparkles className="w-8 h-8 text-emerald-400 animate-spin" />
              <p className="text-2xl md:text-3xl text-emerald-300 font-semibold">
                Jornada Concluída com Sucesso
              </p>
              <Sparkles className="w-8 h-8 text-emerald-400 animate-spin" />
            </div>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Em breve, nossa equipe entrará em contato para uma demonstração personalizada das soluções PayPal
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <Card className="p-6 bg-white/10 backdrop-blur-xl border-emerald-400/30">
              <CardContent className="text-center p-0">
                <Calendar className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Próximos Passos
                </h3>
                <p className="text-gray-300">
                  Demonstração personalizada em até 24h
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white/10 backdrop-blur-xl border-teal-400/30">
              <CardContent className="text-center p-0">
                <Gift className="w-12 h-12 text-teal-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Benefício Exclusivo
                </h3>
                <p className="text-gray-300">
                  Sem taxa de setup para novos clientes
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white/10 backdrop-blur-xl border-yellow-400/30">
              <CardContent className="text-center p-0">
                <MessageSquare className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Suporte Dedicado
                </h3>
                <p className="text-gray-300">
                  Acompanhamento durante implementação
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="space-y-6"
          >
            <Card className="p-8 bg-white/10 backdrop-blur-xl border-white/20">
              <CardContent className="text-center p-0">
                <QrCode className="w-16 h-16 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Compartilhe esta Experiência
                </h3>
                <p className="text-gray-300 mb-6">
                  Escaneie o QR Code para acessar materiais exclusivos do PayPal
                </p>
                
                {/* QR Code Placeholder */}
                <div className="w-48 h-48 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-2xl">
                  <div className="w-40 h-40 bg-gradient-to-br from-paypal-dark to-paypal-primary rounded-xl flex items-center justify-center">
                    <QrCode className="w-24 h-24 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={() => window.location.reload()}
              size="lg"
              className="px-12 py-6 text-lg font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-teal-500 hover:to-emerald-500 text-white rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Iniciar Nova Jornada
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={backgroundStyle.className}
      style={backgroundStyle.style}
    >


      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 md:px-6 xl:px-12 py-4 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-8"
        >

          
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight">
            Deixe seus dados para contato
          </h1>
          
          <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-4 md:mb-6 max-w-2xl mx-auto leading-relaxed">
            Preencha seus dados para que possamos entrar em contato:
          </p>
        </motion.div>

        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-4 md:p-6 lg:p-8 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
              <CardHeader className="text-center pb-3 md:pb-4">
                <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold text-white flex items-center justify-center gap-2 md:gap-3">
                  <User className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-paypal-light" />
                  Informações de Contato
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Name and Email Row - Single column on tablet for better keyboard experience */}
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-base font-medium text-gray-300 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Nome Completo *
                    </label>
                    <Input
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Seu nome completo"
                      className="h-12 md:h-14 text-base bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-paypal-light rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-base font-medium text-gray-300 flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      E-mail *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="seu@email.com"
                      className="h-12 md:h-14 text-base bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-paypal-light rounded-xl"
                    />
                  </div>
                </div>

                {/* Phone and Company Row - Single column on tablet for better keyboard experience */}
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-base font-medium text-gray-300 flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      Telefone *
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="h-12 md:h-14 text-base bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-paypal-light rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-base font-medium text-gray-300 flex items-center gap-2">
                      <Building className="w-5 h-5" />
                      Empresa *
                    </label>
                    <Input
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Nome da sua empresa"
                      className="h-12 md:h-14 text-base bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-paypal-light rounded-xl"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2 md:pt-4">
                  <Button
                    onClick={handleSubmit}
                    disabled={!isFormValid || isSubmitting}
                    variant="paypal-primary"
                    size="lg"
                    className="w-full h-12 md:h-16 text-lg md:text-xl font-semibold"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </div>
                    ) : isFormValid ? (
                      'Enviar dados'
                    ) : (
                      'Preencha os campos obrigatórios'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 