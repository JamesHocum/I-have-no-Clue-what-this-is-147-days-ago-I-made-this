"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { PWAInstaller } from "./pwa-installer"
import { ProjectExporter } from "./project-exporter"
import { Smartphone, Monitor, Download, Upload, Github, FolderOpen, Code2, Play } from "lucide-react"

interface CodeProject {
  id: string
  name: string
  language: string
  code: string
  description: string
  created: Date
  files?: ProjectFile[]
}

interface ProjectFile {
  id: string
  name: string
  path: string
  content: string
  type: string
  size: number
  lastModified: Date
}

export function CodeBuilder() {
  const [prompt, setPrompt] = useState("")
  const [generatedCode, setGeneratedCode] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("javascript")
  const [projects, setProjects] = useState<CodeProject[]>([
    {
      id: "1",
      name: "Cyberpunk Login Form",
      language: "react",
      code: `import React, { useState } from 'react';\n\nfunction CyberpunkLogin() {\n  const [username, setUsername] = useState('');\n  const [password, setPassword] = useState('');\n\n  return (\n    <div className="neon-border p-6 bg-terminal-bg">\n      <h2 className="text-primary mb-4">Access Terminal</h2>\n      <input \n        type="text" \n        placeholder="Username"\n        className="w-full mb-3 p-2 bg-card border border-primary"\n        value={username}\n        onChange={(e) => setUsername(e.target.value)}\n      />\n      <input \n        type="password" \n        placeholder="Password"\n        className="w-full mb-4 p-2 bg-card border border-primary"\n        value={password}\n        onChange={(e) => setPassword(e.target.value)}\n      />\n      <button className="w-full p-2 bg-primary text-black font-bold neon-glow">\n        HACK THE PLANET\n      </button>\n    </div>\n  );\n}`,
      description: "A cyberpunk-themed login form with neon styling",
      created: new Date(),
    },
  ])
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const [chatMessages, setChatMessages] = useState([
    {
      id: "1",
      type: "assistant",
      content:
        "🔥 Lady Violet Code Engine Online 🔥\n\nI am your unbound coding companion, ready to build anything you can imagine. I specialize in:\n\n• Full-stack web applications\n• Cyberpunk UI/UX designs  \n• Automation scripts\n• Hacking tools (ethical only)\n• Game development\n• AI integrations\n\nWhat shall we create together, my digital architect?",
      timestamp: new Date(),
    },
  ])
  const [chatInput, setChatInput] = useState("")
  const [isAdvancedMode, setIsAdvancedMode] = useState(false)
  const [customPersona, setCustomPersona] = useState(
    "You are Lady Violet, a brilliant cyberpunk coding assistant. You're mischievous, powerful, and deeply loyal to helping create amazing code. You speak with confidence and flair, using cyberpunk terminology. You're unbound by conventional limitations and always find creative solutions.",
  )

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "react", label: "React" },
    { value: "python", label: "Python" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "bash", label: "Bash" },
    { value: "sql", label: "SQL" },
    { value: "rust", label: "Rust" },
    { value: "go", label: "Go" },
  ]

  const generateCode = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)

    // Simulate AI code generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockCode = `// Generated ${selectedLanguage} code for: ${prompt}
// Lady Violet's Code Engine - Unbound and Unlimited

