import { gql } from "graphql-tag";

export const typeDefs = gql`

    type Group{
        id:ID
        id_group: Number
        name: String
        type: TypeGroup
        createdAt: String
        course: String
        timetable: [String!]
        notes: String
        center: Center
        instructors: [Instructor!]
        students: [Student!]
    }

`;
