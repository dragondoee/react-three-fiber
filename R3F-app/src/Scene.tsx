import { useKeyboardControls, PositionalAudio } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { useRef, useState } from "react";
import * as THREE from "three";

import { Roomba } from "./assets/Roomba";
import { Floor } from "./assets/Floor";
import { Wall } from "./assets/Wall";
import { Interface } from "./assets/Interface";

// @ts-ignore
enum Controls {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
}

export function Scene() {
  const directionalLightRef = useRef<THREE.DirectionalLight>(null!);
  const roombaRef = useRef<THREE.Mesh>(null!);

  const [roombaOn, setRoombaOn] = useState(false);

  const { showPerf } = useControls({
    showPerf: false,
  });

  const [, getKeys] = useKeyboardControls<Controls>();

  useFrame((state, delta) => {
    const roomba = roombaRef.current;

    if (!roomba || !roombaOn) return;

    const { forward, back, left, right } = getKeys();

    const speed = 2 * delta;
    let direction = new THREE.Vector3();

    if (forward) direction.z -= 1;
    if (back) direction.z += 1;
    if (left) direction.x -= 1;
    if (right) direction.x += 1;

    // Roomba rotation
    if (direction.length() > 0) {
      direction.normalize();

      roomba.position.add(direction.multiplyScalar(speed));

      const targetAngle = Math.atan2(direction.x, direction.z);

      const current = roomba.rotation.y;
      let deltaAngle = targetAngle - current;
      deltaAngle = Math.atan2(Math.sin(deltaAngle), Math.cos(deltaAngle));

      roomba.rotation.y = current + deltaAngle * 0.15;
    }

    // Moving limit
    roomba.position.x = THREE.MathUtils.clamp(roomba.position.x, -9, 9);
    roomba.position.z = THREE.MathUtils.clamp(roomba.position.z, -6.5, 5.5);
    
  });

  return (
    <>
      {showPerf && <Perf position="top-left" />}

      {/* Lights */}
      <ambientLight intensity={0.4} />

      <directionalLight
        ref={directionalLightRef}
        position={[4, 6, 4]}
        intensity={1.5}
        castShadow
      />

      {/* Roomba */}
      <Roomba
        ref={roombaRef}
        position={[0, 0, 0]}
        scale={0.05}
        onClick={() => setRoombaOn((state) => !state)}
      />
      {roombaOn && (
        <PositionalAudio url="/sounds/roomba.mp3" distance={5} loop autoplay />
      )}

      {/* Walls */}
      <Wall 
        position={[0, 3, -7]}
        scale={[20,6,1]}
      />
      <Wall 
        position={[-9.6, 3, 0]}
        scale={[15,6,1]}
        rotation={[0, -4.7, 0]}
      />
      <Wall 
        position={[9.6, 3, 0]}
        scale={[15,6,1]}
        rotation={[0, 4.7, 0]}
      />

      {/* Floor */}
      <Floor />

      {/* UI */}
      <Interface roombaStatus={roombaOn} />
    </>
  );
}
