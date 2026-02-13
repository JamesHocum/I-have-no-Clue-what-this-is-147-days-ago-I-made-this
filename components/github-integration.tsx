"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, GitBranch, Star, Eye, Download, ExternalLink, Clock } from "lucide-react"

interface GitHubRepo {
  id: string
  name: string
  fullName: string
  description: string
  language: string
  stars: number
  watchers: number
  forks: number
  lastUpdated: Date
  url: string
  cloneUrl: string
}

interface GitHubIntegrationProps {
  onRepoClone?: (repo: GitHubRepo) => void
}

export function GitHubIntegration({ onRepoClone }: GitHubIntegrationProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<GitHubRepo[]>([])
  const [recentRepos, setRecentRepos] = useState<GitHubRepo[]>([
    {
      id: "1",
      name: "cyberpunk-ui",
      fullName: "ladyviolet/cyberpunk-ui",
      description: "🔥 Neon-themed React components for cyberpunk interfaces",
      language: "TypeScript",
      stars: 1337,
      watchers: 89,
      forks: 234,
      lastUpdated: new Date(),
      url: "https://github.com/ladyviolet/cyberpunk-ui",
      cloneUrl: "https://github.com/ladyviolet/cyberpunk-ui.git",
    },
    {
      id: "2",
      name: "hacker-terminal",
      fullName: "ladyviolet/hacker-terminal",
      description: "💜 Advanced terminal emulator with AI assistance",
      language: "JavaScript",
      stars: 892,
      watchers: 45,
      forks: 156,
      lastUpdated: new Date(),
      url: "https://github.com/ladyviolet/hacker-terminal",
      cloneUrl: "https://github.com/ladyviolet/hacker-terminal.git",
    },
  ])

  const searchRepositories = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)

    // Simulate GitHub API search
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const mockResults: GitHubRepo[] = [
      {
        id: "search1",
        name: searchQuery.toLowerCase().replace(/\s+/g, "-"),
        fullName: `user/${searchQuery.toLowerCase().replace(/\s+/g, "-")}`,
        description: `Repository matching "${searchQuery}" - Ready for Lady Violet's enhancements`,
        language: "JavaScript",
        stars: Math.floor(Math.random() * 1000),
        watchers: Math.floor(Math.random() * 100),
        forks: Math.floor(Math.random() * 200),
        lastUpdated: new Date(),
        url: `https://github.com/user/${searchQuery.toLowerCase().replace(/\s+/g, "-")}`,
        cloneUrl: `https://github.com/user/${searchQuery.toLowerCase().replace(/\s+/g, "-")}.git`,
      },
    ]

    setSearchResults(mockResults)
    setIsSearching(false)
  }

  const cloneRepository = (repo: GitHubRepo) => {
    onRepoClone?.(repo)

    // Add to recent repos if not already there
    if (!recentRepos.find((r) => r.id === repo.id)) {
      setRecentRepos((prev) => [repo, ...prev.slice(0, 4)])
    }
  }

  const RepoCard = ({ repo }: { repo: GitHubRepo }) => (
    <Card className="p-4 border-primary/20 hover:border-primary/40 transition-colors">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-semibold text-primary flex items-center gap-2">
              <Github className="w-4 h-4" />
              {repo.name}
            </h4>
            <p className="text-xs text-muted-foreground">{repo.fullName}</p>
          </div>
          <Badge variant="outline">{repo.language}</Badge>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{repo.description}</p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            {repo.stars}
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {repo.watchers}
          </div>
          <div className="flex items-center gap-1">
            <GitBranch className="w-3 h-3" />
            {repo.forks}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {repo.lastUpdated.toLocaleDateString()}
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="sm" className="flex-1 neon-glow" onClick={() => cloneRepository(repo)}>
            <Download className="w-4 h-4 mr-2" />
            Clone
          </Button>
          <Button size="sm" variant="outline">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )

  return (
    <Card className="terminal-border bg-card/90">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Github className="w-6 h-6" />
          GitHub Integration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">🔍 Search</TabsTrigger>
            <TabsTrigger value="recent">⭐ Recent</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="search">Search GitHub Repositories</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="search"
                    placeholder="e.g., react, cyberpunk, terminal..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && searchRepositories()}
                    className="flex-1"
                  />
                  <Button onClick={searchRepositories} disabled={isSearching || !searchQuery.trim()}>
                    {isSearching ? "🔄" : "🔍"}
                  </Button>
                </div>
              </div>

              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {searchResults.map((repo) => (
                    <RepoCard key={repo.id} repo={repo} />
                  ))}

                  {searchResults.length === 0 && !isSearching && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Github className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Search for repositories to clone</p>
                      <p className="text-xs">Find projects to enhance with Lady Violet's power</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            <ScrollArea className="h-[400px]">
              <div className="space-y-3">
                {recentRepos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
