"use client"

import { Button } from "@/components/ui/button"
import { useDecadeTheme } from "@/components/decade-theme-provider"

const decades = [
  { id: "80s", label: "80s", icon: "🕺", description: "Neon Dreams" },
  { id: "90s", label: "90s", icon: "💾", description: "Cyber Punk" },
  { id: "2000s", label: "2000s", icon: "📱", description: "Digital Age" },
  { id: "2010s", label: "2010s", icon: "🌐", description: "Social Web" },
  { id: "modern", label: "Modern", icon: "🚀", description: "AI Era" },
] as const

export function DecadeTabs() {
  const { currentDecade, setDecade } = useDecadeTheme()

  return (
    <div className="flex items-center gap-2 p-4 terminal-border bg-card/90 backdrop-blur-sm rounded-lg">
      <span className="text-sm font-mono text-muted-foreground mr-4">DECADE:</span>
      {decades.map((decade) => (
        <Button
          key={decade.id}
          variant={currentDecade === decade.id ? "default" : "outline"}
          size="sm"
          onClick={() => setDecade(decade.id as any)}
          className={`gap-2 transition-all ${currentDecade === decade.id ? "neon-glow" : ""}`}
        >
          <span>{decade.icon}</span>
          <span className="hidden sm:inline">{decade.label}</span>
          <span className="hidden md:inline text-xs text-muted-foreground">{decade.description}</span>
        </Button>
      ))}
    </div>
  )
}
