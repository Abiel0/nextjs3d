'use client'

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Stars } from '@react-three/drei'
import { Cubes } from './components/Cubes'
import { FloatingText } from './components/FloatingText'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [key, setKey] = useState(0)

  const resetScene = () => {
    setKey(prevKey => prevKey + 1)
  }

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-purple-900 via-indigo-800 to-blue-900">
      <Canvas key={key} camera={{ position: [0, 0, 15], fov: 50 }}>
        <OrbitControls enableDamping dampingFactor={0.05} />
        <Environment preset="night" background blur={0.8} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Cubes />
        <FloatingText />
      </Canvas>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <Button 
          onClick={resetScene}
          className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm"
        >
          Reset Scene
        </Button>
      </div>
    </div>
  )
}

