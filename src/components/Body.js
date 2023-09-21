import React from "react";
import Login from "./Login";
import Browse from "./Browse";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MovieInfo from "./MovieInfo";

import MainContent from "./MainContent";

const Body = () => {
  const appRoute = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
      children: [
        {
          path: "/browse",
          element: <MainContent />,
        },
        {
          path: "info/:id",
          element: <MovieInfo />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRoute} />
    </div>
  );
};

export default Body;
