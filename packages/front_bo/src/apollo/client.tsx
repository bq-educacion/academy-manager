import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NextLink,
  NormalizedCacheObject,
  Observable,
  Operation,
  split,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { WebSocketLink } from "@apollo/client/link/ws";
import { createUploadLink } from "apollo-upload-client";
import { getMainDefinition } from "@apollo/client/utilities";
import fetch from "isomorphic-fetch";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { NextApiRequest } from "next";

const isBrowser = typeof window !== "undefined";
const uri = process.env.NEXT_PUBLIC_API_URL;
const httpLink = createUploadLink({ fetch, uri });

const request = async (
  operation: Operation,
  getToken: (req?: NextApiRequest) => string | null
) => {
  const context = operation.getContext();
  let authHeader = "";

  const token = context.token || getToken();
  authHeader = `Bearer ${token}`;

  operation.setContext({
    headers: {
      Authorization: authHeader,
    },
  });
};

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
export function createApolloClient(
  initialState: NormalizedCacheObject = {},
  getToken: (req?: NextApiRequest) => string | null
) {
  const createWsLink = () => {
    const subscriptionClient = new SubscriptionClient(
      uri!.replace("http", "ws"),
      {
        lazy: true,
        reconnect: true,
        connectionParams: async () => {
          const token = getToken();
          return {
            authorization: token ? `Bearer ${token}` : "",
          };
        },
      }
    );

    const subscriptionMiddleware = {
      applyMiddleware(options: { authorization: string }, next: () => void) {
        const token = getToken();
        options.authorization = token ? `Bearer ${token}` : "";
        next();
      },
    };

    subscriptionClient.use([subscriptionMiddleware]);

    return new WebSocketLink(subscriptionClient);
  };

  return new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path }) => {
            console.error(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
          });
        }
        if (networkError) {
          console.error(`[Network error]: ${JSON.stringify(networkError)}`);
        }
      }),
      new ApolloLink(
        (operation: Operation, forward: NextLink) =>
          new Observable((observer) => {
            let handle: any;
            Promise.resolve(operation)
              .then((oper) => request(oper, getToken))
              .then(() => {
                handle = forward(operation).subscribe({
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                });
              })
              .catch(observer.error.bind(observer));

            return () => {
              if (handle) {
                handle.unsubscribe();
              }
            };
          })
      ),
      isBrowser
        ? (split(
            ({ query }) => {
              const definition = getMainDefinition(query);
              return (
                definition.kind === "OperationDefinition" &&
                definition.operation === "subscription"
              );
            },
            createWsLink(),
            httpLink as unknown as ApolloLink
          ) as ApolloLink)
        : (httpLink as unknown as ApolloLink),
    ]),
    cache: new InMemoryCache().restore(initialState),
  });
}
