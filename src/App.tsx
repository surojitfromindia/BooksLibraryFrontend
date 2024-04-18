import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/components/Home.tsx";
import Authors from "@/components/Authors.tsx";
import Books from "@/components/Books.tsx";
import Members from "@/components/Members.tsx";
import AddMember from "@/components/AddMember.tsx";
import KH from "@/components/KH";

function App() {
  /*
    creating a router with the routes
    this function take an array of routes.
    each item of array is object of a path, and the component to render.
    we can have nested routes by adding children to the route object.
   */
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/app",
      element: <KH />,
      children: [
        {
          path: "authors",
          element: <Authors />,
        },
        {
          path: "authors/add",
          element: <Authors />,
        },
        {
          path: "books",
          element: <Books />,
        },
        {
            path: "members/add",
            element: <AddMember />,
        },
        {
            path: "members",
            element: <Members />,
        }

      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
