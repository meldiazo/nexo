import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // refrescar session si expira
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Rutas protegidas y redirecciones
  const isAuthRoute = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/recuperar-password')
  const isApiRoute = request.nextUrl.pathname.startsWith('/api')
  const isStaticRoute = request.nextUrl.pathname.startsWith('/_next') || request.nextUrl.pathname.includes('.')

  if (isStaticRoute || isApiRoute) return supabaseResponse

  if (!user && !isAuthRoute) {
    // Si no hay usuario y no está en login, enviar a login
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (user && isAuthRoute) {
    // Si hay usuario y está intentando ir a login, enviarlo al home
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
