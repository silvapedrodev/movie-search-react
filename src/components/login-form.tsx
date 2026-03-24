'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent, CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { IconInput } from './elements/icon-input'
import { InputContainer } from './elements/input-container'

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.refresh()
      router.push('/profile')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className='bg-slate-900 text-white border border-purple-900/30'>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <InputContainer>
                  <IconInput icon={Mail} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-none text-white shadow-none focus-visible:ring-0 selection:bg-purple-550"
                  />
                </InputContainer>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm text-white hover:text-purple-550 underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <InputContainer>
                  <Lock className='size-6 text-slate-400' />
                  <Input
                    id="password"
                    placeholder='Password'
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='border-none text-white shadow-none focus-visible:ring-0 selection:bg-purple-550'
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className='hover:text-foreground transition cursor-pointer'
                  >
                    {showPassword
                      ? <IconInput icon={EyeOff} />
                      : <IconInput icon={Eye} />
                    }
                  </div>
                </InputContainer>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full bg-[linear-gradient(249deg,#030A1B_10%,#9747FF_206.69%)] rounded-lg py-5 hover:cursor-pointer" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className="underline underline-offset-4 hover:text-purple-550">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
