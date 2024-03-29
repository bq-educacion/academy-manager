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

  input GetStudentsInput {
    searchText: String
    orderFilter: OrderFilterStudent
    order: Number
    page: Int
    pageSize: Int
  }

  input CreateStudentInput {
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
  }

  input StudentContactInput {
    name: String!
    email: String!
    phone: String!
    send_info: Boolean!
  }

  input EditStudentInput {
    name: String
    birthDate: String
    course: String
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
  }

  input EditStudentContactInput {
    name: String
    email: String
    phone: String
    send_info: Boolean
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
      students: GetStudentsInput!
    ): PaginatedStudents! @auth

    getStudent(id: String!): Student! @auth
  }
  
  extend type Mutation {
    createStudent(
      idGroups: [String!]!
      student: CreateStudentInput!
    ): Student! @auth

    addStudentContact(
      idStudent: String!
      contact: StudentContactInput!
    ): StudentContact! @auth
    
    editStudent(
      id:String!
      student: EditStudentInput!
      idGroups: [String!]
    ): Student! @auth

    editStudentContact(
      idStudent: String!
      originEmail: String!
      contact: EditStudentContactInput!
    ): StudentContact! @auth

    deleteStudent(id: String!): Student! @auth
    
    setStatusStudent(id: String!, enrolled: Boolean!): Student! @auth
  }
`;
