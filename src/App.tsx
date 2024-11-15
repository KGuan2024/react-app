import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Classes from "./Classes";
import Home from "./Home";
import ClassesDetail from "./ClassesDetail";
import Monsters from "./Monsters";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "classes",
      element: <Classes />,
    },
    {
      path: "classes-detail/:classId",
      element: <ClassesDetail />,
    },
    {
      path: "monsters",
      element: <Monsters />,
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
