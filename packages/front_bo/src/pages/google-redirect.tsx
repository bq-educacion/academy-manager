import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
//import { useApolloClient, useMutation } from "@apollo/client";
///import queryString from "query-string";
import withApollo from "../apollo/withApollo";
//import { useCookies } from "react-cookie";
import Loading from "@academy-manager/ui/src/components/Loading";

const GoogleRedirectPage: NextPage = () => {
  const router = useRouter();
  // const [login] = useLoginMutation({
  //   variables: {
  //       token: queryString.parse(location.hash).access_token,
  //   }});

  const onLeaveProcess = () => {
    router.push(sessionStorage.getItem("googlePrevPathname") || "/");
    sessionStorage.removeItem("googlePrevPathname");
  };

  useEffect(() => {
    try {
      (async () => {
        // const { data } = await useLoginMutation();
        // const [cookie] = useCookies([data]);
        // const apolloClient = useApolloClient();
        // apolloClient.resetStore();
        true && (window.location.href = "/dashboard");
      })();
    } catch (e) {
      onLeaveProcess();
    }
  }, []);

  return <Loading />;
};

export default withApollo(GoogleRedirectPage, { requiresAccess: false });
