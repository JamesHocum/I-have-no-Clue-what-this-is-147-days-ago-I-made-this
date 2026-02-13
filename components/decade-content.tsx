"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useDecadeTheme } from "@/components/decade-theme-provider"
import { Zap, Music, Gamepad2, Tv, Smartphone, Globe, Brain, Rocket } from "lucide-react"

const decadeContent = {
  "80s": {
    title: "Neon Dreams Era",
    subtitle: "The Birth of Cyberpunk",
    color: "text-pink-400",
    bgGradient: "from-pink-500/20 to-cyan-500/20",
    icon: <Zap className="w-6 h-6" />,
    features: [
      "Matrix-style green rain terminals",
      "Synthwave audio interfaces",
      "Retro arcade game emulators",
      "VHS glitch effects",
      "Neon pink & cyan color schemes",
    ],
    tools: [
      { name: "WarGames Dialer", desc: "Phone system penetration" },
      { name: "Neon Scanner", desc: "80s-style network mapping" },
      { name: "Synthwave Crypto", desc: "Retro encryption tools" },
      { name: "Arcade Exploits", desc: "Classic game hacking" },
    ],
    popCulture: [
      "WarGames (1983) - The hacker movie that started it all",
      "Tron (1982) - Digital world aesthetics",
      "Blade Runner (1982) - Cyberpunk atmosphere",
      "Neuromancer (1984) - The cyberpunk bible",
    ],
  },
  "90s": {
    title: "Cyber Revolution",
    subtitle: "The Internet Awakens",
    color: "text-green-400",
    bgGradient: "from-green-500/20 to-purple-500/20",
    icon: <Tv className="w-6 h-6" />,
    features: [
      "Terminal-based IRC chat rooms",
      "BBS-style message boards",
      "Dial-up modem sound effects",
      "ASCII art generators",
      "Grunge-tech aesthetics",
    ],
    tools: [
      { name: "Phreaker's Toolkit", desc: "Phone system exploration" },
      { name: "BBS Infiltrator", desc: "Bulletin board systems" },
      { name: "Packet Sniffer 95", desc: "Network traffic analysis" },
      { name: "Virus Lab", desc: "Malware research (educational)" },
    ],
    popCulture: [
      "Hackers (1995) - Hack the planet!",
      "The Matrix (1999) - Red pill or blue pill",
      "Ghost in the Shell (1995) - Cybernetic philosophy",
      "Johnny Mnemonic (1995) - Data courier dystopia",
    ],
  },
  "2000s": {
    title: "Digital Millennium",
    subtitle: "Web 2.0 & Social Networks",
    color: "text-blue-400",
    bgGradient: "from-blue-500/20 to-gray-500/20",
    icon: <Globe className="w-6 h-6" />,
    features: [
      "Web-based penetration testing",
      "Social media OSINT tools",
      "Flash-based exploit demos",
      "Forum-style communities",
      "Clean, corporate aesthetics",
    ],
    tools: [
      { name: "Web Vulnerability Scanner", desc: "SQL injection detection" },
      { name: "Social Engineer Toolkit", desc: "OSINT gathering" },
      { name: "Wireless Auditor", desc: "WiFi security testing" },
      { name: "Forensics Suite", desc: "Digital evidence analysis" },
    ],
    popCulture: [
      "Mr. Robot (2015) - Modern hacker realism",
      "Live Free or Die Hard (2007) - Cyber terrorism",
      "Tron: Legacy (2010) - Updated digital world",
      "The Social Network (2010) - Tech empire origins",
    ],
  },
  "2010s": {
    title: "Mobile & Cloud Era",
    subtitle: "Smartphones & Big Data",
    color: "text-teal-400",
    bgGradient: "from-teal-500/20 to-orange-500/20",
    icon: <Smartphone className="w-6 h-6" />,
    features: [
      "Mobile app security testing",
      "Cloud infrastructure tools",
      "Real-time collaboration",
      "Responsive design interfaces",
      "Material design aesthetics",
    ],
    tools: [
      { name: "Mobile Pen-Test Kit", desc: "iOS/Android security" },
      { name: "Cloud Security Scanner", desc: "AWS/Azure auditing" },
      { name: "API Fuzzer", desc: "REST/GraphQL testing" },
      { name: "Blockchain Analyzer", desc: "Cryptocurrency forensics" },
    ],
    popCulture: [
      "Black Mirror (2011-) - Tech dystopia anthology",
      "Person of Interest (2011-2016) - AI surveillance",
      "Watch Dogs (2014) - Hacker vigilante game",
      "Silicon Valley (2014-2019) - Tech startup satire",
    ],
  },
  modern: {
    title: "AI & Quantum Age",
    subtitle: "The Future is Now",
    color: "text-cyan-400",
    bgGradient: "from-cyan-500/20 to-pink-500/20",
    icon: <Brain className="w-6 h-6" />,
    features: [
      "AI-powered security analysis",
      "Quantum-resistant cryptography",
      "Neural network interfaces",
      "Holographic displays",
      "Adaptive UI/UX systems",
    ],
    tools: [
      { name: "AI Threat Hunter", desc: "Machine learning detection" },
      { name: "Quantum Crypto Suite", desc: "Post-quantum security" },
      { name: "Neural Fuzzer", desc: "AI-driven testing" },
      { name: "Deepfake Detector", desc: "Synthetic media analysis" },
    ],
    popCulture: [
      "Cyberpunk 2077 (2020) - Open world hacking",
      "The Matrix Resurrections (2021) - Neo returns",
      "Free Guy (2021) - NPC becomes self-aware",
      "Ready Player One (2018) - VR metaverse",
    ],
  },
}

export function DecadeContent() {
  const { currentDecade } = useDecadeTheme()
  const content = decadeContent[currentDecade]

  return (
    <div className="space-y-6">
      {/* Decade Header */}
      <Card className={`terminal-border bg-gradient-to-r ${content.bgGradient} backdrop-blur-sm`}>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`${content.color} neon-glow`}>{content.icon}</div>
            <div>
              <h2 className={`text-2xl font-bold ${content.color} neon-glow`}>{content.title}</h2>
              <p className="text-muted-foreground">{content.subtitle}</p>
            </div>
            <div className="ml-auto">
              <Badge className="neon-glow">{currentDecade.toUpperCase()}</Badge>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Features */}
        <Card className="terminal-border bg-card/90 backdrop-blur-sm">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-primary" />
              Era Features
            </h3>
            <ul className="space-y-2">
              {content.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Tools */}
        <Card className="terminal-border bg-card/90 backdrop-blur-sm">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              Hacking Tools
            </h3>
            <div className="space-y-3">
              {content.tools.map((tool, index) => (
                <div key={index} className="border-l-2 border-primary/30 pl-3">
                  <div className="font-mono text-sm font-semibold text-primary">{tool.name}</div>
                  <div className="text-xs text-muted-foreground">{tool.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Pop Culture References */}
      <Card className="terminal-border bg-card/90 backdrop-blur-sm">
        <div className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Music className="w-5 h-5 text-secondary" />
            Pop Culture References
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.popCulture.map((reference, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 animate-pulse"></div>
                <div className="text-sm">{reference}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button className="gap-2 neon-glow">
          <Rocket className="w-4 h-4" />
          Launch {content.title} Mode
        </Button>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Gamepad2 className="w-4 h-4" />
          Play {currentDecade} Games
        </Button>
      </div>
    </div>
  )
}
