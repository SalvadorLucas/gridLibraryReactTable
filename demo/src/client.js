import { ApolloClient, InMemoryCache } from "@apollo/client";

export const Client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
  }),
  uri: "http://localhost:18080/graphql",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
