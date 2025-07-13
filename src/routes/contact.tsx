import { createFileRoute } from '@tanstack/react-router'
import ContactExperience from '@/components/experiences/ContactExperience'

export const Route = createFileRoute('/contact')({
  component: ContactExperience,
}) 