"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for component to mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder with the same dimensions to avoid layout shift
    return <div className="w-9 h-9 rounded-full bg-secondary/50 animate-pulse border border-border" />;
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center justify-center w-9 h-9 rounded-full bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors overflow-hidden border border-border shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          opacity: isDark ? 1 : 0,
          rotate: isDark ? 0 : -90,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon className="w-4 h-4 text-indigo-400" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 0 : 1,
          opacity: isDark ? 0 : 1,
          rotate: isDark ? 90 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun className="w-4 h-4 text-amber-500" />
      </motion.div>
    </button>
  );
}
