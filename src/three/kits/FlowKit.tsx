import * as THREE from "three";
import { useMemo } from "react";
import { clone as cloneSkeleton } from "three/addons/utils/SkeletonUtils.js";
import { useGLTF } from "@react-three/drei";
import { staticFile } from "remotion";
import type { ActiveFlowSend } from "../../script/actions";
import type { KitPart } from "../../script/types";

type FlowNode = Extract<KitPart, { type: "node" }>;
type FlowLink = Extract<KitPart, { type: "link" }>;
type FocusState = { node: string | null; amount: number };

const FlowModel: React.FC<{ path: string }> = ({ path }) => {
  const { scene } = useGLTF(staticFile(path));
  const { object, offset, scale } = useMemo(() => {
    const clone = cloneSkeleton(scene);
    const bounds = new THREE.Box3().setFromObject(clone);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    return {
      object: clone,
      offset: center.multiplyScalar(-1),
      scale: 1.4 / (Math.max(size.x, size.y, size.z) || 1),
    };
  }, [scene]);

  return <primitive object={object} position={offset} scale={scale} />;
};

const FlowNodeMesh: React.FC<{ node: FlowNode; focus: FocusState }> = ({ node, focus }) => {
  const amount = focus.node === node.id ? focus.amount : 0;
  const scale = 1 + amount * 0.1;
  return (
    <group position={node.pos} scale={scale}>
      {node.model ? <group rotation={node.rotation}><FlowModel path={node.model} /></group> : <mesh>
        {node.shape === "sphere" ? <sphereGeometry args={[0.55, 24, 18]} /> : <boxGeometry args={[1.35, 0.82, 0.5]} />}
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={0.08 + amount * 0.8}
          roughness={0.35}
          metalness={0.18}
        />
      </mesh>}
      <mesh visible={amount > 0.01} position={[0, -0.52, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.74, 0.025 + amount * 0.045, 6, 40]} />
        <meshBasicMaterial color={node.color} transparent opacity={amount} />
      </mesh>
    </group>
  );
};

const FlowLinkMesh: React.FC<{
  from: FlowNode;
  to: FlowNode;
  color: string;
  active: boolean;
}> = ({ from, to, color, active }) => {
  const start = new THREE.Vector3(...from.pos);
  const end = new THREE.Vector3(...to.pos);
  const direction = end.clone().sub(start).normalize();
  const shaftStart = start.clone().addScaledVector(direction, 0.78);
  const arrowTip = end.clone().addScaledVector(direction, -0.62);
  const shaftEnd = arrowTip.clone().addScaledVector(direction, -0.2);
  const shaft = shaftEnd.clone().sub(shaftStart);
  const rotation = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
  const linkColor = active ? "#ffe066" : color;
  return (
    <group>
      {shaft.length() > 0.08 ? <mesh position={shaftStart.clone().add(shaftEnd).multiplyScalar(0.5)} quaternion={rotation}>
        <cylinderGeometry args={[active ? 0.045 : 0.025, active ? 0.045 : 0.025, shaft.length(), 8]} />
        <meshStandardMaterial color={linkColor} emissive={linkColor} emissiveIntensity={active ? 0.65 : 0.05} />
      </mesh> : null}
      <mesh position={arrowTip} quaternion={rotation}>
        <coneGeometry args={[0.12, 0.24, 10]} />
        <meshStandardMaterial color={linkColor} emissive={linkColor} emissiveIntensity={active ? 0.65 : 0.05} />
      </mesh>
    </group>
  );
};

export const FlowKit: React.FC<{
  nodes: FlowNode[];
  links: FlowLink[];
  focus: FocusState;
  sends: ActiveFlowSend[];
}> = ({ nodes, links, focus, sends }) => {
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  const activeLinks = new Set(sends.map((send) => `${send.from}->${send.to}`));
  return (
    <group>
      {links.map((link) => {
        const from = nodeById.get(link.from);
        const to = nodeById.get(link.to);
        if (!from || !to) return null;
        return <FlowLinkMesh key={`${link.from}->${link.to}`} from={from} to={to} color={link.color} active={activeLinks.has(`${link.from}->${link.to}`)} />;
      })}
      {nodes.map((node) => <FlowNodeMesh key={node.id} node={node} focus={focus} />)}
      {sends.flatMap((send) => {
        const from = nodeById.get(send.from);
        const to = nodeById.get(send.to);
        if (!from || !to) return [];
        const start = new THREE.Vector3(...from.pos);
        const end = new THREE.Vector3(...to.pos);
        return [0, 0.085, 0.17].map((trail, i) => {
          const progress = send.progress - trail;
          if (progress < 0) return null;
          const position = start.clone().lerp(end, progress);
          return <mesh key={`${send.from}-${send.to}-${i}`} position={position}>
            <sphereGeometry args={[i === 0 ? 0.12 : 0.075, 12, 10]} />
            <meshBasicMaterial color={i === 0 ? "#fff3bf" : "#ffd43b"} />
          </mesh>;
        });
      })}
    </group>
  );
};

export type { FlowNode, FlowLink };
