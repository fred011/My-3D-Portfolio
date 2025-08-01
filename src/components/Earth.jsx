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
      earthRef.current.rotation.y += 0.002;
    }
  });

  return (
    <primitive
      ref={earthRef}
      object={earth.scene}
      scale={2.5}
      position-y={0}
      rotation-y={0}
    />
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="always"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* Allow drag in all directions and zoom */}
        <OrbitControls
          autoRotate={true}
          enableZoom={false}
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
