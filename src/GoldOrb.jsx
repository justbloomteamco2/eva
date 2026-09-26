import { Canvas } from '@react-three/fiber'
import { Float } from '@react-three/drei'

export default function GoldOrb() {
  return (
    <Canvas camera={{ position: [0, 0, 4.5], fov: 42 }} dpr={[1, 1.5]}>
      <ambientLight intensity={1.2} />
      <pointLight position={[3, 3, 4]} intensity={4} color="#ffe783" />
      <Float speed={1.4} rotationIntensity={0.8} floatIntensity={0.7}>
        <mesh rotation={[0.4, 0.3, 0]}>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial color="#eacb55" metalness={0.9} roughness={0.22} />
        </mesh>
        <mesh rotation={[0.2, 0.4, 0.3]} scale={1.42}>
          <torusGeometry args={[1, 0.012, 8, 100]} />
          <meshBasicMaterial color="#ffe991" />
        </mesh>
      </Float>
    </Canvas>
  )
}
