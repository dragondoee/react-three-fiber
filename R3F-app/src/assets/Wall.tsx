import { useTexture } from "@react-three/drei"
import { type ThreeElements } from "@react-three/fiber"
import * as THREE from "three"

type Props = Omit<ThreeElements["group"], "object"> & {
  variant?: "wallpaper" | "linen"
}

export function Wall({ variant = "wallpaper", ...props }: Props) {

  const textures = useTexture({
    map: "/textures/wallpaper/wallpaper_basecolor.png",
    normalMap: "/textures/wallpaper/wallpaper_normal.png",
    roughnessMap: "/textures/wallpaper/wallpaper_mask.png",
  })

  // répétition
  Object.values(textures).forEach((texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(2, 2)
  })

  return (
    <group {...props}>
      <mesh receiveShadow>
        <planeGeometry args={[1, 1]} />

        <meshStandardMaterial
          map={textures.map}
          normalMap={textures.normalMap}
          roughnessMap={textures.roughnessMap}
        />
      </mesh>
    </group>
  )
}