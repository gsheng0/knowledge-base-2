import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Home from "./components/Home.tsx";
import Error from "./components/Error.tsx";
import SignIn from "./components/SignIn.tsx";
import SignUp from "./components/SignUp.jsx";
import Account from "./components/Account.jsx";

import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

import "./index.css";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:3000",
  }),
});

//const analytics = getAnalytics(app);

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/account",
        element: <Account />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
