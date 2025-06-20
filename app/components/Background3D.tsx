"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars, Float, Environment } from "@react-three/drei"
import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

// Option 1: Geometric Minimalism (Current)
function GeometricBackground() {
  function AnimatedSphere({
    position,
    color,
    size = 1,
  }: { position: [number, number, number]; color: string; size?: number }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
      if (meshRef.current) {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5
      }
    })

    return (
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={meshRef} position={position}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.6}
            roughness={0.1}
            metalness={0.8}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>
    )
  }

  function AnimatedTorus({ position, color }: { position: [number, number, number]; color: string }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
      if (meshRef.current) {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
        meshRef.current.rotation.z = state.clock.elapsedTime * 0.15
      }
    })

    return (
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef} position={position}>
          <torusGeometry args={[1.5, 0.3, 16, 100]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.4}
            roughness={0.2}
            metalness={0.9}
            emissive={color}
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>
    )
  }

  return (
    <>
      <AnimatedSphere position={[-8, 2, -5]} color="#3b82f6" size={1.2} />
      <AnimatedSphere position={[8, -2, -8]} color="#8b5cf6" size={0.8} />
      <AnimatedSphere position={[0, 5, -10]} color="#06b6d4" size={1} />
      <AnimatedSphere position={[-5, -4, -6]} color="#10b981" size={0.6} />
      <AnimatedTorus position={[6, 3, -12]} color="#3b82f6" />
      <AnimatedTorus position={[-6, -1, -15]} color="#8b5cf6" />
    </>
  )
}

// Option 2: Floating Crystals
function CrystalBackground() {
  function Crystal({
    position,
    color,
    scale = 1,
  }: { position: [number, number, number]; color: string; scale?: number }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
      if (meshRef.current) {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.8
      }
    })

    return (
      <Float speed={1} rotationIntensity={0.3} floatIntensity={1.5}>
        <mesh ref={meshRef} position={position} scale={scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.7}
            roughness={0.1}
            metalness={0.9}
            emissive={color}
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>
    )
  }

  return (
    <>
      <Crystal position={[-6, 3, -8]} color="#3b82f6" scale={1.5} />
      <Crystal position={[7, -2, -12]} color="#8b5cf6" scale={1.2} />
      <Crystal position={[0, 6, -15]} color="#06b6d4" scale={0.8} />
      <Crystal position={[-8, -3, -10]} color="#10b981" scale={1} />
      <Crystal position={[5, 4, -6]} color="#f59e0b" scale={0.9} />
      <Crystal position={[-3, -5, -14]} color="#ef4444" scale={1.1} />
    </>
  )
}

// Option 3: Wireframe Network
function WireframeBackground() {
  function WireframeSphere({ position, color }: { position: [number, number, number]; color: string }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
      if (meshRef.current) {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
      }
    })

    return (
      <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={meshRef} position={position}>
          <sphereGeometry args={[2, 16, 16]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
        </mesh>
      </Float>
    )
  }

  function WireframeTorus({ position, color }: { position: [number, number, number]; color: string }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
      if (meshRef.current) {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.05
        meshRef.current.rotation.z = state.clock.elapsedTime * 0.1
      }
    })

    return (
      <Float speed={0.3} rotationIntensity={0.1} floatIntensity={0.3}>
        <mesh ref={meshRef} position={position}>
          <torusGeometry args={[3, 0.5, 8, 16]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.4} />
        </mesh>
      </Float>
    )
  }

  return (
    <>
      <WireframeSphere position={[-8, 0, -12]} color="#3b82f6" />
      <WireframeSphere position={[8, 3, -15]} color="#8b5cf6" />
      <WireframeTorus position={[0, -4, -18]} color="#06b6d4" />
      <WireframeTorus position={[-5, 5, -10]} color="#10b981" />
    </>
  )
}

// Option 4: Holographic Rings
function HolographicBackground() {
  function HoloRing({
    position,
    color,
    radius = 2,
  }: { position: [number, number, number]; color: string; radius?: number }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
      if (meshRef.current) {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
        meshRef.current.rotation.z = state.clock.elapsedTime * 0.05
      }
    })

    return (
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef} position={position}>
          <torusGeometry args={[radius, 0.1, 8, 32]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.6}
            emissive={color}
            emissiveIntensity={0.5}
            roughness={0}
            metalness={1}
          />
        </mesh>
      </Float>
    )
  }

  return (
    <>
      <HoloRing position={[-6, 2, -8]} color="#3b82f6" radius={2.5} />
      <HoloRing position={[6, -3, -12]} color="#8b5cf6" radius={1.8} />
      <HoloRing position={[0, 4, -15]} color="#06b6d4" radius={3} />
      <HoloRing position={[-4, -2, -10]} color="#10b981" radius={1.5} />
      <HoloRing position={[8, 1, -6]} color="#f59e0b" radius={2} />
    </>
  )
}

// Option 5: Particle Nebula
function NebulaBackground() {
  const particleCount = 2000
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    return pos
  }, [])

  const colors = useMemo(() => {
    const col = new Float32Array(particleCount * 3)
    const colorPalette = [
      [0.23, 0.51, 0.96], // Blue
      [0.55, 0.36, 0.96], // Purple
      [0.02, 0.71, 0.84], // Cyan
      [0.06, 0.73, 0.51], // Green
    ]

    for (let i = 0; i < particleCount; i++) {
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      col[i * 3] = color[0]
      col[i * 3 + 1] = color[1]
      col[i * 3 + 2] = color[2]
    }
    return col
  }, [])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} transparent opacity={0.8} sizeAttenuation vertexColors />
    </points>
  )
}

// Main Background Component with Options
export default function Background3D({
  variant = "geometric",
}: { variant?: "geometric" | "crystal" | "wireframe" | "holographic" | "nebula" }) {
  const renderBackground = () => {
    switch (variant) {
      case "crystal":
        return <CrystalBackground />
      case "wireframe":
        return <WireframeBackground />
      case "holographic":
        return <HolographicBackground />
      case "nebula":
        return <NebulaBackground />
      default:
        return <GeometricBackground />
    }
  }

  return (
    <div className="background-3d-global">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} style={{ background: "transparent" }}>
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        <pointLight position={[0, -10, 5]} intensity={0.3} color="#06b6d4" />
        <directionalLight position={[0, 10, 5]} intensity={0.5} />

        {/* Background Elements */}
        {renderBackground()}

        {/* Stars (except for nebula variant) */}
        {variant !== "nebula" && (
          <Stars
            radius={150}
            depth={80}
            count={variant === "wireframe" ? 3000 : 5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
        )}

        {/* Environment for better lighting */}
        {variant === "crystal" && <Environment preset="night" />}

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={variant === "wireframe" ? 0.1 : 0.3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}
