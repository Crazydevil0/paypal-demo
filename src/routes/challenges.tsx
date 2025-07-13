import { createFileRoute } from '@tanstack/react-router'
import ChallengesExperience from '@/components/experiences/ChallengesExperience'

export const Route = createFileRoute('/challenges')({
  component: ChallengesExperience,
}) 