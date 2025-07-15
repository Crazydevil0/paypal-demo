import { createFileRoute } from '@tanstack/react-router'
import BraintreeVideoExperience from '@/components/experiences/BraintreeVideoExperience'

export const Route = createFileRoute('/braintree-video/$videoType')({
  component: () => <BraintreeVideoExperience />
}) 