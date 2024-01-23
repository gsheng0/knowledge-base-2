import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Home from "./components/Home.tsx";
import Error from "./components/Error.tsx";
import SignIn from "./components/SignIn.tsx";
import SignUp from "./components/SignUp.jsx";
import Account from "./components/Account.jsx";
import AllUsers from "./components/AllUsers.tsx";
import Article from "./components/Article.tsx";
import AllArticles from "./components/AllArticles.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

import "./index.css";
import { AuthProvider } from "./context/AuthContext.tsx";
import WriteArticle from "./components/WriteArticle.tsx";
import AllMyArticles from "./components/AllMyArticles.tsx";
import { User } from "./components/User.tsx";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000/graphql",
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
      },
      {
        path: "/write",
        element: <WriteArticle/>
      },
      {
        path: "/articles",
        element: <AllArticles/>
      },
      {
        path: "/users",
        element: <AllUsers/>
      },
      {
        path: "/article/:articleId", // Dynamic path with articleId parameter
        element: <Article />,
      },
      {
        path: "/myArticles",
        element: <AllMyArticles/>
      },
      {
        path: "/user/:userId",
        element: <User/>
    }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(

  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>

);
