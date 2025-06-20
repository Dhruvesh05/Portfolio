"use client"

import { useEffect, useState, useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function ParticleMesh() {
  const ref = useRef<THREE.Points>(null)

  const particleCount = 200

  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [])

  const colors = useMemo(() => {
    const arr = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 3) {
      arr[i] = 0.2
      arr[i + 1] = 0.6
      arr[i + 2] = 1.0
    }
    return arr
  }, [])

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.001
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        transparent
        opacity={0.8}
        vertexColors
        sizeAttenuation
      />
    </points>
  )
}

export default function Background3D() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <div className="background-3d-global">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight />
        <ParticleMesh />
      </Canvas>
    </div>
  )
}
