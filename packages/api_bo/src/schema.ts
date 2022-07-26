import { gql } from "https://deno.land/x/graphql_tag@0.0.1/mod.ts";

export const typeDefs = gql`

  scalar ID
  scalar Number

  enum TypeCenter{
    ACADEMY
    NO_ACADEMY
    CAMPUS
  }

  enum TypeGroup{
    INTERNAL
    EXTERNAL
  }

  enum TypeActivities{
    EXTRACURRICULAR
    WORKSHOPS
    OTHERS
  }

  enum ModalityCenter{
    PRESENTIAL
    SEMI_PRESENTIAL
    ONLINE
  }

  enum NatureCenter{
    PRIVATE
    PUBLIC
    CONCERTED
  }

  enum State{
    ACTIVE
    INACTIVE
  }

  enum TypeVehicle{
    OWN
    PUBLIC_TRANSPORT
  }

  type ContactStudent{
    name: String!
    surname: String!
    email: String!
    phone: String!
    send_info: Boolean!
    notes: String
  }

  type ContactCenter{
    name: String!
    surname: String!
    email: String!
    phone: String!
  }

  type Center{
    id: ID!
    name: String!
    address: String!
    population:String!
    phone: String!
    email: String
    type: TypeCenter!
    typeActivities: TypeActivities!
    modality: ModalityCenter!
    nature: NatureCenter!
    course: String!
    languages: [String!]!
    notes: String
    createdAt: String!
    contacts: [ContactCenter]
    groups: [Group]
  }

  type Group{
    id:ID!
    id_group: Number
    name: String!
    type: TypeGroup!
    createdAt: String!
    course: String!
    timetable: [String]
    notes: String
    center: Center!
    instructors: [Instructor]
    students: [Student]
  }

  type Instructor{
    id: ID!
    name: String!
    surname:String!
    corporateEmail: String!
    personalEmail: String!
    phone: String!
    state: State!
    formation: String!
    previousExperience: String!
    programmingExperience: Boolean!
    expertise: String!
    languages: [String!]!
    materialExperience: [String]
    platformEducationExperience: [String]
    summerAvailability: String!
    availability: [String]
    vehicle: Boolean!
    typeVehicle: TypeVehicle!
    geographicalAvailability: [String]
    notes: String
    center: Center!
    groups: [Group]
  }

  type Student{
    id: ID!
    name: String!
    surname:String!
    birthDate: String!
    course: String!
    state: State!
    registration: String!
    alergies: Boolean!
    descriptionAllergy: String
    oldStudent: Boolean!
    signedMandate: Boolean!
    imageAuthorisation: Boolean!
    collectionAuthorisation: String!
    goesAlone: Boolean!
    notes: String
    contact:ContactStudent
    center: Center!
    group: Group

  }
  

  type Query {
    getCenters:[Center!]!
    getCenter(id:String!): Center!
  }

  type Mutation {
    createCenter(name: String!, address: String!, population: String!, phone: String!, email: String!, type: TypeCenter!,
     typeActivities: TypeActivities!, modality: ModalityCenter!, nature: NatureCenter!, course: String!, languages: [String!]!, notes: String): String!
    addContactCenter(idCenter:String!,name:String!,surname:String!, email:String!, phone:String!): String!
  }
`;

