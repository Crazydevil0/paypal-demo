import { createFileRoute } from '@tanstack/react-router'
import ProfileExperience from '@/components/experiences/ProfileExperience'

export const Route = createFileRoute('/profile')({
  component: ProfileExperience,
}) 