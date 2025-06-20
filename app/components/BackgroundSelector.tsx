"use client"

import { useState } from "react"

type BackgroundVariant = "geometric" | "crystal" | "wireframe" | "holographic" | "nebula"

interface BackgroundSelectorProps {
  onVariantChange: (variant: BackgroundVariant) => void
  currentVariant: BackgroundVariant
}

export default function BackgroundSelector({ onVariantChange, currentVariant }: BackgroundSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const variants = [
    { key: "geometric", name: "Geometric", description: "Floating spheres and torus shapes" },
    { key: "crystal", name: "Crystal", description: "Floating crystal formations" },
    { key: "wireframe", name: "Wireframe", description: "Minimalist wireframe structures" },
    { key: "holographic", name: "Holographic", description: "Glowing holographic rings" },
    { key: "nebula", name: "Nebula", description: "Colorful particle nebula" },
  ] as const

  return (
    <div className="background-selector">
      <button className="selector-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Change 3D Background">
        🎨
      </button>

      {isOpen && (
        <div className="selector-menu">
          <h3>3D Background</h3>
          {variants.map((variant) => (
            <button
              key={variant.key}
              className={`variant-option ${currentVariant === variant.key ? "active" : ""}`}
              onClick={() => {
                onVariantChange(variant.key)
                setIsOpen(false)
              }}
            >
              <span className="variant-name">{variant.name}</span>
              <span className="variant-description">{variant.description}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
