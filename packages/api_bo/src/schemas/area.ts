import { gql } from "graphql-tag";

export const typeDefs = gql`

  type Area {
    id: ID!
    name: String!
    region: Region!
  }

  extend type Query {
    getAreas( 
      regions: [Region!]!
    ): [Area!]! @auth

    getArea(id: String!): Area! @auth
  }
  extend type Mutation {
    createArea(
      name: String!
      region: Region!
    ): Area! @auth

    deleteArea(id: String!): Area! @auth
  }
`;
