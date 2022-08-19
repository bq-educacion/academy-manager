import { gql } from "graphql-tag";

export const typeDefs = gql`
  enum CenterType {
    ACADEMY
    NO_ACADEMY
    CAMPUS
  }

  enum CenterNature {
    PRIVATE
    PUBLIC
    CONCERTED
  }

  enum OrderFilter {
    name
    population
    type
    languages
  }

  type CenterContact {
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
    type: CenterType!
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
      type: CenterType!
      nature: CenterNature!
      languages: [String!]!
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
      type: CenterType
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
