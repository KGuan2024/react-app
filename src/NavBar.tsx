import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { ReactComponent as homeIcon } from "./assets/icons/house-solid.svg";
import { ReactComponent as classesIcon } from "./assets/icons/users-line-solid.svg";
import { ReactComponent as monstersIcon } from "./assets/icons/monster-skull.svg";
import { SvgIcon } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useScreenSizeDetector } from "./hooks/useScreensizeDetector.hook";

type SvgIcon = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & {
    title?: string;
  }
>;

function NavBar() {
  const [expanded, setExpanded] = useState<boolean>(true);
  const { isMobile } = useScreenSizeDetector();

  useEffect(() => {
    if (isMobile && expanded) {
      toggleNav();
    }
    if (!isMobile && !expanded) {
      toggleNav();
    }
  }, [isMobile]);

  function toggleNav() {
    setExpanded(!expanded);
  }

  function Navlink(url: string, icon: SvgIcon, label: string) {
    return (
      <Link to={url}>
        <SvgIcon
          component={icon}
          inheritViewBox
          title={expanded ? "" : label}
        />
        {expanded && <span>{label}</span>}
      </Link>
    );
  }

  return (
    <div className={styles.container}>
      <div
        className={`${styles.nav} ${
          isMobile && expanded ? styles.overlay : ""
        }`}
      >
        {Navlink("/", homeIcon, "Home")}
        {Navlink("/classes", classesIcon, "Classes")}
        {Navlink("/monsters", monstersIcon, "Monsters")}
      </div>
    </div>
  );
}

export default NavBar;
