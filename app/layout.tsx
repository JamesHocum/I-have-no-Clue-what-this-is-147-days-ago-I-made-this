import type React from "react"
import type { Metadata, Viewport } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Lady Violet's Cyberpunk Terminal",
  description: "The world's sleekest cyberpunk hacker terminal for ethical white hat education",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Lady Violet Terminal",
  },
  icons: {
    icon: "/images/lady-violet-avatar.jpg",
    apple: "/images/lady-violet-avatar.jpg",
  },
}

export const viewport: Viewport = {
  themeColor: "#00ffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${jetbrainsMono.variable}`}>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Lady Violet Terminal" />
        <link rel="apple-touch-icon" href="/images/lady-violet-avatar.jpg" />
      </head>
      <body className="font-mono cyberpunk-grid">{children}</body>
    </html>
  )
}
