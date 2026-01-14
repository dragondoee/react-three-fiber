import { Html, OrbitControls, useHelper } from "@react-three/drei";
import { useFrame } from '@react-three/fiber'
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { useRef } from "react";
import * as THREE from 'three';


export function Scene() {
    const directionalLightRef = useRef<THREE.DirectionalLightHelper>(null!);
    const boxref = useRef<THREE.Mesh>(null!);
    useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, 'red');

    useFrame(() => {
        if (boxref.current) {
            boxref.current.rotation.y += 0.01;
        }
    });

    const {showperf} = useControls({
        showperf: {
            label: 'Show Performance Monitor',
            value: false,
        },
    });

    const { color } = useControls('Cube', {
        color: { 
            label: 'Cube Color',
            value: '#00ffe5' 
        },
    });

  return (
    <>
    {showperf && 
        <Perf position="top-left" />
    }
    <OrbitControls />
    <ambientLight intensity={0.5} />
    <directionalLight ref={directionalLightRef} position={[0, 4, 4]} color={"red"} intensity={2} />
      <mesh 
        position={[-3, 0, 1]} 
        scale={0.75}
      >
        <sphereGeometry />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh 
        position={[0, 0, 1]} 
        rotation={[Math.PI / 6, 6, 0]}
        ref={boxref}
      >
        <boxGeometry args={[2, 1, 1]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
      <mesh 
        position={[3, 0, 1]} 
        scale={0.75}
      >
        <torusGeometry />
        <meshStandardMaterial color="purple" />
      </mesh>

      <mesh 
        position={[0, -1, 1]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[10, 10, 10]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>

      <Html position={[2,0,2]} distanceFactor={5}>
        <button>Click me</button>
      </Html>
    </>
  );
}