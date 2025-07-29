import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  QrCode,
  Calendar,
  MessageSquare,
  AlertCircle,
  Check
} from 'lucide-react'
import { useJourney } from '@/context/JourneyProvider'
import { useNavigate } from '@tanstack/react-router'
import { useBackground } from '@/hooks/useBackground'
import { useTabletOptimization } from '@/hooks/useTabletOptimization'
import confetti from 'canvas-confetti'
import React from 'react'

// Validation utilities
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePhone = (phone: string): boolean => {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '')
  // Brazilian phone: 10 or 11 digits (with area code)
  return digits.length >= 10 && digits.length <= 11
}

const validateName = (name: string): boolean => {
  return name.trim().length >= 2
}

const validateCompany = (company: string): boolean => {
  return company.trim().length >= 2
}

// Phone mask utility for Brazilian format
const formatPhoneNumber = (value: string): string => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '')
  
  // Limit to 11 digits
  const limitedDigits = digits.slice(0, 11)
  
  // Apply Brazilian phone format
  if (limitedDigits.length <= 2) {
    return limitedDigits
  } else if (limitedDigits.length <= 6) {
    return `(${limitedDigits.slice(0, 2)}) ${limitedDigits.slice(2)}`
  } else if (limitedDigits.length <= 10) {
    return `(${limitedDigits.slice(0, 2)}) ${limitedDigits.slice(2, 6)}-${limitedDigits.slice(6)}`
  } else {
    return `(${limitedDigits.slice(0, 2)}) ${limitedDigits.slice(2, 7)}-${limitedDigits.slice(7)}`
  }
}

interface ValidationState {
  fullName: { isValid: boolean; error: string }
  email: { isValid: boolean; error: string }
  phone: { isValid: boolean; error: string }
  company: { isValid: boolean; error: string }
}

