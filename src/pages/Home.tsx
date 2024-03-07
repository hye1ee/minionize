import { useNavigate } from "react-router-dom";
import { PageWrapper } from "../components/PageWrapper";
import { useLoader } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Stars,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { Suspense, useEffect } from "react";

const Model = () => {
  const { scene, animations } = useGLTF("src/assets/minions.glb");
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
      Hello this is home
      <audio id="audio-main" autoPlay={true}>
        <source src="src/assets/music/main_bgm.mp3" type="audio/mpeg" />
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
      <button onClick={() => navigate("/mirror")} />
    </PageWrapper>
  );
};
export default Home;
