import { NextPage } from "next";
import Layout from "../components/Layout";
import { sections } from "../config";

const ForbiddenPage: NextPage = () => {
  return (
    <Layout
      section={sections[0].title}
      label={sections[0].links[0].label}
      error={403}
      children={undefined}
    />
  );
};

export default ForbiddenPage;
