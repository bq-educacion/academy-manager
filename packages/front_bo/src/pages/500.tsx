import { NextPage } from "next";
import Layout from "../components/Layout";
import { sections } from "../config";

const NotFoundPage: NextPage = () => {
  return (
    <Layout
      section={sections[0].title}
      error={500} label={""}    />
  );
};

export default NotFoundPage;
