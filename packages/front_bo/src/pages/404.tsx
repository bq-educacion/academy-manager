import { NextPage } from "next";
import Layout from "../components/Layout";
import { sections } from "../config";

const InternalServerErrorPage: NextPage = () => {
  return (
    <Layout
    childrenHeader={undefined} 
      section={sections[0].title}
      error={404}
      children={undefined}
    />
  );
};

export default InternalServerErrorPage;
