import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ThemeContext, type Theme } from "./themeContext";

const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const shouldPersistTheme = useRef(true);
  const isDark = theme === "dark";

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;

    if (shouldPersistTheme.current) {
      localStorage.setItem("theme", theme);
      return;
    }

    localStorage.removeItem("theme");
    shouldPersistTheme.current = true;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    shouldPersistTheme.current = true;
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }, []);

  const clearThemePreference = useCallback(() => {
    shouldPersistTheme.current = false;
    localStorage.removeItem("theme");
    setTheme("light");
  }, []);

  const value = useMemo(
    () => ({
      theme,
      isDark,
      toggleTheme,
      clearThemePreference,
    }),
    [clearThemePreference, isDark, theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
