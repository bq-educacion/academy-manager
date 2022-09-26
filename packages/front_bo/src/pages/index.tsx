import type { NextPage } from "next";
import { useEffect } from "react";
import withApollo from "../apollo/withApollo";

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
    window.location.href = "/login";
  }, [isBrowser]);

  return <></>;
};

export default withApollo(HomePage, { requiresAccess: false });
