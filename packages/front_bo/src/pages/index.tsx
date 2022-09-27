import type { NextPage } from "next";
import { useEffect } from "react";
import withApollo from "../apollo/withApollo";
import { sections } from "../config";

const HomePage: NextPage = () => {
  const isBrowser = typeof window !== "undefined";

  useEffect(() => {
    window.location.href = sections[0].links[0].href;
  }, [isBrowser]);

  return <></>;
};

export default withApollo(HomePage, { requiresAccess: false });
