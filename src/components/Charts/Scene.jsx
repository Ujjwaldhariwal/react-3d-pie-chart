import React from 'react';
import { OrbitControls } from '@react-three/drei';
import PieChart3D from './PieChart3D';
import DonutChart3D from './DonutChart3D';
import BarChart3D from './BarChart3D';

function Scene({ data, isAnimating, chartType = 'pie', barLabelStyle = 'front' }) {
  const renderChart = () => {
    switch (chartType) {
      case 'donut':
        return <DonutChart3D data={data} />;
      case 'bar':
        return <BarChart3D data={data} labelStyle={barLabelStyle} />;
      case 'pie':
      default:
        return <PieChart3D data={data} />;
    }
  };

  // Adjust camera position based on chart type and label style
  const getCameraSettings = () => {
    switch (chartType) {
      case 'bar':
        // Adjust camera based on label style
        if (barLabelStyle === 'front') {
          return { minDistance: 5, maxDistance: 15 }; // Pull back more for front labels
        }
        return { minDistance: 4, maxDistance: 12 };
      case 'donut':
        return { minDistance: 3, maxDistance: 10 };
      case 'pie':
      default:
        return { minDistance: 3, maxDistance: 10 };
    }
  };

  const cameraSettings = getCameraSettings();

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
        minDistance={cameraSettings.minDistance}
        maxDistance={cameraSettings.maxDistance}
      />
    </>
  );
}

export default Scene;