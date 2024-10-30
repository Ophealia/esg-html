// src/pages/TestPage.tsx
import React from 'react'; // 需要使用 React
import { Canvas } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';

const TestPage = () => {
  return (
    <Canvas style={{ height: '100vh' }}>
      {/* 添加环境光和点光源 */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* 添加一个立方体 */}
      <Box position={[-1.2, 0, 0]}>
        <meshStandardMaterial attach="material" color="orange" />
      </Box>
      <Box position={[1.2, 0, 0]}>
        <meshStandardMaterial attach="material" color="royalblue" />
      </Box>

      {/* 添加轨道控制 */}
      <OrbitControls />
    </Canvas>
  );
};

export default TestPage;
