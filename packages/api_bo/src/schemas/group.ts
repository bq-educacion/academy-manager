import { gql } from "graphql-tag";

export const typeDefs = gql`
    
    enum TypeGroup{
        INTERNAL
        EXTERNAL
    }

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

    extend type Query {
        getGroups:[Group!]!
        
        getGroup(id:String!): Group!
    }

    extend type Mutation {
        deleteGroup(id:String!):String!
        createGroup(idCenter:String!, name: String!, type: TypeGroup!, course: String!, timetable: [String!]!, instructors:[String!], notes: String): Group!
    }

`;
