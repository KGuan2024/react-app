import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.home}>
      <h2>Welcome</h2>

      <div>
        <p>
          In a normal app this would have your usual dashboardy things but this
          isn't applicable here. This app is just for demonstrating react and
          css skills, using common things you see in most apps like grids and
          custom UI controls :) Data is kept relatively simple here so the code
          structure is easy to follow, but all components have reusability and
          scaling in mind.
        </p>
        <p>
          Go to the Classes page to see a grid of some common DND classes, and
          click on any of the class names to see more detailed information for
          that class.
        </p>
        <p>
          In monster compendium you can see some common DND monsters and filter
          the monsters shown by category and size.
        </p>
      </div>
    </div>
  );
}

export default Home;
