import React from 'react'
import {useLazyQuery } from '@apollo/client'
import { GET_ALL_SONGS } from '../queries/queries';

const GetQueryButton = () => {

  const [getAllSongs, { loading, data }] = useLazyQuery(GET_ALL_SONGS);
  
  if (data) console.log('Get ALL songs: ',data)
  
  const handleGet = () => {
    getAllSongs()
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
    <button className="button" onClick={handleGet}>Get All Songs</button>
  )
}

export default GetQueryButton