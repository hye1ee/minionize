import { useNavigate } from "react-router-dom";
import { PageWrapper } from "../components/PageWrapper";
import { MaskGen, MaskTry } from "./Mask";
import { useState } from "react";
import MaskImg from "../assets/minions.png";

const Mirror = () => {
  const navigate = useNavigate();
  const [maskGen, setMaskGen] = useState<boolean>(true);

  return (
    <PageWrapper>
      <button
        onClick={() => navigate("/")}
        style={{ position: "absolute", right: 0 }}
      >
        Home
      </button>
      <button
        onClick={() => setMaskGen((val) => !val)}
        style={{ position: "absolute", right: 0, top: "30px" }}
      >
        Mode Change
      </button>
      {maskGen ? <MaskGen /> : <MaskTry maskData={MaskImg} />}
    </PageWrapper>
  );
};
export default Mirror;
