// Content system for PayPal Demo - Based on legacy reference project
// All text content, media, and copy extracted from legacy-read-only

import { 
  getBrandAsset, 
  getAvatar, 
  getBusinessIcon, 
  getProductImage,
  getBackground
} from '@/lib/icons'

// ===== MEDIA ASSETS =====
export const MEDIA = {
  // Brand assets
  logo: getBrandAsset('paypalMonogram'),
  logoSvg: getBrandAsset('paypalLogo'),
  paypalBackground: getBackground('paypalBackground'),
  
  // Business icons
  icons: {
    acquirer: getBusinessIcon('acquirer'),
    cartao: getBusinessIcon('card'),
    fraud: getBusinessIcon('fraud'),
    global: getBusinessIcon('global'),
    redes: getBusinessIcon('networks'),
    site: getBusinessIcon('site'),
  },
  
  // Avatars
  avatars: {
    ana: getAvatar('ana'),
    leo: getAvatar('leo'),
    robot: getAvatar('robot'),
  },
  
  // Product images
  products: {
    phonePayment: getProductImage('phonePayment'),
    pay: getBackground('payImage'),
    pagamento1: getProductImage('payment1'),
    pagamento2: getProductImage('payment2'),
    braintreeCheckout1: getProductImage('braintreeCheckout1'),
    braintreeCheckout2: getProductImage('braintreeCheckout2'),
    trofeu: getBrandAsset('trophy'),
    grandeEmpresa: getBackground('largeBusiness'),
    pequenaMedia: getBackground('smallMediumBusiness'),
  },
  
  // Videos (from legacy project)
  videos: {
    braintreeMerchantDashboard: new URL('../assets/Braintree Merchant Dashboard.mov', import.meta.url).href,
    braintreeDCC: new URL('../assets/Braintree DCC.mov', import.meta.url).href,
    bcdcCheckout: new URL('../assets/BCDC Checkout.mov', import.meta.url).href,
    // New single videos
    ppcpCompletePayments: new URL('../assets/PayPal Complete Payments.mp4', import.meta.url).href,
    braintreeDemo: new URL('../assets/PayPal Braintree.mp4', import.meta.url).href,
  }
} as const

// ===== PAGE CONTENT =====

// Welcome Experience (Boas-vindas)
export const WELCOME_CONTENT = {
  title: "Boas-vindas",
  mainHeadlines: [
    "Imagine sua próxima venda...",
    "sem barreiras e sem fronteiras.",
    "Quer vender mais e facilitar a vida dos seus clientes?"
  ],
  cta: {
    text: "Vamos começar sua jornada",
    description: "Imagine sua próxima venda sem barreiras e sem fronteiras"
  }
} as const

// Profile Experience (Perfil)
export const PROFILE_CONTENT = {
  subtitle: "Conte mais sobre você.",
  title: "Como você se identifica no mercado hoje?",
  options: [
    {
      id: 'small-medium' as const,
      title: "Pequena/média empresa"
    },
    {
      id: 'large-enterprise' as const, 
      title: "Grande empresa"
    }
  ]
} as const

// Channels Experience (Local Cliente)
export const CHANNELS_CONTENT = {
  subtitle: "Onde sua história acontece?",
  title: "Todo herói tem seu território. Onde seus clientes te encontram?",
  options: [
    {
      id: 'website' as const,
      title: "Website/E-commerce", 
      description: "Venda online através do seu site ou loja virtual",
      text: "Tenho um site, mas vendo mais fora dele.",
      icon: MEDIA.icons.site,
      benefits: ['Alcance global', 'Vendas 24/7', 'Escalabilidade'],
      features: ['Checkout integrado', 'Analytics avançado', 'SEO otimizado'],
      bgPattern: '🌐'
    },
    {
      id: 'social-media' as const,
      title: "Redes Sociais",
      description: "Instagram, Facebook, TikTok e outras plataformas", 
      text: "Não tenho site, meu negócio vive nas redes sociais.",
      icon: MEDIA.icons.redes,
      benefits: ['Engajamento direto', 'Audiência jovem', 'Viral marketing'],
      features: ['Stories Shopping', 'Live Commerce', 'Influencer tools'],
      bgPattern: '📱'
    },
    {
      id: 'ecommerce' as const,
      title: "Marketplaces",
      description: "Amazon, Mercado Livre, Shopee e similares",
      text: "Tenho site com grande volume de vendas.",
      icon: MEDIA.icons.cartao,
      benefits: ['Tráfego garantido', 'Confiança do cliente', 'Logística facilitada'],
      features: ['Fulfillment', 'Prime delivery', 'Review system'],
      bgPattern: '🛒'
    }
  ]
} as const

