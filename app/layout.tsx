import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Justice and Responsibility Charter',
  description: 'A call for transparency, accountability, and reform in American governance',
  keywords: ['government accountability', 'transparency', 'political reform', 'civic engagement', 'democracy'],
  authors: [{ name: 'Graham Brooks' }],
  creator: 'Graham Brooks',
  publisher: 'Justice and Responsibility Charter',
  manifest: '/site.webmanifest',
  themeColor: '#2563eb',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Justice and Responsibility Charter',
    description: 'A call for transparency, accountability, and reform in American governance',
    type: 'website',
    locale: 'en_US',
    siteName: 'Justice and Responsibility Charter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Justice and Responsibility Charter',
    description: 'A call for transparency, accountability, and reform in American governance',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
