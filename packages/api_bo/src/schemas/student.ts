import { gql } from "graphql-tag";

export const typeDefs = gql`

    enum StateStudent{
        ACTIVE
        WITHDRAWN
    }

    type ContactStudent{
        name: String
        surname: String
        email: String
        phone: String
        send_info: Boolean
        notes: String
    }

    type Student{
        id: ID
        name: String
        surname:String
        birthDate: String
        course: String
        state: StateStudent
        registration: String
        alergies: Boolean
        descriptionAllergy: String
        oldStudent: Boolean
        signedMandate: Boolean
        imageAuthorisation: Boolean
        collectionAuthorisation: String
        goesAlone: Boolean
        notes: String
        contact:ContactStudent
        center: Center
    }

`;
