import { gql } from "@apollo/client";

export const GET_CENTER = gql`
  query {
    getCenter(id: "62f0fb2eabfcd6a5f276c3fd") {
      name
    }
  }
`;
