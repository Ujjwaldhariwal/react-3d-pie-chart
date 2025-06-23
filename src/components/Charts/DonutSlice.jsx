// components/charts/DonutSlice.tsx
import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

function DonutSlice({
  startAngle,
  endAngle,
  radius,
  innerRadius,
  height,
  color,
  label,
  value,
  position,
  isHovered,
  onHover,
  onLeave,
}) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      const targetY = hovered || isHovered ? 0.3 : 0;
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1);
      const targetScale = hovered || isHovered ? 1.05 : 1;
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1));
    }
  });

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(innerRadius * Math.cos(startAngle), innerRadius * Math.sin(startAngle));
    shape.lineTo(radius * Math.cos(startAngle), radius * Math.sin(startAngle));
    shape.absarc(0, 0, radius, startAngle, endAngle, false);
    shape.lineTo(innerRadius * Math.cos(endAngle), innerRadius * Math.sin(endAngle));
    shape.absarc(0, 0, innerRadius, endAngle, startAngle, true);

    return new THREE.ExtrudeGeometry(shape, {
      depth: height,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 2,
      bevelSize: 0.025,
      bevelThickness: 0.02,
    });
  }, [startAngle, endAngle, radius, innerRadius, height]);

  const midAngle = (startAngle + endAngle) / 2;
  const labelRadius = (radius + innerRadius) / 2;
  const outerLabelRadius = radius + 0.6;

  return (
    <group>
      <Float speed={4} rotationIntensity={0.02} floatIntensity={0.015}>
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
          <meshStandardMaterial
            color={color}
            metalness={0.2}
            roughness={0.4}
            transparent
            opacity={hovered || isHovered ? 0.95 : 0.85}
            emissive={hovered || isHovered ? color : '#000'}
            emissiveIntensity={hovered || isHovered ? 0.3 : 0}
          />
        </mesh>
      </Float>

      {/* Value Label Inside */}
      <Text
        position={[
          labelRadius * Math.cos(midAngle),
          height + 0.1,
          labelRadius * Math.sin(midAngle),
        ]}
        fontSize={0.12}
        color="#000"
        anchorX="center"
        anchorY="middle"
        outlineColor="#fff"
        outlineWidth={0.004}
      >
        {value}%
      </Text>

      {/* Label Outside */}
      <Text
        position={[
          outerLabelRadius * Math.cos(midAngle),
          height + 0.05,
          outerLabelRadius * Math.sin(midAngle),
        ]}
        fontSize={0.13}
        color="#111"
        anchorX="center"
        anchorY="middle"
        outlineColor="#fff"
        outlineWidth={0.004}
      >
        {label}
      </Text>
    </group>
  );
}

export default DonutSlice;
