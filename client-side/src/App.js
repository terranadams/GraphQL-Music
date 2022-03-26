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
import GetSpecificArtistButton from "./components/GetSpecificArtistButton";

function App() {
 

  return (
    <div className="buttonBox">
      <GetQueryButton />
      <GetSpecificArtistButton />
    </div>
  );
}

export default App;