// Input field component with validation - moved outside to prevent re-renders
const InputField = React.memo(({ 
  label, 
  type, 
  value, 
  field, 
  placeholder, 
  icon: Icon,
  inputMode,
  validation,
  touched,
  onInputChange,
  onInputBlur,
  tabletOptimization
}: {
  label: string
  type: string
  value: string
  field: keyof ValidationState
  placeholder: string
  icon: any
  inputMode?: string
  validation: ValidationState[keyof ValidationState]
  touched: boolean
  onInputChange: (field: keyof ValidationState, value: string) => void
  onInputBlur: (field: keyof ValidationState) => void
  tabletOptimization: ReturnType<typeof useTabletOptimization>
}) => {
  const showError = touched && !validation.isValid && value
  const showSuccess = touched && validation.isValid && value
  const { isTablet, focusedInput, getContactInputClass, handleInputFocus } = tabletOptimization
  const [isFocused, setIsFocused] = React.useState(false)

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    if (isTablet) {
      handleInputFocus(e.target)
    }
  }

  const handleBlur = () => {
    setIsFocused(false)
    onInputBlur(field)
  }

  return (
    <div className={`space-y-2 ${getContactInputClass('', isFocused)}`}>
      <label className="text-base font-medium text-gray-300 flex items-center gap-2">
        <Icon className="w-5 h-5" />
        {label} *
      </label>
      <div className="relative">
        <Input
          type={type}
          inputMode={inputMode as any}
          value={value}
          onChange={(e) => onInputChange(field, e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`h-12 md:h-14 text-base bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-paypal-light rounded-xl pr-10 transition-all duration-200 ${
            showError ? 'border-red-500 focus:border-red-500' :
            showSuccess ? 'border-green-500 focus:border-green-500' : ''
          }`}
        />
        
        {/* Validation Icons */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {showError && (
            <AlertCircle className="w-5 h-5 text-red-500" />
          )}
          {showSuccess && (
            <Check className="w-5 h-5 text-green-500" />
          )}
        </div>
      </div>
      
      {/* Error Message */}
      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-red-400 flex items-center gap-1"
          >
            <AlertCircle className="w-4 h-4" />
            {validation.error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

export default function ContactExperience() {
  const navigate = useNavigate()
  const { updateData, saveJourney } = useJourney()
  const { getBackgroundStyle } = useBackground()
  const tabletOptimization = useTabletOptimization()
  const { getContactContainerClass } = tabletOptimization
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: ''
  })
  
  const [validation, setValidation] = useState<ValidationState>({
    fullName: { isValid: false, error: '' },
    email: { isValid: false, error: '' },
    phone: { isValid: false, error: '' },
    company: { isValid: false, error: '' }
  })
  
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    phone: false,
    company: false
  })
  
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Real-time validation
  useEffect(() => {
    setValidation({
      fullName: {
        isValid: validateName(formData.fullName),
        error: formData.fullName && !validateName(formData.fullName) ? 'Nome deve ter pelo menos 2 caracteres' : ''
      },
      email: {
        isValid: validateEmail(formData.email),
        error: formData.email && !validateEmail(formData.email) ? 'Email inválido' : ''
      },
      phone: {
        isValid: validatePhone(formData.phone),
        error: formData.phone && !validatePhone(formData.phone) ? 'Telefone deve ter 10 ou 11 dígitos' : ''
      },
      company: {
        isValid: validateCompany(formData.company),
        error: formData.company && !validateCompany(formData.company) ? 'Nome da empresa deve ter pelo menos 2 caracteres' : ''
      }
    })
  }, [formData])

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    if (field === 'phone') {
      // Apply phone mask
      const maskedValue = formatPhoneNumber(value)
      setFormData(prev => ({ ...prev, [field]: maskedValue }))
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleInputBlur = (field: keyof typeof formData) => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  const handleSubmit = async () => {
    // Mark all fields as touched for validation display
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      company: true
    })

    // Check if form is valid
    const isFormValid = Object.values(validation).every(field => field.isValid)
    if (!isFormValid) {
      return
    }

    setIsSubmitting(true)
    
    console.log('📝 [CONTACT-SUBMIT] Submitting contact form:', formData);
    
    // Prepare journey data with contact and completion
    const journeyUpdates = { 
      contact: formData,
      completedAt: new Date()
    }
    
    // Update state
    updateData(journeyUpdates)
    
    // Save journey with explicit contact data to avoid React state timing issues
    await saveJourney(journeyUpdates)
    
    console.log('✅ [CONTACT-SUBMIT] Journey saved with contact data');
    
    // Trigger confetti celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
    
    // Simulate API call and navigate to success
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      navigate({ to: '/success' })
    }, 2000)
  }

  const isFormValid = Object.values(validation).every(field => field.isValid) && 
                     Object.values(formData).every(value => value.trim() !== '')

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
      className={getContactContainerClass(backgroundStyle.className)}
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
                {/* Name and Email Row */}
                <div className="grid gap-4 lg:grid-cols-2">
                  <InputField
                    label="Nome Completo"
                    type="text"
                    value={formData.fullName}
                    field="fullName"
                    placeholder="Seu nome completo"
                    icon={User}
                    inputMode="text"
                    validation={validation.fullName}
                    touched={touched.fullName}
                    onInputChange={handleInputChange}
                    onInputBlur={handleInputBlur}
                    tabletOptimization={tabletOptimization}
                  />

                  <InputField
                    label="E-mail"
                    type="email"
                    value={formData.email}
                    field="email"
                    placeholder="seu@email.com"
                    icon={Mail}
                    inputMode="email"
                    validation={validation.email}
                    touched={touched.email}
                    onInputChange={handleInputChange}
                    onInputBlur={handleInputBlur}
                    tabletOptimization={tabletOptimization}
                  />
                </div>

                {/* Phone and Company Row */}
                <div className="grid gap-4 lg:grid-cols-2">
                  <InputField
                    label="Telefone"
                    type="tel"
                    value={formData.phone}
                    field="phone"
                    placeholder="(11) 99999-9999"
                    icon={Phone}
                    inputMode="tel"
                    validation={validation.phone}
                    touched={touched.phone}
                    onInputChange={handleInputChange}
                    onInputBlur={handleInputBlur}
                    tabletOptimization={tabletOptimization}
                  />

                  <InputField
                    label="Empresa"
                    type="text"
                    value={formData.company}
                    field="company"
                    placeholder="Nome da sua empresa"
                    icon={Building}
                    inputMode="text"
                    validation={validation.company}
                    touched={touched.company}
                    onInputChange={handleInputChange}
                    onInputBlur={handleInputBlur}
                    tabletOptimization={tabletOptimization}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2 md:pt-4">
                  <Button
                    onClick={handleSubmit}
                    disabled={!isFormValid || isSubmitting}
                    variant="paypal-primary"
                    size="lg"
                    className={`w-full h-12 md:h-16 text-lg md:text-xl font-semibold transition-all duration-200 ${
                      isFormValid ? 'transform hover:scale-[1.02]' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </div>
                    ) : isFormValid ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        Enviar dados
                      </div>
                    ) : (
                      'Preencha todos os campos obrigatórios'
                    )}
                  </Button>
                </div>

                {/* Form Progress Indicator */}
                <div className="pt-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <div className="flex gap-1">
                      {Object.entries(validation).map(([field, { isValid }]) => (
                        <div
                          key={field}
                          className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                            isValid ? 'bg-green-500' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span>
                      {Object.values(validation).filter(v => v.isValid).length}/4 campos preenchidos
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 