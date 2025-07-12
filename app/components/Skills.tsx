"use client"

import { useEffect, useState, useRef } from "react"

interface Skill {
  name: string
  category: "frontend" | "backend" | "language" | "database"
  x: number
  y: number
  targetX: number
  targetY: number
  angle: number
  radius: number
  connections: string[]
}

export default function Skills() {
  const [mounted, setMounted] = useState(false)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [formation, setFormation] = useState<"wave">("wave")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const skillsRef = useRef<Skill[]>([])

  const skills: Omit<Skill, "x" | "y" | "targetX" | "targetY" | "angle" | "radius">[] = [
    {
      name: "JavaScript",
      category: "language",
      connections: ["React.js", "Node.js", "Next.js", "Express.js"],
    },
    {
      name: "React.js",
      category: "frontend",
      connections: ["JavaScript", "Next.js", "Node.js"],
    },
    {
      name: "Next.js",
      category: "frontend",
      connections: ["React.js", "JavaScript", "Node.js"],
    },
    {
      name: "Node.js",
      category: "backend",
      connections: ["JavaScript", "Express.js", "MongoDB"],
    },
    {
      name: "Express.js",
      category: "backend",
      connections: ["Node.js", "JavaScript", "MongoDB"],
    },

    {
      name: "MongoDB",
      category: "database",
      connections: ["Node.js", "Express.js"],
    },

    {
      name: "Java",
      category: "language",
      connections: ["Python", "MongoDB"],
    },

    {
      name: "Python",
      category: "language",
      connections: ["Java", "C++"],
    },
    
    {
      name: "C++",
      category: "language",
      connections: ["Python"],
    },
    
  ]

  const categoryColors = {
    frontend: "#3b82f6", // Blue
    backend: "#10b981", // Green
    language: "#f59e0b", // Orange
    database: "#8b5cf6", // Purple
  }

  useEffect(() => {
    setMounted(true)
    initializeSkills()
    startAnimation()

    // Change formation every 8 seconds
    const formationInterval = setInterval(() => {
      const formations: Array< "wave" > = ["wave"]
      const currentIndex = formations.indexOf(formation)
      const nextIndex = (currentIndex + 1) % formations.length
      setFormation(formations[nextIndex])
    }, 8000)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      clearInterval(formationInterval)
    }
  }, [formation])

  const initializeSkills = () => {
    skillsRef.current = skills.map((skill, index) => ({
      ...skill,
      x: 500,
      y: 250,
      targetX: 500,
      targetY: 250,
      angle: (index * Math.PI * 2) / skills.length,
      radius: 150 + (index % 3) * 30,
    }))
    updateFormation()
  }

  const updateFormation = () => {
    skillsRef.current.forEach((skill, index) => {
      const centerX = 500
      const centerY = 250
      const time = Date.now() * 0.001

      switch (formation) {
        // case "spiral":
        //   const spiralRadius = 50 + index * 25
        //   const spiralAngle = index * 0.8 + time * 0.2
        //   skill.targetX = centerX + Math.cos(spiralAngle) * spiralRadius
        //   skill.targetY = centerY + Math.sin(spiralAngle) * spiralRadius
        //   break

        case "wave":
          const waveX = 100 + index * 100
          const waveY = centerY + Math.sin(index * 0.5 + time) * 120
          skill.targetX = waveX
          skill.targetY = waveY
          break

        // case "grid":
        //   const cols = 3
        //   const gridX = 300 + (index % cols) * 150
        //   const gridY = 150 + Math.floor(index / cols) * 120
        //   skill.targetX = gridX
        //   skill.targetY = gridY
        //   break

        // case "circle":
        //   const circleAngle = (index * Math.PI * 2) / skills.length + time * 0.1
        //   const circleRadius = 120
        //   skill.targetX = centerX + Math.cos(circleAngle) * circleRadius
        //   skill.targetY = centerY + Math.sin(circleAngle) * circleRadius
        //   break
      }
    })
  }

  const startAnimation = () => {
    const animate = () => {
      updateFormation()
      updatePositions()
      drawConnections()
      animationRef.current = requestAnimationFrame(animate)
    }
    animate()
  }

  const updatePositions = () => {
    const time = Date.now() * 0.001

    skillsRef.current.forEach((skill, index) => {
      // Smooth movement towards target position
      const smoothness = 0.01
      skill.x += (skill.targetX - skill.x) * smoothness
      skill.y += (skill.targetY - skill.y) * smoothness

      // Add subtle floating effect
      const floatX = Math.sin(time * 0.5 + index) * 3
      const floatY = Math.cos(time * 0.3 + index) * 2
      skill.x += floatX * 0.1
      skill.y += floatY * 0.1

      // Keep within bounds
      const margin = 60
      skill.x = Math.max(margin, Math.min(1000 - margin, skill.x))
      skill.y = Math.max(margin, Math.min(500 - margin, skill.y))
    })
  }

  const drawConnections = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw animated connections first
    skillsRef.current.forEach((skill) => {
      skill.connections.forEach((connectionName) => {
        const connectedSkill = skillsRef.current.find((s) => s.name === connectionName)
        if (!connectedSkill) return

        const isHighlighted = hoveredSkill === skill.name || hoveredSkill === connectionName
        const time = Date.now() * 0.003

        // Animated connection line
        ctx.beginPath()
        ctx.moveTo(skill.x, skill.y)
        ctx.lineTo(connectedSkill.x, connectedSkill.y)

        const gradient = ctx.createLinearGradient(skill.x, skill.y, connectedSkill.x, connectedSkill.y)
        const alpha = isHighlighted ? "80" : "40"
        gradient.addColorStop(0, categoryColors[skill.category] + alpha)
        gradient.addColorStop(0, "#ffffff" + (isHighlighted ? "6" : "12"))
        gradient.addColorStop(0, categoryColors[connectedSkill.category] + alpha)

        ctx.strokeStyle = gradient
        ctx.lineWidth = isHighlighted ? 3 : 1.5
        ctx.stroke()

        // Animated energy particles along connections
        if (isHighlighted) {
          const distance = Math.sqrt(Math.pow(connectedSkill.x - skill.x, 2) + Math.pow(connectedSkill.y - skill.y, 2))
          const progress = (time % 2) / 2
          const particleX = skill.x + (connectedSkill.x - skill.x) * progress
          const particleY = skill.y + (connectedSkill.y - skill.y) * progress

          ctx.beginPath()
          ctx.arc(particleX, particleY, 3, 0, Math.PI * 2)
          ctx.fillStyle = "white"
          ctx.fill()
        }
      })
    })

    // Draw formation-specific effects
    drawFormationEffects(ctx)

    // Draw skill nodes and labels on top
    skillsRef.current.forEach((skill) => {
      const isHovered = hoveredSkill === skill.name
      const time = Date.now() * 0.001

      // Draw main skill node (larger circle)
      const mainRadius = isHovered ? 2 : 2
      const pulseRadius = mainRadius + Math.sin(time * 2 + skill.x * 0.01) * 3

      // Outer glow
      const glowGradient = ctx.createRadialGradient(skill.x, skill.y, 0, skill.x, skill.y, pulseRadius + 10)
      glowGradient.addColorStop(0, categoryColors[skill.category] + "20")
      glowGradient.addColorStop(1 , categoryColors[skill.category] + "00")

      ctx.beginPath()
      ctx.arc(skill.x, skill.y, pulseRadius + 10, 0, Math.PI * 2)
      ctx.fillStyle = glowGradient
      ctx.fill()

      // Main node background
      ctx.beginPath()
      ctx.arc(skill.x, skill.y, mainRadius, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0)"
      ctx.fill()

      // Main node border
      ctx.beginPath()
      ctx.arc(skill.x, skill.y, mainRadius, 0, Math.PI * 2)
      ctx.strokeStyle = categoryColors[skill.category]
      ctx.lineWidth = isHovered ? 2 : 1
      ctx.stroke()

      // Draw skill label with circular background
      const labelY = skill.y - 30
      const labelRadius = 30

      // Label background circle
      const labelGradient = ctx.createRadialGradient(skill.x, labelY, 0, skill.x, labelY, labelRadius)
      labelGradient.addColorStop(0, categoryColors[skill.category] + "20")
      labelGradient.addColorStop(0, categoryColors[skill.category] + "15")
      labelGradient.addColorStop(0, categoryColors[skill.category] + "05")

      ctx.beginPath()
      ctx.arc(skill.x, labelY, labelRadius, 0, Math.PI * 2)
      ctx.fillStyle = labelGradient
      ctx.fill()

      // Label border
      ctx.beginPath()
      ctx.arc(skill.x, labelY, labelRadius, 0, Math.PI * 2)
      ctx.strokeStyle = categoryColors[skill.category] + "100"
      ctx.lineWidth = 1
      ctx.stroke()

      // Label text
      ctx.font = "11px DM Sans, sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillStyle = categoryColors[skill.category]

      // Add text shadow for better readability
      ctx.shadowColor = "none"
      ctx.shadowBlur = 1
      ctx.shadowOffsetX = 1
      ctx.shadowOffsetY = 1

      ctx.fillText(skill.name, skill.x, labelY)

      // Reset shadow
      // ctx.shadowColor = "transparent"
      ctx.shadowBlur = 0
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0

      // Draw proficiency indicator inside main node
      // const proficiencyAngle = (skill.proficiency / 100) * Math.PI * 2 - Math.PI / 2

      // Proficiency arc background
      // ctx.beginPath()
      // ctx.arc(skill.x, skill.y, mainRadius - 5, 0, Math.PI * 2)
      // ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
      // ctx.lineWidth = 2
      // ctx.stroke()

      // Proficiency arc fill
      // ctx.beginPath()
      // ctx.arc(skill.x, skill.y, mainRadius - 5, -Math.PI / 2, proficiencyAngle)
      // ctx.strokeStyle = categoryColors[skill.category]
      // ctx.lineWidth = 2
      // ctx.stroke()

      // Proficiency percentage text
      // ctx.font = "10px Inter, sans-serif"
      // ctx.fillStyle = "#ffffff"
      // ctx.fillText(`${skill.proficiency}%`, skill.x, skill.y)
    })
  }

  const drawFormationEffects = (ctx: CanvasRenderingContext2D) => {
    const time = Date.now() * 0.001

    switch (formation) {
      // case "spiral":
      //   // Spiral trail effect
      //   for (let i = 0; i < 100; i++) {
      //     const spiralRadius = i * 2
      //     const spiralAngle = i * 0.2 + time * 0.5
      //     const x = 500 + Math.cos(spiralAngle) * spiralRadius
      //     const y = 250 + Math.sin(spiralAngle) * spiralRadius
      //     const alpha = ((100 - i) / 100) * 0.1

      //     ctx.beginPath()
      //     ctx.arc(x, y, 1, 0, Math.PI * 2)
      //     ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`
      //     ctx.fill()
      //   }
      //   break

      case "wave":
        // Wave pattern background
        for (let i = 0; i < 50; i++) {
          const x = i * 20
          const y = 250 + Math.sin(i * 0.3 + time * 2) * 30
          const alpha = 0.05

          ctx.beginPath()
          ctx.arc(x, y, 0, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`
          ctx.fill()
        }
        break

      // case "grid":
      //   // Grid lines
      //   ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
      //   ctx.lineWidth = 1
      //   for (let i = 0; i < 4; i++) {
      //     const x = 225 + i * 150
      //     ctx.beginPath()
      //     ctx.moveTo(x, 100)
      //     ctx.lineTo(x, 400)
      //     ctx.stroke()
      //   }
      //   for (let i = 0; i < 4; i++) {
      //     const y = 120 + i * 120
      //     ctx.beginPath()
      //     ctx.moveTo(200, y)
      //     ctx.lineTo(650, y)
      //     ctx.stroke()
      //   }
      //   break

      // case "circle":
      //   // Orbital rings
      //   for (let ring = 1; ring <= 3; ring++) {
      //     ctx.beginPath()
      //     ctx.arc(500, 250, ring * 40, 0, Math.PI * 2)
      //     ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 / ring})`
      //     ctx.lineWidth = 1
      //     ctx.stroke()
      //   }
      //   break
    }

    // Universal floating particles
    for (let i = 0; i < 20; i++) {
      const x = 100 + i * 40 + Math.sin(time + i) * 20
      const y = 100 + Math.cos(time * 0.7 + i) * 200
      const alpha = (Math.sin(time + i) + 1) * 0.1

      ctx.beginPath()
      ctx.arc(x, y, 1, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`
      ctx.fill()
    }
  }

  const getSkillPosition = (skillName: string) => {
    const skill = skillsRef.current.find((s) => s.name === skillName)
    return skill ? { x: skill.x, y: skill.y } : { x: 0, y: 0 }
  }

  return (
    <section id="skills" className="experience">
      <div className="container">
        <div className="skills-title-wrapper">
          <h2 className="animated-heading">
            {"Skills".split("").map((letter, index) => (
              <span key={index} style={{ "--delay": `${index * 0.1}s` } as React.CSSProperties}>
                {letter}
              </span>
            ))}
          </h2>
        </div>


        {/* <div className="formation-indicator">
          <span className="formation-name">{formation.toUpperCase()} Formation</span>
          <div className="formation-progress">
            <div className="formation-progress-bar" />
          </div>
        </div> */}

        <div className={`constellation-container ${mounted ? "animate" : ""}`}>
          <canvas ref={canvasRef} width={1000} height={500} className="connections-canvas" />

          {/* Invisible hover areas for tooltips */}
          {skills.map((skill, index) => {
            const position = getSkillPosition(skill.name)
            return (
              <div
                key={skill.name}
                className="skill-hover-area"
                style={{
                  position: "absolute",
                  left: `${(position.x / 1000) * 100}%`,
                  top: `${(position.y / 1000) * 100}%`,
                  transform: "translate(-50%, -50%)",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  zIndex: 10,
                }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {hoveredSkill === skill.name && (
                  <div className="skill-tooltip">
                    <p>
                      <strong>{skill.name}</strong>
                    </p>
                    <p>Category: {skill.category}</p>
                    {/* <p>Proficiency: {skill.proficiency}%</p> */}
                    <p>Connections: {skill.connections.length}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="constellation-legend">
          <h3>Skill Categories</h3>
          <div className="legend-items">
            {Object.entries(categoryColors).map(([category, color]) => (
              <div key={category} className="legend-item">
                <div className="legend-color" style={{ backgroundColor: color }} />
                <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
