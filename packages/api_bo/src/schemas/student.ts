import { gql } from "graphql-tag";

export const typeDefs = gql`

  enum OrderFilterStudent {
    name
    center
    group
    course
    state
  }

  type PaginatedStudents {
    page: Int!
    totalPages: Int!
    totalNumber: Int!
    pageSize: Int!
    data: [Student!]!
  }

  type StudentContact {
    name: String!
    email: String!
    phone: String!
    send_info: Boolean!
  }

  input StudentContactInput {
    name: String!
    email: String!
    phone: String!
    send_info: Boolean!
  }

  type Student {
    id: ID!
    name: String!
    birthDate: String
    course: String!
    enrolled: Boolean!
    active: Boolean!
    registrationDate: String
    allergies: Boolean
    descriptionAllergy: String
    oldStudent: Boolean
    signedMandate: Boolean
    imageAuthorisation: Boolean
    collectionPermit: String
    goesAlone: Boolean
    notes: String
    contacts: [StudentContact!]
    groups: [Group!]!
  }

  extend type Query {
    getStudents( 
      searchText: String
      orderFilter: OrderFilterStudent
      order: Number
      page: Int
      pageSize: Int
    ): PaginatedStudents!

    getStudent(id: String!): Student!
  }
  
  extend type Mutation {
    createStudent(
      idGroups: [String!]!
      name: String!
      birthDate: String
      course: String!
      registrationDate: String
      allergies: Boolean
      descriptionAllergy: String
      oldStudent: Boolean
      signedMandate: Boolean
      imageAuthorisation: Boolean
      collectionPermit: String
      goesAlone: Boolean
      contacts: [StudentContactInput!]
      notes: String
    ): Student!

    addStudentContact(
      idStudent: String!
      name: String!
      email: String!
      phone: String!
      send_info: Boolean!
    ): StudentContact!
    
    editStudent(
      id:String!
      groups: [String!]
      course: String
      registrationDate: String
      name: String
      birthDate: String
      allergies: Boolean
      descriptionAllergy: String
      oldStudent: Boolean
      signedMandate: Boolean
      imageAuthorisation: Boolean
      collectionPermit: String
      contacts: [StudentContactInput!]
      notes: String): Student!

    editStudentContact(
      idStudent: String!
      originEmail: String!
      name: String
      email: String
      phone: String
      send_info: Boolean
    ): StudentContact!

    deleteStudent(id: String!): Student!
    
    setStatusStudent(id: String!, enrolled: Boolean!): Student!
  }
`;
