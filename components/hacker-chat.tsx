"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, Users, Shield, Zap, MessageCircle, Crown, Coffee, Code, Globe, Heart } from "lucide-react"

interface ChatMessage {
  id: string
  user: string
  content: string
  timestamp: Date
  channel: string
  userLevel: "newbie" | "hacker" | "elite" | "legend"
  isSystem?: boolean
}

interface ChatUser {
  username: string
  level: "newbie" | "hacker" | "elite" | "legend"
  status: "online" | "away" | "busy"
  missions: number
}

const mockUsers: ChatUser[] = [
  { username: "LadyViolet", level: "legend", status: "online", missions: 1337 },
  { username: "CyberPhoenix", level: "elite", status: "online", missions: 892 },
  { username: "QuantumHacker", level: "elite", status: "away", missions: 654 },
  { username: "NeonGhost", level: "hacker", status: "online", missions: 234 },
  { username: "CodeNinja", level: "hacker", status: "busy", missions: 156 },
  { username: "ByteWarrior", level: "newbie", status: "online", missions: 42 },
  { username: "CryptoWizard", level: "elite", status: "online", missions: 789 },
  { username: "DigitalRebel", level: "hacker", status: "online", missions: 345 },
]

const mockMessages: ChatMessage[] = [
  {
    id: "1",
    user: "LadyViolet",
    content: "Welcome to the hacker collective! Remember, we use our powers for good.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    channel: "general",
    userLevel: "legend",
    isSystem: true,
  },
  {
    id: "2",
    user: "CyberPhoenix",
    content: "Just finished a pen test on a client's infrastructure. Found 12 critical vulns!",
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    channel: "general",
    userLevel: "elite",
  },
  {
    id: "3",
    user: "NeonGhost",
    content: "Nice work! Did you help them patch everything?",
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    channel: "general",
    userLevel: "hacker",
  },
  {
    id: "4",
    user: "ByteWarrior",
    content: "Can someone help me understand buffer overflows? I'm still learning.",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    channel: "help",
    userLevel: "newbie",
  },
  {
    id: "5",
    user: "CodeNinja",
    content: "Check out this new Python script for automated reconnaissance!",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    channel: "tools",
    userLevel: "hacker",
  },
  {
    id: "6",
    user: "DigitalRebel",
    content: "The veteran housing mission raised another $50k today! 🏠",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    channel: "missions",
    userLevel: "hacker",
  },
]

export function HackerChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [activeChannel, setActiveChannel] = useState("general")
  const [currentUser] = useState("Anonymous")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const getUserLevelIcon = (level: string) => {
    switch (level) {
      case "legend":
        return <Crown className="w-3 h-3 text-yellow-400" />
      case "elite":
        return <Zap className="w-3 h-3 text-purple-400" />
      case "hacker":
        return <Shield className="w-3 h-3 text-blue-400" />
      case "newbie":
        return <Code className="w-3 h-3 text-green-400" />
      default:
        return <Users className="w-3 h-3" />
    }
  }

  const getUserLevelColor = (level: string) => {
    switch (level) {
      case "legend":
        return "text-yellow-400"
      case "elite":
        return "text-purple-400"
      case "hacker":
        return "text-blue-400"
      case "newbie":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-400"
      case "away":
        return "bg-yellow-400"
      case "busy":
        return "bg-red-400"
      default:
        return "bg-gray-400"
    }
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      user: currentUser,
      content: newMessage,
      timestamp: new Date(),
      channel: activeChannel,
      userLevel: "newbie",
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const filteredMessages = messages.filter((msg) => msg.channel === activeChannel)
  const onlineUsers = mockUsers.filter((user) => user.status === "online")

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Main Chat Area */}
      <div className="lg:col-span-3">
        <Card className="terminal-border bg-card/90 backdrop-blur-sm">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-primary neon-glow" />
                <h2 className="text-xl font-bold neon-glow">Hacker Chat Network</h2>
              </div>
              <Badge className="neon-glow">{onlineUsers.length} ONLINE</Badge>
            </div>

            <Tabs value={activeChannel} onValueChange={setActiveChannel} className="mb-4">
              <TabsList className="grid w-full grid-cols-5 terminal-border bg-muted/20">
                <TabsTrigger value="general" className="gap-1">
                  <Globe className="w-3 h-3" />
                  General
                </TabsTrigger>
                <TabsTrigger value="help" className="gap-1">
                  <Shield className="w-3 h-3" />
                  Help
                </TabsTrigger>
                <TabsTrigger value="tools" className="gap-1">
                  <Code className="w-3 h-3" />
                  Tools
                </TabsTrigger>
                <TabsTrigger value="missions" className="gap-1">
                  <Heart className="w-3 h-3" />
                  Missions
                </TabsTrigger>
                <TabsTrigger value="offtopic" className="gap-1">
                  <Coffee className="w-3 h-3" />
                  Off-Topic
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <ScrollArea className="h-80 mb-4" ref={scrollAreaRef}>
              <div className="space-y-3 pr-4">
                {filteredMessages.map((message) => (
                  <div key={message.id} className={`flex gap-3 ${message.isSystem ? "opacity-80" : ""}`}>
                    <div className="shrink-0">
                      <div className="w-8 h-8 rounded-full bg-muted/30 flex items-center justify-center">
                        {getUserLevelIcon(message.userLevel)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-semibold text-sm ${getUserLevelColor(message.userLevel)}`}>
                          {message.user}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {message.userLevel}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                      </div>
                      <p className="text-sm break-words">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Message #${activeChannel}...`}
                className="font-mono"
              />
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()} className="gap-2">
                <Send className="w-4 h-4" />
                Send
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* User List Sidebar */}
      <div className="lg:col-span-1">
        <Card className="terminal-border bg-card/90 backdrop-blur-sm">
          <div className="p-4">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Online Users ({onlineUsers.length})
            </h3>
            <ScrollArea className="h-80">
              <div className="space-y-2">
                {mockUsers.map((user) => (
                  <div
                    key={user.username}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/20 transition-all"
                  >
                    <div className="relative">
                      <div className="w-6 h-6 rounded-full bg-muted/30 flex items-center justify-center">
                        {getUserLevelIcon(user.level)}
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(user.status)}`}
                      ></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium truncate ${getUserLevelColor(user.level)}`}>
                        {user.username}
                      </div>
                      <div className="text-xs text-muted-foreground">{user.missions} missions</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </Card>
      </div>
    </div>
  )
}
