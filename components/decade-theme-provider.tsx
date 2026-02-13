"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Decade = "80s" | "90s" | "2000s" | "2010s" | "modern"

interface DecadeThemeContextType {
  currentDecade: Decade
  setDecade: (decade: Decade) => void
}

const DecadeThemeContext = createContext<DecadeThemeContextType | undefined>(undefined)

export function DecadeThemeProvider({ children }: { children: ReactNode }) {
  const [currentDecade, setCurrentDecade] = useState<Decade>("modern")

  const setDecade = (decade: Decade) => {
    setCurrentDecade(decade)
    // Apply decade-specific CSS class to body
    document.body.className = document.body.className.replace(/decade-\w+/g, "")
    document.body.classList.add(`decade-${decade}`)
  }

  return <DecadeThemeContext.Provider value={{ currentDecade, setDecade }}>{children}</DecadeThemeContext.Provider>
}

export function useDecadeTheme() {
  const context = useContext(DecadeThemeContext)
  if (context === undefined) {
    throw new Error("useDecadeTheme must be used within a DecadeThemeProvider")
  }
  return context
}
