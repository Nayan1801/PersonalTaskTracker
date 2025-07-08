import React, { useState, useEffect } from "react";
import gsap from "gsap";

const DarkModeToggle = () => {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      gsap.to("html", { backgroundColor: "#121212", duration: 0.5 });
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      gsap.to("html", { backgroundColor: "#ffffff", duration: 0.5 });
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-3 py-2 rounded-lg text-white bg-gray-700 dark:bg-gray-300 dark:text-black hover:scale-105 transition-transform"
    >
      {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
