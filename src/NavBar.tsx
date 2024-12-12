import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <div className={styles.nav}>
      <Link to="/classes">Classes</Link>
      <Link to="/">Characters</Link>
      <Link to="/monsters">Monster compendium</Link>
    </div>
  );
}

export default NavBar;
