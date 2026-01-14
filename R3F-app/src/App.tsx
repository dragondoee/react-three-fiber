import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import './App.css';

function App() {
  return (
    <>
      <div className="canvas-container">
        <Canvas 
          camera={{
            fov: 75,
            near: 0.1,
            far: 100,
            position: [0, 3, 10],
          }}
        >
          <Scene />
          
        </Canvas>
      </div>
    </>
  );
}

export default App;
