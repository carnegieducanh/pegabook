import { createContext, useContext, useEffect, useState } from "react";

// -------------------------------------------------------
// ThemeContext: quản lý dark/light mode cho toàn bộ ứng dụng.
// Lưu lựa chọn vào localStorage, fallback về system preference.
// -------------------------------------------------------

export const ThemeContext = createContext();

const getInitialTheme = () => {
  const saved = localStorage.getItem("pegabook_theme");
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    // Toggle class "dark" trên <html> element — Tailwind darkMode: 'class' dựa vào đây
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("pegabook_theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const isDark = theme === "dark";

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook tiện lợi: dùng useTheme() thay vì useContext(ThemeContext)
export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
