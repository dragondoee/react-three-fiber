import { Html, useHelper, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { useRef, useState } from "react";
import * as THREE from "three";

import { Roomba } from "./assets/Roomba";
import { Floor } from "./assets/Floor";
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
  const starRef = useRef<THREE.Mesh>(null!);
  const roombaRef = useRef<THREE.Mesh>(null!);

  const [roombaOn, setRoombaOn] = useState(false);

  const { showPerf } = useControls({
    showPerf: false,
  });

  const [, getKeys] = useKeyboardControls<Controls>();

  useFrame((state, delta) => {
    const roomba = roombaRef.current;

    // Star rotation
    if (starRef.current) {
      starRef.current.rotation.y += delta;
    }

    if (!roomba || !roombaOn) return;

    const { forward, back, left, right } = getKeys();

    const speed = 2 * delta;
    let direction = new THREE.Vector3();

    if (forward) direction.z -= 1;
    if (back) direction.z += 1;
    if (left) direction.x -= 1;
    if (right) direction.x += 1;

    if (direction.length() > 0) {
      direction.normalize();

      roomba.position.add(direction.multiplyScalar(speed));

      const targetAngle = Math.atan2(direction.x, direction.z)

      const current = roomba.rotation.y
      let deltaAngle = targetAngle - current

      // normalise entre -PI et PI
      deltaAngle = Math.atan2(Math.sin(deltaAngle), Math.cos(deltaAngle))

      roomba.rotation.y = current + deltaAngle * 0.15
    }
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

      {/* Floor */}
      <Floor/>

      {/* UI */}
      <Interface roombaStatus={roombaOn} />
    </>
  );
}