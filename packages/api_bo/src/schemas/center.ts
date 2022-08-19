import { gql } from "graphql-tag";

export const typeDefs = gql`
  enum CenterActivityType {
    ACADEMY
    NO_ACADEMY
    CAMPUS
    OTHERS
  }

  enum CenterNature {
    PRIVATE
    PUBLIC
    CONCERTADO
  }

  enum OrderFilter {
    name
    nature
    population
    type
    languages
  }

  type CenterContact {
    name: String!
    email: String!
    phone: String!
  }

  input CenterContactInput {
    name: String!
    email: String!
    phone: String!
  }

  type PaginatedCenters {
    page: Int!
    totalPages: Int!
    totalNumber: Int!
    pageSize: Int!
    data: [Center!]!
  }

  type Center {
    id: ID!
    name: String!
    address: String!
    population: String!
    phone: String
    email: String
    type: [CenterActivityType!]!
    nature: CenterNature!
    languages: [String!]!
    notes: String
    createdAt: String!
    contacts: [CenterContact!]!
    groups: [Group!]!
  }

  type Query {
    getCenters(
      searchText: String
      orderFilter: OrderFilter
      order: Number
      page: Int
      pageSize: Int
    ): PaginatedCenters!
    getCenter(id: String!): Center!
  }

  type Mutation {
    createCenter(
      name: String!
      address: String!
      population: String!
      phone: String
      email: String
      type: [CenterActivityType!]!
      nature: CenterNature!
      languages: [String!]!
      contacts: [CenterContactInput!]!
      notes: String
    ): Center!

    addCenterContact(
      idCenter: String!
      name: String!
      email: String!
      phone: String!
    ): CenterContact!

    editCenter(
      id: String!
      name: String
      address: String
      population: String
      phone: String
      email: String
      type: [CenterActivityType!]
      nature: CenterNature
      languages: [String!]
      notes: String
    ): Center!

    editCenterContacts(
      idCenter: String!
      originEmail: String!
      name: String
      phone: String
      email: String
    ): CenterContact!
  }
`;
