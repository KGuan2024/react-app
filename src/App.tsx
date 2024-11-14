import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Classes from "./Classes";
import Home from "./Home";
import ClassesDetail from "./ClassesDetail";
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
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
