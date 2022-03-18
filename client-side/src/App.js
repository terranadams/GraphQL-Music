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
    uri: "https://48p1r2roz4.sse.codesandbox.io",
    cache: new InMemoryCache(),
  });

  const handleGet = () => {
    client
      .query({
        query: gql`
          query GetRates {
            rates(currency: "USD") {
              currency
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
