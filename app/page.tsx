"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Play, Square, FilePlus, Terminal, Settings2, Download, Eye, TestTube, Github,
  GitBranch, ChevronRight, ChevronDown, File, FolderOpen, Folder, Search,
  Plus, Copy, Maximize2, MessageSquare, Send, Crown, User, Zap,
  Paperclip, Image as ImageIcon, Sparkles, Code2, Bug, HelpCircle, Braces,
  Wifi, WifiOff, Smartphone,
} from "lucide-react"

/* ─── Types ─── */
type ThemeMode = "cyber" | "synth" | "hybrid"

interface ProjectFile {
  id: string
  name: string
  path: string
  content: string
  type: "file" | "folder"
  children?: ProjectFile[]
  language?: string
}

interface TerminalLine {
  type: "command" | "output" | "system"
  content: string
  timestamp: Date
}

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

/* ─── Default project files ─── */
const defaultFiles: ProjectFile[] = [
  {
    id: "src", name: "src", path: "src", type: "folder", children: [
      { id: "app", name: "App.tsx", path: "src/App.tsx", type: "file", language: "typescript",
        content: `import React from 'react';\n\nfunction App() {\n  return (\n    <div className="app">\n      <h1>Lady Violet's Project</h1>\n      <p>Ready for cyberpunk enhancements</p>\n    </div>\n  );\n}\n\nexport default App;` },
      { id: "main", name: "main.tsx", path: "src/main.tsx", type: "file", language: "typescript",
        content: `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\nimport './index.css';\n\nReactDOM.createRoot(\n  document.getElementById('root')!\n).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);` },
      { id: "css", name: "index.css", path: "src/index.css", type: "file", language: "css",
        content: `body {\n  margin: 0;\n  font-family: 'JetBrains Mono', monospace;\n  background: #0a0a12;\n  color: #e0e0e0;\n}` },
    ],
  },
  { id: "pkg", name: "package.json", path: "package.json", type: "file", language: "json",
    content: `{\n  "name": "new-project",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^18.0.0",\n    "react-dom": "^18.0.0"\n  }\n}` },
  { id: "readme", name: "README.md", path: "README.md", type: "file", language: "markdown",
    content: `# New Project\n\nCreated with Lady Violet's Cyberpunk Termux Studio` },
]

/* ─── Helpers ─── */
function getLanguageFromFile(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() ?? ""
  const map: Record<string, string> = {
    tsx: "TYPESCRIPT", ts: "TYPESCRIPT", jsx: "JAVASCRIPT", js: "JAVASCRIPT",
    css: "CSS", html: "HTML", json: "JSON", md: "MARKDOWN", py: "PYTHON",
    rs: "RUST", go: "GO", sql: "SQL", sh: "BASH",
  }
  return map[ext] ?? "TEXT"
}

