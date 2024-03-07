/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import { MindARThree } from "mind-ar/dist/mindar-face-three.prod.js";
import { useEffect, useState } from "react";
import { PageWrapper } from "../components/PageWrapper";
import styled from "styled-components";

import WhiteFrameImg from "../assets/img/whiteframe.png";

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
    const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    const ambientlight = new THREE.AmbientLight(0xffffff);
    scene.add(light, ambientlight);

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
    <PageWrapper style={{ backgroundColor: "#111111" }}>
      This is try page
      <MaskRenderFrameContainer>
        <MaskRenderFrame src={WhiteFrameImg} />
        <MaskRenderContainer id="mask-render" />
      </MaskRenderFrameContainer>
    </PageWrapper>
  );
};

export default MaskTry;

const MaskRenderContainer = styled.div`
  width: 700px;
  height: 700px;

  position: relative;
`;

const MaskRenderFrameContainer = styled.div`
  width: 1000px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const MaskRenderFrame = styled.img`
  width: 100%;
  object-fit: cover;
  z-index: 100;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