// Challenges Experience (Vilões)
export const CHALLENGES_CONTENT = {
  title: "Quem são os vilões do seu negócio?",
  subtitle: "Identifique os principais desafios que impedem seu crescimento",
  description: "(Você pode escolher até 3)",
  options: [
    {
      id: 'cart-abandonment' as const,
      title: "Abandono de Carrinho",
      description: "Clientes desistem antes de finalizar a compra",
      text: "Clientes abandonam o carrinho",
      stats: "70% dos carrinhos são abandonados",
      solution: "Checkout simplificado com PayPal"
    },
    {
      id: 'slow-checkout' as const,
      title: "Checkout Demorado", 
      description: "Processo de pagamento complexo e lento",
      text: "Checkout muito demorado",
      stats: "3+ minutos para finalizar",
      solution: "One-Click com PayPal Express"
    },
    {
      id: 'global-scaling' as const,
      title: "Expansão Global",
      description: "Dificuldade para vender em outros países",
      text: "Limitações para escalar globalmente", 
      stats: "150+ moedas suportadas",
      solution: "PayPal Global Solutions"
    },
    {
      id: 'payment-reliability' as const,
      title: "Meios de Pagamento",
      description: "Falta de opções de pagamento confiáveis",
      text: "Não tenho meios de pagamento confiáveis",
      stats: "99.9% de uptime",
      solution: "Infraestrutura PayPal"
    },
    {
      id: 'social-commerce' as const,
      title: "Vendas Sociais",
      description: "Dificuldade para cobrar por redes sociais",
      text: "Recebo pedidos pelas redes sociais, mas não tenho como cobrar",
      stats: "Integração nativa",
      solution: "PayPal Social Commerce"
    },
    {
      id: 'fraud-chargebacks' as const,
      title: "Fraudes e Chargebacks", 
      description: "Problemas com segurança e disputas",
      text: "Fraudes e chargebacks",
      stats: "Proteção avançada",
      solution: "PayPal Seller Protection"
    }
  ]
} as const

// Solutions Experience (Solução)
export const SOLUTIONS_CONTENT = {
  title: "Sua empresa está pronta para o futuro?",
  subtitle: "Descubra a solução ideal para o seu negócio:",
  description: "Com base no seu perfil e desafios, recomendamos:",
  
  solutions: {
    'complete-payments': {
      id: 'complete-payments' as const,
      title: 'PayPal Complete Payments',
      subtitle: 'Solução ideal para pequenas e médias empresas',
      description: 'Plataforma completa de pagamentos com checkout otimizado, proteção contra fraudes e ferramentas de crescimento.',
      icon: 'CreditCard',
      color: 'from-blue-500 to-blue-600',
      // Main benefits for intro pages  
      mainBenefits: [
        {
          title: "Cresça seu negócio",
          description: "Ferramentas e insights para expandir suas vendas",
          icon: MEDIA.icons.acquirer
        },
        {
          title: "Aumente as taxas de conversão", 
          description: "Checkout otimizado para maximizar vendas",
          icon: MEDIA.icons.global
        },
        {
          title: "Integre e habilite com facilidade",
          description: "Setup simples e rápido para começar a vender",
          icon: MEDIA.icons.fraud
        }
      ],
      // More benefits from legacy project
      moreBenefits: [
        "Mais conversão",
        "Checkout rápido", 
        "Carteiras digitais",
        "Segurança antifraude",
        "Adquirência própria no Brasil"
      ],
      // Media assets
      media: {
        phonePayment: MEDIA.products.phonePayment,
        pagamento1: MEDIA.products.pagamento1,
        pagamento2: MEDIA.products.pagamento2,
        checkoutVideo: MEDIA.videos.ppcpCompletePayments
      }
    },
    'braintree': {
      id: 'braintree' as const,
      title: 'PayPal Braintree',
      subtitle: 'Solução avançada para grandes empresas',
      description: 'Plataforma de pagamentos de nível empresarial com controle total, customização avançada e infraestrutura global.',
      icon: 'Building',
      color: 'from-blue-600 to-blue-400',
      // Main benefits for intro pages
      mainBenefits: [
        {
          title: "Adquirência própria",
          description: "Controle total sobre o processamento de pagamentos",
          icon: MEDIA.icons.acquirer
        },
        {
          title: "Única integração, alcance global", 
          description: "Uma API para processar pagamentos em todo o mundo",
          icon: MEDIA.icons.global
        },
        {
          title: "Proteção contra fraudes avançadas*",
          description: "Segurança de nível empresarial com IA e machine learning",
          icon: MEDIA.icons.fraud
        }
      ],
      // More benefits from legacy project - complete list
      moreBenefits: [
        "Adquirência própria",
        "Tokenização com as Bandeiras (NT) + Pass Through",
        "Parcelamento em até 12 vezes",
        "Antecipação de recebíveis*",
        "Débito sem uso de PIN",
        "3DS 2.0 e Data Only",
        "Account updater",
        "Carta de circularização",
        "Proteção contra chargebacks*",
        "Filtros de risco robustos",
        "Painel de controle global",
        "Carteiras Digitais (PayPal, Apple Pay, Google Pay)"
      ],

      // Media assets
      media: {
        checkout1: MEDIA.products.braintreeCheckout1,
        checkout2: MEDIA.products.braintreeCheckout2,
        demoVideo: MEDIA.videos.braintreeDemo
      }
    }
  }
} as const


