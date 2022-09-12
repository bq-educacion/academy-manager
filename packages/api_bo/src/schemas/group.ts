import { gql } from "graphql-tag";

export const typeDefs = gql`
  enum GroupType {
    INTERNAL
    EXTERNAL
  }

  enum CourseType{
    EPO
    ESO
  }

  enum GroupModality {
    ON_SITE
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
    center
    course
    instructors
    id_day
    start
    end
    modality
  }

  type Course{
    EPO:[String!]!
    ESO:[String!]!
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

  type GroupInfo{
    group: Group!
    totalStudents: Number!
  }

  type Group {
    id: ID!
    id_group: Number!
    name: String!
    active:Boolean!
    course: Course!
    modality: GroupModality!
    type: GroupType!
    createdAt: String!
    timetable: [Timetable!]!
    notes: String
    center: Center
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

    getGroup(id: String!): GroupInfo!
  }
  extend type Mutation {
    createGroup(
      idCenter: String!
      name: String!
      modality: GroupModality!
      type: GroupType!
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

    deleteGroup(id: String!): Group!
  }
`;
