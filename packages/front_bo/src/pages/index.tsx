import type { NextPage } from "next";
import { useEffect } from "react";
import withApollo from "../apollo/withApollo";
import { sections } from "../config";

const HomePage: NextPage = () => {
  //Example set cookie
  // import { useCookies } from "react-cookie";
  // const [cookie, setCookie, removeCookie] = useCookies(['token']);
  // setCookie('token', "NCC-1701", { path: '/' });
  // removeCookie('token', { path: '/' });
  // {cookie.token && console.log(cookie.token)}
  // {!cookie.token && console.log("Pues no hay token")}
  const isBrowser = typeof window !== "undefined";

  useEffect(() => {
    window.location.href = sections[0].links[0].href;
  }, [isBrowser]);

  return <></>;
};

export default withApollo(HomePage);
