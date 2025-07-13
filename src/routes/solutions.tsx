import { createFileRoute } from '@tanstack/react-router'
import SolutionsExperience from '@/components/experiences/SolutionsExperience'

export const Route = createFileRoute('/solutions')({
  component: SolutionsExperience,
}) 