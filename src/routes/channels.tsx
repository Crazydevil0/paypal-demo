import { createFileRoute } from '@tanstack/react-router'
import ChannelsExperience from '@/components/experiences/ChannelsExperience'

export const Route = createFileRoute('/channels')({
  component: ChannelsExperience,
}) 