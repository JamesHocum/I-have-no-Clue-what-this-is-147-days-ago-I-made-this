"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Zap, Users, Globe } from "lucide-react"

export function TerminalHeader() {
  return (
    <div className="flex items-center justify-between p-6 terminal-border bg-card/90 backdrop-blur-sm rounded-lg">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Shield className="w-8 h-8 text-primary neon-glow" />
          <div>
            <h1 className="text-2xl font-bold neon-glow">Lady Violet's Terminal</h1>
            <p className="text-sm text-muted-foreground">Cyberpunk Ethical Hacking Suite</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Zap className="w-3 h-3" />
            White Hat
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Users className="w-3 h-3" />
            1,337 Online
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Globe className="w-3 h-3" />
            Global Network
          </Badge>
        </div>

        <Button variant="outline" size="sm" className="neon-glow bg-transparent">
          Join Mission
        </Button>
      </div>
    </div>
  )
}
