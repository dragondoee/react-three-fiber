import { useTexture } from "@react-three/drei"
import * as THREE from "three"

export function Floor() {

  const textures = useTexture({
    map: "/textures/wood/wood_basecolor.png",
    normalMap: "/textures/wood/wood_normal.png",
    roughnessMap: "/textures/wood/wood_roughness.png",
  })

  // répétition de la texture
  Object.values(textures).forEach((texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(8, 8)
  })

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[20, 15]} />

      <meshStandardMaterial
        map={textures.map}
        normalMap={textures.normalMap}
        roughnessMap={textures.roughnessMap}
      />
    </mesh>
  )
}