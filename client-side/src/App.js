import { useState } from "react";
import GetQueryButton from "./components/GetQueryButton";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });

  const handleGet = () => {
    client
      .query({
        query: gql`
          query {
            albums {
              name
              artist {
                name
                albums {
                  name
                }
              }
            }
          }
        `,
      })
      .then((result) => console.log(result));
  };

  return (
    <div className="buttonBox">
      <GetQueryButton onClick={handleGet} />
    </div>
  );
}

export default App;
