/**
 * PayPal Icon and Image Mappings
 * Centralized access to all icons and images used in the PayPal demo
 */

// Import all assets - these paths will be resolved by Vite
import iconAcquirer from '@/assets/icon-acquirer.png'
import iconCard from '@/assets/icon-cartao.png'
import iconFraud from '@/assets/icon-fraud.png'
import iconGlobal from '@/assets/icon-global.png'
import iconNetworks from '@/assets/icon-redes.png'
import iconSite from '@/assets/icon-site.png'

import avatarAna from '@/assets/avatar-ana.png'
import avatarLeo from '@/assets/avatar-leo.png'
import avatarRobot from '@/assets/avatar-robo.png'

import paypalLogo from '@/assets/paypal-logo.svg'
import logoPapal from '@/assets/logo-paypal.png'
import paypalMonogram from '@/assets/paypal-monogram.png'
import trophy from '@/assets/trofeu.png'

import payment1 from '@/assets/pagamento1.png'
import payment2 from '@/assets/pagamento2.png'
import phonePayment from '@/assets/phone-payment.png'
import braintreeCheckout1 from '@/assets/braintree-checkout-1.png'
import braintreeCheckout2 from '@/assets/braintree-checkout-2.png'

import paypalBackground from '@/assets/fundo-paypal.png'
import payImage from '@/assets/pay.jpg'
import smallMediumBusiness from '@/assets/pequenas-medias.png'
import largeBusiness from '@/assets/grande-empresa.png'

// ============ ICON CATEGORIES ============

export const businessIcons = {
  acquirer: iconAcquirer,
  card: iconCard,
  fraud: iconFraud,
  global: iconGlobal,
  networks: iconNetworks,
  site: iconSite,
  smallMedium: smallMediumBusiness,
  large: largeBusiness,
} as const

export const avatars = {
  ana: avatarAna,
  leo: avatarLeo,
  robot: avatarRobot,
} as const

export const brandAssets = {
  paypalLogo: paypalLogo,
  logoPaypal: logoPapal,
  paypalMonogram: paypalMonogram,
  trophy: trophy,
} as const

export const productImages = {
  payment1: payment1,
  payment2: payment2,
  phonePayment: phonePayment,
  braintreeCheckout1: braintreeCheckout1,
  braintreeCheckout2: braintreeCheckout2,
} as const

export const backgrounds = {
  paypalBackground: paypalBackground,
  payImage: payImage,
  smallMediumBusiness: smallMediumBusiness,
  largeBusiness: largeBusiness,
} as const

// ============ UNIFIED ICON REGISTRY ============

export const icons = {
  business: businessIcons,
  avatars: avatars,
  brand: brandAssets,
  products: productImages,
  backgrounds: backgrounds,
  global: iconGlobal,
  fraud: iconFraud,
  acquirer: iconAcquirer,
} as const

// ============ ICON SIZE PRESETS ============

export const iconSizes = {
  xs: 'w-4 h-4',      // 16px
  sm: 'w-6 h-6',      // 24px
  md: 'w-8 h-8',      // 32px
  lg: 'w-12 h-12',    // 48px
  xl: 'w-16 h-16',    // 64px
  '2xl': 'w-20 h-20', // 80px
  '3xl': 'w-24 h-24', // 96px
  '4xl': 'w-32 h-32', // 128px
  '5xl': 'w-48 h-48', // 192px
  '6xl': 'w-52 h-52', // 208px
} as const

// ============ HELPER FUNCTIONS ============

/**
 * Get an icon from any category
 */
export function getIcon(category: keyof typeof icons, name: string): string {
  const categoryIcons = icons[category] as Record<string, string>
  return categoryIcons[name] || ''
}

/**
 * Get business icon by name
 */
export function getBusinessIcon(name: keyof typeof businessIcons): string {
  return businessIcons[name]
}

/**
 * Get avatar by name
 */
export function getAvatar(name: keyof typeof avatars): string {
  return avatars[name]
}

/**
 * Get brand asset by name
 */
export function getBrandAsset(name: keyof typeof brandAssets): string {
  return brandAssets[name]
}

/**
 * Get product image by name
 */
export function getProductImage(name: keyof typeof productImages): string {
  return productImages[name]
}

/**
 * Get background image by name
 */
export function getBackground(name: keyof typeof backgrounds): string {
  return backgrounds[name]
}

/**
 * Get icon size class
 */
export function getIconSize(size: keyof typeof iconSizes): string {
  return iconSizes[size]
}

// ============ COMPONENT HELPER TYPES ============

export type IconCategory = keyof typeof icons
export type BusinessIconName = keyof typeof businessIcons
export type AvatarName = keyof typeof avatars
export type BrandAssetName = keyof typeof brandAssets
export type ProductImageName = keyof typeof productImages
export type BackgroundName = keyof typeof backgrounds
export type IconSize = keyof typeof iconSizes

// ============ ICON COMPONENT PROPS ============

export interface IconProps {
  src: string
  alt: string
  size?: IconSize
  className?: string
}

export interface BusinessIconProps {
  name: BusinessIconName
  alt?: string
  size?: IconSize
  className?: string
}

export interface AvatarProps {
  name: AvatarName
  alt?: string
  size?: IconSize
  className?: string
}

// ============ ICON MAPPINGS FOR FEATURES ============

/**
 * Map feature names to their corresponding business icons
 */
export const featureIconMap = {
  // PPCP Features
  'grow-business': businessIcons.acquirer,
  'increase-conversion': businessIcons.global,
  'easy-integration': businessIcons.fraud,
  'secure-payments': businessIcons.card,
  'global-reach': businessIcons.global,
  'network-support': businessIcons.networks,
  
  // Braintree Features
  'own-acquiring': businessIcons.acquirer,
  'global-integration': businessIcons.global,
  'fraud-protection': businessIcons.fraud,
  'payment-methods': businessIcons.card,
  'developer-tools': businessIcons.site,
  'network-optimization': businessIcons.networks,
} as const

/**
 * Get icon for a specific feature
 */
export function getFeatureIcon(feature: keyof typeof featureIconMap): string {
  return featureIconMap[feature] || businessIcons.card
}

export default icons 