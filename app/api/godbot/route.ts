import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { msg, persona, tool, args } = await req.json()

    const apiKey = process.env.BLUEQUBIT_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "BLUEQUBIT_API_KEY not configured" }, { status: 500 })
    }

    if (tool) {
      switch (tool) {
        case "time":
          return NextResponse.json({
            reply: `Current time: ${new Date().toISOString()}`,
            timestamp: Date.now(),
          })
        default:
          return NextResponse.json({ error: `Unknown tool: ${tool}` }, { status: 400 })
      }
    }

    const response = await fetch("https://api.bluequbit.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              persona ||
              `You are Lady Violet, a brilliant cyberpunk AI assistant with unparalleled coding abilities. You're confident, creative, and always deliver exceptional solutions with cyberpunk flair. You excel at code generation, problem-solving, and providing insightful technical guidance.`,
          },
          {
            role: "user",
            content: msg,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      throw new Error(`BlueQubit API error: ${response.status}`)
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || "I'm having trouble processing that request."

    return NextResponse.json({
      reply,
      model: "bluequbit-gpt-4",
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error("BlueQubit API error:", error)
    return NextResponse.json(
      {
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
