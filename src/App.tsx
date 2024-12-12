import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Classes from "./Classes";
import Home from "./Home";
import ClassesDetail from "./ClassesDetail";
import Monsters from "./Monsters";
import NavBar from "./NavBar";
import styles from "./App.module.css";

function AppWrapper() {
  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>D&D Compendium</header>
      <div className={styles.navAndContentContainer}>
        <NavBar></NavBar>
        <div className={styles.contentContainer}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppWrapper />,
      children: [
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
      ],
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
