import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import "./App.css";
import { KeyboardControls, type KeyboardControlsEntry } from "@react-three/drei/web/KeyboardControls";
import { useMemo } from "react";

// @ts-ignore
enum Controls {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
}

function App() {
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] }, // Z AZERTY
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] }, // Q AZERTY
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] }, 
    ],
    [],
  );
  return (
    <>
      <KeyboardControls map={map}>
        <div className="canvas-container">
          <Canvas
            camera={{
              fov: 75,
              near: 0.1,
              far: 100,
              position: [0, 7, 7],
            }}
          >
            <Scene />
          </Canvas>
        </div>
      </KeyboardControls>
    </>
  );
}

export default App;
