import { gql } from "graphql-tag";

export const typeDefs = gql`
    type Instructor{
        id: ID
        name: String
        surname:String
        corporateEmail: String
        personalEmail: String
        phone: String
        state: StateInstructor
        formation: String
        previousExperience: String
        programmingExperience: Boolean
        expertise: String
        languages: [String!]
        materialExperience: [String!]
        platformEducationExperience: [String!]
        summerAvailability: String
        availability: [String!]
        vehicle: Boolean
        typeVehicle: TypeVehicleInstructor
        geographicalAvailability: [String!]
        notes: String
        center: Center
    }

`;
