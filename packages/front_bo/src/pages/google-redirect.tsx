import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useApolloClient, useMutation } from "@apollo/client";
import queryString from "query-string";
import withApollo from "../apollo/withApollo";
import { useCookies } from "react-cookie";
import Loading from "@academy-manager/ui/src/components/Loading";
import { LoginDocument } from "../generated/graphql";

const GoogleRedirectPage: NextPage = () => {
  const router = useRouter();
  const [loginMutation] = useMutation(LoginDocument);

  const login = async (token: string) => {
    const { data } = await loginMutation({ variables: { token } }).catch(
      (error) => {
        throw error;
      }
    );
    const [cookie, setCookie] = useCookies(["token"]);
    if (cookie.token) {
      setCookie("token", data, { path: "/" });
    }
  };

  const onLeaveProcess = () => {
    router.push(sessionStorage.getItem("googlePrevPathname") || "/");
    sessionStorage.removeItem("googlePrevPathname");
  };

  useEffect(() => {
    try {
      const { access_token: token } = queryString.parse(location.hash);
      (async () => {
        useApolloClient().resetStore();
        await login(String(token));
        true && (window.location.href = "/dashboard");
      })();
    } catch (e) {
      onLeaveProcess();
    }
  }, []);

  return <Loading />;
};

export default withApollo(GoogleRedirectPage, { requiresAccess: false });
