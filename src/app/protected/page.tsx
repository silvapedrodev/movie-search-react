import { redirect } from 'next/navigation'

import { LogoutButton } from '@/components/logout-button'
import { getUsername } from '@/lib/supabase/user'

export default async function ProtectedPage() {
  const username = await getUsername()
  if (!username) redirect('/auth/login')

  return (
    <div className="flex h-svh w-full items-center justify-center gap-2">
      <p>
        Hello <span>{username}</span>
      </p>
      <LogoutButton />
    </div>
  )
}
