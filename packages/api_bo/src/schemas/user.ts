import { gql } from "graphql-tag";

export const typeDefs = gql`

  type User {
    id: ID!
    name: String!
    email: String!
    picture:String!
  }

  extend type Query {
    getUser: User!
  }
  extend type Mutation {
    login( token: String! ): String!
  }
`;