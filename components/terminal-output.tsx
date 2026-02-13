"use client"

import { useEffect, useState } from "react"

interface OutputLine {
  type: "command" | "response" | "system"
  content: string
  timestamp: Date
}

interface TerminalOutputProps {
  output: OutputLine[]
  isTyping: boolean
}

export function TerminalOutput({ output, isTyping }: TerminalOutputProps) {
  const [displayedOutput, setDisplayedOutput] = useState<OutputLine[]>([])

  useEffect(() => {
    setDisplayedOutput(output)
  }, [output])

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const getLineColor = (type: string) => {
    switch (type) {
      case "command":
        return "text-primary"
      case "system":
        return "text-accent"
      case "response":
        return "text-foreground"
      default:
        return "text-foreground"
    }
  }

  return (
    <>
      {displayedOutput.map((line, index) => (
        <div key={index} className={`flex gap-2 ${getLineColor(line.type)}`}>
          <span className="text-muted-foreground text-xs shrink-0 w-16">[{formatTimestamp(line.timestamp)}]</span>
          <pre className="whitespace-pre-wrap break-words flex-1">{line.content}</pre>
        </div>
      ))}

      {isTyping && (
        <div className="flex gap-2 text-muted-foreground">
          <span className="text-xs w-16">[{formatTimestamp(new Date())}]</span>
          <span className="animate-pulse">Processing...</span>
          <span className="animate-flicker">_</span>
        </div>
      )}
    </>
  )
}
