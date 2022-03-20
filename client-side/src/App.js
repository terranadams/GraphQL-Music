import { useState } from "react";
import GetQueryButton from "./components/GetQueryButton";
import { GET_ALL_ARTISTS } from "./queries/queries";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useLazyQuery,
  gql,
} from "@apollo/client";

function App() {
 
  
  const [getAllArtists, { loading, data }] = useLazyQuery(GET_ALL_ARTISTS);

  if (loading) return <p>Loading ...</p>;
  if (data) {
    console.log(data);
  }

  const handleGet = () => {
    getAllArtists()
    console.log(data)
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
    <div className="buttonBox">
      <GetQueryButton onClick={handleGet} />
    </div>
  );
}

export default App;
