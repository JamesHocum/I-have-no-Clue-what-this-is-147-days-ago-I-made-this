"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Wifi, WifiOff, Smartphone } from "lucide-react"

export function PWAStatus() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    if (typeof navigator !== "undefined") {
      setIsOnline(navigator.onLine)
      window.addEventListener("online", handleOnline)
      window.addEventListener("offline", handleOffline)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("online", handleOnline)
        window.removeEventListener("offline", handleOffline)
      }
    }
  }, [])

  return (
    <Card className="terminal-border bg-card/90 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-sm font-semibold text-primary">Terminal Status</div>
            <div className="flex gap-1">
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

              <Badge variant="outline" className="text-primary border-primary neon-glow">
                <Smartphone className="w-3 h-3 mr-1" />
                Ready
              </Badge>
            </div>
          </div>
        </div>

        <div className="mt-2 text-xs text-muted-foreground">
          Lady Violet's Cyberpunk Terminal - Fully operational and ready for hacking
        </div>
      </CardContent>
    </Card>
  )
}
