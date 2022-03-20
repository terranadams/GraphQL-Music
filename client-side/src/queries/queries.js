import { gql } from "@apollo/client";

const GET_ALL_ARTISTS = gql`
  query {
    artists {
      id
      name
      country
      genre
    }
  }
`;

export { GET_ALL_ARTISTS };
