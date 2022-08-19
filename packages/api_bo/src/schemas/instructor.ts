import { gql } from "graphql-tag";
export const typeDefs = gql`
  enum StateInstructor {
    ACTIVE
    INACTIVE
  }

  enum TypeVehicleInstructor {
    OWN
    PUBLIC_TRANSPORT
  }

  enum summerAvailabilityInstructor {
    YES
    NO
    EXTRACURRICULARS_ONLY
  }

  enum trainingInstructor {
    CAREER_IN_EDUCATION
    TECHNICAL_CAREER
  }

  enum previousExperienceInstructor {
    YES
    NO
    NO_BUT_INTERESTED
  }

  type Availability {
    id_day: Number!
    day: Days!
    hours: [String!]!
  }

  input AvailabilityInput {
    day: Days!
    hours: [String!]!
  }

  type Instructor {
    id: ID!
    name: String!
    corporateEmail: String!
    personalEmail: String!
    phone: String!
    state: StateInstructor!
    training: trainingInstructor!
    previousExperience: previousExperienceInstructor!
    programmingExperience: Boolean!
    knowledge: String!
    urlCV: String!
    materialsExperience: [String!]!
    platformEducationExperience: [String!]!
    languages: [String!]!
    availability: [Availability!]!
    summerAvailability: summerAvailabilityInstructor!
    vehicle: TypeVehicleInstructor!
    geographicalAvailability: String!
    areas: [String!]!
    notes: String
    center: Center!
    groups: [Group!]!
  }

  extend type Query {
    getInstructors: [Instructor!]!

    getInstructor(id: String!): Instructor!
  }

  extend type Mutation {
    createInstructor(
      name: String!
      corporateEmail: String!
      personalEmail: String!
      phone: String!
      state: StateInstructor!
      training: trainingInstructor!
      previousExperience: previousExperienceInstructor!
      programmingExperience: Boolean!
      knowledge: String!
      urlCV: String!
      materialsExperience: [String!]!
      platformEducationExperience: [String!]!
      languages: [String!]!
      availability: [AvailabilityInput!]!
      summerAvailability: summerAvailabilityInstructor!
      vehicle: TypeVehicleInstructor!
      geographicalAvailability: String!
      areas: [String!]!
      notes: String
      center: String!
      groups: [String!]!
    ): Instructor!
  }

`;
