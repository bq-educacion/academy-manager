import { gql } from "graphql-tag";

export const typeDefs = gql`
  enum StudentState {
    ACTIVE
    WITHDRAWN
  }

  type StudentContact {
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
    getStudents: [Student!]

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

  }
`;
