import React from "react";
import "./App.css";
import "./styles/variables.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Classes from "./Classes";
import Home from "./Home";
import ClassesDetail from "./ClassesDetail";
import Monsters from "./Monsters";
import NavBar from "./NavBar";
import styles from "./App.module.css";
import { ThemeProvider } from "@mui/material";
import { MuiTheme } from "./styles/muiTheme";

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
      <ThemeProvider theme={MuiTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
