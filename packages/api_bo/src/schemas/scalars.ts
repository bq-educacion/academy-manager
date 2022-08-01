import { gql } from "graphql-tag";

export const typeDefs = gql`
    scalar ID
    scalar Number

    enum StateStudent{
        ACTIVE
        WITHDRAWN
    }

    enum StateInstructor{
        ACTIVE
        INACTIVE
    }

    enum TypeVehicleInstructor{
        OWN
        PUBLIC_TRANSPORT
    }

    enum TypeGroup{
        INTERNAL
        EXTERNAL
    }

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
`;
