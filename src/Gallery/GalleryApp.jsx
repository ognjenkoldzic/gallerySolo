import { useEffect, useState } from "react";
import { Suspense } from "react";
import "./GalleryApp.css";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  CubeCamera,
  Environment,
  RoundedBox,
  Billboard,
  Text,
  Float,
  Text3D,
  MeshWobbleMaterial,
} from "@react-three/drei";
import { Ground } from "./Ground";
import { Rings } from "./Rings";
import { Boxes } from "./Boxes";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

import { FloatingGrid } from "./FloatingGrid";
import { ColorCube } from "./ColorCube";
import { Cloud, Stars } from "@react-three/drei";
import { Roza } from "./Roza";
import { Piano } from "./Piano";
import Spinner from "./Spinner";
import { useFrame, useLoader } from "@react-three/fiber";
import { RepeatWrapping, TextureLoader } from "three";

function CarShow({ ready }) {
  const BSPBild1 = useLoader(TextureLoader, "texture/vermeer.jpg");
  const BSPBild2 = useLoader(TextureLoader, "texture/thomas.png");
  const BSPBild3 = useLoader(TextureLoader, "texture/watteau.jpg");

  const paintings = [
    { pic: BSPBild1, position: [0, 1.25, 1] },
    { pic: BSPBild2, position: [0, 1.25, 6] },
    { pic: BSPBild3, position: [0, 1.25, 11] },
  ];
  console.log(paintings);

  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);

  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[30, 20, 5]} />
      <color args={[0, 0, 0]} attach="background" />
      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.9}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-10, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <Rings />
      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Piano ready={ready} />
          </>
        )}
      </CubeCamera>
      <Ground />
      {/* <Physics gravity={[0, 10, 0]} iterations={10}>
        <Pointer />
        <Clump />
      </Physics> */}
      <Boxes />
      {/* <Billboard
        position={[0, 7, 1]}
        args={[44, 30]}
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
      >
        <Text fontSize={1}>I'm a billboard</Text>
      </Billboard> */}
      <Float
        position={[0, 8, 7]}
        rotation={[0, -4.75, 0]}
        //rotationIntensity={0.35}
        floatIntensity={0.2}
      >
        <Text3D
          font={"/kingQueen.json"}
          size={1}
          height={0.08}
          curveSegments={9}
        >
          Heavenly Gallery
          <MeshWobbleMaterial
            accatch="material"
            color={[1, 1, 0.4]}
            speed={0.4}
            factor={0.2}
            emissive={[1, 1, 0.4]}
          />
          {/* <meshStandardMaterial color={[1, 0.15, 0.1]} emissive={[1, 0.1, 0]} /> */}
        </Text3D>
      </Float>
      <EffectComposer>
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={0.5} // The bloom intensity.
          width={300} // render width
          height={300} // render height
          kernelSize={5} // blur kernel size
          luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.0005, 0.0012]} // color offset
        />
      </EffectComposer>
      <FloatingGrid />
      <Roza />
      <Piano ready={ready} />
      {paintings.map((painting) => (
        <ColorCube position={painting.position} map={painting.pic} />
      ))}
      {/* <ColorCube position={[0, 1.5, 6]} />
      <ColorCube position={[0, 1.5, 11]} /> */}
      <Cloud position={[1, 9, 3]} speed={2} opacity={0.5} />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <OrbitControls />
    </>
  );
}

function GalleryApp({ ready }) {
  // const [ready, setReady] = useState(false);
  // function Ready({ setReady }) {
  //   useEffect(() => () => void setReady(true), []);
  //   return null;
  // }
  //<Ready setReady={setReady} />
  //<Spinner />

  return (
    <div className="gallerBody">
      <Suspense fallback={<h1>Loading</h1>}>
        <Canvas shadows>
          <CarShow ready={ready} />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default GalleryApp;
