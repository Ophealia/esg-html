// EarthScene.tsx
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

const Earth: React.FC = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const earthTexture = useRef(new THREE.TextureLoader().load('/textures/earth.jpg'));

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001; // 使地球缓慢旋转
    }
  });

  return (
    <Sphere ref={earthRef} args={[1, 32, 32]}>
      <meshStandardMaterial map={earthTexture.current} />
    </Sphere>
  );
};

interface IconProps {
  position: [number, number, number];
  textureUrl: string;
  content: string;
}

const Icon: React.FC<IconProps> = ({ position, textureUrl, content }) => {
  const [hovered, setHovered] = useState(false);
  const iconRef = useRef<THREE.Mesh>(null);
  const iconTexture = useRef(new THREE.TextureLoader().load(textureUrl));

  return (
    <Float position={position}>
      <mesh
        ref={iconRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeBufferGeometry args={[0.2, 0.2]} />
        <meshBasicMaterial map={iconTexture.current} transparent />
        {hovered && (
          <Html position={[0, 0.3, 0]} center>
            <div className="tooltip bg-gray-800 text-white text-sm p-2 rounded shadow-lg">
              {content}
            </div>
          </Html>
        )}
      </mesh>
    </Float>
  );
};

const EarthScene: React.FC = () => {
  useEffect(() => {
    gsap.to('.tooltip', {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.inOut',
    });
  }, []);

  return (
    <Canvas style={{ height: '100vh', width: '100vw', background: '#282c34' }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} />
      <Earth />
      <Icon position={[1.5, 0, 0]} textureUrl="/icons/github.png" content="GitHub" />
      <Icon position={[-1.5, 0, 0]} textureUrl="/icons/linkedin.png" content="LinkedIn" />
      <Icon position={[0, 1.5, 0]} textureUrl="/icons/instagram.png" content="Instagram" />
    </Canvas>
  );
};

export default EarthScene;
