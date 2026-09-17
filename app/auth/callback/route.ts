import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

/**
 * Universal Auth Callback Handler
 * Handles all Supabase email flows:
 *  - Email confirmation (signup)
 *  - Password reset
 *  - User invite
 *  - Email change confirmation
 *  - Magic link login
 */
export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type') // e.g. "recovery", "invite", "email_change", "signup", "magiclink"
    const rawNext = searchParams.get('next') ?? '/dashboard'
    // Ensure relative redirect and prevent open redirect
    let safeNext = '/dashboard'
    if (rawNext.startsWith('/') && !rawNext.startsWith('//')) {
        safeNext = rawNext
    }

    // Accurately resolve public origin behind proxies (e.g. Vercel, Docker, custom domains)
    const forwardedHost = request.headers.get('x-forwarded-host')
    const forwardedProto = request.headers.get('x-forwarded-proto') || 'https'
    const siteOrigin = forwardedHost
        ? `${forwardedProto}://${forwardedHost}`
        : origin

    const supabase = await createClient()

    // --- PKCE flow (most modern flows use this) ---
    if (code) {
        const { data: authData, error } = await supabase.auth.exchangeCodeForSession(code)

        if (error || !authData.user) {
            console.error('Auth code exchange error:', error)
            return NextResponse.redirect(`${siteOrigin}/login?error=Authentication+failed`)
        }

        // Route based on email type
        if (type === 'recovery') {
            // Password reset — send directly to the reset page (session already set)
            return NextResponse.redirect(`${siteOrigin}/reset-password`)
        }

        if (type === 'invite') {
            // Admin-sent invite — let user set their name and password
            return NextResponse.redirect(`${siteOrigin}/auth/invite`)
        }

        if (type === 'email_change') {
            // Email address change confirmation
            return NextResponse.redirect(`${siteOrigin}/auth/confirm-email`)
        }

        // Check profile and sync OAuth user metadata (name & avatar)
        const { data: profile } = await supabase
            .from('profiles')
            .select('role, name, avatar_url')
            .eq('id', authData.user.id)
            .maybeSingle()

        const meta = authData.user.user_metadata || {}
        const metaFullName = meta.full_name || meta.name || meta.given_name || (meta.first_name ? `${meta.first_name} ${meta.last_name || ''}`.trim() : null)
        const metaFirstName = meta.given_name || meta.first_name || (metaFullName ? metaFullName.split(/\s+/)[0] : null)
        const metaAvatar = meta.avatar_url || meta.picture || null

        const emailPrefix = authData.user.email?.split('@')[0]?.toLowerCase()
        const fallbackName = metaFullName || metaFirstName || authData.user.email?.split('@')[0] || 'Student'

        if (!profile) {
            // Profile does not exist yet (OAuth signup) — create it immediately
            await supabase.from('profiles').insert({
                id: authData.user.id,
                email: authData.user.email,
                name: fallbackName,
                avatar_url: metaAvatar,
                role: 'user',
            })
        } else {
            // Profile exists — sync name and avatar if needed
            const currentName = profile?.name?.trim()
            const isNameEmptyOrHandle = !currentName || currentName.includes('@') || currentName.toLowerCase() === emailPrefix

            const updates: Record<string, any> = {}
            if (isNameEmptyOrHandle && fallbackName) {
                updates.name = fallbackName
            }
            if (!profile?.avatar_url && metaAvatar) {
                updates.avatar_url = metaAvatar
            }

            if (Object.keys(updates).length > 0) {
                await supabase
                    .from('profiles')
                    .update(updates)
                    .eq('id', authData.user.id)
            }
        }

        const redirectUrl = (profile?.role === 'admin' || profile?.role === 'super_admin')
            ? '/dashboard'
            : safeNext

        return NextResponse.redirect(`${siteOrigin}${redirectUrl}`)
    }

    // --- Legacy token_hash flow (older Supabase emails) ---
    if (token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({ token_hash, type: type as any })

        if (error) {
            return NextResponse.redirect(`${siteOrigin}/login?error=Authentication+failed`)
        }

        if (type === 'recovery') return NextResponse.redirect(`${siteOrigin}/reset-password`)
        if (type === 'invite') return NextResponse.redirect(`${siteOrigin}/auth/invite`)
        if (type === 'email_change') return NextResponse.redirect(`${siteOrigin}/auth/confirm-email`)

        return NextResponse.redirect(`${siteOrigin}${safeNext}`)
    }

    // Fallback
    return NextResponse.redirect(`${siteOrigin}/login?error=Authentication+failed`)
}
