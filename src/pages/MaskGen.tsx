/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { PageWrapper } from "../components/PageWrapper";
import styled from "styled-components";
import { ChromePicker } from "@hello-pangea/color-picker";
import { Slider } from "@mui/material";

import FrameImg from "../assets/img/frame.png";
import MinionImg1 from "../assets/img/minion1.png";
import MinionImg2 from "../assets/img/minion2.png";
import MinionImg3 from "../assets/img/minion3.png";
import MinionImg4 from "../assets/img/minion4.png";
import ColorImg from "../assets/img/colortube.png";

interface MaskGenProps {
  setMaskData: React.Dispatch<React.SetStateAction<string>>;
}

const MaskGen = (props: MaskGenProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [size, setSize] = useState<number>(10);
  const [showColor, setShowColor] = useState<boolean>(false);

  const startDraw = (evt: React.MouseEvent) => {
    if (!canvasRef || !canvasRef.current) return;
    const context = canvasRef.current.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    context.beginPath();
    context.moveTo(evt.nativeEvent.offsetX, evt.nativeEvent.offsetY);
    setIsDrawing(true);
  };
  const endDraw = () => {
    if (!canvasRef || !canvasRef.current) return;
    const context = canvasRef.current.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    context.closePath();
    setIsDrawing(false);
  };
  const onDraw = (evt: React.MouseEvent) => {
    if (!isDrawing || !canvasRef || !canvasRef.current) return;
    const context = canvasRef.current.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    context.lineTo(evt.nativeEvent.offsetX, evt.nativeEvent.offsetY);
    context.stroke();
  };

  useEffect(() => {
    const canvas = document.getElementById("mask-canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    if (!context) return;
    // load image
    const template = new Image();
    template.src = "src/assets/template.png";
    template.onload = () => {
      context.drawImage(template, 0, 0, canvas.width, canvas.height);
    };
    // init drawing
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;

    return () => {
      props.setMaskData(canvas.toDataURL());
    };
  }, []);

  const onColorChange = (color: any) => {
    if (!canvasRef || !canvasRef.current) return;
    const context = canvasRef.current.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    context.strokeStyle = color.hex;
  };

  const onSizeChange = (event: Event, newValue: number | number[]) => {
    setSize(newValue as number);
    if (!canvasRef || !canvasRef.current) return;
    const context = canvasRef.current.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    context.lineWidth = newValue as number;
  };

  return (
    <PageWrapper style={{ backgroundColor: "#F5F5F5" }}>
      {/* <div>
        <Slider
          value={size}
          shiftStep={30}
          min={5}
          max={30}
          onChange={onSizeChange}
          valueLabelDisplay="on"
        />
        <ChromePicker onChangeComplete={onColorChange} />
      </div> */}
      <MaskGenColWrapper
        style={{
          alignItems: "flex-end",
          justifyContent: "flex-start",
          padding: "50px 10px 0 0",
        }}
      >
        <MaskGenImgContainer style={{ width: "350px" }}>
          <MaskGenImg src={MinionImg1} />
        </MaskGenImgContainer>
        <MaskGenImgContainer style={{ width: "400px" }}>
          <MaskGenImg src={MinionImg2} />
        </MaskGenImgContainer>
      </MaskGenColWrapper>
      <MaskGenColWrapper style={{ flex: 2 }}>
        <MaskGenFrameWrapper>
          <MaskGenFrame src={FrameImg} />
          <MaskGenCanvas
            width="700"
            height="700"
            id="mask-canvas"
            ref={canvasRef}
            onMouseDown={startDraw}
            onMouseMove={onDraw}
            onMouseUp={endDraw}
          />
        </MaskGenFrameWrapper>
        <MaskGenButtonContainer onClick={() => setShowColor((val) => !val)}>
          <MaskGenImg src={ColorImg} style={{ cursor: "pointer" }} />
          <div style={{ fontSize: "20px", transform: "rotate(5deg)" }}>
            Click Here!
          </div>
        </MaskGenButtonContainer>
      </MaskGenColWrapper>
      <MaskGenColWrapper
        style={{
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "0 0 60px 10px",
        }}
      >
        <MaskGenImgContainer style={{ width: "400px" }}>
          <MaskGenImg src={MinionImg3} />
        </MaskGenImgContainer>
        <MaskGenImgContainer style={{ width: "300px" }}>
          <MaskGenImg src={MinionImg4} />
          {showColor && (
            <MaskGenPalette>
              <Slider
                style={{ width: "90%" }}
                value={size}
                shiftStep={30}
                min={5}
                max={30}
                onChange={onSizeChange}
                valueLabelDisplay="on"
              />
              <ChromePicker onChangeComplete={onColorChange} />
            </MaskGenPalette>
          )}
        </MaskGenImgContainer>
      </MaskGenColWrapper>
    </PageWrapper>
  );
};

export default MaskGen;

const MaskGenColWrapper = styled.div`
  height: 100%;
  flex: 1;
  box-sizing: border-box;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  overflow: hidden;
`;

const MaskGenImgContainer = styled.div`
  width: 300px;
  height: auto;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const MaskGenButtonContainer = styled.div`
  width: 230px;
  position: absolute;
  bottom: 50px;
  right: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;

  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    width: 250px;
  }
`;

const MaskGenPalette = styled.div`
  width: 256px;
  height: 378px;

  box-sizing: border-box;
  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  background-color: #f5f5f5;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: inset 2px 2px 6px rgba(0, 0, 0, 0.4);
`;

const MaskGenImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MaskGenCanvas = styled.canvas`
  width: 700px;
  height: 700px;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const MaskGenFrame = styled.img`
  width: 800px;
  height: 800px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
`;

const MaskGenFrameWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
`;
