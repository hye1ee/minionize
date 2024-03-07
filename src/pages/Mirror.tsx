import { useNavigate } from "react-router-dom";
import { PageWrapper } from "../components/PageWrapper";

const Mirror = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      this is mirror room
      <button onClick={() => navigate("/")} />
    </PageWrapper>
  );
};
export default Mirror;
