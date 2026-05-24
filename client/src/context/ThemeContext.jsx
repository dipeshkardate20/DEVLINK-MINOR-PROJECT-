import { createContext, useEffect, useMemo, useState } from "react";

export const ThemeContext = createContext(null);

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("devlink_theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return "dark";
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("devlink_theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === "dark" ? "light" : "dark"));

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme, isDark: theme === "dark" }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
