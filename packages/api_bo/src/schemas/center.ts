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

  enum OrderFilterCenter {
    name
    nature
    city
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
    city: String!
    phone: String
    email: String
    active: Boolean!
    type: [CenterActivityType!]!
    nature: CenterNature!
    languages: [Languages!]!
    notes: String
    createdAt: String!
    contacts: [CenterContact!]
    groups: [Group!]!
  }

  type Query {
    getCenters(
      searchText: String
      orderFilter: OrderFilterCenter
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
      city: String!
      phone: String
      email: String
      type: [CenterActivityType!]!
      nature: CenterNature!
      languages: [Languages!]!
      contacts: [CenterContactInput!]
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
      city: String
      phone: String
      email: String
      type: [CenterActivityType!]
      nature: CenterNature
      languages: [Languages!]
      contacts: [CenterContactInput!]
      notes: String
    ): Center!

    editCenterContact(
      idCenter: String!
      originEmail: String!
      name: String
      phone: String
      email: String
    ): CenterContact!

    deleteCenter(id: String!): Center!
    
    setActiveCenter(id:String!, active:Boolean!): Center!
  }
`;
