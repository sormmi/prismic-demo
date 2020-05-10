import { navigate } from "gatsby";

const IndexPage = () => {

  if (typeof window !== "undefined") {
    navigate("/en-us/home");
  }
  return null;
};

export default IndexPage;
