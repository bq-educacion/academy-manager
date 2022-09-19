import { gql } from "graphql-tag";

export const typeDefs = gql`

  type User {
    id: ID!
    name: String!
    email: String!
  }

  extend type Query {
    getUsers: [User!]!

    getUser: User!
  }
  extend type Mutation {
    login( token: String! ): String!
  }
`;
