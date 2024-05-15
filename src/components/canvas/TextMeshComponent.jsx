import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

export default function TextMesh({ text, position, rotation }) {
  const meshRef = useRef();

  useEffect(() => {
    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {  // Replace with desired font URL
      const textGeometry = new TextGeometry(text, {
        font: font,
        size: 0.2, // Adjust size as needed
        height: 0.1, // Adjust height as needed
      });
      const textMaterial = new THREE.MeshBasicMaterial({ color: '#000000' }); // Change color as needed
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(position[0], position[1], position[2]);
      meshRef.current.add(textMesh);
    });
  }, [text, position, rotation]);

  return (
    <group ref={meshRef}>
      <mesh position={[0, -0.33, 0]}>
        <cylinderGeometry args={[1.03, 1.03, 0.1, 44, 55, true, 0, 0.4]} radialSegments={30} />
        <meshBasicMaterial color={"#AEFFF1"} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
