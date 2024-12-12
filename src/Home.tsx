import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.home}>
      {/* <header>D&D Compendium</header> */}

      <div className={styles.homePageContent}>
        {/* <div className={styles.nav}>
          <Link to="/classes">Classes</Link>
          <Link to="/">Characters</Link>
          <Link to="/monsters">Monster compendium</Link>
        </div> */}
      </div>
    </div>
  );
}

export default Home;
