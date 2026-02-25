import { redirect } from 'next/navigation'

import { LogoutButton } from '@/components/logout-button'
import { getUserSession } from '@/lib/auth'

export default async function ProfilePage() {
  const { username, isLoggedIn  } = await getUserSession()
  if (!isLoggedIn || !username) redirect('/auth/login')

  return (
    <div className="flex h-svh w-full items-center justify-center gap-2">
      <p>
        Hello <span>{username}</span>
      </p>
      <LogoutButton />
    </div>
  )
}
