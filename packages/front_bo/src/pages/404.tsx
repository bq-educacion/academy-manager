import { NextPage } from "next";
import Layout from "../components/Layout";
import { sections } from "../config";

const InternalServerErrorPage: NextPage = () => {
  return <Layout section={sections[0].title} error={404} label={""} />;
};

export default InternalServerErrorPage;
