"use client";
import { useTheme } from "next-themes";
import React from "react";
import Image from "next/image";

export default function ToggleButton() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <button className="flex items-center" onClick={toggleTheme}>
      {theme === "light" ? (
        <>
          <Image
            className="mx-sm"
            width={20}
            height={20}
            src="/icon-sun.svg"
            alt="Light Mode"
          />
          <p>Light Mode</p>
        </>
      ) : (
        <>
          <Image
            className="mx-sm"
            width={20}
            height={20}
            src="/icon-moon.svg"
            alt="Dark Mode"
          />
          <p>Dark Mode</p>
        </>
      )}
    </button>
  );
}
