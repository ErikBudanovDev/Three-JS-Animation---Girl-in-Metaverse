import { useLoader, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";

const MeshElement = ({ texture, index, visibleIndex }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current && index <= visibleIndex) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.35;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, -0.1 * index, 0]}
      visible={index <= visibleIndex}
    >
      <cylinderGeometry args={[1.11614, 1.11614, 0.2, 40, 55, true, 5, 0.2]} />
      <meshStandardMaterial
        color={"#FFFFFF"}
        side={THREE.DoubleSide}
        map={texture}
        transparent={true}
      />
    </mesh>
  );
};

export default function FloatingItemsV2() {
  const [visibleIndex, setVisibleIndex] = useState(-1);
  const textureUrls = useMemo(() => [
    "google.png",
    "wp.png",
    "linkedin.png",
   "react.svg",
     "insta.png",
    "face.png",
     "reddit.png",
  "vimeo.png",
    "snapchat.png",
     "whatsapp.png",
 "youtube.png",
   "skype.png",
    "twitter.png",
     "pinterest.png",
     "discord.png",
     "behance.png",
    "dribble.png",
     "analytics.png",
 "chatgpt.png",
    "hubspot.png",
   "salesforce.png"
    // ... (other URLs)
  ], []);

  const textures = textureUrls.map((url) => useLoader(THREE.TextureLoader, url));

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleIndex((prevIndex) => {
        if (prevIndex < 30) return prevIndex + 1;
        clearInterval(timer);
        return prevIndex;
      });
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {textures.map((texture, index) => (
        <MeshElement
          key={index}
          texture={texture}
          index={index}
          visibleIndex={visibleIndex}
        />
      ))}
    </>
  );
}
