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
    <div className="fixed bottom-6 right-6 z-50 overflow-clip">
      <button
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        className="select-none cursor-pointer"
        onClick={toggleTheme}
      >
        <CircularText
          text={isDarkMode ? "lightmode*lightmode*" : "darkmode*darkmode*"}
          onHover="speedUp"
          spinDuration={20}
          className="w-12 h-12 sm:w-12 sm:h-12"
        />
      </button>
    </div>
  );
}