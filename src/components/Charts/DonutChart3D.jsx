import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

function DonutSlice({ startAngle, endAngle, radius, innerRadius, height, color, label, value, position, isHovered, onHover, onLeave }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      const targetY = (hovered || isHovered) ? 0.3 : 0;
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        targetY,
        0.1
      );
    }
  });

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    
    // Create the donut slice shape
    shape.moveTo(
      innerRadius * Math.cos(startAngle),
      innerRadius * Math.sin(startAngle)
    );
    shape.lineTo(
      radius * Math.cos(startAngle),
      radius * Math.sin(startAngle)
    );
    shape.absarc(0, 0, radius, startAngle, endAngle, false);
    shape.lineTo(
      innerRadius * Math.cos(endAngle),
      innerRadius * Math.sin(endAngle)
    );
    shape.absarc(0, 0, innerRadius, endAngle, startAngle, true);

    const extrudeSettings = {
      depth: height,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 2,
      bevelSize: 0.02,
      bevelThickness: 0.02
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [startAngle, endAngle, radius, innerRadius, height]);

  const midAngle = (startAngle + endAngle) / 2;
  const labelRadius = (radius + innerRadius) / 2;
  const labelPosition = [
    labelRadius * Math.cos(midAngle),
    height / 2,
    labelRadius * Math.sin(midAngle)
  ];

  const outerLabelRadius = radius + 0.6;
  const outerLabelPosition = [
    outerLabelRadius * Math.cos(midAngle),
    height / 2,
    outerLabelRadius * Math.sin(midAngle)
  ];

  return (
    <group>
      <mesh
        ref={meshRef}
        geometry={geometry}
        position={position}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerEnter={() => {
          setHovered(true);
          onHover();
        }}
        onPointerLeave={() => {
          setHovered(false);
          onLeave();
        }}
      >
        <meshLambertMaterial 
          color={color} 
          transparent 
          opacity={hovered || isHovered ? 0.9 : 0.8}
        />
      </mesh>
      
      {/* Inner label (on the slice) */}
      <Text
        position={labelPosition}
        fontSize={0.12}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {value}%
      </Text>
      
      {/* Outer label (category name) */}
      <Text
        position={outerLabelPosition}
        fontSize={0.13}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {label}
      </Text>
    </group>
  );
}

function DonutChart3D({ data }) {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;
  const radius = 2;
  const innerRadius = 1;
  const height = 0.5;

  const slices = data.map((item, index) => {
    const sliceAngle = (item.value / total) * Math.PI * 2;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    currentAngle = endAngle;

    return (
      <DonutSlice
        key={item.id || index}
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
  });

  return (
    <group>
      {slices}
      {/* Center text showing total */}
      <Text
        position={[0, height / 2 + 0.1, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        Total
      </Text>
      <Text
        position={[0, height / 2 - 0.2, 0]}
        fontSize={0.25}
        color="#4ECDC4"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {total}%
      </Text>
    </group>
  );
}

export default DonutChart3D;