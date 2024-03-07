import { useNavigate } from "react-router-dom";
import { PageWrapper } from "../components/PageWrapper";
import { useState } from "react";
import MaskGen from "./MaskGen";
import MaskTry from "./MaskTry";

const Mirror = () => {
  const navigate = useNavigate();
  const [maskData, setMaskData] = useState<string>("");
  const [maskGen, setMaskGen] = useState<boolean>(true);

  return (
    <PageWrapper>
      <button
        onClick={() => navigate("/")}
        style={{ position: "absolute", right: 0, zIndex: 100 }}
      >
        Home
      </button>
      <button
        onClick={() => setMaskGen((val) => !val)}
        style={{ position: "absolute", right: 0, top: "30px", zIndex: 100 }}
      >
        Mode Change
      </button>
      {maskGen ? (
        <MaskGen setMaskData={setMaskData} />
      ) : (
        <MaskTry maskData={maskData} />
      )}
    </PageWrapper>
  );
};
export default Mirror;
