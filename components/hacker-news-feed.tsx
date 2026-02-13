"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  AlertTriangle,
  TrendingUp,
  Users,
  ExternalLink,
  MessageSquare,
  Heart,
  Share,
  Clock,
  Globe,
} from "lucide-react"

interface NewsItem {
  id: string
  title: string
  summary: string
  category: "vulnerability" | "breach" | "tool" | "research" | "community" | "mission"
  severity: "low" | "medium" | "high" | "critical"
  timestamp: Date
  author: string
  likes: number
  comments: number
  tags: string[]
  url?: string
}

const mockNewsData: NewsItem[] = [
  {
    id: "1",
    title: "Critical Zero-Day Vulnerability Discovered in Popular Web Framework",
    summary:
      "Security researchers have identified a remote code execution vulnerability affecting millions of websites. Patch available immediately.",
    category: "vulnerability",
    severity: "critical",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    author: "CyberGuardian",
    likes: 247,
    comments: 89,
    tags: ["RCE", "Web Security", "Zero-Day"],
  },
  {
    id: "2",
    title: "Anonymous Collective Neutralized Major Ransomware Operation",
    summary:
      "White hat hackers successfully disrupted a criminal network targeting hospitals and schools, recovering encrypted data for victims.",
    category: "mission",
    severity: "high",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    author: "DigitalVigilante",
    likes: 1337,
    comments: 203,
    tags: ["Ransomware", "Justice", "Recovery"],
  },
  {
    id: "3",
    title: "New AI-Powered Penetration Testing Tool Released",
    summary:
      "Open-source tool uses machine learning to automatically discover and exploit vulnerabilities in web applications.",
    category: "tool",
    severity: "medium",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    author: "CodeWizard",
    likes: 892,
    comments: 156,
    tags: ["AI", "Pen Testing", "Open Source"],
  },
  {
    id: "4",
    title: "Veteran Homelessness Initiative: 500 Veterans Housed Through Crypto Donations",
    summary:
      "Digital activists successfully raised $2.3M in cryptocurrency to provide housing and support for homeless veterans nationwide.",
    category: "mission",
    severity: "low",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    author: "VeteranSupport",
    likes: 2048,
    comments: 312,
    tags: ["Veterans", "Charity", "Cryptocurrency"],
  },
  {
    id: "5",
    title: "Quantum-Resistant Cryptography Standards Finalized",
    summary:
      "NIST releases final standards for post-quantum cryptographic algorithms to protect against future quantum computer attacks.",
    category: "research",
    severity: "medium",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    author: "QuantumSec",
    likes: 445,
    comments: 78,
    tags: ["Quantum", "Cryptography", "Standards"],
  },
  {
    id: "6",
    title: "Major Social Media Platform Suffers Data Breach",
    summary:
      "Personal information of 50 million users exposed due to misconfigured database. Company offers free credit monitoring.",
    category: "breach",
    severity: "high",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    author: "BreachAlert",
    likes: 156,
    comments: 234,
    tags: ["Data Breach", "Privacy", "Social Media"],
  },
]

export function HackerNewsFeed() {
  const [news, setNews] = useState<NewsItem[]>(mockNewsData)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set())

  const filteredNews = selectedCategory === "all" ? news : news.filter((item) => item.category === selectedCategory)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-400 bg-red-400/20"
      case "high":
        return "text-orange-400 bg-orange-400/20"
      case "medium":
        return "text-yellow-400 bg-yellow-400/20"
      case "low":
        return "text-green-400 bg-green-400/20"
      default:
        return "text-gray-400 bg-gray-400/20"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "vulnerability":
        return <AlertTriangle className="w-4 h-4" />
      case "breach":
        return <Shield className="w-4 h-4" />
      case "tool":
        return <TrendingUp className="w-4 h-4" />
      case "research":
        return <Globe className="w-4 h-4" />
      case "community":
        return <Users className="w-4 h-4" />
      case "mission":
        return <Heart className="w-4 h-4" />
      default:
        return <Globe className="w-4 h-4" />
    }
  }

  const handleLike = (itemId: string) => {
    setLikedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
        setNews((prevNews) => prevNews.map((item) => (item.id === itemId ? { ...item, likes: item.likes - 1 } : item)))
      } else {
        newSet.add(itemId)
        setNews((prevNews) => prevNews.map((item) => (item.id === itemId ? { ...item, likes: item.likes + 1 } : item)))
      }
      return newSet
    })
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - timestamp.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

    if (diffMins < 60) {
      return `${diffMins}m ago`
    } else {
      return `${diffHours}h ago`
    }
  }

  return (
    <Card className="terminal-border bg-card/90 backdrop-blur-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary neon-glow" />
            <h2 className="text-xl font-bold neon-glow">Cybersecurity News Feed</h2>
          </div>
          <Badge className="neon-glow">LIVE</Badge>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
          <TabsList className="grid w-full grid-cols-7 terminal-border bg-muted/20">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="vulnerability">Vulns</TabsTrigger>
            <TabsTrigger value="breach">Breaches</TabsTrigger>
            <TabsTrigger value="tool">Tools</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
            <TabsTrigger value="mission">Missions</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>
        </Tabs>

        <ScrollArea className="h-96">
          <div className="space-y-4">
            {filteredNews.map((item) => (
              <Card
                key={item.id}
                className="p-4 bg-muted/10 border-l-4 border-l-primary hover:bg-muted/20 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getCategoryIcon(item.category)}
                        <Badge variant="outline" className={getSeverityColor(item.severity)}>
                          {item.severity.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>
                      <h3 className="font-semibold text-sm mb-2 leading-tight">{item.title}</h3>
                      <p className="text-xs text-muted-foreground mb-3">{item.summary}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground">by {item.author}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTimeAgo(item.timestamp)}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`gap-1 h-6 px-2 ${likedItems.has(item.id) ? "text-red-400" : ""}`}
                        onClick={() => handleLike(item.id)}
                      >
                        <Heart className={`w-3 h-3 ${likedItems.has(item.id) ? "fill-current" : ""}`} />
                        {item.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1 h-6 px-2">
                        <MessageSquare className="w-3 h-3" />
                        {item.comments}
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1 h-6 px-2">
                        <Share className="w-3 h-3" />
                      </Button>
                      {item.url && (
                        <Button variant="ghost" size="sm" className="gap-1 h-6 px-2">
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  )
}
