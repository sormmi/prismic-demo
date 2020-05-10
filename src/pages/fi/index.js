import { navigate } from "gatsby";

const IndexPage = () => {
  if (typeof window !== "undefined") {
    navigate("/fi/home");
  }
  return null;
};

export default IndexPage;
