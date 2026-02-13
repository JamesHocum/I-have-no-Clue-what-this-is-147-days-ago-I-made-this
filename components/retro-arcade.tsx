"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Pause, Gamepad2, Zap, Brain, Target, Code } from "lucide-react"

// Matrix Rain Game Component
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isRunning, setIsRunning] = useState(false)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 400
    canvas.height = 300

    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#0f0"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    if (isRunning) {
      const animate = () => {
        draw()
        animationRef.current = requestAnimationFrame(animate)
      }
      animate()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isRunning])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Code className="w-5 h-5 text-green-400" />
          Matrix Rain Simulator
        </h3>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => setIsRunning(!isRunning)}
            className={isRunning ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? "Stop" : "Start"}
          </Button>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        className="border border-green-400 rounded-lg bg-black w-full"
        style={{ imageRendering: "pixelated" }}
      />
      <p className="text-sm text-muted-foreground">
        Classic Matrix-style digital rain. Watch the code flow like in the movies!
      </p>
    </div>
  )
}

// Binary Puzzle Game Component
function BinaryPuzzle() {
  const [target, setTarget] = useState(0)
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setIsPlaying(false)
    }
  }, [timeLeft, isPlaying])

  const startGame = () => {
    setScore(0)
    setTimeLeft(30)
    setIsPlaying(true)
    generateNewTarget()
  }

  const generateNewTarget = () => {
    setTarget(Math.floor(Math.random() * 256))
    setCurrent(0)
  }

  const toggleBit = (position: number) => {
    if (!isPlaying) return
    const newValue = current ^ (1 << position)
    setCurrent(newValue)

    if (newValue === target) {
      setScore(score + 1)
      generateNewTarget()
    }
  }

  const getBinaryString = (num: number) => {
    return num.toString(2).padStart(8, "0")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Brain className="w-5 h-5 text-blue-400" />
          Binary Puzzle Challenge
        </h3>
        <div className="flex items-center gap-4">
          <Badge variant="outline">Score: {score}</Badge>
          <Badge variant="outline">Time: {timeLeft}s</Badge>
          <Button size="sm" onClick={startGame} disabled={isPlaying}>
            {isPlaying ? "Playing..." : "Start Game"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 bg-muted/10">
          <h4 className="font-semibold mb-2">Target Binary:</h4>
          <div className="font-mono text-2xl text-green-400 mb-2">{getBinaryString(target)}</div>
          <div className="text-sm text-muted-foreground">Decimal: {target}</div>
        </Card>

        <Card className="p-4 bg-muted/10">
          <h4 className="font-semibold mb-2">Your Binary:</h4>
          <div className="font-mono text-2xl text-blue-400 mb-2">{getBinaryString(current)}</div>
          <div className="text-sm text-muted-foreground">Decimal: {current}</div>
        </Card>
      </div>

      <div className="grid grid-cols-8 gap-2">
        {Array.from({ length: 8 }, (_, i) => (
          <Button
            key={i}
            variant="outline"
            className="aspect-square p-0 font-mono bg-transparent"
            onClick={() => toggleBit(7 - i)}
            disabled={!isPlaying}
          >
            {(current >> (7 - i)) & 1}
          </Button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        Click the binary digits to match the target value. Test your binary conversion skills!
      </p>
    </div>
  )
}

// Cyberpunk Snake Game Component
function CyberpunkSnake() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const gameStateRef = useRef({
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 15 },
    direction: { x: 0, y: 0 },
    score: 0,
  })

  const gridSize = 20
  const tileCount = 20

  const resetGame = () => {
    gameStateRef.current = {
      snake: [{ x: 10, y: 10 }],
      food: { x: 15, y: 15 },
      direction: { x: 0, y: 0 },
      score: 0,
    }
    setScore(0)
    setGameOver(false)
    setIsPlaying(false)
  }

  const startGame = () => {
    resetGame()
    setIsPlaying(true)
  }

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw snake
    ctx.fillStyle = "#0ff"
    gameStateRef.current.snake.forEach((segment, index) => {
      if (index === 0) {
        ctx.fillStyle = "#f0f" // Head
      } else {
        ctx.fillStyle = "#0ff" // Body
      }
      ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2)
    })

    // Draw food
    ctx.fillStyle = "#ff0"
    ctx.fillRect(
      gameStateRef.current.food.x * gridSize,
      gameStateRef.current.food.y * gridSize,
      gridSize - 2,
      gridSize - 2,
    )
  }, [])

  const update = useCallback(() => {
    if (!isPlaying || gameOver) return

    const { snake, food, direction } = gameStateRef.current
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y }

    // Check wall collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
      setGameOver(true)
      setIsPlaying(false)
      return
    }

    // Check self collision
    if (snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
      setGameOver(true)
      setIsPlaying(false)
      return
    }

    snake.unshift(head)

    // Check food collision
    if (head.x === food.x && head.y === food.y) {
      gameStateRef.current.score += 10
      setScore(gameStateRef.current.score)
      gameStateRef.current.food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount),
      }
    } else {
      snake.pop()
    }
  }, [isPlaying, gameOver])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = tileCount * gridSize
    canvas.height = tileCount * gridSize

    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return

      const { direction } = gameStateRef.current
      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) gameStateRef.current.direction = { x: 0, y: -1 }
          break
        case "ArrowDown":
          if (direction.y === 0) gameStateRef.current.direction = { x: 0, y: 1 }
          break
        case "ArrowLeft":
          if (direction.x === 0) gameStateRef.current.direction = { x: -1, y: 0 }
          break
        case "ArrowRight":
          if (direction.x === 0) gameStateRef.current.direction = { x: 1, y: 0 }
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [isPlaying])

  useEffect(() => {
    if (!isPlaying) return

    const gameLoop = setInterval(() => {
      update()
      draw()
    }, 150)

    return () => clearInterval(gameLoop)
  }, [isPlaying, update, draw])

  useEffect(() => {
    draw()
  }, [draw])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Target className="w-5 h-5 text-cyan-400" />
          Cyberpunk Snake
        </h3>
        <div className="flex items-center gap-4">
          <Badge variant="outline">Score: {score}</Badge>
          <Button size="sm" onClick={startGame}>
            {isPlaying ? "Restart" : "Start Game"}
          </Button>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="border border-cyan-400 rounded-lg bg-black mx-auto block"
        style={{ imageRendering: "pixelated" }}
      />

      {gameOver && (
        <div className="text-center">
          <Badge variant="destructive" className="mb-2">
            Game Over!
          </Badge>
          <p className="text-sm text-muted-foreground">Final Score: {score}</p>
        </div>
      )}

      <p className="text-sm text-muted-foreground text-center">
        Use arrow keys to control the snake. Eat the yellow food to grow!
      </p>
    </div>
  )
}

