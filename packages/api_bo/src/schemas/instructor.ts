import { gql } from "graphql-tag";
export const typeDefs = gql`

  enum TypeVehicleInstructor {
    OWN
    PUBLIC_TRANSPORT
  }

  enum summerAvailabilityInstructor {
    YES
    NO
    EXTRACURRICULARS_ONLY
  }

  enum previousExperienceInstructor {
    YES
    NO
    NO_BUT_INTERESTED
  }

  enum OrderFilterInstructor {
    name
    center
    areas
    id_day
    state
    id_group
    vehicle
    languages
    summerAvailability
  }

  type trainingInstructor {
    careerInEducation: Boolean
    technicalCareer: Boolean
  }

  input trainingInstructorInput {
    careerInEducation: Boolean
    technicalCareer: Boolean
  }

  type Availability {
    id_day: Number!
    day: Days!
    hours: [String!]!
  }

  type PaginatedInstructors {
    page: Int!
    totalPages: Int!
    totalNumber: Int!
    pageSize: Int!
    data: [Instructor!]!
  }

  input AvailabilityInput {
    day: Days!
    hours: [String!]!
  }

  input GetInstructorsInput {
    searchText: String
    orderFilter: OrderFilterInstructor
    order: Number
    page: Int
    pageSize: Int
  }

  input CreateInstructorInput {
    name: String!
    corporateEmail: String
    personalEmail: String
    phone: String
    enrolled: Boolean!
    training: trainingInstructorInput!
    previousExperience: previousExperienceInstructor!
    programmingExperience: Boolean!
    knowledge: String
    urlCV: String
    materialsExperience: [String!]
    platformEducationExperience: [String!]
    languages: [Languages!]
    availability: [AvailabilityInput!]!
    summerAvailability: summerAvailabilityInstructor
    vehicle: TypeVehicleInstructor!
    geographicalAvailability: [Region!]!
    areas: [String!]!
    notes: String
  }

  input EditInstructorInput {
    name:String
    personalEmail: String
    corporateEmail:String
    phone:String
    notes:String
    training:trainingInstructorInput
    previousExperience:previousExperienceInstructor
    programmingExperience:Boolean
    knowledge:String
    urlCV:String
    materialsExperience: [String!]
    platformEducationExperience: [String!]
    languages: [Languages!]
    vehicle:TypeVehicleInstructor
    geographicalAvailability:[Region!]
    areas: [String!]
    availability: [AvailabilityInput!]
    summerAvailability: summerAvailabilityInstructor
  }

  type Instructor {
    id: ID!
    name: String!
    corporateEmail: String
    personalEmail: String
    phone: String
    enrolled: Boolean!
    active: Boolean!
    training: trainingInstructor!
    previousExperience: previousExperienceInstructor!
    programmingExperience: Boolean!
    knowledge: String
    urlCV: String
    materialsExperience: [String!]
    platformEducationExperience: [String!]
    languages: [Languages!]
    availability: [Availability!]!
    summerAvailability: summerAvailabilityInstructor
    vehicle: TypeVehicleInstructor!
    geographicalAvailability: [Region!]!
    areas: [String!]!
    notes: String
    groups: [Group!]!
  }

  extend type Query {
    checkCorporateEmail(email: String!): String! @auth

    getInstructors(
      instructors: GetInstructorsInput!
    ): PaginatedInstructors! @auth

    getInstructor(id: String!): Instructor! @auth
  }

  extend type Mutation {
    createInstructor(
      idGroups: [String!]!
      instructor: CreateInstructorInput!
    ): Instructor! @auth

    editInstructor(
      id:String!
      instructor: EditInstructorInput!
      idGroups: [String!]
    ): Instructor! @auth

    deleteInstructor(id: String!): Instructor! @auth

    setStatusInstructor(id: String!, enrolled: Boolean!): Instructor! @auth
  }

`;
