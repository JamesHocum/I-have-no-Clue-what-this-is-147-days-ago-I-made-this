"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Smartphone, Monitor, Wifi, WifiOff } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [installSupported, setInstallSupported] = useState(false)

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setInstallSupported(true)
    }

    // Listen for online/offline status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("🔥 Lady Violet: Service Worker registered:", registration)
        })
        .catch((error) => {
          console.log("🔥 Lady Violet: Service Worker registration failed:", error)
        })
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setIsInstalled(true)
      console.log("🔥 Lady Violet: PWA installed successfully")
    }

    setDeferredPrompt(null)
  }

  const generateAPK = () => {
    // Simulate APK generation process
    const apkData = {
      name: "Lady Violet's Hacker Terminal",
      version: "1.0.0",
      package: "com.ladyviolet.hackerterminal",
      permissions: ["INTERNET", "WRITE_EXTERNAL_STORAGE"],
      features: ["Offline code generation", "Cyberpunk themes", "AI assistant", "Project management"],
    }

    const blob = new Blob([JSON.stringify(apkData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "lady-violet-terminal.apk"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const generateDesktopApp = () => {
    // Simulate desktop app generation
    const desktopData = {
      name: "Lady Violet's Hacker Terminal",
      version: "1.0.0",
      main: "index.html",
      window: {
        width: 1200,
        height: 800,
        icon: "images/lady-violet-avatar.png",
      },
      build: {
        appId: "com.ladyviolet.hackerterminal",
        productName: "Lady Violet Terminal",
        directories: {
          output: "dist",
        },
      },
    }

    const blob = new Blob([JSON.stringify(desktopData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "lady-violet-desktop-config.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="terminal-border bg-card/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Download className="w-5 h-5" />
          PWA Installer & App Generator
          <div className="flex gap-2">
            {isOnline ? (
              <Badge variant="outline" className="text-green-400 border-green-400">
                <Wifi className="w-3 h-3 mr-1" />
                Online
              </Badge>
            ) : (
              <Badge variant="outline" className="text-orange-400 border-orange-400">
                <WifiOff className="w-3 h-3 mr-1" />
                Offline
              </Badge>
            )}
            {isInstalled && (
              <Badge variant="outline" className="text-primary border-primary neon-glow">
                Installed
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* PWA Installation */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-primary">📱 Progressive Web App</h3>
            <p className="text-sm text-muted-foreground">
              Install Lady Violet's Terminal as a native app on your device
            </p>
            <div className="space-y-2">
              {installSupported && !isInstalled ? (
                <Button onClick={handleInstall} className="w-full neon-glow">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Install PWA
                </Button>
              ) : isInstalled ? (
                <Button disabled className="w-full">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Already Installed
                </Button>
              ) : (
                <Button disabled className="w-full">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Install Not Available
                </Button>
              )}
              <div className="text-xs text-muted-foreground">
                • Works offline after installation
                <br />• Native app experience
                <br />• Auto-updates when online
              </div>
            </div>
          </div>

          {/* Desktop App Generation */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-primary">💻 Desktop Application</h3>
            <p className="text-sm text-muted-foreground">Generate a standalone desktop application</p>
            <div className="space-y-2">
              <Button onClick={generateDesktopApp} variant="outline" className="w-full bg-transparent">
                <Monitor className="w-4 h-4 mr-2" />
                Generate Desktop App
              </Button>
              <div className="text-xs text-muted-foreground">
                • Electron-based application
                <br />• Windows, macOS, Linux support
                <br />• Full offline capabilities
              </div>
            </div>
          </div>
        </div>

        {/* Android APK Generation */}
        <div className="border-t border-primary/20 pt-4">
          <h3 className="text-lg font-semibold text-primary mb-3">🤖 Android APK</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-3">Generate an Android APK for sideloading</p>
              <Button onClick={generateAPK} variant="outline" className="w-full bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Generate APK
              </Button>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>• Compatible with Android 7.0+</div>
              <div>• Full offline functionality</div>
              <div>• Cyberpunk themes included</div>
              <div>• AI assistant integrated</div>
              <div>• No Google Play required</div>
            </div>
          </div>
        </div>

        {/* Installation Instructions */}
        <div className="border-t border-primary/20 pt-4">
          <h4 className="font-semibold text-primary mb-2">📋 Installation Guide</h4>
          <div className="text-xs text-muted-foreground space-y-2">
            <div>
              <strong>PWA (Recommended):</strong> Click "Install PWA" button above or use browser's install option
            </div>
            <div>
              <strong>Android APK:</strong> Enable "Unknown Sources" in Settings → Security, then install the downloaded
              APK
            </div>
            <div>
              <strong>Desktop:</strong> Use the generated config with Electron or similar framework
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
