import React, { useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import { ThreeCanvas } from "@remotion/three";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export type CameraConfig = {
  start: [number, number, number];
  end: [number, number, number];
  ease?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
  lookAt?: [number, number, number];
  lookAtEnd?: [number, number, number];
};

export type StylizedSceneProps = {
  camera: CameraConfig;
  ambientIntensity?: number;
  sunIntensity?: number;
  fogColor?: string;
  isSpace?: boolean;
  isUnderwater?: boolean;
  children?: React.ReactNode;
};

// Internal Camera Rig to drive camera transform deterministically from useCurrentFrame
const DynamicCameraRig: React.FC<{ cameraConfig: CameraConfig }> = ({
  cameraConfig,
}) => {
  const camera = useThree((state) => state.camera);
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const easingFn = (() => {
    switch (cameraConfig.ease) {
      case "ease-in":
        return Easing.in(Easing.cubic);
      case "ease-out":
        return Easing.out(Easing.cubic);
      case "linear":
        return Easing.linear;
      case "ease-in-out":
      default:
        return Easing.inOut(Easing.cubic);
    }
  })();

  const progress = interpolate(frame, [0, Math.max(1, durationInFrames - 1)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });

  const posX = cameraConfig.start[0] + (cameraConfig.end[0] - cameraConfig.start[0]) * progress;
  const posY = cameraConfig.start[1] + (cameraConfig.end[1] - cameraConfig.start[1]) * progress;
  const posZ = cameraConfig.start[2] + (cameraConfig.end[2] - cameraConfig.start[2]) * progress;

  // Interpolate camera focal point (lookAt) smoothly across the beat
  const startTarget = cameraConfig.lookAt ?? [0, 0.2, 0];
  const endTarget = cameraConfig.lookAtEnd ?? startTarget;
  const targetX = startTarget[0] + (endTarget[0] - startTarget[0]) * progress;
  const targetY = startTarget[1] + (endTarget[1] - startTarget[1]) * progress;
  const targetZ = startTarget[2] + (endTarget[2] - startTarget[2]) * progress;

  useLayoutEffect(() => {
    camera.position.set(posX, posY, posZ);
    camera.lookAt(targetX, targetY, targetZ);
    camera.updateMatrixWorld();
  }, [camera, posX, posY, posZ, targetX, targetY, targetZ]);

  return null;
};

export const StylizedScene: React.FC<StylizedSceneProps> = ({
  camera,
  ambientIntensity,
  sunIntensity,
  fogColor,
  isSpace = false,
  isUnderwater = false,
  children,
}) => {
  const { width, height } = useVideoConfig();

  const effectiveFogColor =
    fogColor ??
    (isUnderwater ? "#0D3B66" : isSpace ? "#060919" : "#90D5FF");
  const effectiveAmbient =
    ambientIntensity ?? (isUnderwater ? 0.9 : isSpace ? 0.45 : 0.95);
  const effectiveSun =
    sunIntensity ?? (isUnderwater ? 2.6 : isSpace ? 2.4 : 1.85);

  return (
    <ThreeCanvas
      width={width}
      height={height}
      camera={{ fov: 46, near: 0.1, far: 120 }}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      <DynamicCameraRig cameraConfig={camera} />

      {/* Atmospheric Fog */}
      {isUnderwater ? (
        <fog attach="fog" args={[effectiveFogColor, 8, 48]} />
      ) : isSpace ? (
        <fog attach="fog" args={[effectiveFogColor, 35, 90]} />
      ) : (
        <fog attach="fog" args={[effectiveFogColor, 18, 55]} />
      )}

      {/* Lighting Setup */}
      {isUnderwater ? (
        <>
          {/* Bright Underwater Ocean Lighting (Anti-Gelap) */}
          <hemisphereLight args={["#7dd3fc", "#0D3B66", 1.5]} />
          <ambientLight intensity={effectiveAmbient} color="#1e40af" />
          {/* Sinar Cahaya Tembus Permukaan Air (Top Down Sunlight) */}
          <directionalLight
            position={[0, 16, 4]}
            intensity={effectiveSun}
            color="#7dd3fc"
          />
          {/* Sinar Depan Menerangi Dek & Lambung Kapal */}
          <directionalLight
            position={[4, 6, 8]}
            intensity={1.8}
            color="#ffffff"
          />
          {/* Point Light Sorot Submersible dari Depan */}
          <pointLight
            position={[0, 1.2, 5.5]}
            intensity={2.4}
            distance={24}
            color="#fef08a"
          />
        </>
      ) : isSpace ? (
        <>
          {/* Deep Space: Dramatic high-contrast sunlight from side */}
          <ambientLight intensity={effectiveAmbient} color="#8da2fb" />
          <directionalLight
            position={[12, 3, 6]}
            intensity={effectiveSun}
            color="#fff8e7"
          />
          <pointLight position={[-8, -2, -4]} intensity={0.5} color="#38bdf8" />
        </>
      ) : (
        <>
          {/* Terrestrial: Bright Warm Daylight Lighting (Yukngulikin Art Style) */}
          <ambientLight intensity={effectiveAmbient} color="#ffffff" />
          <directionalLight
            position={[8, 14, 7]}
            intensity={effectiveSun}
            color="#fff9e6"
          />
          <directionalLight
            position={[-8, 5, -5]}
            intensity={0.65}
            color="#90D5FF"
          />
          <directionalLight
            position={[0, -6, 2]}
            intensity={0.35}
            color="#e2e8f0"
          />
        </>
      )}

      {/* Scene Contents */}
      {children}
    </ThreeCanvas>
  );
};
