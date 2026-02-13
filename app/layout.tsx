import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Lady Violet's Cyberpunk Terminal",
  description: "The world's sleekest cyberpunk hacker terminal for ethical white hat education",
  generator: "v0.app",
  manifest: "/manifest.json",
  themeColor: "#00ffff",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Lady Violet Terminal",
  },
  icons: {
    icon: "/images/lady-violet-avatar.png",
    apple: "/images/lady-violet-avatar.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Lady Violet Terminal" />
        <link rel="apple-touch-icon" href="/images/lady-violet-avatar.png" />
      </head>
      <body className="font-mono cyberpunk-grid">
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
