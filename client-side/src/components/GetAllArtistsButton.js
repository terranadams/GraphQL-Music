import React from 'react'
import {useLazyQuery } from '@apollo/client'
import { GET_ALL_ARTISTS } from '../queries/queries';

const GetQueryButton = () => {

  const [getAllArtists, { loading, data }] = useLazyQuery(GET_ALL_ARTISTS);
  
  if (data) console.log('Get ALL artists: ',data)
  
  const handleGet = () => {
    getAllArtists()
    // ALTERNATE METHOD
    // client
    //   .query({
    //     query: gql`
    //       query {
    //         albums {
    //           name
    //           artist {
    //             name
    //             albums {
    //               name
    //             }
    //           }
    //         }
    //       }
    //     `,
    //   })
    //   .then((result) => console.log(result));
  };
  return (
    <button className="button" onClick={handleGet}>Get All Artists</button>
  )
}

export default GetQueryButton