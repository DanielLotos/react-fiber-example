import "./styles.css";

import * as React from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls, FlyControls, Stars, Sky, Text, Plane } from "drei";

import { Circle } from "../components/circle";
import { Box } from "../components/box";

export default function App() {
  const [isPointerDown, setIsPointerDown] = React.useState(false);

  return (
    <>
      {/* <Canvas colorManagement camera={{ position: [-4, 2, 7], fov: 60 }}> */}
      <Canvas colorManagement camera={{ position: [0, 2, 7], fov: 60 }}>
        {/* <Canvas colorManagement> */}
        <ambientLight intensity={0.3} />
        <pointLight intensity={0.5} position={[0, 10, 5]} />

        {/* SKY */}
        <Sky rayleigh={0.01} mieCoefficient={0} />
        <Stars
          radius={100} // Radius of the inner sphere (default=100)
          depth={50} // Depth of area where stars should fit (default=50)
          count={5000} // Amount of stars (default=5000)
          factor={4} // Size factor (default=4)
          saturation={0} // Saturation 0-1 (default=0)
          fade // Faded dots (default=false)
        />

        <group>
          <Plane
            position={[0, -0.75, 0]}
            scale={[10, 100, 2]}
            rotation={[-1.55, 0, 0]}
          />
          <Circle position={[0, 3.5, 0]} poligons={20} isSphere />
          <Box
            isPointerDown={isPointerDown}
            setIsPointerDown={setIsPointerDown}
            position={[-3, 0, 0]}
            color="pink"
          />
          <Box position={[0, 0, 2]} isWobble color="purple" />
          <Box position={[3, 0, 0]} color="pink" />

          <Text color="black" anchorX="center" anchorY={-1.52} fontSize={1}>
            TURBO PUSHKA
            <Box position={[0, 0, 0]} color="#face8d" withAnimations />
          </Text>
        </group>

        {/* Controls */}
        {/* <OrbitControls
          maxDistance={10}
          minDistance={2}
          maxAzimuthAngle={60}
          maxPolarAngle={60}
          dampingFactor={0.15}
          enableRotate={!isPointerDown}
        /> */}
        {/* <FlyControls movementSpeed={3} rollSpeed={2} /> */}
      </Canvas>
    </>
  );
}
