import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

function Bar3D({ position, height, color, label, value, isHovered, onHover, onLeave, labelStyle = 'front' }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      const targetScale = (hovered || isHovered) ? 1.1 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, 1, targetScale),
        0.1
      );
    }
  });

  const geometry = useMemo(() => {
    return new THREE.BoxGeometry(0.8, height, 0.8);
  }, [height]);

  const renderLabels = () => {
    switch (labelStyle) {
      case 'onbar':
        return (
          <>
            {/* Label on the bar itself (vertical) */}
            <Text
              position={[position[0], height / 2, position[2] + 0.45]}
              fontSize={0.1}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              fontWeight="bold"
              rotation={[0, 0, Math.PI / 2]}
            >
              {label}
            </Text>
            
            {/* Value on top */}
            <Text
              position={[position[0], height + 0.3, position[2]]}
              fontSize={0.15}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              fontWeight="bold"
            >
              {value}
            </Text>
          </>
        );
        
      case 'hover':
        return (
          <>
            {/* Value always visible on top */}
            <Text
              position={[position[0], height + 0.3, position[2]]}
              fontSize={0.15}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              fontWeight="bold"
            >
              {value}
            </Text>
            
            {/* Label appears only on hover */}
            {(hovered || isHovered) && (
              <>
                <Text
                  position={[position[0], height + 0.6, position[2]]}
                  fontSize={0.14}
                  color="#4ECDC4"
                  anchorX="center"
                  anchorY="middle"
                  fontWeight="bold"
                >
                  {label}
                </Text>
                
                {/* Hover info box */}
                <mesh position={[position[0], height + 0.8, position[2]]}>
                  <planeGeometry args={[1.2, 0.4]} />
                  <meshLambertMaterial color="#1a1a1a" transparent opacity={0.9} />
                </mesh>
              </>
            )}
          </>
        );
        
      case 'front':
      default:
        return (
          <>
            {/* Value on top of bar */}
            <Text
              position={[position[0], height + 0.3, position[2]]}
              fontSize={0.15}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              fontWeight="bold"
            >
              {value}
            </Text>
            
            {/* Category label in front of chart */}
            <Text
              position={[position[0], 0.2, position[2] + 1.5]}
              fontSize={0.14}
              color="#cccccc"
              anchorX="center"
              anchorY="middle"
              fontWeight="bold"
            >
              {label}
            </Text>
            
            {/* Connecting line from bar to label */}
            <mesh position={[position[0], 0.1, position[2] + 0.8]}>
              <boxGeometry args={[0.02, 0.02, 1]} />
              <meshLambertMaterial color="#666666" transparent opacity={0.5} />
            </mesh>
          </>
        );
    }
  };

  return (
    <group>
      <mesh
        ref={meshRef}
        geometry={geometry}
        position={[position[0], height / 2, position[2]]}
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
      
      {renderLabels()}
    </group>
  );
}

function BarChart3D({ data, labelStyle = 'front' }) {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  
  const maxValue = Math.max(...data.map(item => item.value));
  const spacing = 1.4;
  const startX = -(data.length - 1) * spacing / 2;

  const bars = data.map((item, index) => {
    const height = (item.value / maxValue) * 3; // Scale height
    const xPosition = startX + index * spacing;

    return (
      <Bar3D
        key={item.id || index}
        position={[xPosition, 0, 0]}
        height={height}
        color={item.color}
        label={item.label}
        value={item.value}
        isHovered={hoveredIndex === index}
        onHover={() => setHoveredIndex(index)}
        onLeave={() => setHoveredIndex(-1)}
        labelStyle={labelStyle}
      />
    );
  });

  return (
    <group>
      {bars}
      {/* Base platform */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[data.length * spacing + 1, 3]} />
        <meshLambertMaterial color="#333333" transparent opacity={0.2} />
      </mesh>
      
      {/* Grid lines for better readability */}
      {[1, 2, 3].map((height) => (
        <group key={height}>
          <mesh position={[0, height, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[data.length * spacing + 1, 0.02]} />
            <meshLambertMaterial color="#555555" transparent opacity={0.3} />
          </mesh>
          <Text
            position={[-(data.length * spacing) / 2 - 0.5, height, 0]}
            fontSize={0.1}
            color="#888888"
            anchorX="center"
            anchorY="middle"
          >
            {Math.round((height / 3) * maxValue)}
          </Text>
        </group>
      ))}
    </group>
  );
}

export default BarChart3D;

