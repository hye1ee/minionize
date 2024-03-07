import { useEffect, useRef, useState } from "react";
import { PageWrapper } from "../components/PageWrapper";
import styled from "styled-components";
import { ChromePicker } from "@hello-pangea/color-picker";

interface MaskGenProps {
  setMaskData: React.Dispatch<React.SetStateAction<string>>;
}

const MaskGen = (props: MaskGenProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

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

  const onColorChange = (color) => {
    if (!canvasRef || !canvasRef.current) return;
    const context = canvasRef.current.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    context.strokeStyle = color.hex;
  };

  return (
    <PageWrapper>
      <div>
        <ChromePicker onChangeComplete={onColorChange} />
      </div>

      <MaskGenCanvas
        width="800"
        height="800"
        id="mask-canvas"
        ref={canvasRef}
        onMouseDown={startDraw}
        onMouseMove={onDraw}
        onMouseUp={endDraw}
      />
    </PageWrapper>
  );
};

export default MaskGen;

const MaskGenCanvas = styled.canvas`
  width: 800px;
  height: 800px;
  border: 1px solid black;
`;
