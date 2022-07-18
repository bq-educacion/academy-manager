import { gql } from "https://deno.land/x/graphql_tag@0.0.1/mod.ts";

export const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    addSentence(sentence: String!): String!
  }
`;
