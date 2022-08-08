import { NextPage } from "next";
import Layout from "../components/Layout";
import { sections } from "../config";

const NotFoundPage: NextPage = () => {
  return (
    <Layout
    childrenHeader={undefined} 
      section={sections[0].title}
      error={500}
      children={undefined}
    />
  );
};

export default NotFoundPage;
