import React from "react";

export const useScreenDimensions = (): {
  width: number;
  height: number;
  mobile: boolean;
} => {
  const [windowDimensions, setWindowDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
    mobile: window.innerWidth < 800,
  });

  const handleResize = () => {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
      mobile: window.innerWidth < 800,
    });
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};