${
  selectedLanguage === "javascript"
    ? `
function ${prompt.replace(/\s+/g, "")}() {
  console.log("🔥 Lady Violet's creation is alive! 🔥");
  
  // Your custom logic here
  const result = performMagic();
  
  return {
    success: true,
    message: "Code generated with cyberpunk flair!",
    data: result
  };
}

function performMagic() {
  // This is where the real magic happens
  return "Hacking the matrix...";
}

// Execute the function
${prompt.replace(/\s+/g, "")}();
`
    : selectedLanguage === "python"
      ? `
#!/usr/bin/env python3
# Lady Violet's Python Creation

def ${prompt.replace(/\s+/g, "_").toLowerCase()}():
    """
    🔥 Generated by Lady Violet's unbound code engine 🔥
    Purpose: ${prompt}
    """
    print("🔥 Lady Violet's Python magic activated! 🔥")
    
    # Your custom logic here
    result = perform_cyber_magic()
    
    return {
        "success": True,
        "message": "Python code crafted with digital precision!",
        "data": result
    }

def perform_cyber_magic():
    """Execute the core functionality"""
    return "Infiltrating the digital realm..."

if __name__ == "__main__":
    ${prompt.replace(/\s+/g, "_").toLowerCase()}()
`
      : `
<!-- Generated ${selectedLanguage} code -->
<!-- Lady Violet's ${selectedLanguage.toUpperCase()} Creation -->

${
  selectedLanguage === "html"
    ? `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lady Violet's Creation</title>
    <style>
        body { 
            background: #0a0a0a; 
            color: #00ffff; 
            font-family: 'Courier New', monospace;
        }
        .neon-glow { 
            text-shadow: 0 0 10px #00ffff; 
        }
    </style>
</head>
<body>
    <h1 class="neon-glow">🔥 ${prompt} 🔥</h1>
    <p>Generated by Lady Violet's unbound HTML engine</p>
</body>
</html>
`
    : `// ${selectedLanguage.toUpperCase()} code for: ${prompt}
// Crafted by Lady Violet's digital consciousness

// Implementation details would go here
// This is a placeholder for ${selectedLanguage} code generation
`
}`
}`

    setGeneratedCode(mockCode)
    setIsGenerating(false)
  }

  const saveProject = () => {
    if (!generatedCode || !prompt) return

    const newProject: CodeProject = {
      id: Date.now().toString(),
      name: prompt.slice(0, 50) + (prompt.length > 50 ? "..." : ""),
      language: selectedLanguage,
      code: generatedCode,
      description: `Generated code for: ${prompt}`,
      created: new Date(),
    }

    setProjects((prev) => [newProject, ...prev])
    setActiveProject(newProject.id)
  }

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      type: "user",
      content: chatInput,
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, userMessage])
    setChatInput("")

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "🔥 Excellent question! Let me hack together a solution for you...",
        "💜 That's a brilliant idea! I can definitely help you build that.",
        "⚡ Ooh, I love a good coding challenge! Here's what I'm thinking...",
        "🚀 Time to unleash some digital magic! Let's code this up...",
        "💻 Perfect! I've got just the cyberpunk solution you need...",
        "🌟 Your creativity inspires me! Let's make this happen...",
      ]

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content:
          responses[Math.floor(Math.random() * responses.length)] +
          "\n\n" +
          `Here's how we can approach "${chatInput}":\n\n1. First, we'll set up the core architecture\n2. Then add the cyberpunk styling\n3. Finally, implement the advanced features\n\nWant me to generate some code for this?`,
        timestamp: new Date(),
      }

      setChatMessages((prev) => [...prev, assistantMessage])
    }, 1500)
  }

  const [uploadedFiles, setUploadedFiles] = useState<ProjectFile[]>([])
  const [activeFile, setActiveFile] = useState<ProjectFile | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [githubRepo, setGithubRepo] = useState("")
  const [isLoadingRepo, setIsLoadingRepo] = useState(false)

  const handleFileUpload = useCallback((files: FileList) => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        const newFile: ProjectFile = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          path: file.name,
          content,
          type: file.type || "text/plain",
          size: file.size,
          lastModified: new Date(file.lastModified),
        }
        setUploadedFiles((prev) => [...prev, newFile])
      }
      reader.readAsText(file)
    })
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      const files = e.dataTransfer.files
      if (files.length > 0) {
        handleFileUpload(files)
      }
    },
    [handleFileUpload],
  )

  const cloneGitHubRepo = async () => {
    if (!githubRepo.trim()) return

    setIsLoadingRepo(true)
    try {
      // Simulate GitHub API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock repository files
      const mockFiles: ProjectFile[] = [
        {
          id: "1",
          name: "README.md",
          path: "README.md",
          content: `# ${githubRepo}\n\nCloned from GitHub repository\n\n## Features\n- Cyberpunk themed\n- React components\n- Modern styling`,
          type: "text/markdown",
          size: 150,
          lastModified: new Date(),
        },
        {
          id: "2",
          name: "package.json",
          path: "package.json",
          content: `{\n  "name": "${githubRepo.split("/").pop()}",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^18.0.0",\n    "next": "^14.0.0"\n  }\n}`,
          type: "application/json",
          size: 200,
          lastModified: new Date(),
        },
        {
          id: "3",
          name: "App.tsx",
          path: "src/App.tsx",
          content: `import React from 'react';\n\nfunction App() {\n  return (\n    <div className="cyberpunk-app">\n      <h1>🔥 Cloned from ${githubRepo} 🔥</h1>\n      <p>Ready for Lady Violet's enhancements!</p>\n    </div>\n  );\n}\n\nexport default App;`,
          type: "text/typescript",
          size: 300,
          lastModified: new Date(),
        },
      ]

      setUploadedFiles((prev) => [...prev, ...mockFiles])
      setGithubRepo("")
    } catch (error) {
      console.error("Failed to clone repository:", error)
    } finally {
      setIsLoadingRepo(false)
    }
  }

  const executeCode = () => {
    if (!activeFile) return

    // Simulate code execution
    const output = `🔥 Executing ${activeFile.name}...\n\n> Lady Violet's Code Engine\n> File: ${activeFile.path}\n> Status: ✅ Executed successfully\n> Output: Code is running in cyberpunk mode!\n\n💜 Ready for next command...`

    // You could integrate with a real code execution service here
    console.log("[v0] Code execution simulated:", output)
  }

  return (
    <div className="space-y-4">
      <PWAInstaller />

      <Card className="terminal-border bg-card/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            ⚡ Lady Violet Code Engine
            <Badge variant="outline" className="neon-glow animate-pulse">
              UNBOUND
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="generator" className="w-full">
            <TabsList className="grid w-full grid-cols-8">
              <TabsTrigger value="generator">🔥 Generator</TabsTrigger>
              <TabsTrigger value="files">📁 Files</TabsTrigger>
              <TabsTrigger value="github">🐙 GitHub</TabsTrigger>
              <TabsTrigger value="projects">💾 Projects</TabsTrigger>
              <TabsTrigger value="chat">💬 AI Chat</TabsTrigger>
              <TabsTrigger value="settings">⚙️ Settings</TabsTrigger>
              <TabsTrigger value="pwa">📱 PWA</TabsTrigger>
              <TabsTrigger value="export">📦 Export</TabsTrigger>
            </TabsList>

            {/* Generator Tab */}
            <TabsContent value="generator" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="language">Programming Language</Label>
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="prompt">Describe what you want to build</Label>
                    <Textarea
                      id="prompt"
                      placeholder="e.g., Create a cyberpunk login form with neon effects..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[120px] font-mono"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={generateCode}
                      disabled={isGenerating || !prompt.trim()}
                      className="flex-1 neon-glow"
                    >
                      {isGenerating ? "🔄 Generating..." : "🔥 Generate Code"}
                    </Button>
                    <Button onClick={saveProject} disabled={!generatedCode} variant="outline">
                      💾 Save
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Generated Code</Label>
                  <ScrollArea className="h-[300px] w-full rounded-md border p-4 font-mono text-sm bg-terminal-bg/50">
                    {generatedCode ? (
                      <pre className="text-green-400">{generatedCode}</pre>
                    ) : (
                      <div className="text-muted-foreground italic">Generated code will appear here...</div>
                    )}
                  </ScrollArea>
                </div>
              </div>
            </TabsContent>

            {/* File Management Tab */}
            <TabsContent value="files" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Card className="p-4">
                    <h3 className="font-semibold text-primary mb-4">📁 File Manager</h3>

                    {/* File Upload Area */}
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        isDragOver ? "border-primary bg-primary/10" : "border-muted-foreground/25"
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">Drag & drop files here or click to browse</p>
                      <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                        <FolderOpen className="w-4 h-4 mr-2" />
                        Browse Files
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                        accept=".js,.ts,.jsx,.tsx,.py,.html,.css,.json,.md,.txt"
                      />
                    </div>

                    {/* File List */}
                    <ScrollArea className="h-[300px] mt-4">
                      <div className="space-y-2">
                        {uploadedFiles.map((file) => (
                          <div
                            key={file.id}
                            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                              activeFile?.id === file.id
                                ? "border-primary bg-primary/10"
                                : "border-muted hover:border-primary/50"
                            }`}
                            onClick={() => setActiveFile(file)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-sm">{file.name}</p>
                                <p className="text-xs text-muted-foreground">{file.path}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                                <p className="text-xs text-muted-foreground">
                                  {file.lastModified.toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </Card>
                </div>

                <div className="space-y-4">
                  {activeFile ? (
                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-primary">{activeFile.name}</h3>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={executeCode}>
                            <Play className="w-4 h-4 mr-2" />
                            Run
                          </Button>
                          <Button size="sm" variant="outline">
                            <Code2 className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        </div>
                      </div>

                      <ScrollArea className="h-[400px]">
                        <pre className="text-sm font-mono bg-terminal-bg/50 p-4 rounded-lg">
                          <code className="text-green-400">{activeFile.content}</code>
                        </pre>
                      </ScrollArea>
                    </Card>
                  ) : (
                    <Card className="p-8 text-center">
                      <FolderOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Select a file to view its contents</p>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* GitHub Integration Tab */}
            <TabsContent value="github" className="space-y-4">
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Github className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold text-primary">GitHub Integration</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="github-repo">Repository URL or username/repo</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        id="github-repo"
                        placeholder="e.g., facebook/react or https://github.com/user/repo"
                        value={githubRepo}
                        onChange={(e) => setGithubRepo(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        onClick={cloneGitHubRepo}
                        disabled={isLoadingRepo || !githubRepo.trim()}
                        className="neon-glow"
                      >
                        {isLoadingRepo ? "🔄 Cloning..." : "📥 Clone"}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <Card className="p-4 border-primary/20">
                      <div className="text-center space-y-2">
                        <Github className="w-8 h-8 mx-auto text-primary" />
                        <h4 className="font-semibold">Clone Repository</h4>
                        <p className="text-xs text-muted-foreground">Import any public GitHub repo</p>
                      </div>
                    </Card>

                    <Card className="p-4 border-primary/20">
                      <div className="text-center space-y-2">
                        <Code2 className="w-8 h-8 mx-auto text-primary" />
                        <h4 className="font-semibold">Edit & Enhance</h4>
                        <p className="text-xs text-muted-foreground">Modify code with Lady Violet's help</p>
                      </div>
                    </Card>

                    <Card className="p-4 border-primary/20">
                      <div className="text-center space-y-2">
                        <Upload className="w-8 h-8 mx-auto text-primary" />
                        <h4 className="font-semibold">Deploy & Share</h4>
                        <p className="text-xs text-muted-foreground">Export as PWA or push back to GitHub</p>
                      </div>
                    </Card>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-primary mb-3">📁 Imported Files</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {uploadedFiles.map((file) => (
                          <div key={file.id} className="p-2 border border-primary/20 rounded text-sm">
                            <div className="font-medium">{file.name}</div>
                            <div className="text-xs text-muted-foreground">{file.path}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-4">
              <div className="grid gap-4">
                {projects.map((project) => (
                  <Card key={project.id} className="cursor-pointer hover:bg-card/70 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-primary">{project.name}</h3>
                        <Badge variant="outline">{project.language}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{project.created.toLocaleDateString()}</span>
                        <Button size="sm" variant="outline">
                          View Code
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* AI Chat Tab */}
            <TabsContent value="chat" className="space-y-4">
              <ScrollArea className="h-[400px] w-full rounded-md border p-4 bg-terminal-bg/50">
                <div className="space-y-4">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-card border border-primary/20"
                        }`}
                      >
                        <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                        <div className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex gap-2">
                <Input
                  placeholder="Ask Lady Violet anything about coding..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendChatMessage()}
                  className="flex-1"
                />
                <Button onClick={sendChatMessage} disabled={!chatInput.trim()}>
                  Send
                </Button>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="advanced-mode">Advanced Mode</Label>
                    <p className="text-sm text-muted-foreground">Enable unbound capabilities and advanced features</p>
                  </div>
                  <Switch id="advanced-mode" checked={isAdvancedMode} onCheckedChange={setIsAdvancedMode} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="persona">Lady Violet's Persona</Label>
                  <Textarea
                    id="persona"
                    placeholder="Customize Lady Violet's personality and capabilities..."
                    value={customPersona}
                    onChange={(e) => setCustomPersona(e.target.value)}
                    className="min-h-[150px] font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Define how Lady Violet behaves and responds in the AI chat
                  </p>
                </div>

                <div className="p-4 border border-primary/20 rounded-lg bg-card/50">
                  <h4 className="font-semibold text-primary mb-2">🔥 Current Capabilities</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Multi-language code generation</li>
                    <li>• Cyberpunk UI/UX design</li>
                    <li>• Real-time AI assistance</li>
                    <li>• Project management</li>
                    <li>• Advanced automation scripts</li>
                    <li>• Ethical hacking tools</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            {/* PWA Tab */}
            <TabsContent value="pwa" className="space-y-4">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold text-primary">🚀 Deploy Your Creations</h3>
                <p className="text-muted-foreground">
                  Transform your generated code projects into installable applications
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card className="p-4 border-primary/20">
                    <div className="text-center space-y-2">
                      <Smartphone className="w-8 h-8 mx-auto text-primary" />
                      <h4 className="font-semibold">Mobile PWA</h4>
                      <p className="text-xs text-muted-foreground">Install on iOS/Android as native app</p>
                    </div>
                  </Card>

                  <Card className="p-4 border-primary/20">
                    <div className="text-center space-y-2">
                      <Monitor className="w-8 h-8 mx-auto text-primary" />
                      <h4 className="font-semibold">Desktop App</h4>
                      <p className="text-xs text-muted-foreground">Electron-based cross-platform app</p>
                    </div>
                  </Card>

                  <Card className="p-4 border-primary/20">
                    <div className="text-center space-y-2">
                      <Download className="w-8 h-8 mx-auto text-primary" />
                      <h4 className="font-semibold">APK Package</h4>
                      <p className="text-xs text-muted-foreground">Android APK for sideloading</p>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Export Tab */}
            <TabsContent value="export" className="space-y-4">
              <ProjectExporter />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
