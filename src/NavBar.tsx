import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { ReactComponent as homeIcon } from "./assets/icons/house-solid.svg";
import { ReactComponent as classesIcon } from "./assets/icons/users-line-solid.svg";
import { ReactComponent as monstersIcon } from "./assets/icons/monster-skull.svg";
import { ReactComponent as expandIcon } from "./assets/icons/circle-chevron-right-solid.svg";
import { ReactComponent as collapseIcon } from "./assets/icons/circle-chevron-left-solid.svg";
import { SvgIcon } from "@mui/material";
import { useEffect, useRef, useState } from "react";

type SvgIcon = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & {
    title?: string;
  }
>;

function NavBar() {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [toggleIcon, setToggleIcon] = useState<SvgIcon>(collapseIcon);

  const MOBILE_WIDTH = 350;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_WIDTH);
  const prevWidth = useRef(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", setMobileState);
    return () => window.removeEventListener("resize", setMobileState);
  }, []);

  useEffect(() => {
    if (isMobile && expanded) {
      toggleNav();
    }
  }, [isMobile]);

  function toggleNav() {
    setToggleIcon(expanded ? expandIcon : collapseIcon);
    setExpanded(!expanded);
  }

  function resetNavState() {
    if (!isMobile || !expanded) {
      return;
    }
    toggleNav();
  }

  const setMobileState = () => {
    const currWidth = window.innerWidth;
    if (currWidth <= MOBILE_WIDTH && prevWidth.current > MOBILE_WIDTH) {
      setIsMobile(true);
    } else if (currWidth > MOBILE_WIDTH && prevWidth.current <= MOBILE_WIDTH) {
      setIsMobile(false);
    }
    prevWidth.current = currWidth;
  };

  function Navlink(url: string, icon: SvgIcon, label: string) {
    return (
      <Link to={url} onClick={() => resetNavState()}>
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
      <SvgIcon
        component={toggleIcon}
        inheritViewBox
        onClick={() => toggleNav()}
      />

      <div className={styles.nav}>
        {Navlink("/", homeIcon, "Home")}
        {Navlink("/classes", classesIcon, "Classes")}
        {Navlink("/monsters", monstersIcon, "Monsters")}
      </div>
    </div>
  );
}

export default NavBar;
