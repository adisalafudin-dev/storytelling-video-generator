import * as THREE from "three";
import { useMemo } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { cameraAt, type CameraPoint } from "../../script/camera";
import { nodeFocusAt, type ActionTracks } from "../../script/actions";
import type { KitPart } from "../../script/types";

type FlowNode = Extract<KitPart, { type: "node" }>;

export const FlowOverlay: React.FC<{
  nodes: FlowNode[];
  points: CameraPoint[];
  tracks: ActionTracks;
}> = ({ nodes, points, tracks }) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const camera = useMemo(() => new THREE.PerspectiveCamera(50, width / height, 0.1, 100), [height, width]);
  const [x, y, z] = cameraAt(points, frame);
  camera.position.set(x, y, z);
  camera.lookAt(0, 0, 0);
  camera.updateMatrixWorld();
  const focus = nodeFocusAt(tracks.nodeFocuses, frame, fps);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {nodes.map((node) => {
        const point = new THREE.Vector3(node.pos[0], node.pos[1] + 0.92, node.pos[2]).project(camera);
        if (point.z >= 1 || point.x < -1.1 || point.x > 1.1 || point.y < -1.1 || point.y > 1.1) return null;
        const isFocused = focus.node === node.id;
        const scale = isFocused ? 1 + focus.amount * 0.06 : 1;
        return <div key={node.id} style={{
          position: "absolute",
          left: `${(point.x + 1) * 50}%`,
          top: `${(1 - point.y) * 50}%`,
          transform: `translate(-50%, -50%) scale(${scale})`,
          padding: `${Math.round(width * 0.012)}px ${Math.round(width * 0.032)}px`,
          borderRadius: 999,
          border: `${isFocused ? 3 : 2}px solid ${node.color}`,
          background: isFocused ? "rgba(8, 19, 34, 0.96)" : "rgba(8, 19, 34, 0.86)",
          boxShadow: isFocused ? `0 0 ${Math.round(width * 0.035)}px ${node.color}` : "0 4px 18px rgba(0,0,0,0.3)",
          color: "white",
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: Math.round(width * 0.037),
          lineHeight: 1.1,
          fontWeight: 800,
          letterSpacing: "0.02em",
          whiteSpace: "nowrap",
        }}>{node.label}</div>;
      })}
    </div>
  );
};
