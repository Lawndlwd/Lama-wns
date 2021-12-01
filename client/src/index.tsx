import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./assets/f.scss";
import { getCurrentUser } from "./utils/auth";

const uri =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/graphql"
    : "/graphql";
const httpLink = createHttpLink({ uri });

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getCurrentUser();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token.accessToken}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
reportWebVitals();
