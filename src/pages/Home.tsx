import { useNavigate } from "react-router-dom";
import { PageWrapper } from "../components/PageWrapper";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Stars,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { Suspense, useEffect } from "react";
import styled from "styled-components";
import MinionsModel from "../assets/minions.glb";
import MainBgm from "../assets/music/main_bgm.mp3";

const Model = () => {
  const { scene, animations } = useGLTF(MinionsModel);
  const { actions } = useAnimations(animations, scene);
  useEffect(() => {
    Object.values(actions).forEach((action) => action?.play());
  }, [actions]);
  useEffect(() => {
    scene.children.forEach((mesh) => (mesh.visible = false));
    scene.children.forEach((mesh, idx) => {
      setTimeout(() => {
        mesh.visible = true;
      }, idx * 700);
    });
  });
  return <primitive object={scene} scale={0.4} />;
};

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const audio = document.getElementById("audio-main") as HTMLAudioElement;
    audio.play().catch(() => {
      document.addEventListener(
        "click",
        () => {
          audio.play();
        },
        { once: true }
      );
    });
  }, []);

  return (
    <PageWrapper>
      <HomeTitle onClick={() => navigate("/mirror")}>Minionize</HomeTitle>
      <audio id="audio-main" autoPlay={true}>
        <source src={MainBgm} type="audio/mpeg" />
      </audio>
      <Canvas camera={{ fov: 55, near: 0.1, far: 1000, position: [2, 0, 0] }}>
        <color attach="background" args={["#151515"]} />
        <Suspense fallback={null}>
          <OrbitControls enableZoom={false} />
          <Model />
          <Stars />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </PageWrapper>
  );
};
export default Home;

const HomeTitle = styled.div`
  font-family: "Rubik Bubbles", system-ui;
  font-weight: 400;
  font-style: normal;

  font-size: 130px;
  color: rgba(255, 255, 255, 0.1);
  /* -webkit-text-stroke: 1px black; */

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: all 1s;
  z-index: 100;

  cursor: pointer;
  &:hover {
    font-size: 140px;
    color: rgba(255, 255, 255, 0.7);
  }
`;
