"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Folder, FolderOpen, Code2, ImageIcon, Settings, Trash2, FileText } from "lucide-react"

interface FileNode {
  id: string
  name: string
  type: "file" | "folder"
  path: string
  size?: number
  children?: FileNode[]
  content?: string
  language?: string
}

interface FileExplorerProps {
  files: FileNode[]
  onFileSelect?: (file: FileNode) => void
  onFileDelete?: (fileId: string) => void
  selectedFile?: FileNode | null
}

export function FileExplorer({ files, onFileSelect, onFileDelete, selectedFile }: FileExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId)
    } else {
      newExpanded.add(folderId)
    }
    setExpandedFolders(newExpanded)
  }

  const getFileIcon = (file: FileNode) => {
    if (file.type === "folder") {
      return expandedFolders.has(file.id) ? (
        <FolderOpen className="w-4 h-4 text-primary" />
      ) : (
        <Folder className="w-4 h-4 text-primary" />
      )
    }

    const extension = file.name.split(".").pop()?.toLowerCase()
    switch (extension) {
      case "js":
      case "ts":
      case "jsx":
      case "tsx":
      case "py":
      case "html":
      case "css":
        return <Code2 className="w-4 h-4 text-green-400" />
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
      case "svg":
        return <ImageIcon className="w-4 h-4 text-blue-400" />
      case "json":
      case "xml":
      case "yaml":
      case "yml":
        return <Settings className="w-4 h-4 text-orange-400" />
      default:
        return <FileText className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getFileLanguage = (fileName: string): string => {
    const extension = fileName.split(".").pop()?.toLowerCase()
    const languageMap: Record<string, string> = {
      js: "javascript",
      jsx: "javascript",
      ts: "typescript",
      tsx: "typescript",
      py: "python",
      html: "html",
      css: "css",
      json: "json",
      md: "markdown",
    }
    return languageMap[extension || ""] || "text"
  }

  const renderFileTree = (nodes: FileNode[], depth = 0) => {
    return nodes.map((node) => (
      <div key={node.id} style={{ marginLeft: `${depth * 16}px` }}>
        <div
          className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-card/50 transition-colors ${
            selectedFile?.id === node.id ? "bg-primary/10 border border-primary/20" : ""
          }`}
          onClick={() => {
            if (node.type === "folder") {
              toggleFolder(node.id)
            } else {
              onFileSelect?.(node)
            }
          }}
        >
          {getFileIcon(node)}
          <span className="text-sm font-medium flex-1">{node.name}</span>

          {node.type === "file" && (
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="text-xs">
                {getFileLanguage(node.name)}
              </Badge>
              {node.size && <span className="text-xs text-muted-foreground">{(node.size / 1024).toFixed(1)}KB</span>}
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation()
                  onFileDelete?.(node.id)
                }}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>

        {node.type === "folder" &&
          expandedFolders.has(node.id) &&
          node.children &&
          renderFileTree(node.children, depth + 1)}
      </div>
    ))
  }

  return (
    <Card className="terminal-border bg-card/90">
      <CardHeader className="pb-3">
        <CardTitle className="text-primary flex items-center gap-2">
          <Folder className="w-5 h-5" />
          File Explorer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          {files.length > 0 ? (
            <div className="space-y-1">{renderFileTree(files)}</div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Folder className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No files uploaded yet</p>
              <p className="text-xs">Drag & drop files or clone a repository</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
