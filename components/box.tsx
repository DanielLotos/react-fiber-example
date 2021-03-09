import React, { useCallback, useRef, useState } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { MeshWobbleMaterial } from "drei";
import { Vec2 } from "three";

type Vector3 = [number, number, number];

type BoxProps = {
  position: Vector3;
  color?: string;
  isWobble?: boolean;
  withAnimations?: boolean;
  isPointerDown?: boolean;
  setIsPointerDown?: (value: boolean) => void;
};

type MeshObject = {
  rotation: {
    x: number;
    y: number;
    z: number;
    set: (x: number, y: number, z: number) => void;
  };
  scale: number;
  position: {
    x: number;
    y: number;
    z: number;
    set: (x: number, y: number, z: number) => void;
  };
};

export const Box = ({
  position,
  color,
  isWobble = false,
  withAnimations = false,
  isPointerDown,
  setIsPointerDown
}: BoxProps) => {
  const mesh = useRef<null | MeshObject>(null);
  const [expanded, setExpanded] = useState(false);
  // const [isPointerDown, setIsPointerDown] = useState(false);

  const scale: [number, number, number] = expanded
    ? [1.5, 1.5, 1.5]
    : [1, 1, 1];

  const { viewport } = useThree();

  // Animation
  useFrame(() => {
    if (mesh.current !== null && withAnimations) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    }
  });

  useFrame(({ mouse }) => {
    if (isPointerDown && mesh.current) {
      const x = (mouse.x * viewport.width) / 2;
      mesh.current.position.x = x;
      mesh.current.rotation.z = -x;
    }
  });

  return (
    <mesh
      ref={mesh}
      scale={scale}
      position={position}
      onDoubleClick={() => {
        setExpanded(!expanded);
      }}
      onPointerDown={() => {
        if (setIsPointerDown) {
          setIsPointerDown(true);
        }
      }}
      onPointerUp={() => {
        if (setIsPointerDown) {
          setIsPointerDown(false);
        }
      }}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      {isWobble ? (
        <MeshWobbleMaterial speed={2} factor={1} color={color} />
      ) : (
        <meshPhongMaterial attach="material" color={color} />
      )}
    </mesh>
  );
};
