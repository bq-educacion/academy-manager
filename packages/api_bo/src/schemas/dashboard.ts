import { gql } from "graphql-tag";

export const typeDefs = gql`

    type Dashboard{
        userName:String!
        activeCenters: Number!
        groups: Number!
        activeInstructors: Number!
        activeStudents: Number!
    }

    extend type Query {
        dashboard: Dashboard! @auth
    }
`;
