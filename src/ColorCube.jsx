import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { RepeatWrapping, TextureLoader } from "three";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

export function ColorCube({ position }) {
  const mesh = useRef();
  //   useFrame((state) => {
  //     mesh.current.material.forEach(
  //       (material) =>
  //         (material.uniforms.time.value = state.clock.getElapsedTime())
  //     );
  //     mesh.current.rotation.x =
  //       mesh.current.rotation.y =
  //       mesh.current.rotation.z +=
  //         0.01;
  //   });

  const texture_1 = useLoader(TextureLoader, "texture/dice_1.jpeg");
  //   const texture_2 = useLoader(TextureLoader, "texture/dice_2.jpeg");
  //   const texture_3 = useLoader(TextureLoader, "texture/dice_3.jpeg");
  //   const texture_4 = useLoader(TextureLoader, "texture/dice_4.jpeg");
  //   const texture_5 = useLoader(TextureLoader, "texture/dice_5.jpeg");
  //   const texture_6 = useLoader(TextureLoader, "texture/dice_6.jpeg");
  const move = () => {
    useFrame((state, delta) => (mesh.current.rotation.z += 0.01));
  };
  return (
    <mesh ref={mesh} position={position}>
      <boxBufferGeometry attach="geometry" args={[3, 0.15, 3]} />

      {/* <boxGeometry args={[1, 1, 1]} /> */}

      <meshBasicMaterial attach="material-0" color="red" />
      <meshBasicMaterial attach="material-1" color="blue" />
      <meshBasicMaterial attach="material-2" map={texture_1} transparent />
      <meshBasicMaterial attach="material-3" color="0xffffff" />
      <meshBasicMaterial attach="material-4" color="yellow" />
      {/* <meshBasicMaterial attach="material-5" color="0xffffff" /> */}
      <meshBasicMaterial attach="material-5" color="green" />
    </mesh>
  );
}

{
  /* <RoundedBox
  args={[0.25, 3, 3]}
  radius={0.1}
  onClick={() => console.log("clicked")}
/>
<colorMaterial attach="material" color={"grey"} />
<colorMaterial attach="material" color={"red"} /> */
}
