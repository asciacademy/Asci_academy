import { createBrowserClient } from "@supabase/ssr"

let browserClient: ReturnType<typeof createBrowserClient> | undefined

export function createClient() {
    if (browserClient) return browserClient

    browserClient = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key",
        {
            isSingleton: true,
            auth: {
                // Prevent navigator.locks stall and AbortError in browser / React Strict Mode
                lock: async (_name: string, _acquireTimeout: number, fn: () => Promise<any>) => {
                    return await fn()
                },
            },
        }
    )

    return browserClient
}
