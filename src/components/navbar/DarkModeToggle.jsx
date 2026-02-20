import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { useTheme } from "../../contects/ThemeProvider";

const DarkModeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="flex items-center justify-center rounded-full border border-brand p-2 transition-all hover:bg-brand/10"
    >
      {isDark ? (
        <BsSunFill className="h-5 w-5 text-brand" />
      ) : (
        <BsMoonFill className="h-5 w-5 text-brand" />
      )}
    </button>
  );
};

export default DarkModeToggle;
