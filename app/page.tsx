"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DecadeThemeProvider } from "@/components/decade-theme-provider"
import { TerminalHeader } from "@/components/terminal-header"
import { TerminalOutput } from "@/components/terminal-output"
import { DecadeTabs } from "@/components/decade-tabs"
import { DecadeContent } from "@/components/decade-content"
import { LadyVioletAvatar } from "@/components/lady-violet-avatar"
import { HackerNewsFeed } from "@/components/hacker-news-feed"
import { HackerChat } from "@/components/hacker-chat"
import { RetroArcade } from "@/components/retro-arcade"
import { CodeBuilder } from "@/components/code-builder"
import { PWAStatus } from "@/components/pwa-status"

export default function CyberpunkTerminal() {
  const [command, setCommand] = useState("")
  const [output, setOutput] = useState<
    Array<{ type: "command" | "response" | "system"; content: string; timestamp: Date }>
  >([
    {
      type: "system",
      content: "Lady Violet's Cyberpunk Terminal v2.0 - Initializing...",
      timestamp: new Date(),
    },
    {
      type: "system",
      content: "Welcome to the world's sleekest ethical hacking terminal.",
      timestamp: new Date(),
    },
    {
      type: "system",
      content: "Type 'help' for available commands or 'mission' to join the cause.",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [activeTab, setActiveTab] = useState("terminal")
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Auto-focus terminal input
    if (inputRef.current && activeTab === "terminal") {
      inputRef.current.focus()
    }
  }, [activeTab])

  useEffect(() => {
    // Auto-scroll to bottom when new output is added
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [output])

  const handleCommand = async (cmd: string) => {
    if (!cmd.trim()) return

    // Add command to output
    setOutput((prev) => [...prev, { type: "command", content: `> ${cmd}`, timestamp: new Date() }])
    setCommand("")
    setIsTyping(true)

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Process command
    let response = ""
    const lowerCmd = cmd.toLowerCase().trim()

    switch (lowerCmd) {
      case "help":
        response = `Available Commands:
• help - Show this help menu
• mission - Learn about our cause
• scan - Network reconnaissance tools
• encrypt - Cryptographic utilities  
• social - Social engineering toolkit
• games - Retro hacker game arcade
• news - Latest cybersecurity feeds
• chat - Connect with fellow hackers
• ai - Talk to Lady Violet AI assistant
• clear - Clear terminal output
• whoami - Display user information
• decades - Switch to decade explorer
• code - Access Lady Violet Code Builder
• download - Create downloadable app packages`
        break
      case "mission":
        response = `🛡️ THE MISSION 🛡️
We are digital vigilantes fighting for justice in cyberspace.
Our cause: Protect the innocent, educate the curious, defend against evil.

Current Operations:
• Veteran Homelessness Prevention Initiative
• Anonymous Threat Neutralization
• Paywall Liberation Movement
• Digital Rights Advocacy

Join us in making the digital world safer for everyone.`
        break
      case "decades":
        setActiveTab("decades")
        response = "Switching to Decade Explorer mode..."
        break
      case "games":
        setActiveTab("games")
        response = "Loading Retro Hacker Arcade..."
        break
      case "news":
        setActiveTab("news")
        response = "Opening cybersecurity news feed..."
        break
      case "chat":
        setActiveTab("chat")
        response = "Connecting to hacker chat network..."
        break
      case "code":
        setActiveTab("code")
        response = "Initializing Lady Violet Code Builder..."
        break
      case "download":
        setActiveTab("code")
        response = "Opening Code Builder with download capabilities for creating installable apps..."
        break
      case "pwa":
        setActiveTab("code")
        response = "Opening Code Builder with PWA export tools..."
        break
      case "ai":
        response = "Click on Lady Violet's avatar to access the AI Assistant chat interface."
        break
      case "whoami":
        response = `User: Ethical Hacker
Status: White Hat Operative
Clearance: Level 1 - Apprentice
Avatar: Lady Violet (Cyberpunk Queen)
Mission: Learn, Protect, Serve`
        break
      case "scan":
        response = `🔍 NETWORK RECONNAISSANCE SUITE
• Port Scanner - Identify open services
• Vulnerability Assessment - Find security gaps
• Network Mapper - Topology discovery
• Service Enumeration - Detailed analysis

Note: All tools for educational and defensive purposes only.`
        break
      case "encrypt":
        response = `🔐 CRYPTOGRAPHIC TOOLKIT
• RSA Key Generator - Create secure keypairs
• AES Encryption - Symmetric encryption
• Hash Functions - MD5, SHA-256, SHA-512
• Digital Signatures - Verify authenticity

Protecting your data with military-grade encryption.`
        break
      case "clear":
        setOutput([])
        setIsTyping(false)
        return
      default:
        response = `Command not recognized: ${cmd}
Type 'help' for available commands.`
    }

    setOutput((prev) => [...prev, { type: "response", content: response, timestamp: new Date() }])
    setIsTyping(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(command)
    }
  }

  return (
    <DecadeThemeProvider>
      <div className="min-h-screen bg-terminal-bg text-terminal-text p-4">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Terminal Header */}
          <TerminalHeader />

          {/* PWA Status */}
          <PWAStatus />

          {/* Decade Tabs */}
          <DecadeTabs />

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 terminal-border bg-card/90">
              <TabsTrigger value="terminal" className="gap-2">
                💻 Terminal
              </TabsTrigger>
              <TabsTrigger value="decades" className="gap-2">
                🕰️ Decades
              </TabsTrigger>
              <TabsTrigger value="news" className="gap-2">
                📰 News
              </TabsTrigger>
              <TabsTrigger value="chat" className="gap-2">
                💬 Chat
              </TabsTrigger>
              <TabsTrigger value="games" className="gap-2">
                🕹️ Games
              </TabsTrigger>
              <TabsTrigger value="code" className="gap-2">
                ⚡ Code
              </TabsTrigger>
            </TabsList>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
              {/* Main Content Area */}
              <div className="lg:col-span-3">
                <TabsContent value="terminal" className="mt-0">
                  <Card className="terminal-border bg-card/90 backdrop-blur-sm">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="ml-4 text-sm font-mono text-muted-foreground">lady-violet-terminal</span>
                        </div>
                        <Badge variant="outline" className="neon-glow">
                          ONLINE
                        </Badge>
                      </div>

                      {/* Terminal Output */}
                      <div
                        ref={outputRef}
                        className="h-96 overflow-y-auto bg-terminal-bg/50 rounded-lg p-4 font-mono text-sm space-y-2 mb-4"
                      >
                        <TerminalOutput output={output} isTyping={isTyping} />
                      </div>

                      {/* Terminal Input */}
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-mono">{">"}</span>
                        <Input
                          ref={inputRef}
                          value={command}
                          onChange={(e) => setCommand(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Enter command..."
                          className="font-mono bg-transparent border-none focus:ring-2 focus:ring-primary"
                        />
                        <Button onClick={() => handleCommand(command)} className="neon-glow" size="sm">
                          Execute
                        </Button>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="decades" className="mt-0">
                  <DecadeContent />
                </TabsContent>

                <TabsContent value="news" className="mt-0">
                  <HackerNewsFeed />
                </TabsContent>

                <TabsContent value="chat" className="mt-0">
                  <HackerChat />
                </TabsContent>

                <TabsContent value="games" className="mt-0">
                  <RetroArcade />
                </TabsContent>

                <TabsContent value="code" className="mt-0">
                  <CodeBuilder />
                </TabsContent>
              </div>

              {/* Lady Violet Avatar Sidebar */}
              <div className="lg:col-span-1">
                <LadyVioletAvatar />
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </DecadeThemeProvider>
  )
}
