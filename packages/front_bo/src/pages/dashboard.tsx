import { NextPage } from "next";
import { Layout } from "../components";
import { sections } from "../config";
import withApollo from "../apollo/withApollo";
import { useEffect } from "react";

const DashboardPage: NextPage = () => {
  const isBrowser = typeof window !== "undefined";
  useEffect(() => {
    if (window.document.cookie) {
      if (window.document.cookie.split("=")[2].length === 2) {
        window.location.href = "/login";
      }
    }
  }, [isBrowser]);
  return (
    <Layout
      title={sections[0].bigTitle}
      section={sections[0].title}
      label={sections[0].links[0].label}
    >
      <h1>Test</h1>
    </Layout>
  );
};

export default withApollo(DashboardPage, { requiresAccess: true });
