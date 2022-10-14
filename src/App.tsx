import "./styles.css";
import { useState, useEffect, useCallback, useMemo } from "react";

export const useWindowSize = (): { width: number; height: number } => {
  const isClient = useMemo(() => typeof window === "object", []);

  const getSize = useCallback(() => {
    return {
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight : 0
    };
  }, [isClient]);

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getSize, isClient]); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
};

export default function App() {
  const { width, height } = useWindowSize();
  console.log(width, height);

  return (
    <div className="App">
      <h1>window width: {width}</h1>
      <h2>window height: {height}</h2>
    </div>
  );
}

// Hook
