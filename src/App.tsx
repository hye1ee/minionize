/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import { MindARThree } from "mind-ar/dist/mindar-face-three.prod.js";
import { useEffect, useState } from "react";
import MaskImg from "./assets/minions.png";

function App() {
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
    if (!faceMesh) return;
    const { scene } = mindar;
    const texture = new THREE.TextureLoader().load(MaskImg);
    faceMesh.material.map = texture;
    faceMesh.material.transparent = true;
    faceMesh.material.needsUpdate = true;
    scene.add(faceMesh);

    start();
  }, [faceMesh]);

  useEffect(() => {
    if (!mindar) return;

    const { scene } = mindar;
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    const newFaceMesh = mindar.addFaceMesh();
    setFaceMesh(newFaceMesh);
  }, [mindar]);

  useEffect(() => {
    const newMindar = new MindARThree({
      container: document.querySelector("#container"),
    });
    setMindar(newMindar);
    // const texture = new THREE.TextureLoader().load(
    //   "https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/face-tracking/assets/canonical_face_model_uv_visualization.png"
    // );
  }, []);

  const changeTexture = () => {
    const canvas = document.getElementById("mask-canvas") as HTMLCanvasElement;
    const dataUrl = canvas.toDataURL();
    const texture = new THREE.TextureLoader().load(dataUrl);
    console.log("hi", faceMesh, dataUrl);
    faceMesh.material.map = texture;
  };

  useEffect(() => {}, [faceMesh]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      Hello
      <canvas
        id="mask-canvas"
        style={{ width: "400px", height: "400px", border: "1px solid black" }}
      />
      <button name="dd" onClick={changeTexture} />
      <div
        id="container"
        style={{
          width: "500px",
          height: "300px",
          border: "1px solid black",
          position: "relative",
        }}
      ></div>
    </div>
  );
}

export default App;
