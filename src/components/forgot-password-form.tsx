'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { InputContainer } from './elements/input-container'
import { IconInput } from './elements/icon-input'
import { ArrowLeft, User } from 'lucide-react'
import { useAuth } from '@/context/auth-context'

export function ForgotPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const { isLoggedIn, email: userEmail } = useAuth()
  const [email, setEmail] = useState(userEmail ?? '')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      })
      if (error) throw error
      setSuccess(true)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      {success ? (
        <Card className='bg-slate-900 text-white border border-purple-900/30'>
          <CardHeader>
            <CardTitle className="text-2xl">Check Your Email</CardTitle>
            <CardDescription>Password reset instructions sent</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              If you registered using your email and password, you will receive a password reset
              email.
            </p>
          </CardContent>
          <Link
            href="/"
            className="mt-3 bg-white/5 mx-auto inline-flex items-center gap-2 
             text-slate-300 hover:text-white hover:bg-purple-550/20 
             px-4 py-2 rounded-md transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>
        </Card>
      ) : (
        <Card className='bg-slate-900 text-white border border-purple-900/30'>
          <CardHeader>
            <CardTitle className="text-2xl">Reset Your Password</CardTitle>
            <CardDescription>
              {isLoggedIn
                ? "We'll send a password reset link to your email"
                : "Type in your email and we'll send you a link to reset your password"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <InputContainer className={`${isLoggedIn ? 'border-slate-700' : 'border-white'}`}>
                    <IconInput icon={User} />
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoggedIn}
                      className='border-none text-white shadow-none focus-visible:ring-0 selection:bg-purple-550'
                    />
                  </InputContainer>
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" className="w-full py-5 bg-[linear-gradient(249deg,#030A1B_10%,#9747FF_206.69%)] cursor-pointer" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send reset email'}
                </Button>
              </div>
              {!isLoggedIn &&
                <div className="mt-4 text-center text-sm">
                  Already have an account?{' '}
                  <Link href="/auth/login" className="underline underline-offset-4 hover:text-purple-550">
                    Login
                  </Link>
                </div>
              }
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
