import { gql } from "graphql-tag";

export const typeDefs = gql`
  enum StudentState {
    ACTIVE
    WITHDRAWN
  }

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
    notes: String
  }

  input StudentContactInput {
    name: String!
    email: String!
    phone: String!
    send_info: Boolean!
    notes: String
  }

  type Student {
    id: ID!
    name: String!
    birthDate: String!
    course: String!
    state: StudentState!
    registrationDate: String!
    alergies: Boolean!
    descriptionAllergy: String
    oldStudent: Boolean!
    signedMandate: Boolean!
    imageAuthorisation: Boolean!
    collectionPermit: String!
    goesAlone: Boolean!
    notes: String
    contacts: [StudentContact!]!
    center: Center!
    group: Group!
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
      idCenter: String!
      idGroup: String!
      name: String!
      birthDate: String!
      course: String!
      alergies: Boolean!
      descriptionAllergy: String
      oldStudent: Boolean!
      signedMandate: Boolean!
      imageAuthorisation: Boolean!
      collectionPermit: String!
      goesAlone: Boolean!
      contacts: [StudentContactInput!]!
      notes: String
    ): Student!

    addStudentContact(
      idStudent: String!
      name: String!
      email: String!
      phone: String!
      send_info: Boolean!
      notes: String
    ): StudentContact!
    
    editStudent(
      id:String!,
      group: String,
      course: String,
      registrationDate: String,
      name: String,
      birthDate: String,
      alergies: Boolean,
      descriptionAllergy: String,
      oldStudent: Boolean,
      signedMandate: Boolean,
      imageAuthorisation: Boolean,
      collectionPermit: String,
      notes: String): Student!

    editStudentContacts(
      idStudent: String!
      originEmail: String!
      name: String
      email: String
      phone: String
      send_info: Boolean
      notes: String
    ): StudentContact!
  }
`;
