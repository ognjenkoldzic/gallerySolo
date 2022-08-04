import React, { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

export function Roza() {
  const gltf = useLoader(GLTFLoader, "models/roza/scene.gltf");

  useEffect(() => {
    gltf.scene.scale.set(0.005, 0.005, 0.005);
    gltf.scene.position.set(0, 1.1, -3);
    // gltf.scene.traverse((object) => {
    //   if (object instanceof Mesh) {
    //     object.castShadow = true;
    //     object.receiveShadow = true;
    //     object.material.envMapIntensity = 20;
    //   }
    // });
  }, [gltf]);

  useFrame((state, delta) => {
    let t = state.clock.getElapsedTime();
    gltf.scene.rotation.y = t * 1;
    //     let group = gltf.scene.children[0].children[0].children[0];
    //     group.children[0].rotation.x = t * 2;
    //     group.children[2].rotation.x = t * 2;
    //     group.children[4].rotation.x = t * 2;
    //     group.children[6].rotation.x = t * 2;
  });

  return <primitive object={gltf.scene} />;
}