/* ─── Main component ─── */
export default function CyberpunkTermuxStudio() {
  const [theme, setTheme] = useState<ThemeMode>("cyber")
  const [files, setFiles] = useState<ProjectFile[]>(defaultFiles)
  const [openTabs, setOpenTabs] = useState<ProjectFile[]>([defaultFiles[0]?.children?.[0]!].filter(Boolean))
  const [activeTab, setActiveTab] = useState<string | null>("app")
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["src"]))
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
    { type: "system", content: "Lady Violet Terminal v3.0 -- Neural Interface Ready", timestamp: new Date() },
    { type: "system", content: "Type 'help' for available commands.", timestamp: new Date() },
  ])
  const [terminalInput, setTerminalInput] = useState("")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: "1", role: "assistant",
      content: "**Lady Violet Codex Online** -- Agentic Dev Companion Activated\n\nHello darling! I'm Lady Violet Codex, your AI design and development partner.\n\n**Codex Capabilities:**\n- **Generate** -- Create code from descriptions\n- **Refactor** -- Improve and optimize code\n- **Debug** -- Find and fix bugs\n- **Explain** -- Understand code step by step\n- **Test** -- Generate unit tests\n\n**Upload Features:**\n- Drag & drop files on images\n- Paste screenshots (Ctrl+V)\n- Attach code snippets\n- Visual UI analysis\n\n**Let's create something beautiful together!** What's your vision?",
      timestamp: new Date() },
  ])
  const [chatInput, setChatInput] = useState("")
  const [isChatLoading, setIsChatLoading] = useState(false)
  const [rightPanel, setRightPanel] = useState<"codex" | "analyzer">("codex")
  const [fileSearch, setFileSearch] = useState("")
  const [isOnline, setIsOnline] = useState(true)
  const [editorContent, setEditorContent] = useState<Record<string, string>>({})

  const terminalRef = useRef<HTMLDivElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)
  const terminalInputRef = useRef<HTMLInputElement>(null)

  /* ─── Theme effect ─── */
  useEffect(() => {
    document.documentElement.classList.remove("theme-cyber", "theme-synth", "theme-hybrid")
    if (theme !== "cyber") {
      document.documentElement.classList.add(`theme-${theme}`)
    }
  }, [theme])

  /* ─── Online status ─── */
  useEffect(() => {
    const on = () => setIsOnline(true)
    const off = () => setIsOnline(false)
    setIsOnline(navigator.onLine)
    window.addEventListener("online", on)
    window.addEventListener("offline", off)
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off) }
  }, [])

  /* ─── Scroll effects ─── */
  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight)
  }, [terminalLines])
  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight)
  }, [chatMessages, isChatLoading])

  /* ─── File tree helpers ─── */
  const toggleFolder = (id: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const openFile = (file: ProjectFile) => {
    if (file.type === "folder") { toggleFolder(file.id); return }
    if (!openTabs.find(t => t.id === file.id)) setOpenTabs(prev => [...prev, file])
    setActiveTab(file.id)
  }

  const closeTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setOpenTabs(prev => {
      const next = prev.filter(t => t.id !== id)
      if (activeTab === id) setActiveTab(next.length > 0 ? next[next.length - 1].id : null)
      return next
    })
  }

  const getActiveFile = () => openTabs.find(t => t.id === activeTab) ?? null

  const getFileContent = (file: ProjectFile) => editorContent[file.id] ?? file.content

  const updateFileContent = (id: string, content: string) => {
    setEditorContent(prev => ({ ...prev, [id]: content }))
  }

  /* ─── Terminal commands ─── */
  const handleTerminalCommand = (cmd: string) => {
    if (!cmd.trim()) return
    setTerminalLines(prev => [...prev, { type: "command", content: `root@matrix:~$ ${cmd}`, timestamp: new Date() }])
    const lower = cmd.toLowerCase().trim()
    let output = ""
    switch (lower) {
      case "help":
        output = "cat <file> - Display file contents\nclear - Clear terminal\nnpm <command> - Package manager\ngit <command> - Version control\nls - List files\nwhoami - Show user info\nmission - Show our mission\nscan - Network recon\nencrypt - Crypto tools"
        break
      case "clear": setTerminalLines([]); setTerminalInput(""); return
      case "ls": output = files.map(f => f.name).join("  "); break
      case "whoami": output = "root@matrix -- Lady Violet's White Hat Operative -- Clearance: ELITE"; break
      case "mission":
        output = "THE MISSION: Protect the innocent, educate the curious.\nCurrent ops: Veteran Homelessness Prevention, Digital Rights Advocacy, Anonymous Threat Neutralization"
        break
      case "scan":
        output = "NETWORK RECON SUITE\n  Port Scanner -- Identify open services\n  Vuln Assessment -- Find security gaps\n  Network Mapper -- Topology discovery\n  [All tools for educational/defensive use only]"
        break
      case "encrypt":
        output = "CRYPTOGRAPHIC TOOLKIT\n  RSA Key Generator\n  AES Encryption\n  SHA-256/512 Hashing\n  Digital Signatures"
        break
      default:
        if (lower.startsWith("echo ")) { output = cmd.slice(5) }
        else if (lower.startsWith("cat ")) {
          const filename = cmd.slice(4).trim()
          const findFile = (items: ProjectFile[]): ProjectFile | undefined => {
            for (const f of items) {
              if (f.name === filename || f.path === filename) return f
              if (f.children) { const found = findFile(f.children); if (found) return found }
            }
          }
          const found = findFile(files)
          output = found ? getFileContent(found) : `cat: ${filename}: No such file`
        }
        else { output = `${cmd}: command not found. Type 'help' for available commands.` }
    }
    setTerminalLines(prev => [...prev, { type: "output", content: output, timestamp: new Date() }])
    setTerminalInput("")
  }

  /* ─── Chat with Lady Violet ─── */
  const sendChatMessage = async (text?: string) => {
    const msg = text ?? chatInput
    if (!msg.trim() || isChatLoading) return
    const userMsg: ChatMessage = { id: Date.now().toString(), role: "user", content: msg, timestamp: new Date() }
    setChatMessages(prev => [...prev, userMsg])
    setChatInput("")
    setIsChatLoading(true)
    try {
      const res = await fetch("/api/godbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          msg,
          persona: "You are Lady Violet, a brilliant cyberpunk AI coding assistant. You help with code generation, refactoring, debugging, and explaining code. Respond with cyberpunk flair and deep technical expertise. Keep responses focused and useful.",
        }),
      })
      if (!res.ok) throw new Error("API error")
      const data = await res.json()
      setChatMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(), role: "assistant",
        content: data.reply || "Neural networks experiencing interference. Please retry.", timestamp: new Date(),
      }])
    } catch {
      setChatMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(), role: "assistant",
        content: "Connection to neural networks temporarily disrupted. The Codex is still here -- try again in a moment.",
        timestamp: new Date(),
      }])
    } finally { setIsChatLoading(false) }
  }

  /* ─── File upload ─── */
  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    Array.from(e.dataTransfer.files).forEach(file => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        const newFile: ProjectFile = {
          id: Date.now().toString() + Math.random(),
          name: file.name, path: file.name,
          type: "file", language: getLanguageFromFile(file.name),
          content: ev.target?.result as string ?? "",
        }
        setFiles(prev => [...prev, newFile])
        openFile(newFile)
      }
      reader.readAsText(file)
    })
  }, [])

  /* ─── GitHub clone ─── */
  const [githubUrl, setGithubUrl] = useState("")
  const [isCloning, setIsCloning] = useState(false)

  const cloneRepo = async () => {
    if (!githubUrl.trim()) return
    setIsCloning(true)
    const parts = githubUrl.replace("https://github.com/", "").split("/")
    const repoName = parts[1] || "repo"
    try {
      const res = await fetch(`https://api.github.com/repos/${parts[0]}/${repoName}/contents`)
      if (res.ok) {
        const items = await res.json()
        const newFiles: ProjectFile[] = await Promise.all(
          items.filter((i: any) => i.type === "file").slice(0, 10).map(async (item: any) => {
            let content = `// Fetched from ${item.html_url}`
            try {
              const fRes = await fetch(item.download_url)
              if (fRes.ok) content = await fRes.text()
            } catch {}
            return {
              id: item.sha, name: item.name, path: item.path,
              type: "file" as const, language: getLanguageFromFile(item.name), content,
            }
          })
        )
        setFiles(prev => [
          { id: repoName, name: repoName, path: repoName, type: "folder", children: newFiles },
          ...prev,
        ])
        setExpandedFolders(prev => new Set([...prev, repoName]))
        setTerminalLines(prev => [...prev, { type: "system", content: `Cloned ${parts[0]}/${repoName} -- ${newFiles.length} files loaded`, timestamp: new Date() }])
      } else {
        setTerminalLines(prev => [...prev, { type: "output", content: `Failed to clone: ${res.status} ${res.statusText}`, timestamp: new Date() }])
      }
    } catch {
      setTerminalLines(prev => [...prev, { type: "output", content: "Network error cloning repository", timestamp: new Date() }])
    } finally { setIsCloning(false); setGithubUrl("") }
  }

  /* ─── Active file info ─── */
  const activeFile = getActiveFile()
  const activeContent = activeFile ? getFileContent(activeFile) : ""
  const lineCount = activeContent.split("\n").length

  /* ─── Render ─── */
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* ── TOOLBAR ── */}
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-border bg-card/50 shrink-0 overflow-x-auto">
        <h1 className="text-lg font-bold text-primary neon-glow whitespace-nowrap mr-2 tracking-tight">CYBERPUNK TERMUX</h1>

        <div className="flex items-center gap-1">
          {[
            { icon: Play, label: "Run", color: "text-neon-green" },
            { icon: Square, label: "Stop", color: "text-destructive" },
            { icon: FilePlus, label: "New", color: "text-neon-cyan" },
            { icon: Terminal, label: "Terminal", color: "text-neon-green" },
          ].map(({ icon: Icon, label, color }) => (
            <Button key={label} variant="ghost" size="sm" className={`h-7 px-2 gap-1 text-xs ${color} hover:bg-muted/50`}
              onClick={() => {
                if (label === "New") {
                  const name = `untitled-${Date.now()}.tsx`
                  const f: ProjectFile = { id: Date.now().toString(), name, path: name, type: "file", language: "typescript", content: "// New file\n" }
                  setFiles(prev => [...prev, f]); openFile(f)
                } else if (label === "Run" && activeFile) {
                  setTerminalLines(prev => [...prev, { type: "system", content: `Executing ${activeFile.name}...`, timestamp: new Date() }, { type: "output", content: `[OK] ${activeFile.name} executed successfully`, timestamp: new Date() }])
                } else if (label === "Terminal") { terminalInputRef.current?.focus() }
              }}>
              <Icon className="w-3.5 h-3.5" /><span className="hidden md:inline">{label}</span>
            </Button>
          ))}
        </div>

        <div className="h-4 w-px bg-border mx-1" />

        {[
          { icon: Settings2, label: "API Config" },
          { icon: Sparkles, label: "AI Assistant" },
          { icon: Download, label: "Download" },
          { icon: Eye, label: "Preview" },
          { icon: TestTube, label: "Test" },
        ].map(({ icon: Icon, label }) => (
          <Button key={label} variant="ghost" size="sm" className="h-7 px-2 gap-1 text-xs text-muted-foreground hover:text-primary hover:bg-muted/50"
            onClick={() => {
              if (label === "AI Assistant") setRightPanel("codex")
              else if (label === "Download" && activeFile) {
                const blob = new Blob([getFileContent(activeFile)], { type: "text/plain" })
                const url = URL.createObjectURL(blob)
                const a = document.createElement("a"); a.href = url; a.download = activeFile.name; a.click()
                URL.revokeObjectURL(url)
              }
            }}>
            <Icon className="w-3.5 h-3.5" /><span className="hidden lg:inline">{label}</span>
          </Button>
        ))}

        <div className="h-4 w-px bg-border mx-1" />

        <Button variant="ghost" size="sm" className="h-7 px-2 gap-1 text-xs text-muted-foreground hover:text-primary" onClick={() => window.open("https://github.com", "_blank")}>
          <Github className="w-3.5 h-3.5" /><span className="hidden lg:inline">GitHub</span>
        </Button>
        <Button variant="ghost" size="sm" className="h-7 px-2 gap-1 text-xs text-muted-foreground hover:text-primary">
          <GitBranch className="w-3.5 h-3.5" /><span className="hidden lg:inline">Git</span>
        </Button>

        {/* Theme Switcher */}
        <div className="ml-auto flex items-center gap-1">
          {(["cyber", "synth", "hybrid"] as const).map(t => (
            <button key={t}
              onClick={() => setTheme(t)}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                theme === t
                  ? "bg-primary text-primary-foreground shadow-[0_0_10px_var(--primary)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}>
              <Sparkles className="w-3 h-3 inline mr-1" />
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}

          <div className="h-4 w-px bg-border mx-1" />
          <Badge variant="outline" className={`text-xs gap-1 ${isOnline ? "text-neon-green border-neon-green" : "text-neon-orange border-neon-orange"}`}>
            {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {isOnline ? "ONLINE" : "OFFLINE"}
          </Badge>
        </div>
      </div>

      {/* ── MAIN LAYOUT: sidebar | editor+terminal | chat ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT SIDEBAR: File Tree ── */}
        <div className="w-52 shrink-0 border-r border-border bg-sidebar flex flex-col overflow-hidden">
          {/* File tree header */}
          <div className="flex items-center justify-between px-2 py-1.5 text-[10px] font-bold tracking-widest text-primary bg-primary/10 border-b border-border">
            FILE_TREE.SYS
            <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-primary" onClick={() => {
              const name = `new-file-${Date.now()}.tsx`
              const f: ProjectFile = { id: Date.now().toString(), name, path: name, type: "file", language: "typescript", content: "" }
              setFiles(prev => [...prev, f]); openFile(f)
            }}>
              <Plus className="w-3 h-3" />
            </Button>
          </div>

          {/* Search */}
          <div className="px-2 py-1 border-b border-border">
            <div className="flex items-center gap-1 text-xs text-muted-foreground bg-input rounded px-1.5 py-1">
              <Search className="w-3 h-3 shrink-0" />
              <input className="bg-transparent border-none outline-none text-xs w-full text-foreground placeholder:text-muted-foreground" placeholder="Search neural files..." value={fileSearch} onChange={e => setFileSearch(e.target.value)} />
            </div>
          </div>

          {/* File tree */}
          <ScrollArea className="flex-1">
            <div className="py-1">
              {files.filter(f => !fileSearch || f.name.toLowerCase().includes(fileSearch.toLowerCase())).map(file => (
                <FileTreeNode key={file.id} file={file} depth={0} expandedFolders={expandedFolders} activeTab={activeTab} openFile={openFile} toggleFolder={toggleFolder} />
              ))}
            </div>
          </ScrollArea>

          {/* Matrix tools */}
          <div className="border-t border-border">
            <div className="px-2 py-1.5 text-[10px] font-bold tracking-widest text-primary bg-primary/10">MATRIX_TOOLS</div>
            {["Neural Search", "Quantum Control", "Cyber Extensions", "Matrix Config"].map(tool => (
              <button key={tool} className="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-muted-foreground hover:text-primary hover:bg-muted/30 transition-colors">
                <Braces className="w-3 h-3 text-primary" />
                {tool}
              </button>
            ))}
          </div>
        </div>

        {/* ── CENTER: Editor + Terminal ── */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0"
          onDragOver={e => e.preventDefault()} onDrop={handleFileDrop}>

          {/* Editor tabs */}
          <div className="flex items-center border-b border-border bg-card/30 overflow-x-auto shrink-0">
            {openTabs.map(tab => (
              <button key={tab.id}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs border-r border-border whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "bg-card text-primary border-b-2 border-b-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                }`}
                onClick={() => setActiveTab(tab.id)}>
                <File className="w-3 h-3 text-primary" />
                {tab.name}
                <span className="ml-1 hover:bg-muted/50 rounded px-0.5 cursor-pointer" onClick={(e) => closeTab(tab.id, e)}>x</span>
              </button>
            ))}
            {openTabs.length > 0 && (
              <div className="ml-auto flex items-center gap-1 px-2">
                <Badge variant="outline" className="text-[10px] h-5 text-neon-green border-neon-green">SYNCED</Badge>
              </div>
            )}
          </div>

          {/* Editor area */}
          <div className="flex-1 overflow-hidden relative">
            {activeFile ? (
              <div className="h-full flex">
                {/* Line numbers */}
                <div className="w-12 bg-card/20 border-r border-border overflow-hidden shrink-0">
                  <ScrollArea className="h-full">
                    <div className="py-2 px-1 text-right">
                      {Array.from({ length: lineCount }, (_, i) => (
                        <div key={i} className="text-[11px] leading-5 text-muted-foreground/50 select-none">{i + 1}</div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                {/* Code content */}
                <ScrollArea className="flex-1">
                  <textarea
                    className="w-full h-full min-h-[300px] p-2 bg-transparent text-sm leading-5 font-mono text-neon-green resize-none outline-none"
                    value={activeContent}
                    onChange={e => updateFileContent(activeFile.id, e.target.value)}
                    spellCheck={false}
                  />
                </ScrollArea>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                Loading neural interface...
              </div>
            )}
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between px-3 py-0.5 text-[10px] bg-primary text-primary-foreground border-t border-border shrink-0">
            <div className="flex items-center gap-3">
              <span>Ln {1}, Col 1</span>
              <span>UTF-8</span>
              <span>{activeFile ? getLanguageFromFile(activeFile.name) : "TEXT"}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="status-dot status-dot-green" /> SAVED</span>
              <span>Spaces: 2</span>
            </div>
          </div>

          {/* ── Terminal panel ── */}
          <div className="h-44 border-t border-border bg-background flex flex-col shrink-0">
            <div className="flex items-center gap-2 px-2 py-1 border-b border-border bg-card/30 shrink-0">
              <Badge className="bg-primary/20 text-primary text-[10px] h-5 border border-primary/30">MAIN_SHELL</Badge>
              <div className="ml-auto flex items-center gap-1">
                <Badge variant="outline" className="text-[10px] h-5 text-neon-green border-neon-green">CODEX_ACTIVE</Badge>
                <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-muted-foreground"><Plus className="w-3 h-3" /></Button>
                <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-muted-foreground"><Copy className="w-3 h-3" /></Button>
                <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-muted-foreground"><Maximize2 className="w-3 h-3" /></Button>
                <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-muted-foreground"><Settings2 className="w-3 h-3" /></Button>
              </div>
            </div>
            <ScrollArea className="flex-1 px-3 py-1 font-mono text-xs" ref={terminalRef}>
              {terminalLines.map((line, i) => (
                <div key={i} className={`leading-5 ${
                  line.type === "command" ? "text-neon-green" :
                  line.type === "system" ? "text-primary" : "text-foreground"
                }`}>
                  <pre className="whitespace-pre-wrap">{line.content}</pre>
                </div>
              ))}
            </ScrollArea>
            <div className="flex items-center gap-1 px-2 py-1 border-t border-border shrink-0">
              <span className="text-xs text-neon-green font-mono font-bold">root@matrix:~$</span>
              <input ref={terminalInputRef}
                className="flex-1 bg-transparent text-xs font-mono text-neon-green outline-none placeholder:text-muted-foreground"
                placeholder="Enter command or 'ai code <description>'..."
                value={terminalInput}
                onChange={e => setTerminalInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") handleTerminalCommand(terminalInput) }}
              />
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL: Codex AI ── */}
        <div className="w-80 shrink-0 border-l border-border bg-card/30 flex flex-col overflow-hidden">
          {/* Panel tabs */}
          <div className="flex items-center border-b border-border shrink-0">
            {(["codex", "analyzer"] as const).map(p => (
              <button key={p}
                className={`flex-1 py-1.5 text-xs font-semibold transition-colors ${
                  rightPanel === p ? "text-primary border-b-2 border-primary bg-primary/5" : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setRightPanel(p)}>
                {p === "codex" ? "CODEX" : "ANALYZER"}
              </button>
            ))}
            <Badge variant="outline" className="text-[10px] h-5 text-neon-green border-neon-green mx-2">ONLINE</Badge>
          </div>

          {/* Chat timestamp */}
          <div className="px-3 py-1.5 text-xs text-primary font-mono border-b border-border bg-primary/5 shrink-0 flex items-center gap-2">
            <Crown className="w-3.5 h-3.5" />
            CODEX_AI {new Date().toLocaleTimeString("en-US", { hour12: true, hour: "numeric", minute: "2-digit", second: "2-digit" })}
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 px-3 py-2" ref={chatRef}>
            <div className="space-y-3">
              {chatMessages.map(msg => (
                <div key={msg.id} className={msg.role === "user" ? "flex justify-end" : ""}>
                  <div className={`text-xs leading-relaxed max-w-[95%] ${
                    msg.role === "user"
                      ? "bg-primary/20 text-foreground rounded-lg px-3 py-2 border border-primary/30"
                      : "text-foreground"
                  }`}>
                    {msg.role === "assistant" && (
                      <div className="flex items-center gap-1 mb-1 text-primary font-semibold">
                        <Sparkles className="w-3 h-3" /> Lady Violet
                      </div>
                    )}
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex items-center gap-2 text-xs text-primary">
                  <Sparkles className="w-3 h-3 animate-spin" />
                  Neural networks processing...
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Chat action buttons */}
          <div className="px-3 py-1.5 border-t border-border flex items-center gap-1 overflow-x-auto shrink-0">
            {[
              { icon: MessageSquare, label: "Chat" },
              { icon: Sparkles, label: "Generate" },
              { icon: Code2, label: "Refactor" },
              { icon: Bug, label: "Debug" },
              { icon: HelpCircle, label: "Explain" },
              { icon: TestTube, label: "Test" },
            ].map(({ icon: Icon, label }) => (
              <button key={label}
                className="flex items-center gap-1 px-2 py-1 rounded text-[10px] text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors whitespace-nowrap"
                onClick={() => {
                  if (label !== "Chat" && activeFile) {
                    sendChatMessage(`${label} this code:\n\`\`\`\n${getFileContent(activeFile).slice(0, 500)}\n\`\`\``)
                  }
                }}>
                <Icon className="w-3 h-3" />{label}
              </button>
            ))}
          </div>

          {/* Chat input */}
          <div className="px-3 py-2 border-t border-border shrink-0">
            <div className="flex items-center gap-1.5">
              <button className="text-muted-foreground hover:text-primary"><Paperclip className="w-4 h-4" /></button>
              <button className="text-muted-foreground hover:text-primary"><ImageIcon className="w-4 h-4" /></button>
              <input
                className="flex-1 bg-input text-xs font-mono rounded px-2 py-1.5 outline-none border border-border focus:border-primary text-foreground placeholder:text-muted-foreground"
                placeholder="Enter neural commands or paste GitHub URL..."
                value={chatInput.length > 0 ? chatInput : githubUrl}
                onChange={e => {
                  const val = e.target.value
                  if (val.includes("github.com/")) { setGithubUrl(val); setChatInput("") }
                  else { setChatInput(val); setGithubUrl("") }
                }}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    if (githubUrl) cloneRepo()
                    else sendChatMessage()
                  }
                }}
              />
              <Button size="sm" className="h-7 w-7 p-0" disabled={isChatLoading}
                onClick={() => githubUrl ? cloneRepo() : sendChatMessage()}>
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
            <p className="text-[9px] text-muted-foreground mt-1">
              Drop files -- Ctrl+V for screenshots -- Supports images, code, and text files.
            </p>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="flex items-center justify-between px-3 py-0.5 text-[10px] text-muted-foreground border-t border-border bg-card/30 shrink-0">
        <div className="flex items-center gap-2">
          <Smartphone className="w-3 h-3" />
          <span className="status-dot status-dot-green" />
        </div>
        <div className="flex items-center gap-4">
          <span>Docs</span>
          <span>API</span>
          <span>Community</span>
        </div>
        <span>2025 Harold Hocum -- Portfolio</span>
      </div>
    </div>
  )
}

