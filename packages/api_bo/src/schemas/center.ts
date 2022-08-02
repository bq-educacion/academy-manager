import { gql } from "graphql-tag";

export const typeDefs = gql`

    enum TypeCenter{
        ACADEMY
        NO_ACADEMY
        CAMPUS
    }

    enum TypeActivitiesCenter{
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

    type ContactCenter{
        name: String
        surname: String
        email: String
        phone: String
    }

    type Center{
        id: ID
        name: String
        address: String
        population:String
        phone: String
        email: String
        type: TypeCenter
        typeActivities: TypeActivitiesCenter
        modality: ModalityCenter
        nature: NatureCenter
        course: String
        languages: [String!]
        notes: String
        createdAt: String
        contacts: [ContactCenter!]
        groups: [Group!]
    }

    type Query {
        getCenters:[Center!]
        
        getCenter(id:String!): Center!
    }

    type Mutation {
        createCenter(name: String!, address: String!, population: String!, phone: String!, email: String, type: TypeCenter!,
            typeActivities: TypeActivitiesCenter!, modality: ModalityCenter!, nature: NatureCenter!, course: String!, languages: [String!]!, notes: String): Center!
        
        addContactCenter(idCenter:String!,name:String!,surname:String!, email:String!, phone:String!): ContactCenter!

        editCenter(id:String!, name: String, address: String, population: String, phone: String, email: String, type: TypeCenter,
            typeActivities: TypeActivitiesCenter, modality: ModalityCenter, nature: NatureCenter, course: String, languages: [String!], notes: String): Center!

        editContactsCenter(idCenter:String!, originEmail: String!, name:String, surname:String, phone:String, email:String): ContactCenter!
    }
`;
