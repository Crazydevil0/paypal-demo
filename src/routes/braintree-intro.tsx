import { createFileRoute } from '@tanstack/react-router'
import BraintreeIntroExperience from '@/components/experiences/BraintreeIntroExperience'

export const Route = createFileRoute('/braintree-intro')({
  component: BraintreeIntroExperience,
}) 