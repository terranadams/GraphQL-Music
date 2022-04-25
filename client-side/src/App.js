import { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useLazyQuery,
  gql,
} from "@apollo/client";
import GetAllArtistsButton from "./components/GetAllArtistsButton";
import GetSpecificArtistButton from "./components/GetSpecificArtistButton";
import GetAllSongsButton from './components/GetAllSongsButton'

function App() {
 

  return (
    <div className="buttonBox">
      <GetAllArtistsButton />
      <GetSpecificArtistButton />
      <GetAllSongsButton />
    </div>
  );
}

export default App;
