import { Html } from "@react-three/drei";

type InterfaceProps = {
  roombaStatus: boolean;
};

export function Interface({ roombaStatus }: InterfaceProps) {
  return (
    <Html fullscreen>
      <div className="title-block">
        <h1>Roomba Simulator</h1>
      </div>

      <div className="status-block">
        <p>
          Roomba :{" "}
          <strong style={{ color: roombaStatus ? "#00ff88" : "#ff4444" }}>
            {roombaStatus ? "ON" : "OFF"}
          </strong>
        </p>
      </div>

      <div className="advice-block">
        <h2>Advice :</h2>
        <ul>
          <li>Click the Roomba to start / stop</li>
          <li>Use ZQSD or arrow keys to move</li>
        </ul>
      </div>
    </Html>
  );
}
