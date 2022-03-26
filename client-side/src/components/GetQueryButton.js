import React from 'react'
import {useLazyQuery } from '@apollo/client'
import { GET_ALL_ARTISTS } from '../queries/queries';

const GetQueryButton = () => {

  const [getAllArtists, { loading, data }] = useLazyQuery(GET_ALL_ARTISTS);
  
  if (loading) console.log("Loading...");
  if (data) console.log(data)
  
  const handleGet = () => {
    getAllArtists()
    // if (data) console.log(data)
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
    <button className="button" onClick={handleGet}>Get some artists!</button>
  )
}

export default GetQueryButton