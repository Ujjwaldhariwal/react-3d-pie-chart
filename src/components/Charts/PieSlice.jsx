import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

function PieSlice({ 
  startAngle, 
  endAngle, 
  radius, 
  height, 
  color, 
  label, 
  value, 
  position, 
  isHovered, 
  onHover, 
  onLeave 
}) {
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
    const innerRadius = 0.5;
    
    // Create the slice shape
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
      bevelSegments: 2,
      steps: 2,
      bevelSize: 0.02,
      bevelThickness: 0.02
    };
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [startAngle, endAngle, radius, height]);

  const midAngle = (startAngle + endAngle) / 2;
  const labelRadius = radius + 0.8;
  const labelPosition = [
    labelRadius * Math.cos(midAngle),
    height / 2,
    labelRadius * Math.sin(midAngle)
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
      
      <Text
        position={labelPosition}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {label}
      </Text>
      
      <Text
        position={[labelPosition[0], labelPosition[1] - 0.2, labelPosition[2]]}
        fontSize={0.12}
        color="#cccccc"
        anchorX="center"
        anchorY="middle"
      >
        {value}%
      </Text>
    </group>
  );
}

export default PieSlice;