import { redirect } from 'next/navigation'

import { LogoutButton } from '@/components/logout-button'
import { getUserSession } from '@/lib/auth'
import { DashboardContent } from '@/components/dashboard/dashboard-content'

export default async function ProfilePage() {
  const { username, isLoggedIn  } = await getUserSession()
  if (!isLoggedIn || !username) redirect('/auth/login')

  return (
    <main>
      <DashboardContent user={username}/>
    </main>
  )
}
