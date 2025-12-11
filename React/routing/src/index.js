import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Home from "./Pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./Pages/About";
import Cart from "./Pages/Cart";
import Search from "./Pages/Search";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import QuizApp from "./QuizApp";
import QuizCatalog from "./Pages/QuizCatalog";
import Quiz from "./Pages/Quiz";
import Results from "./Pages/Results";
import Leaderboard from "./Pages/Leaderboard";
import Admin from "./Pages/Admin";

const routerVariables = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/search",
        element: <Search></Search>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "quiz",
    element: <QuizApp />,
    children: [
      {
        path: "quiz-catalog",
        element: <QuizCatalog />,
      },
      {
        path: "quiz/:id",
        element: <Quiz />,
      },
      {
        path: "results",
        element: <Results />,
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <h1
        style={{
          color: "red",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          height: "100vh",
        }}
      >
        404 - Page Not Found
      </h1>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={routerVariables} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
