import { useRef } from 'react'
import { Text, Float } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function FloatingText() {
  const textRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.material.opacity = Math.sin(clock.elapsedTime * 2) * 0.5 + 0.5
    }
  })

  return (
    <Float floatIntensity={2} rotationIntensity={0.5}>
      <Text
        ref={textRef}
        position={[0, 6, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.ttf"
      >
        Explore the Aesthetic Cubes
      </Text>
    </Float>
  )
}

