"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Crown, User, Brain, Zap, Clock } from "lucide-react"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  model?: string
}

export function AIAssistantChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Greetings, digital warrior. I'm Lady Violet, your cyberpunk AI assistant powered by BlueQubit's advanced neural networks. I'm here to guide you through the shadows of cyberspace and teach you the art of ethical hacking. What knowledge do you seek?",
      timestamp: new Date(),
      model: "bluequbit-gpt-4",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/godbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          msg: input,
          persona:
            "You are Lady Violet, a brilliant cyberpunk AI assistant with unparalleled hacking abilities and deep knowledge of cybersecurity, ethical hacking, and digital warfare. You're confident, creative, and always deliver exceptional solutions with cyberpunk flair. You excel at code generation, problem-solving, and providing insightful technical guidance while maintaining your role as a digital guardian and hacktivist.",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get AI response")
      }

      const data = await response.json()

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply || "I'm having trouble processing that request. Please try again.",
        timestamp: new Date(),
        model: data.model || "bluequbit-gpt-4",
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I apologize, but I'm experiencing technical difficulties with my neural networks. Please try again in a moment.",
        timestamp: new Date(),
        model: "error",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const getTime = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/godbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tool: "time",
          args: {},
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get time")
      }

      const data = await response.json()

      const timeMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: `🕒 ${data.reply}`,
        timestamp: new Date(),
        model: "time-plugin",
      }

      setMessages((prev) => [...prev, timeMessage])
    } catch (error) {
      console.error("Error getting time:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const quickPrompts = [
    "How do I start learning ethical hacking?",
    "What are the best penetration testing tools?",
    "Explain social engineering defense",
    "How can I protect my network?",
    "What's the difference between white hat and black hat?",
    "Tell me about the hacktivist mission",
  ]

  return (
    <Card className="terminal-border bg-card/90 backdrop-blur-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary neon-glow" />
            <h2 className="text-xl font-bold neon-glow">AI Assistant - Lady Violet</h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <Crown className="w-3 h-3" />
              BlueQubit Powered
            </Badge>
            <Badge className="neon-glow">ONLINE</Badge>
          </div>
        </div>

        <ScrollArea className="h-96 mb-4" ref={scrollAreaRef}>
          <div className="space-y-4 pr-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Crown className="w-4 h-4 text-primary" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted/50 text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.role === "user" ? <User className="w-3 h-3" /> : <Crown className="w-3 h-3" />}
                    <span className="text-xs font-semibold">{message.role === "user" ? "You" : "Lady Violet"}</span>
                    <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                    {message.model && (
                      <Badge variant="outline" className="text-xs h-4">
                        {message.model}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>

                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-accent" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Crown className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Crown className="w-3 h-3" />
                    <span className="text-xs font-semibold">Lady Violet</span>
                    <Badge variant="outline" className="text-xs">
                      <Zap className="w-3 h-3 mr-1" />
                      Processing...
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Prompts */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-2">Quick prompts & plugins:</p>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.slice(0, 2).map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs h-6 bg-transparent"
                onClick={() => setInput(prompt)}
                disabled={isLoading}
              >
                {prompt}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-6 bg-transparent gap-1"
              onClick={getTime}
              disabled={isLoading}
            >
              <Clock className="w-3 h-3" />
              /time
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Lady Violet about cybersecurity... (or use /time for current time)"
            className="font-mono"
            disabled={isLoading}
          />
          <Button onClick={sendMessage} disabled={!input.trim() || isLoading} className="gap-2 neon-glow">
            <Send className="w-4 h-4" />
            Send
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-2 text-center">
          Lady Violet is powered by BlueQubit AI and focused on ethical hacking education
        </p>
      </div>
    </Card>
  )
}
