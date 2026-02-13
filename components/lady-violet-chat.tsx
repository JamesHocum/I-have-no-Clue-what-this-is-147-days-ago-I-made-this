"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Send, Crown, User } from "lucide-react"

interface ChatMessage {
  id: string
  type: "user" | "violet"
  content: string
  timestamp: Date
}

const violetResponses = {
  greeting: [
    "Welcome to my digital domain! How can I assist you in your hacking journey?",
    "Greetings, fellow cyber warrior. What mission shall we embark on today?",
    "Hello there! Ready to dive into the matrix of knowledge?",
  ],
  help: [
    "I can guide you through ethical hacking techniques, explain cybersecurity concepts, or help you navigate the terminal.",
    "Need assistance with penetration testing, cryptography, or social engineering defense? I'm here to help!",
    "I'm your digital mentor for all things cybersecurity. What would you like to learn?",
  ],
  mission: [
    "Our mission is to protect the innocent and educate the curious. We fight digital injustice with knowledge and skill.",
    "We are the guardians of cyberspace, defending against those who would harm the digital realm.",
    "Together, we can make the internet a safer place for everyone. What cause speaks to your heart?",
  ],
  hacking: [
    "Remember, true hackers use their powers for good. Every vulnerability you find is a chance to make systems stronger.",
    "The art of ethical hacking is about understanding systems so deeply that you can protect them from those with ill intent.",
    "Knowledge is your greatest weapon. Use it wisely, use it ethically, use it to protect others.",
  ],
  default: [
    "Interesting question! Let me process that through my neural networks...",
    "That's a fascinating topic. In the world of cybersecurity, everything is connected.",
    "Your curiosity is admirable. Keep asking questions - that's how we grow stronger.",
  ],
}

export function LadyVioletChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "violet",
      content:
        "Hello! I'm Lady Violet, your cyberpunk AI assistant. I'm here to guide you through the world of ethical hacking and cybersecurity. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Auto-scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const getVioletResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return violetResponses.greeting[Math.floor(Math.random() * violetResponses.greeting.length)]
    } else if (lowerMessage.includes("help") || lowerMessage.includes("assist")) {
      return violetResponses.help[Math.floor(Math.random() * violetResponses.help.length)]
    } else if (lowerMessage.includes("mission") || lowerMessage.includes("cause")) {
      return violetResponses.mission[Math.floor(Math.random() * violetResponses.mission.length)]
    } else if (
      lowerMessage.includes("hack") ||
      lowerMessage.includes("security") ||
      lowerMessage.includes("penetration")
    ) {
      return violetResponses.hacking[Math.floor(Math.random() * violetResponses.hacking.length)]
    } else {
      return violetResponses.default[Math.floor(Math.random() * violetResponses.default.length)]
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    const violetMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: "violet",
      content: getVioletResponse(input),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, violetMessage])
    setIsTyping(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-96">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              {message.type === "violet" && (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Crown className="w-4 h-4 text-primary" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted/50 text-foreground"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.type === "user" ? <User className="w-3 h-3" /> : <Crown className="w-3 h-3" />}
                  <span className="text-xs font-semibold">{message.type === "user" ? "You" : "Lady Violet"}</span>
                  <span className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</span>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>

              {message.type === "user" && (
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-accent" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Crown className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Crown className="w-3 h-3" />
                  <span className="text-xs font-semibold">Lady Violet</span>
                  <Badge variant="outline" className="text-xs">
                    Typing...
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

      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Lady Violet anything..."
            className="font-mono"
            disabled={isTyping}
          />
          <Button onClick={handleSendMessage} disabled={!input.trim() || isTyping} size="sm" className="gap-2">
            <Send className="w-4 h-4" />
            Send
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Lady Violet is an AI assistant focused on ethical hacking education
        </p>
      </div>
    </div>
  )
}
