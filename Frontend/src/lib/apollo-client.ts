import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000/graphql", // 👈 change for production
    credentials: "include", // if you use cookies
  }),
  cache: new InMemoryCache(),
});