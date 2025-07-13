// Journey types
export type BusinessProfile = "small-medium" | "enterprise" | null;
export type SalesChannel = "website" | "social-media" | "ecommerce";

// PayPal product types
export type PayPalProduct = "ppcp" | "braintree";

// Journey data interface
export interface JourneyData {
  profile: BusinessProfile;
  channels: SalesChannel[];
  challenges: string[];
  email?: string;
  fullName?: string;
  phone?: string;
  company?: string;
  product?: PayPalProduct;
  completedAt?: Date;
}

// Business challenges/pain points
export const BUSINESS_CHALLENGES = [
  {
    id: "cart-abandonment",
    text: "Customers abandon their shopping cart",
    icon: "ShoppingCart"
  },
  {
    id: "slow-checkout",
    text: "Checkout process is too slow",
    icon: "Clock"
  },
  {
    id: "no-pix",
    text: "I don't accept Pix payments",
    icon: "CreditCard"
  },
  {
    id: "payment-security",
    text: "I don't have secure payment methods",
    icon: "Shield"
  },
  {
    id: "whatsapp-payments",
    text: "I receive orders via WhatsApp but don't have payment links",
    icon: "MessageCircle"
  }
] as const;

// Sales channels
export const SALES_CHANNELS = [
  {
    id: "website" as const,
    text: "I have a website, but sell more outside of it",
    icon: "Globe"
  },
  {
    id: "social-media" as const,
    text: "I don't have a website, my business lives on social media",
    icon: "Users"
  },
  {
    id: "ecommerce" as const,
    text: "I have a website with high sales volume",
    icon: "ShoppingBag"
  }
] as const;

// PayPal Complete Payments benefits
export const PPCP_BENEFITS = [
  "Higher conversion rates",
  "Fast checkout",
  "Digital wallets support",
  "Anti-fraud security",
  "Own acquiring in Brazil"
] as const;

// PayPal Braintree benefits
export const BRAINTREE_BENEFITS = [
  "Own acquiring",
  "Tokenization with card networks (NT) + Pass Through",
  "Installments up to 12x",
  "Receivables anticipation*",
  "Debit without PIN",
  "3DS 2.0 and Data Only",
  "Account updater",
  "Circulation letter",
  "Chargeback protection*",
  "Robust risk filters",
  "Global control panel",
  "Digital Wallets (PayPal, Apple Pay, Google Pay)"
] as const;

// App settings
export const APP_CONFIG = {
  AUTO_ADVANCE_DELAY: 6000, // 6 seconds
  AUTO_RESTART_DELAY: 10000, // 10 seconds
  TYPING_SPEED: 50, // milliseconds per character
  ANIMATION_DURATION: 300, // milliseconds
} as const;

// PayPal brand colors
export const PAYPAL_COLORS = {
  primary: "#0070E0",
  dark: "#003087", 
  light: "#6CC3FF",
  secondary: "#FFC439",
  gray: "#f2f4f7",
  text: "#1a1a1a",
  white: "#ffffff"
} as const; 