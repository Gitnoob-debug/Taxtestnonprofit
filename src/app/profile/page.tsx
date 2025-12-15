import { Metadata } from 'next'
import { ProfilePage } from '@/components/ProfilePage'

export const metadata: Metadata = {
  title: 'Profile - Canadian Tax Assistant',
  description: 'Manage your tax profile for personalized advice.',
}

export default function Profile() {
  return <ProfilePage />
}