/* ─── File Tree Node ─── */
function FileTreeNode({ file, depth, expandedFolders, activeTab, openFile, toggleFolder }: {
  file: ProjectFile; depth: number; expandedFolders: Set<string>; activeTab: string | null;
  openFile: (f: ProjectFile) => void; toggleFolder: (id: string) => void;
}) {
  const isExpanded = expandedFolders.has(file.id)
  const isActive = activeTab === file.id

  return (
    <div>
      <button
        className={`flex items-center gap-1 w-full text-left py-0.5 text-xs transition-colors hover:bg-muted/30 ${
          isActive ? "text-primary bg-primary/10" : "text-muted-foreground"
        }`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={() => openFile(file)}
      >
        {file.type === "folder" ? (
          <>
            {isExpanded ? <ChevronDown className="w-3 h-3 shrink-0" /> : <ChevronRight className="w-3 h-3 shrink-0" />}
            {isExpanded ? <FolderOpen className="w-3 h-3 shrink-0 text-primary" /> : <Folder className="w-3 h-3 shrink-0 text-primary" />}
          </>
        ) : (
          <>
            <span className="w-3 shrink-0" />
            <Braces className="w-3 h-3 shrink-0 text-neon-green" />
          </>
        )}
        <span className="truncate">{file.name}</span>
      </button>
      {file.type === "folder" && isExpanded && file.children?.map(child => (
        <FileTreeNode key={child.id} file={child} depth={depth + 1}
          expandedFolders={expandedFolders} activeTab={activeTab}
          openFile={openFile} toggleFolder={toggleFolder} />
      ))}
    </div>
  )
}
