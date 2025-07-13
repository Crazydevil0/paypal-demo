import { createFileRoute } from '@tanstack/react-router'
import WelcomeExperience from '@/components/experiences/WelcomeExperience'

export const Route = createFileRoute('/')({
  component: WelcomeExperience,
}) 