"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from 'react'

export default function ThemeButton() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

 useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

   const isDark = theme === "dark";

  return (
    <div className="flex justify-end m-3">
      <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={` relative flex h-8 w-20 items-center rounded-full p-1 transition-all duration-300 
        ${isDark ? "bg-slate-800" : "bg-yellow-300"}`}
      >
        <div
          className={`absolute flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300
            ${isDark ? "translate-x-10" : "translate-x-0"}`}
        >
          {isDark ? (
            <Moon size={18} className="text-slate-700" />
          ) : (
            <Sun size={18} className="text-yellow-500" />
          )}
        </div>
      </button>
    </div>
  );
}