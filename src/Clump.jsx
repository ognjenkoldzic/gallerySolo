import * as THREE from "three";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { Physics, useSphere } from "@react-three/cannon";
import {
  Sky,
  Environment,
  Effects as EffectComposer,
  useTexture,
} from "@react-three/drei";

function Clump({
  mat = new THREE.Matrix4(),
  vec = new THREE.Vector3(),
  ...props
}) {
  const rfs = THREE.MathUtils.randFloatSpread;
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
  const baubleMaterial = new THREE.MeshStandardMaterial({
    color: "red",
    roughness: 0,
    envMapIntensity: 0.2,
    emissive: "#370037",
  });
  //const texture = useTexture("/cross.jpg")
  const [ref, api] = useSphere(() => ({
    args: [1],
    mass: 1,
    angularDamping: 0.1,
    linearDamping: 0.65,
    position: [rfs(20), rfs(20), rfs(20)],
  }));
  useFrame((state) => {
    for (let i = 0; i < 40; i++) {
      // Get current whereabouts of the instanced sphere
      ref.current.getMatrixAt(i, mat);
      // Normalize the position and multiply by a negative force.
      // This is enough to drive it towards the center-point.
      api
        .at(i)
        .applyForce(
          vec
            .setFromMatrixPosition(mat)
            .normalize()
            .multiplyScalar(-50)
            .toArray(),
          [0, 0, 0]
        );
    }
  });
  return (
    <instancedMesh
      ref={ref}
      castShadow
      receiveShadow
      args={[null, null, 40]}
      geometry={sphereGeometry}
      material={baubleMaterial}
    />
  );
}
//material-map={texture}

function Pointer() {
  const viewport = useThree((state) => state.viewport);
  const [, api] = useSphere(() => ({
    type: "Kinematic",
    args: [3],
    position: [0, 0, 0],
  }));
  return useFrame((state) =>
    api.position.set(
      (state.mouse.x * viewport.width) / 2,
      (state.mouse.y * viewport.height) / 2,
      0
    )
  );
}

export { Clump, Pointer };
