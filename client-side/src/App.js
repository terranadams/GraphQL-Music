import { useState } from "react";
import GetAllArtistsButton from "./components/GetAllArtistsButton";
import { GET_ALL_ARTISTS } from "./queries/queries";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useLazyQuery,
  gql,
} from "@apollo/client";
import GetSpecificArtistButton from "./components/GetSpecificArtistButton";

function App() {
 

  return (
    <div className="buttonBox">
      <GetAllArtistsButton />
      <GetSpecificArtistButton />
    </div>
  );
}

export default App;
