import { useEffect, useState } from "react";

class WindowSize {
  constructor(public height: number, public width: number) {}

  isVertical(): boolean {
    return this.height > this.width;
  }

  isHorizontal(): boolean {
    return !this.isVertical();
  }
}

export default function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return new WindowSize(windowSize.height, windowSize.width);
}

