/**
 * PayPal Design System Tokens
 * Extracted from legacy project and standardized for consistent usage
 */

// ============ COLORS ============
export const colors = {
  // Primary PayPal Brand Colors
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe', 
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0070E0', // Main PayPal blue
    600: '#0059b2', // Hover state
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
  
  // PayPal Secondary Colors
  secondary: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#FFC439', // PayPal yellow/gold
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
    950: '#422006',
  },

  // PayPal Dark/Navy
  dark: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#003087', // PayPal navy
    900: '#011436', // PayPal dark
    950: '#020617',
  },

  // PayPal Light Blue/Cyan  
  light: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#6CC3FF', // PayPal light blue
    600: '#009CDE', // PayPal QR blue
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
    950: '#083344',
  },

  // Neutral Grays
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#f2f4f7', // PayPal gray background
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1a1a1a', // Text dark
    900: '#111827',
    950: '#030712',
  },

  // Status Colors
  success: {
    500: '#10b981',
    600: '#059669',
  },
  warning: {
    500: '#f59e0b',
    600: '#d97706',
  },
  error: {
    500: '#ef4444',
    600: '#dc2626',
  },

  // Semantic Colors (mapped to PayPal colors)
  background: {
    primary: '#ffffff',
    secondary: '#f2f4f7',
    dark: '#011436',
    overlay: 'rgba(255,255,255,0.15)',
  },
  
  text: {
    primary: '#1a1a1a',
    secondary: '#6b7280',
    inverse: '#ffffff',
    muted: '#9ca3af',
    accent: '#0070E0',
    highlight: '#6CC3FF',
  },
} as const;

// ============ TYPOGRAPHY ============
export const typography = {
  fontFamily: {
    primary: ['PayPal Sans', 'Helvetica Neue', 'Arial', 'sans-serif'],
    secondary: ['Inter', 'system-ui', 'sans-serif'],
  },
  
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
    '8xl': '6rem',    // 96px
  },
  
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.4', // PayPal default
    relaxed: '1.625',
    loose: '2',
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// ============ SPACING ============
export const spacing = {
  px: '1px',
  0: '0px',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 240px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  96: '24rem',      // 384px
} as const;

// ============ BORDER RADIUS ============
export const borderRadius = {
  none: '0px',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px - PayPal cards
  full: '9999px',
} as const;

// ============ SHADOWS ============
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)', // PayPal cards
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: '0 0 #0000',
} as const;

// ============ GRADIENTS ============
export const gradients = {
  // PayPal brand gradients using design system colors
  paypalPrimary: `linear-gradient(135deg, ${colors.dark[900]}, ${colors.dark[800]}, ${colors.primary[500]})`,
  paypalSecondary: `linear-gradient(135deg, ${colors.primary[500]}, ${colors.light[500]}, ${colors.primary[600]})`,
  paypalDark: `linear-gradient(135deg, ${colors.dark[900]}, ${colors.dark[800]}, ${colors.dark[700]})`,
  paypalLight: `linear-gradient(135deg, ${colors.light[400]}, ${colors.light[500]}, ${colors.light[600]})`,
  
  // Background gradients for different contexts
  heroBackground: `linear-gradient(135deg, ${colors.dark[900]} 0%, ${colors.dark[800]} 35%, ${colors.primary[600]} 100%)`,
  cardBackground: `linear-gradient(145deg, ${colors.background.primary}ee, ${colors.background.secondary}dd)`,
  overlayGradient: `linear-gradient(180deg, transparent, ${colors.background.overlay})`,
  
  // Subtle gradients for UI elements
  buttonPrimary: `linear-gradient(135deg, ${colors.primary[500]}, ${colors.primary[600]})`,
  buttonSecondary: `linear-gradient(135deg, ${colors.background.secondary}, ${colors.neutral[200]})`,
} as const;

// ============ ANIMATION ============
export const animation = {
  duration: {
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms',
  },
  
  ease: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.2, 1)', // PayPal default
  },
  
  variants: {
    fadeIn: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    
    slideInLeft: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    
    slideInRight: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    
    scaleIn: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    
    staggerChildren: {
      animate: {
        transition: {
          staggerChildren: 0.1,
        },
      },
    },
  },
} as const;

// ============ COMPONENT VARIANTS ============
export const componentVariants = {
  button: {
    primary: {
      background: colors.primary[500],
      backgroundHover: colors.primary[600],
      text: colors.text.inverse,
      border: 'transparent',
    },
    secondary: {
      background: colors.neutral[50],
      backgroundHover: colors.neutral[100],
      text: colors.primary[500],
      border: colors.neutral[200],
    },
    ghost: {
      background: 'transparent',
      backgroundHover: colors.neutral[100],
      text: colors.text.primary,
      border: 'transparent',
    },
  },
  
  card: {
    default: {
      background: colors.background.primary,
      border: colors.neutral[200],
      shadow: shadows.lg,
      radius: borderRadius['3xl'],
    },
    elevated: {
      background: colors.background.primary,
      border: 'transparent',
      shadow: shadows['2xl'],
      radius: borderRadius['3xl'],
    },
  },
  
  input: {
    default: {
      background: colors.background.primary,
      border: colors.neutral[300],
      borderFocus: colors.primary[500],
      text: colors.text.primary,
      placeholder: colors.text.muted,
    },
  },
} as const;

// ============ ICON MAPPINGS ============
export const iconMappings = {
  // Business icons from legacy assets
  business: {
    acquirer: '/src/assets/icon-acquirer.png',
    card: '/src/assets/icon-cartao.png',
    fraud: '/src/assets/icon-fraud.png',
    global: '/src/assets/icon-global.png',
    networks: '/src/assets/icon-redes.png',
    site: '/src/assets/icon-site.png',
  },
  
  // Avatar images
  avatars: {
    ana: '/src/assets/avatar-ana.png',
    leo: '/src/assets/avatar-leo.png',
    robot: '/src/assets/avatar-robo.png',
  },
  
  // Brand assets
  brand: {
    paypalLogo: '/src/assets/paypal-logo.svg',
    trophy: '/src/assets/trofeu.png',
  },
  
  // Product images
  products: {
    payment1: '/src/assets/pagamento1.png',
    payment2: '/src/assets/pagamento2.png',
    phonePayment: '/src/assets/phone-payment.png',
    braintreeCheckout1: '/src/assets/braintree-checkout-1.png',
    braintreeCheckout2: '/src/assets/braintree-checkout-2.png',
  },
  
  // Background images
  backgrounds: {
    paypalBackground: '/src/assets/fundo-paypal.png',
    payImage: '/src/assets/pay.jpg',
    smallMediumBusiness: '/src/assets/pequenas-medias.png',
    largeBusiness: '/src/assets/grande-empresa.png',
  },
} as const;

// ============ BREAKPOINTS ============
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============ Z-INDEX ============
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// ============ EXPORT ALL TOKENS ============
export const designTokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  gradients,
  animation,
  componentVariants,
  iconMappings,
  breakpoints,
  zIndex,
} as const;

export default designTokens; 