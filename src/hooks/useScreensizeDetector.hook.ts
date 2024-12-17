import { useEffect, useState } from "react";

export function useScreenSizeDetector() {
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 600;
  const isTablet = width <= 1024 && width > 600;
  const isDesktop = width > 1024;

  return { isMobile, isTablet, isDesktop };
}
