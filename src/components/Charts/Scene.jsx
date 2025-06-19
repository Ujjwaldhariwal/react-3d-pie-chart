import React from 'react';
import { OrbitControls } from '@react-three/drei';
import PieChart3D from './PieChart3D';
import DonutChart3D from './DonutChart3D';
import BarChart3D from './BarChart3D';

function Scene({ data, isAnimating, chartType = 'pie' }) {
  const renderChart = () => {
    switch (chartType) {
      case 'donut':
        return <DonutChart3D data={data} />;
      case 'bar':
        return <BarChart3D data={data} />;
      case 'pie':
      default:
        return <PieChart3D data={data} />;
    }
  };

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} castShadow />
      
      {renderChart()}
      
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={isAnimating}
        autoRotateSpeed={0.5}
        minDistance={3}
        maxDistance={12}
      />
    </>
  );
}


  

export default Scene;