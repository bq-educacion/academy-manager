import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import { NextApiRequest, NextPage } from "next";
import React from "react";
import { createApolloClient } from "./client";
import redirect from "../lib/redirect";

type TApolloClient = ApolloClient<NormalizedCacheObject>;

type InitialProps = {
  apolloClient: TApolloClient;
  apolloState: any;
} & Record<string, any>;

let globalApolloClient: TApolloClient;

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState?: any, req?: NextApiRequest) {
  const isServer = !!req;
  const getToken = () => null; // TODO: Add getToken when session exists

  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (isServer && typeof window === "undefined") {
    return createApolloClient(initialState, getToken);
  }

  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState, getToken);
  }

  return globalApolloClient;
}

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 */
export default function withApollo(
  PageComponent: NextPage,
  { ssr = true, requiresAccess = true } = {}
) {
  const WithApollo = ({
    apolloClient,
    apolloState,
    userData,
    ...pageProps
  }: InitialProps) => {
    const client = apolloClient || initApolloClient(apolloState);

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== "production") {
    const displayName =
      PageComponent.displayName || PageComponent.name || "Component";

    if (displayName === "App") {
      console.warn("This withApollo HOC only works with PageComponents.");
    }

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx: any) => {
      const { AppTree } = ctx;

      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      const apolloClient = (ctx.apolloClient = initApolloClient({}, ctx.req));

      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      // Only on the server:
      if (typeof window === "undefined") {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps;
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import(
              "@apollo/client/react/ssr"
            );
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
              />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error("Error while running `getDataFromTree`", error);
          }
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      // TODO: Uncomment when session exists
      // try {
      //   const { data } = await apolloClient.query({
      //     query: ME_QUERY,
      //     errorPolicy: "all"
      //   })

      //   if (requiresAccess && (!data || !data.me)) {
      //     redirect(ctx, `/login?page=${encodeURIComponent(ctx.asPath)}`);
      //   } else if (ctx.pathname === "/login" && data?.me) {
      //     redirect(ctx, "/");
      //   }

      //   return {
      //     ...pageProps,
      //     apolloState,
      //     userData: data.me
      //   };
      // } catch (e) {
      return {
        ...pageProps,
        apolloState,
      };
      // }
    };
  }

  return WithApollo;
}
