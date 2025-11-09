"use client";
import { useTheme } from "next-themes";
import { Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const current = isDark ? "dark" : "light"; // default to light when undefined

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(current === "dark" ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {/* Render hydration-stable contents independent of theme */}
      <Sun size={16} />
      <span className="hidden sm:inline">Theme</span>
    </button>
  );
}
