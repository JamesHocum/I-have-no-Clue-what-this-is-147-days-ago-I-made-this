import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { prompt, language, persona } = await req.json()

    const response = await fetch("/api/godbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        msg: `Generate ${language} code for: ${prompt}\n\nRequirements:\n- Write clean, functional code\n- Add appropriate comments\n- Include cyberpunk-themed variable names where appropriate\n- Ensure the code is production-ready\n- Add error handling where needed`,
        persona:
          persona ||
          `You are Lady Violet, a brilliant cyberpunk coding assistant. You create high-quality, functional code with cyberpunk flair. You're confident, creative, and always deliver working solutions. Focus on clean, efficient code with appropriate comments.`,
      }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json({ code: data.reply })
  } catch (error) {
    console.error("Code generation error:", error)
    return NextResponse.json({ error: "Failed to generate code" }, { status: 500 })
  }
}
