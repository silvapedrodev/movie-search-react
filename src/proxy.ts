import { updateSession } from "@/lib/supabase/proxy"
import { NextResponse, type NextRequest } from "next/server"

const BLOCKED_USER_AGENTS = [
  'claudebot',
  'anthropic-ai',
  'amazonbot',
  'bytespider',
  'petalbot',
  'semrushbot',
  'ahrefsbot',
]

export async function proxy(request: NextRequest) {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() ?? ''
  const isBlocked = BLOCKED_USER_AGENTS.some(bot => userAgent.includes(bot))

  if (isBlocked) {
    return new NextResponse('Access Denied', { status: 403 })
  }

  return updateSession(request)
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/api/:path*",
    "/auth/login",
    "/auth/signup",
    "/(.*)",
  ],
}