import { NextPage } from "next";
import Layout from "../components/Layout";
import { sections } from "../config";

const NotFoundPage: NextPage = () => {
  return (
    <Layout
      section={sections[0].title}
      label={sections[0].links[0].label}
      error={500}
      children={undefined}
    />
  );
};

export default NotFoundPage;
