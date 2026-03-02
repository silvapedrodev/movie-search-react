'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent, CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import { InputContainer } from './elements/input-container'
import { IconInput } from './elements/icon-input'
import { z } from 'zod'

const signUpSchema = z.object({
  username: z
    .string()
    .min(1, "Username cannot be empty")
    .max(12, "Username must be at most 12 characters")
    .refine((val) => !val.includes(" "), "Username cannot contain spaces"),
  email: z.email("Invalid email address"),
  password: z.string().min(12, "Password must be at least 12 characters")
})

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [repeatPassword, setRepeatPassword] = useState('')
  const [showRepPassword, setShowRepPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.SubmitEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    const result = signUpSchema.safeParse({ username, email, password })
    if (!result.success) {
      const firstError = result.error.issues[0]?.message
      setError(firstError ?? "Invalid fields")
      setIsLoading(false)
      return
    }

    if (password !== repeatPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
          },
          emailRedirectTo: `${window.location.origin}/profile`
        },
      })
      if (error) throw error
      router.refresh()
      router.push('/')

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
          <CardTitle className="text-2xl text-center">Sign up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <InputContainer>
                  <IconInput icon={User} />
                  <Input
                    id="username"
                    type="text"
                    required
                    value={username}
                    maxLength={12}
                    onChange={(e) => setUsername(e.target.value.replace(/\s/g, ""))}
                    className='border-none text-white shadow-none focus-visible:ring-0 selection:bg-purple-550'
                  />
                </InputContainer>
              </div>
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
                    className='border-none text-white shadow-none focus-visible:ring-0 selection:bg-purple-550'
                  />
                </InputContainer>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <InputContainer>
                  <IconInput icon={Lock} />
                  <Input
                    id="password"
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
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="repeat-password">Repeat Password</Label>
                </div>
                <InputContainer>
                  <IconInput icon={Lock} />
                  <Input
                    id="repeat-password"
                    type={showRepPassword ? "text" : "password"}
                    required
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    className='border-none text-white shadow-none focus-visible:ring-0 selection:bg-purple-550'
                  />
                  <div
                    onClick={() => setShowRepPassword(!showRepPassword)}
                    className='hover:text-foreground transition cursor-pointer'
                  >
                    {showRepPassword
                      ? <IconInput icon={EyeOff} />
                      : <IconInput icon={Eye} />
                    }
                  </div>
                </InputContainer>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full py-5 bg-[linear-gradient(249deg,#030A1B_10%,#9747FF_206.69%)]" disabled={isLoading}>
                {isLoading ? 'Creating an account...' : 'Sign up'}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link href="/auth/login" className="underline underline-offset-4 hover:text-purple-550">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
