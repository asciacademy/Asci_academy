import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, EB_Garamond } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-eb-garamond',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ASCI — Master DSA & Modern Web Development',
  description:
    'Comprehensive learning platform for mastering Data Structures, Algorithms, and full-stack web development. Interactive visualizers, 1-on-1 mentorship, real-world projects, and career-focused curriculum.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

import { Suspense } from 'react'
import { AuthProvider } from "@/context/auth-context"
import { AdminProvider } from "@/context/admin-context"
import { UserSettingsProvider } from "@/context/user-settings-context"
import { AxelProvider } from "@/context/axel-context"
import { RouteProgressBar } from "@/components/route-progress-bar"
import { XpCelebrationToast } from "@/components/gamification/xp-celebration-toast"
import { GoogleOneTap } from "@/components/auth/google-one-tap"

import { ScrollRobotWrapper } from "@/components/scroll-robot-wrapper"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${ebGaramond.variable} font-sans antialiased bg-background text-foreground min-h-screen transition-colors duration-200`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <UserSettingsProvider>
              <AdminProvider>
                <AxelProvider>
                  <Suspense fallback={null}>
                    <RouteProgressBar />
                  </Suspense>
                  <GoogleOneTap />
                  <XpCelebrationToast />
                  {children}
                  <ScrollRobotWrapper />
                </AxelProvider>
              </AdminProvider>
            </UserSettingsProvider>
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
