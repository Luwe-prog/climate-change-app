import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import { Model } from './Model';

const Scene = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [30, 20, 50], fov: 50 }}
      style={{ width: '100%', height: '100vh' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[50, 50, 25]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <Suspense fallback={null}>
        <Model scale={1} position={[0, 0, 0]} />
      </Suspense>

      <OrbitControls enablePan enableZoom enableRotate />
      <Preload all />
    </Canvas>
  );
};

export default Scene;
