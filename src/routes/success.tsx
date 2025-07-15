import { createFileRoute } from '@tanstack/react-router'
import SuccessExperience from '@/components/experiences/SuccessExperience'

export const Route = createFileRoute('/success')({
  component: SuccessExperience,
}) 