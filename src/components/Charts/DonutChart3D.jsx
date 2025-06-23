// components/charts/DonutChart3D.tsx
import React, { useState } from 'react';
import { Text } from '@react-three/drei';
import DonutSlice from './DonutSlice';

function DonutChart3D({ data }) {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const total = data.reduce((sum, item) => sum + item.value, 0);

  let currentAngle = 0;
  const radius = 2;
  const innerRadius = 1.1;
  const height = 0.5;

  return (
    <group>
      {data.map((item, index) => {
        const sliceAngle = (item.value / total) * Math.PI * 2;
        const startAngle = currentAngle;
        const endAngle = currentAngle + sliceAngle;
        currentAngle = endAngle;

        return (
          <DonutSlice
            key={index}
            startAngle={startAngle}
            endAngle={endAngle}
            radius={radius}
            innerRadius={innerRadius}
            height={height}
            color={item.color}
            label={item.label}
            value={item.value}
            position={[0, 0, 0]}
            isHovered={hoveredIndex === index}
            onHover={() => setHoveredIndex(index)}
            onLeave={() => setHoveredIndex(-1)}
          />
        );
      })}

      {/* Center Total Label */}
      <Text
        position={[0, height + 0.2, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineColor="#000"
        outlineWidth={0.005}
      >
        Total
      </Text>
      <Text
        position={[0, height - 0.1, 0]}
        fontSize={0.25}
        color="#4ECDC4"
        anchorX="center"
        anchorY="middle"
        outlineColor="#000"
        outlineWidth={0.005}
      >
        {total}%
      </Text>
    </group>
  );
}

export default DonutChart3D;
