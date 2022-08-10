import { gql } from "graphql-tag";

export const typeDefs = gql`
  enum GroupType {
    INTERNAL
    EXTERNAL
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
    center
    instructors
    start
    end
  }

  type Timetable {
    day: Days!
    start: String!
    end: String!
  }

  type PaginatedGroups {
    page: Int!
    totalPages: Int!
    totalNumber: Int!
    pageSize: Int!
    data: [Group]
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
      type: GroupType!
      course: String!
      timetable: [TimetableInput!]!
      instructors: [String!]
      notes: String
    ): Group!
  }
`;
