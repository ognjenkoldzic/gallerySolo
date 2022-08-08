import React, { useEffect, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import { PositionalAudio } from "@react-three/drei";
import bachAudio from "../assets/bach.mp3";

export function Piano({ ready }) {
  const gltf = useLoader(GLTFLoader, "models/piano/scene.gltf");
  const [motion, setMotion] = useState(true);
  const [play, setPlay] = useState(false);

  console.log(play);

  function playAudio(play, volume = 0.3, loop = false) {
    const audio = new Audio(bachAudio);
    if (play === true) {
      audio.currentTime = 0;
      audio.volume = volume;
      audio.loop = loop;
      audio.play();
    } else audio.pause();
  }
  playAudio(play);

  useEffect(() => {
    gltf.scene.scale.set(0.0135, 0.0135, 0.0135);
    gltf.scene.position.set(0, -0.1, -10);
    gltf.scene.rotation.y = -0.1;

    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 30;
      }
    });
  }, [gltf]);
  //   const Move = () => {
  //   useFrame((state, delta) => {
  //     let t = state.clock.getElapsedTime();
  //     gltf.scene.rotation.y = t * 1;
  //     let group = gltf.scene.children[0].children[0].children[0];
  //     group.children[0].rotation.x = t * 2;
  //     group.children[2].rotation.x = t * 2;
  //     group.children[4].rotation.x = t * 2;
  //     group.children[6].rotation.x = t * 2;
  //   });
  //};
  //setMotion((prevMotion) => !prevMotion)
  return (
    <>
      <primitive
        object={gltf.scene}
        onClick={() => setPlay((prevPlay) => !prevPlay)}
      />

      {/* {ready && <PositionalAudio autoplay loop url="/bach.mp3" distance={1} />} */}
      {/* {motion === true && <Move />} */}
    </>
  );
}
