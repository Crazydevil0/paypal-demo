import { createFileRoute } from '@tanstack/react-router'
import PPCPVideoExperience from '@/components/experiences/PPCPVideoExperience'

export const Route = createFileRoute('/ppcp-video')({
  component: PPCPVideoExperience,
}) 