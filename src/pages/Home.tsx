import { useNavigate } from "react-router-dom";
import { PageWrapper } from "../components/PageWrapper";

const Home = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      Hello this is home
      <button onClick={() => navigate("/mirror")} />
    </PageWrapper>
  );
};
export default Home;
