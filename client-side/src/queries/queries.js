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
    query($id: Int) {
        artist(id: $id){
            id
            name
            country
            genre
        }
    }
`;

const GET_ALL_SONGS = gql`
  query {
    songs {
      id
      name
      creatorId
      albumId
    }
  }
`;

const GET_SPECIFIC_SONG = gql`
    query($id: Int) {
        song(id: $id){
            id
            name
            creatorId
            albumId
        }
    }
`;

const GET_ALL_ALBUMS = gql`
  query {
    albums {
      id
      name
      creatorId
    }
  }
`;

const GET_SPECIFIC_ALBUM = gql`
    query($id: Int) {
        album(id: $id){
            id
            name
            creatorId
        }
    }
`;
export { GET_ALL_ARTISTS, GET_SPECIFIC_ARTIST, GET_ALL_SONGS, GET_SPECIFIC_SONG, GET_ALL_ALBUMS, GET_SPECIFIC_ALBUM };
