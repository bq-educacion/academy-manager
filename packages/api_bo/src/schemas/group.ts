import { gql } from "graphql-tag";

export const typeDefs = gql`
  enum GroupType {
    INTERNAL
    EXTERNAL
  }

  enum GroupModality {
    PRESENTIAL
    SEMI_PRESENTIAL
    ONLINE
  }

  enum Days {
    MONDAY
    TUESDAY
    WEDNESDAY
    THURSDAY
    FRIDAY
    SATURDAY
    SUNDAY
  }

  enum OrderFilterGroup {
    id_group
    course
    center
    instructors
    id_day
    start
    end
    modality
  }

  type Timetable {
    id_day: Number!
    day: Days!
    start: String!
    end: String!
  }

  type PaginatedGroups {
    page: Int!
    totalPages: Int!
    totalNumber: Int!
    pageSize: Int!
    data: [Group!]!
  }

  input TimetableInput {
    day: Days!
    start: String!
    end: String!
  }

  type Group {
    id: ID!
    id_group: Number!
    name: String!
    modality: GroupModality!
    type: GroupType!
    createdAt: String!
    course: String!
    timetable: [Timetable!]!
    notes: String
    center: Center!
    instructors: [Instructor!]!
    students: [Student!]!
  }

  extend type Query {
    getGroups( 
      searchText: String
      orderFilter: OrderFilterGroup
      order: Number
      page: Int
      pageSize: Int
    ): PaginatedGroups!

    getGroup(id: String!): Group!
  }
  extend type Mutation {
    createGroup(
      idCenter: String!
      name: String!
      modality: GroupModality!
      type: GroupType!
      course: String!
      timetable: [TimetableInput!]!
      instructors: [String!]
      notes: String
    ): Group!

    editGroup(
      id:String!,
      name: String,
      modality: GroupModality,
      type: GroupType, 
      timetable: [TimetableInput!], 
      notes: String, 
      center: String, 
      instructors: [String!]
    ): Group!
  }
`;
