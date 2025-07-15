import { createFileRoute } from '@tanstack/react-router'
import PPCPIntroExperience from '@/components/experiences/PPCPIntroExperience'

export const Route = createFileRoute('/ppcp-intro')({
  component: PPCPIntroExperience,
}) 