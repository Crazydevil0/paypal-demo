import { createFileRoute } from '@tanstack/react-router'
import BraintreeBenefitsExperience from '@/components/experiences/BraintreeBenefitsExperience'

export const Route = createFileRoute('/braintree-benefits')({
  component: BraintreeBenefitsExperience,
}) 