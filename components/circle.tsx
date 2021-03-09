import * as React from "react";
import { DoubleSide, FrontSide } from "three";

type Vector3 = [number, number, number];

type CircleProps = {
  position: Vector3;
  isSphere?: boolean;
  color?: string;
  poligons?: number;
};

export const Circle = ({
  position,
  color = "green",
  isSphere = false,
  poligons = 10
}: CircleProps) => (
  <mesh position={position}>
    {isSphere ? (
      <sphereBufferGeometry attach="geometry" args={[1, poligons, poligons]} />
    ) : (
      <circleBufferGeometry attach="geometry" args={[1, poligons]} />
    )}
    <meshPhongMaterial
      attach="material"
      color={color}
      side={isSphere ? DoubleSide : FrontSide}
    />
  </mesh>
);
