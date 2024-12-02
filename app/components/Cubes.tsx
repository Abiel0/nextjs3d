import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

const colors = [
  '#ff6b6b', '#4ecdc4', '#45aaf2', '#feca57', '#ff9ff3', '#54a0ff',
  '#5f27cd', '#ff6b6b', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd'
]

export function Cubes() {
  const group = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2
  })

  return (
    <group ref={group}>
      {[-4, -2, 0, 2, 4].map((x) =>
        [-4, -2, 0, 2, 4].map((y) => (
          <Cube key={`${x}-${y}`} position={[x, y, 0]} />
        ))
      )}
    </group>
  )
}

function Cube({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  
  const color = useMemo(() => colors[Math.floor(Math.random() * colors.length)], [])

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2
    meshRef.current.rotation.y += delta * 0.2
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(
      meshRef.current.scale.x,
      clicked ? 1.4 : hovered ? 1.2 : 1,
      0.1
    ))
  })

  return (
    <Box
      args={[1, 1, 1]}
      position={position}
      ref={meshRef}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <MeshDistortMaterial
        color={color}
        envMapIntensity={0.4}
        clearcoat={0.8}
        clearcoatRoughness={0}
        metalness={0.2}
        distort={0.2}
        speed={5}
      />
    </Box>
  )
}

