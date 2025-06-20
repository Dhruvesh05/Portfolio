"use client"

import { useEffect, useState } from "react"

const skills = [
  "JavaScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "HTML-CSS",
  "C++",
  "Python",
  "Java",
]

type SkillNode = {
  label: string
  x: number
  y: number
}

export default function Skills() {
  const [positions, setPositions] = useState<SkillNode[]>([])

  useEffect(() => {
    const radius = 200
    const filtered = skills.filter(
      (skill) => !["Python", "C++", "Java"].includes(skill)
    )
    const newPositions = filtered.map((skill, index) => {
      const angle = (index / filtered.length) * 2 * Math.PI
      const x = radius * Math.cos(angle)
      const y = radius * Math.sin(angle)
      return { label: skill, x, y }
    })

    const outerPositions = skills
      .filter((skill) => ["Python", "C++", "Java"].includes(skill))
      .map((skill, i) => {
        const angle = (i / 3) * 2 * Math.PI
        const outerRadius = radius + 100
        const x = outerRadius * Math.cos(angle)
        const y = outerRadius * Math.sin(angle)
        return { label: skill, x, y }
      })

    setPositions([...newPositions, ...outerPositions])
  }, [])

  return (
    <section id="skills" className="relative py-24 bg-gray-950 text-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Skills</h2>
        <p className="text-gray-400 mt-2">Core technologies I work with</p>
      </div>

      <div className="skills-graph">
        {/* Center Node */}
        <div className="skill-node skill-center">Full Stack</div>

        {/* Orbiting Skills */}
        <div className="orbit-container">
          {positions.map(
            ({ label, x, y }) =>
              !["Python", "C++", "Java"].includes(label) && (
                <div
                  key={label}
                  className="skill-node orbiting"
                  style={{
                    top: `calc(50% + ${y}px - 48px)`,
                    left: `calc(50% + ${x}px - 48px)`,
                  }}
                >
                  <span className="skill-label">{label}</span>
                </div>
              )
          )}
        </div>


        {/* Static Non-Orbiting Skills */}
        {positions.map(
          ({ label, x, y }) =>
            ["Python", "C++", "Java"].includes(label) && (
              <div
                key={label}
                className="skill-node"
                style={{
                  top: `calc(50% + ${y}px - 48px)`,
                  left: `calc(50% + ${x}px - 48px)`,
                }}
              >
                <span className="skill-label">{label}</span>
              </div>
            )
        )}

      </div>
    </section>
  )
}
