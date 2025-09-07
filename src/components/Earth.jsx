import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "./Loader";

const Earth = () => {
  const earth = useGLTF("/planet/scene.gltf");
  const earthRef = useRef();

  // Spin the Earth continuously
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <primitive
      ref={earthRef}
      object={earth.scene}
      scale={2.5}
      position={[0, 0, 0]} // centered
      rotation={[0, 0, 0]}
    />
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="always"
      dpr={[1, 2]}
      style={{
        width: "100%",
        height: "100%",
        display: "block", // Prevents any inline spacing issues
      }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [0, 0, 6], // center camera
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom
          enablePan={false}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
        />
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
