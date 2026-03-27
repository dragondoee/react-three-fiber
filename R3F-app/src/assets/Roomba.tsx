import { useGLTF } from '@react-three/drei'
import { type ThreeElements } from "@react-three/fiber"

type Props = Omit<ThreeElements['group'], "object">;

export function Roomba(props: Props) {
  const { nodes, materials } = useGLTF('/Roomba.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.ChamferCyl001_1.geometry}
        material={materials['04___Default']}
        rotation={[0, 0.28, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.ChamferCyl001_1_1.geometry}
        material={materials['03___Default']}
        rotation={[0, 0.28, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        // @ts-ignore
        geometry={nodes.ChamferCyl001_1_2.geometry}
        material={materials['02___Default']}
        rotation={[0, 0.28, 0]}
      />
    </group>
  )
}

useGLTF.preload('/Roomba.glb')

