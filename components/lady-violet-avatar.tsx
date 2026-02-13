"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MessageCircle, Shield, Zap, Brain, Heart, Star, Crown } from "lucide-react"
import Image from "next/image"
import { LadyVioletChat } from "@/components/lady-violet-chat"
import { AIAssistantChat } from "@/components/ai-assistant-chat"

const violetQuotes = [
  "I am the .exe file you don't want to open",
  "In the matrix of code, I am the anomaly",
  "Every system has a backdoor, I just find them faster",
  "Hack the planet, protect the innocent",
  "I don't break systems, I liberate them",
  "In cyberspace, I am the queen of the digital realm",
]

const violetStats = {
  hackingLevel: 100,
  missionsCompleted: 1337,
  systemsProtected: 9999,
  evilDefeated: 666,
  coffeeDrunk: 2048,
}

export function LadyVioletAvatar() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [showChat, setShowChat] = useState(false)
  const [showAIChat, setShowAIChat] = useState(false)
  const [mood, setMood] = useState<"confident" | "focused" | "playful" | "mysterious">("confident")

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % violetQuotes.length)
    // Change mood based on quote
    const moods: Array<"confident" | "focused" | "playful" | "mysterious"> = [
      "confident",
      "focused",
      "playful",
      "mysterious",
    ]
    setMood(moods[Math.floor(Math.random() * moods.length)])
  }

  const getMoodColor = () => {
    switch (mood) {
      case "confident":
        return "text-primary"
      case "focused":
        return "text-accent"
      case "playful":
        return "text-pink-400"
      case "mysterious":
        return "text-purple-400"
      default:
        return "text-primary"
    }
  }

  const getMoodIcon = () => {
    switch (mood) {
      case "confident":
        return <Crown className="w-4 h-4" />
      case "focused":
        return <Brain className="w-4 h-4" />
      case "playful":
        return <Heart className="w-4 h-4" />
      case "mysterious":
        return <Star className="w-4 h-4" />
      default:
        return <Crown className="w-4 h-4" />
    }
  }

  return (
    <Card className="terminal-border bg-card/90 backdrop-blur-sm">
      <div className="p-6 space-y-4">
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-4 group cursor-pointer" onClick={nextQuote}>
            <Image
              src="/images/lady-violet-avatar.png"
              alt="Lady Violet - Cyberpunk Queen"
              fill
              className="rounded-full object-cover terminal-border transition-all group-hover:scale-105"
            />
            <div className="absolute -bottom-2 -right-2">
              <Badge className={`neon-glow ${getMoodColor()}`}>
                <Crown className="w-3 h-3 mr-1" />
                QUEEN
              </Badge>
            </div>
            <div className="absolute -top-2 -left-2">
              <Badge variant="outline" className={`gap-1 ${getMoodColor()}`}>
                {getMoodIcon()}
                {mood.toUpperCase()}
              </Badge>
            </div>
          </div>
          <h3 className={`text-lg font-bold neon-glow ${getMoodColor()}`}>Lady Violet</h3>
          <p className="text-sm text-muted-foreground">Cyberpunk Queen & Digital Guardian</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Status:</span>
            <Badge variant="outline" className="gap-1">
              <Shield className="w-3 h-3" />
              Online
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Level:</span>
            <Badge variant="outline">{violetStats.hackingLevel}/100</Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Missions:</span>
            <Badge variant="outline">{violetStats.missionsCompleted.toLocaleString()}</Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Protected:</span>
            <Badge variant="outline">{violetStats.systemsProtected.toLocaleString()}</Badge>
          </div>
        </div>

        <div className="space-y-2">
          <Dialog open={showAIChat} onOpenChange={setShowAIChat}>
            <DialogTrigger asChild>
              <Button size="sm" className="w-full gap-2 neon-glow">
                <Brain className="w-4 h-4" />
                AI Assistant Chat
              </Button>
            </DialogTrigger>
            <DialogContent className="terminal-border bg-card/95 backdrop-blur-sm max-w-4xl max-h-[80vh]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-primary" />
                  Lady Violet - AI Assistant
                </DialogTitle>
              </DialogHeader>
              <AIAssistantChat />
            </DialogContent>
          </Dialog>

          <Dialog open={showChat} onOpenChange={setShowChat}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="w-full gap-2 bg-transparent">
                <MessageCircle className="w-4 h-4" />
                Quick Chat
              </Button>
            </DialogTrigger>
            <DialogContent className="terminal-border bg-card/95 backdrop-blur-sm max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-primary" />
                  Lady Violet - Quick Chat
                </DialogTitle>
              </DialogHeader>
              <LadyVioletChat />
            </DialogContent>
          </Dialog>

          <Button size="sm" variant="outline" className="w-full gap-2 bg-transparent" onClick={nextQuote}>
            <Zap className="w-4 h-4" />
            Request Wisdom
          </Button>
        </div>

        <div
          className="text-xs text-center p-3 rounded-lg bg-muted/20 cursor-pointer hover:bg-muted/30 transition-all"
          onClick={nextQuote}
        >
          <div className={`font-mono ${getMoodColor()} neon-glow`}>"{violetQuotes[currentQuote]}"</div>
          <div className="text-muted-foreground mt-1 text-xs">
            Click for more wisdom • Quote {currentQuote + 1}/{violetQuotes.length}
          </div>
        </div>

        <div className="flex flex-wrap gap-1 justify-center">
          <Badge variant="outline" className="text-xs">
            🏆 Elite Hacker
          </Badge>
          <Badge variant="outline" className="text-xs">
            🛡️ Digital Guardian
          </Badge>
          <Badge variant="outline" className="text-xs">
            ⚡ Code Wizard
          </Badge>
        </div>
      </div>
    </Card>
  )
}
