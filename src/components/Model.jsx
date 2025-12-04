import React from 'react';
import { useGLTF } from '@react-three/drei';

export function Model(props) {
  const { scene } = useGLTF('/psu-campus.glb'); // path matches public folder
  return <primitive object={scene} {...props} />;
}

// Preload the model for faster loading
useGLTF.preload('/psu-campus.glb');
