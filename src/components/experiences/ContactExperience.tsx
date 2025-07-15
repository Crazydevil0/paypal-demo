import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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
  const { getBackgroundStyle, isGradientBackground } = useBackground()
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    message: ''
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

  const isFormValid = formData.fullName && formData.email && formData.company

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
      {/* Animated Background */}
      {isGradientBackground() && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-paypal-light rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-8 xl:px-12 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >

          
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Entre em contato para uma demonstração
            <GradientHighlight> personalizada</GradientHighlight>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            Deixe seus dados para receber uma demonstração personalizada da solução PayPal ideal para você
          </p>
        </motion.div>

        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-6 md:p-8 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl md:text-2xl font-bold text-white flex items-center justify-center gap-3">
                  <User className="w-6 h-6 md:w-8 md:h-8 text-paypal-light" />
                  Informações de Contato
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 md:space-y-6">
                {/* Name and Email Row */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-base font-medium text-gray-300 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Nome Completo *
                    </label>
                    <Input
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Seu nome completo"
                      className="h-14 text-base bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-paypal-light rounded-xl"
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
                      className="h-14 text-base bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-paypal-light rounded-xl"
                    />
                  </div>
                </div>

                {/* Phone and Company Row */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-base font-medium text-gray-300 flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      Telefone
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="h-14 text-base bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-paypal-light rounded-xl"
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
                      className="h-14 text-base bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-paypal-light rounded-xl"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-base font-medium text-gray-300 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Mensagem (Opcional)
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Conte mais sobre seus objetivos ou dúvidas específicas..."
                    rows={3}
                    className="text-base bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-paypal-light rounded-xl min-h-[80px]"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    onClick={handleSubmit}
                    disabled={!isFormValid || isSubmitting}
                    size="lg"
                    className={`
                      w-full h-16 text-xl font-semibold rounded-2xl shadow-2xl transition-all duration-300
                      ${isFormValid && !isSubmitting
                        ? 'bg-gradient-to-r from-paypal-primary to-paypal-light hover:from-paypal-light hover:to-paypal-primary text-white transform hover:scale-105 shadow-paypal-primary/30'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      }
                    `}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </div>
                    ) : isFormValid ? (
                      <div className="flex items-center gap-3">
                        <Zap className="w-6 h-6" />
                        Finalizar Jornada
                        <ArrowRight className="w-6 h-6" />
                      </div>
                    ) : (
                      'Preencha os campos obrigatórios'
                    )}
                  </Button>

                  {isFormValid && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-base text-gray-400 mt-4 text-center"
                    >
                      Nossa equipe entrará em contato em até 24 horas
                    </motion.p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 