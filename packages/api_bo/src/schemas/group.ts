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

  type GroupInfo{
    group: Group!
    totalStudents: Number!
  }

  input TimetableInput {
    day: Days!
    start: String!
    end: String!
  }

  input GetGroupsInput {
    searchText: String
    orderFilter: OrderFilterGroup
    order: Number
    page: Int
    pageSize: Int
  }

  input AdvancedGetGroupsInput{
    searchText: advancedSearchTextGroupInput
    orderFilter: OrderFilterGroup
    order: Number
    page: Int
    pageSize: Int
  }
  
   input advancedSearchTextGroupInput{
    id_group:[Number!]
    center:[String!]
    instructors:[String!]
    start:[String!]
    end:[String!]
    day:[Days!]
    course:[String!]
    modality:[GroupModality!]
  }

  input CreateGroupInput {
    name: String!
    modality: GroupModality!
    type: GroupType!
    timetable: [TimetableInput!]!
    instructors: [String!]
    notes: String
  }

  input EditGroupInput {
    name: String,
    modality: GroupModality,
    type: GroupType, 
    timetable: [TimetableInput!], 
    notes: String, 
    center: String, 
    instructors: [String!]
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
      groups: GetGroupsInput!
    ): PaginatedGroups! @auth

    advancedGetGroups (
      groups: AdvancedGetGroupsInput!
    ): PaginatedGroups! @auth

    getGroup(id: String!): GroupInfo! @auth
  }
  extend type Mutation {
    createGroup(
      idCenter: String!
      group: CreateGroupInput!
    ): Group! @auth

    editGroup(
      id:String!,
      group: EditGroupInput!
    ): Group! @auth

    deleteGroup(id: String!): Group! @auth
  }
`;
