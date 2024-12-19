import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { ReactComponent as homeIcon } from "./assets/icons/house-solid.svg";
import { ReactComponent as classesIcon } from "./assets/icons/users-line-solid.svg";
import { ReactComponent as monstersIcon } from "./assets/icons/monster-skull.svg";
import { SvgIcon } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useScreenSizeDetector } from "./hooks/useScreensizeDetector.hook";

type SvgIcon = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & {
    title?: string;
  }
>;

function NavBar() {
  const [expanded, setExpanded] = useState<boolean>(true);
  const { isMobile } = useScreenSizeDetector();
  const toggleNav = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  useEffect(() => {
    if ((isMobile && expanded) || (!isMobile && !expanded)) {
      toggleNav();
    }
  }, [isMobile, toggleNav, expanded]);


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
    <div className={styles.nav}>
      {Navlink("/", homeIcon, "Home")}
      {Navlink("/classes", classesIcon, "Classes")}
      {Navlink("/monsters", monstersIcon, "Monsters")}
    </div>
  );
}

export default NavBar;