// Contact Experience (Ação) 
export const CONTACT_CONTENT = {
  title: "Deixe seus dados para contato",
  subtitle: "Quase terminamos!",
  description: "Preencha seus dados para que possamos entrar em contato:",
  
  fields: {
    fullName: {
      label: "Nome Completo",
      placeholder: "Digite seu nome completo"
    },
    email: {
      label: "E-mail",
      placeholder: "seu@email.com"
    },
    phone: {
      label: "Telefone",
      placeholder: "(11) 99999-9999"
    },
    company: {
      label: "Empresa",
      placeholder: "Nome da sua empresa"
    },
    message: {
      label: "Mensagem (opcional)",
      placeholder: "Conte-nos mais sobre suas necessidades..."
    }
  },
  
  validation: {
    required: "Por favor, preencha pelo menos um: E-mail ou Telefone",
    emailInvalid: "Por favor, insira um e-mail válido",
    phoneInvalid: "Por favor, insira um telefone válido"
  },
  
  cta: {
    text: "Finalizar Jornada",
    loadingText: "Salvando..."
  }
} as const

// Success Experience (Fim)
export const SUCCESS_CONTENT = {
  title: "Missão\nCumprida.",
  message: "Sua história de <highlight>sucesso</highlight> está só começando!",
  cta: {
    text: "Recomeçar jornada",
    description: "Obrigado por conhecer as soluções PayPal!"
  },
  media: {
    celebration: MEDIA.products.pay,
    trophy: MEDIA.products.trofeu
  }
} as const

// Navigation and UI
export const UI_CONTENT = {
  navigation: {
    back: "← Voltar",
    continue: "Continuar",
    next: "Próximo",
    finish: "Finalizar",
    restart: "Recomeçar"
  },
  
  steps: {
    welcome: "Bem-vindos",
    // Step indicators removed - cleaner UI without step counters
    contact: "Passo Final"
  },
  
  loading: {
    saving: "Salvando...",
    loading: "Carregando...",
    processing: "Processando..."
  },
  
  validation: {
    selectAtLeastOne: "Selecione pelo menos uma opção",
    required: "Este campo é obrigatório",
    invalidEmail: "E-mail inválido",
    invalidPhone: "Telefone inválido"
  }
} as const

// Chat and Interactive Features (from legacy ChatIA)
export const CHAT_CONTENT = {
  title: "Converse com nosso assistente",
  placeholder: "Digite sua pergunta",
  buttons: {
    send: "Enviar",
    microphone: "Clique para falar",
    keyboard: "Abrir teclado",
    back: "← Voltar ao início"
  },
  
  defaultMessages: [
    "Olá! Como posso ajudá-lo com soluções de pagamento PayPal?",
    "Estou aqui para esclarecer suas dúvidas sobre nossos produtos.",
    "Que tipo de negócio você possui?"
  ],
  
  suggestions: [
    "Como integrar PayPal no meu site?",
    "Quais são as taxas?", 
    "PayPal funciona no exterior?",
    "Como proteger contra fraudes?"
  ]
} as const

// Export and Analytics (from legacy Exportar)
export const EXPORT_CONTENT = {
  title: "Exportar Jornadas",
  description: "Gerencie e exporte dados das jornadas dos usuários",
  
  stats: {
    total: "Total registrado:",
    noData: "Nenhuma jornada para exportar."
  },
  
  buttons: {
    export: "📊 Baixar Excel",
    clear: "🗑️ Apagar tudo"
  },
  
  filename: "jornadas_paypal.xlsx",
  
  columns: {
    data: "Data",
    email: "Email", 
    fullName: "Nome",
    phone: "Telefone",
    company: "Empresa",
    perfil: "Perfil",
    canal: "Canais", 
    desafios: "Desafios"
  }
} as const

// Content helper functions
export const getPageContent = (page: string) => {
  const contentMap = {
    welcome: WELCOME_CONTENT,
    profile: PROFILE_CONTENT,
    channels: CHANNELS_CONTENT,
    challenges: CHALLENGES_CONTENT,
    solutions: SOLUTIONS_CONTENT,
    contact: CONTACT_CONTENT,
    success: SUCCESS_CONTENT,
    chat: CHAT_CONTENT,
    export: EXPORT_CONTENT
  }
  
  return contentMap[page as keyof typeof contentMap]
}

export const getUIText = (key: string) => {
  const keys = key.split('.')
  let value: any = UI_CONTENT
  
  for (const k of keys) {
    value = value?.[k]
  }
  
  return value || key
}

export const formatMessage = (message: string, values: Record<string, string> = {}) => {
  return message.replace(/<([^>]+)>/g, (match, key) => {
    return values[key] || match
  })
}

// Type exports for TypeScript support
export type PageContentKey = 'welcome' | 'profile' | 'channels' | 'challenges' | 'solutions' | 'ppcp' | 'braintree' | 'contact' | 'success' | 'chat' | 'export'
export type ProfileOption = typeof PROFILE_CONTENT.options[number]
export type ChannelOption = typeof CHANNELS_CONTENT.options[number] 
export type ChallengeOption = typeof CHALLENGES_CONTENT.options[number]
export type SolutionKey = keyof typeof SOLUTIONS_CONTENT.solutions 