// Password Cracker Game Component
function PasswordCracker() {
  const [targetPassword, setTargetPassword] = useState("")
  const [currentGuess, setCurrentGuess] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [hints, setHints] = useState<string[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy")

  const passwordSets = {
    easy: ["password", "123456", "admin", "login", "guest"],
    medium: ["p@ssw0rd", "h4ck3r", "s3cur3", "c0d3r", "n3tw0rk"],
    hard: ["Tr0ub4dor&3", "C0rr3ct-H0rs3-B4tt3ry", "Sup3r$3cur3P@ss", "H4ck3r-Qu33n-2024"],
  }

  const startGame = () => {
    const passwords = passwordSets[difficulty]
    const password = passwords[Math.floor(Math.random() * passwords.length)]
    setTargetPassword(password)
    setCurrentGuess("")
    setAttempts(0)
    setHints([])
    setIsPlaying(true)
  }

  const makeGuess = () => {
    if (!currentGuess.trim() || !isPlaying) return

    setAttempts(attempts + 1)

    if (currentGuess === targetPassword) {
      setHints([...hints, `🎉 SUCCESS! Password cracked in ${attempts + 1} attempts!`])
      setIsPlaying(false)
      return
    }

    // Generate hints
    const newHints = [...hints]
    if (currentGuess.length !== targetPassword.length) {
      newHints.push(`❌ Wrong length. Target has ${targetPassword.length} characters.`)
    } else {
      let correctPositions = 0
      let correctChars = 0

      for (let i = 0; i < targetPassword.length; i++) {
        if (currentGuess[i] === targetPassword[i]) {
          correctPositions++
        }
        if (targetPassword.includes(currentGuess[i])) {
          correctChars++
        }
      }

      newHints.push(`🔍 ${correctPositions} correct positions, ${correctChars} correct characters`)
    }

    setHints(newHints)
    setCurrentGuess("")

    if (attempts >= 9) {
      newHints.push(`💀 Game Over! The password was: ${targetPassword}`)
      setIsPlaying(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      makeGuess()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          Password Cracker
        </h3>
        <div className="flex items-center gap-2">
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as any)}
            className="bg-muted text-foreground rounded px-2 py-1 text-sm"
            disabled={isPlaying}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <Button size="sm" onClick={startGame}>
            {isPlaying ? "New Game" : "Start Game"}
          </Button>
        </div>
      </div>

      {isPlaying && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={currentGuess}
              onChange={(e) => setCurrentGuess(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your guess..."
              className="flex-1 bg-muted text-foreground rounded px-3 py-2 font-mono"
            />
            <Button onClick={makeGuess} disabled={!currentGuess.trim()}>
              Crack
            </Button>
          </div>

          <div className="flex justify-between text-sm">
            <span>Attempts: {attempts}/10</span>
            <span>Difficulty: {difficulty.toUpperCase()}</span>
          </div>
        </div>
      )}

      {hints.length > 0 && (
        <Card className="p-4 bg-muted/10">
          <h4 className="font-semibold mb-2">Hints & Results:</h4>
          <div className="space-y-1 font-mono text-sm">
            {hints.map((hint, index) => (
              <div key={index} className="text-muted-foreground">
                {hint}
              </div>
            ))}
          </div>
        </Card>
      )}

      <p className="text-sm text-muted-foreground">
        Try to crack the password using the hints. Different difficulties have different password complexity!
      </p>
    </div>
  )
}

export function RetroArcade() {
  const [activeGame, setActiveGame] = useState("matrix")

  return (
    <Card className="terminal-border bg-card/90 backdrop-blur-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-primary neon-glow" />
            <h2 className="text-xl font-bold neon-glow">Retro Hacker Arcade</h2>
          </div>
          <Badge className="neon-glow">CLASSIC GAMES</Badge>
        </div>

        <Tabs value={activeGame} onValueChange={setActiveGame}>
          <TabsList className="grid w-full grid-cols-4 terminal-border bg-muted/20 mb-6">
            <TabsTrigger value="matrix" className="gap-1">
              <Code className="w-3 h-3" />
              Matrix
            </TabsTrigger>
            <TabsTrigger value="binary" className="gap-1">
              <Brain className="w-3 h-3" />
              Binary
            </TabsTrigger>
            <TabsTrigger value="snake" className="gap-1">
              <Target className="w-3 h-3" />
              Snake
            </TabsTrigger>
            <TabsTrigger value="password" className="gap-1">
              <Zap className="w-3 h-3" />
              Cracker
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matrix">
            <MatrixRain />
          </TabsContent>

          <TabsContent value="binary">
            <BinaryPuzzle />
          </TabsContent>

          <TabsContent value="snake">
            <CyberpunkSnake />
          </TabsContent>

          <TabsContent value="password">
            <PasswordCracker />
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  )
}
