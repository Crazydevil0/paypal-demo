import { createFileRoute } from '@tanstack/react-router';
import AdminJourneys from '../pages/AdminJourneys';

export const Route = createFileRoute('/admin-journeys')({
  component: AdminJourneys,
}); 