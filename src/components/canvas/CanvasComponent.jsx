import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import img from '../../assets/stars.png'
import rocketImg from '../../assets/wp.png'
import {
  PerspectiveCamera,
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";
import FloatingIntems from "./FloatingItems";
import { FlyingRockets } from "../loadingPage/flyingRockets";

const angleToRadianse = (angleInDeg) => (Math.PI / 180) * angleInDeg;
// console.log(img);

export function Three() {
  const OrbitControlsRef = useRef(null);
  const textureLady = useLoader(THREE.TextureLoader, "../src/assets/digiLady_Flipped.png");
  const bckgrnd1 = useLoader(THREE.TextureLoader, "../src/assets/bckgrnd2_Flipped.png");
  const bckgrnd2 = useLoader(THREE.TextureLoader, "../src/assets/bckgrnd_Flipped.png");

  const stars = useLoader(THREE.TextureLoader, "../src/assets/stars.png");

  // useEffect(() => {
  //   if (!!OrbitControlsRef.current) {
  //     console.log(OrbitControlsRef.current);
  //   }
  // }, [OrbitControlsRef.current]);
  return (
    <>
      <PerspectiveCamera makeDefault position={[1.3, -0.9, 2]} />
      <OrbitControls
        ref={OrbitControlsRef}
        enabled={true}
        // target={meshRef3.current.position}
        // autoRotate={true}
        // autoRotateSpeed={6}
        maxPolarAngle={angleToRadianse(113)}
        minPolarAngle={angleToRadianse(110)}
      />
      {/* This is the 3D Object */}
      <mesh position={[0, -0.2, 0]} >
        <cylinderGeometry args={[1, 1, 0.4, 55, 11, true, 0, 8]} />
        <meshStandardMaterial color="#60A597" side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -0.2, 0]} >
        <cylinderGeometry
          args={[0.95, 0.95, 0.4, 55, 11, true, 0, 8]}
          radialSegments={64}
        />
        <meshStandardMaterial
          color="#60A597"
          // metalness={0.6}
          // roughness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, -0.4, 0]}
        rotation={[-angleToRadianse(90), 0, 0]}

      >
        <ringGeometry args={[1, 0.95, 90]} />
        <meshStandardMaterial
          radialSegments={64}
          color="#60A597"
          //   metalness={0.6}
          //   roughness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Floating items */}
      <FloatingIntems />

      {/* Lady */}
      <sprite
        position={[0, -0.5, 0]}
        // scale={[1.4, 1.4, 0]}
        scale={[-1.4, 1.4, 0]}
      >
        <spriteMaterial
          map={textureLady}
          transparent={true}
          side={THREE.DoubleSide}
        />
        {/* <planeGeometry args={[2, 2]} /> */}
      </sprite>

      {/* Vibe */}
      <sprite position={[0, -0.26, 0]} scale={[2.7, 2, 0]} castShadow receiveShadow>
        <spriteMaterial
          map={bckgrnd1}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </sprite>

    
      <sprite position={[0, -0.26, 0]} scale={[2.5, 1.9, 3]}>
        <spriteMaterial
          map={bckgrnd2}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </sprite> 

      {/* STARS */}
      <sprite position={[0, 2, 0]} scale={[15, 15, 0]} >
        <spriteMaterial map={stars} transparent={true} side={THREE.DoubleSide}/>
        {/* <planeGeometry args={[2, 2]} /> */}
      </sprite>
    

      {/* The 3D object needs a light */}
      <ambientLight args={["#ffffff", 1]} />
      <spotLight
        args={["#ffffff", 8, 7, angleToRadianse(55), 1]}
        position={[-0.5, -1, 3]}
      />
      <spotLight
        args={["#ffffff", 1.5, 7, angleToRadianse(55), 1]}
        position={[2, 0, -2]}
      />
      {/* Environment */}
      {/* <Environment background>
        <mesh scale={100}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial side={THREE.BackSide} color={"#0C1640"} />
        </mesh>
      </Environment> */}
    </>
  );
}

export default function CanvasComponent() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Here you can simulate loading your assets with a timeout
    // In a real app, you would load models, textures, etc. and then set isLoaded to true
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500); // simulates a 3 second load time

    // Clean up the timer when the effect is re-run or the component is unmounted
    return () => clearTimeout(timer);
  }, []);

 if (!isLoaded) {
    // While isLoaded is false, show the loading GIF
    return <FlyingRockets/>;
  }
  return (
    <Suspense fallback={null}>
      <Canvas id="three-canvas-container" shadows>
        <Suspense fallback={null}>
          <Three />
        </Suspense>
      </Canvas>
    </Suspense>
    // </Suspense>
  );
}
