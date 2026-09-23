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

import { JsonLd } from '@/components/seo/json-ld'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asci-academy.pages.dev'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ASCI Academy — Master DSA, Systems & Modern Web Development',
    template: '%s | ASCI Academy',
  },
  description:
    'Comprehensive engineering learning platform for mastering Data Structures, Algorithms, Low-Level Systems, and Full-Stack Engineering. Interactive visualizers, 474 curated coding challenges, multi-language compiler runner, and career-focused curriculum.',
  keywords: [
    'ASCI Academy',
    'Data Structures and Algorithms',
    'A2Z DSA Sheet',
    'Coding Interview Preparation',
    'Systems Engineering',
    'C++',
    'Enterprise Java',
    'Full-Stack Web Development',
    'React 19',
    'Next.js',
    'Python for Engineers',
    'Interactive Algorithm Visualizer',
    'Online Code Compiler',
  ],
  authors: [{ name: 'ASCI Academy Editorial Team', url: siteUrl }],
  creator: 'ASCI Academy',
  publisher: 'ASCI Academy',
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'google46148bccaeba60eb',
    other: {
      'google-site-verification': ['google46148bccaeba60eb', 'google46148bccaeba60eb.html'],
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'ASCI Academy',
    title: 'ASCI Academy — Master DSA, Systems & Modern Web Development',
    description:
      'Master Data Structures, Algorithms, Systems Architecture, and Full-Stack Engineering with 474 interactive problems, step-through visualizers, and verified certificates.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'ASCI Academy Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ASCI Academy — Master DSA, Systems & Modern Web Development',
    description:
      'Master Data Structures, Algorithms, Systems Architecture, and Full-Stack Engineering with 474 interactive problems and visualizers.',
    images: ['/logo.png'],
    creator: '@asciacademy',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
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
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${ebGaramond.variable} font-sans antialiased bg-background text-foreground min-h-screen transition-colors duration-200 overflow-x-hidden w-full max-w-full`}
      >
        <JsonLd />
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
