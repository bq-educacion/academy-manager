import { gql } from "graphql-tag";

export const typeDefs = gql`
    
    enum TypeGroup{
        INTERNAL
        EXTERNAL
    }

    enum Days{
        MONDAY 
        TUESDAY
        WEDNESDAY
        THURSDAY
        FRIDAY
        SATURDAY
        SUNDAY
    }

    type Timetable{
        day: Days
        start: String
        end: String
    }

    input TimetableInput{
        day: Days
        start: String
        end: String
    }

    type Group{
        id:ID
        id_group: Number
        name: String
        type: TypeGroup
        createdAt: String
        course: String
        timetable: [Timetable!]
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
        createGroup(idCenter:String!, name: String!, type: TypeGroup!, course: String!, timetable: [TimetableInput!]!, instructors:[String!], notes: String): Group!
    }

`;
