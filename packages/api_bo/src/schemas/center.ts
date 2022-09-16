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

  type PaginatedCenters {
    page: Int!
    totalPages: Int!
    totalNumber: Int!
    pageSize: Int!
    data: [Center!]!
  }

  type CenterInfo {
    center: Center!
    totalStudents: Number!
    totalGroups: Number!
  }

  input GetCentersInput{
    searchText: String
    orderFilter: OrderFilterCenter
    order: Number
    page: Int
    pageSize: Int
  }

  input CreateCenterInput {
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
  }

  input EditCenterInput {
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
  }

  input CenterContactInput {
    name: String!
    email: String!
    phone: String!
  }

  input EditCenterContactInput {
    name: String
    email: String
    phone: String
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
      center: GetCentersInput!
    ): PaginatedCenters!

    getCenter(id: String!): CenterInfo!
  }

  type Mutation {
    createCenter(
      center: CreateCenterInput!
    ): Center!

    addCenterContact(
      idCenter: String!
      contact: CenterContactInput!
    ): CenterContact!

    editCenter(
      id: String!
      center: EditCenterInput!
    ): Center!

    editCenterContact(
      idCenter: String!
      originEmail: String!
      contact: EditCenterContactInput!
    ): CenterContact!

    deleteCenter(id: String!): Center!

    setActiveCenter(id:String!, active:Boolean!): Center!
  }
`;
