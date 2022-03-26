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

const GET_SPECIFIC_ARTIST = gql`
    query($id: ID) {
        artist(id: $id){
            id
            name
            country
            genre
        }
    }
`

export { GET_ALL_ARTISTS, GET_SPECIFIC_ARTIST };
