import { useNavigate } from "react-router-dom";
import { PageWrapper } from "../components/PageWrapper";
import { useState } from "react";
import MaskGen from "./MaskGen";
import MaskTry from "./MaskTry";
import styled from "styled-components";

const Mirror = () => {
  // const navigate = useNavigate();
  const [maskData, setMaskData] = useState<string>("");
  const [maskGen, setMaskGen] = useState<boolean>(true);

  return (
    <PageWrapper>
      {/* <button
        onClick={() => navigate("/")}
        style={{ position: "absolute", right: 0, zIndex: 100 }}
      >
        Home
      </button> */}
      {/* <button
        style={{ position: "absolute", right: 0, top: "30px", zIndex: 100 }}
      ></button> */}
      <ButtonTitle onClick={() => setMaskGen((val) => !val)}>
        {maskGen ? "Enter" : "Leave"}
      </ButtonTitle>
      {maskGen ? (
        <MaskGen setMaskData={setMaskData} />
      ) : (
        <MaskTry maskData={maskData} />
      )}
    </PageWrapper>
  );
};
export default Mirror;

const ButtonTitle = styled.div`
  font-family: "Rubik Bubbles", system-ui;
  font-weight: 400;
  font-style: normal;

  font-size: 80px;
  color: rgba(255, 255, 255, 0.2);
  /* -webkit-text-stroke: 1px black; */

  position: absolute;
  top: 20px;
  right: 20px;
  transition: all 1s;
  z-index: 100;

  cursor: pointer;
  &:hover {
    color: rgba(255, 255, 255, 0.7);
  }
`;
