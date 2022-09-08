import { gql } from "graphql-tag";

export const typeDefs = gql`

  type Area {
    id: ID!
    name: String!
    region: Region!
  }

  extend type Query {
    getAreas( 
      region: Region!
    ): [Area!]!

    getArea(id: String!): Area!
  }
  extend type Mutation {
    createArea(
      name: String!
      region: Region!
    ): Area!

    deleteArea(id: String!): Area!
  }
`;
