import { NextPage } from "next";
import Layout from "../components/Layout";
import { sections } from "../config";

const ForbiddenPage: NextPage = () => {
  return (
    <Layout
      childrenHeader={undefined}
      section={sections[0].title}
      error={403}
      children={undefined}
    />
  );
};

export default ForbiddenPage;
