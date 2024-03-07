/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import { MindARThree } from "mind-ar/dist/mindar-face-three.prod.js";
import { useEffect, useState } from "react";
import { PageWrapper } from "../components/PageWrapper";
import styled from "styled-components";

interface MaskTryProps {
  maskData: string;
}
const MaskTry = (props: MaskTryProps) => {
  const [faceMesh, setFaceMesh] = useState<any>(null);
  const [mindar, setMindar] = useState<any>(null);

  const start = async () => {
    const { renderer, scene, camera } = mindar;
    await mindar.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  };

  useEffect(() => {
    // generate ar instance
    const newMindar = new MindARThree({
      container: document.querySelector("#mask-render"),
    });
    setMindar(newMindar);
  }, []);

  useEffect(() => {
    // generate face instance
    if (!mindar) return;

    const { scene } = mindar;
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    const newFaceMesh = mindar.addFaceMesh();
    setFaceMesh(newFaceMesh);
  }, [mindar]);

  useEffect(() => {
    // load face texture
    if (!faceMesh) return;
    const { scene } = mindar;
    const texture = new THREE.TextureLoader().load(props.maskData);
    faceMesh.material.map = texture;
    faceMesh.material.transparent = true;
    faceMesh.material.needsUpdate = true;
    scene.add(faceMesh);

    start();

    // prevent memory leak
    return () => {
      if (mindar) {
        mindar.renderer.setAnimationLoop(null);
        mindar.stop();
      }
    };
  }, [faceMesh]);

  return (
    <PageWrapper>
      This is try page
      <MaskRenderContainer id="mask-render" />
    </PageWrapper>
  );
};

export default MaskTry;

const MaskRenderContainer = styled.div`
  width: 500px;
  height: auto;

  position: relative;
`;
