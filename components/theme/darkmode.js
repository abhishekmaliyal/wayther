"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import CircularText from "../ui/CircularText";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDarkMode =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : theme === "dark";

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <div className="right flex items-end right w-[10%] absolute bottom-4 right-4">
      <div className="darkmode h-[20%] w-full flex items-center justify-center">
        <button
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          className="darkmode select-none transform rotate-90 cursor-crosshair text-sm font-medium transition-colors hover:text-primary/80"
          onClick={toggleTheme}
        >
          {/* {isDarkMode ? "light mode." : "dark mode."} */}
          <CircularText
          text={isDarkMode ? "lightmode*lightmode*" : "darkmode*darkmode*"}
          onHover="speedUp"
          spinDuration={20}
          className="custom-class"
        />
        </button>
      </div>
    </div>
  );
}
