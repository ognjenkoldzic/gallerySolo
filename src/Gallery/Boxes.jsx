import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import {
  softShadows,
  MeshWobbleMaterial,
  OrbitControls,
  MeshDistortMaterial,
} from "@react-three/drei";

function Box({ color }) {
  const box = useRef();
  const time = useRef(0);
  const [position, setPosition] = useState(getInitialPosition());
  const [xRotSpeed] = useState(() => Math.random());
  const [yRotSpeed] = useState(() => Math.random());
  const [scale] = useState(() => Math.pow(Math.random(), 2.0) * 0.1 + 0.05);

  function getInitialPosition() {
    let v = new Vector3(
      (Math.random() * 2 - 1) * 3,
      Math.random() * 2.5 + 0.1,
      (Math.random() * 2 - 1) * 15
    );
    if (v.x < 0) v.x -= 1.75;
    if (v.x > 0) v.x += 1.75;

    return v;
  }

  function resetPosition() {
    let v = new Vector3(
      (Math.random() * 2 - 1) * 3,
      Math.random() * 2.5 + 0.1,
      Math.random() * 10 + 10
    );
    if (v.x < 0) v.x -= 1.75;
    if (v.x > 0) v.x += 1.75;

    setPosition(v);
  }

  useFrame(
    (state, delta) => {
      time.current += delta * 1.2;
      let newZ = position.z - time.current;

      if (newZ < -10) {
        resetPosition();
        time.current = 0;
      }

      box.current.position.set(position.x, position.y, newZ);
      box.current.rotation.x += delta * xRotSpeed;
      box.current.rotation.y += delta * yRotSpeed;
    },
    [xRotSpeed, yRotSpeed, position]
  );
  //color={color}envMapIntensity={0.15}/args={[0.5, 0.5, 0.5]}
  return (
    <mesh ref={box} rotation-x={Math.PI * 10} scale={scale} castShadow>
      <sphereBufferGeometry attach="geometry" />
      {/* <MeshWobbleMaterial
        accatch="material"
        color="lightblue"
        speed={0.5}
        factor={3}
        envMapIntensity={0.15}
        opacity={0.5}
        transparent={true}
      /> */}
      <MeshDistortMaterial
        // ref={matRef}
        color={"#71dff5"}
        roughness={0.1}
        //metalness={0.1}
        bumpScale={0.005}
        clearcoat={1}
        clearcoatRoughness={1}
        radius={1}
        distort={0.5}
        opacity={0.4}
        transparent={true}
        // envMap={envMap}
        // bumpMap={bumpMap}
        speed={5}
      />
      {/* <meshStandardMaterial
        
      /> */}
    </mesh>
  );
}

export function Boxes() {
  const [arr] = useState(() => {
    let a = [];
    for (let i = 0; i < 70; i++) a.push(0);
    return a;
  });

  return (
    <>
      {arr.map((e, i) => (
        <Box
          key={i}
          color={i % 2 === 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4]}
        />
      ))}
    </>
  );
}
