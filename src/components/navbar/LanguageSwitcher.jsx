import { useEffect, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { SUPPORTED_LANGUAGES, useLanguage } from "../../contects/LanguageProvider";

const LanguageSwitcher = ({ mobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, changeLanguage } = useLanguage();
  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === language);
  const dropdownRef = useRef(null);

  // Đóng dropdown khi click ra ngoài (chỉ desktop)
  useEffect(() => {
    if (mobile) return;
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobile]);

  return (
    <div
      className={`relative ${mobile ? "w-full" : ""}`}
      ref={mobile ? null : dropdownRef}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        className={`flex items-center gap-1.5 rounded-full border border-brand px-3 py-1.5 text-sm font-medium text-brand transition-all hover:bg-brand hover:text-white ${
          mobile ? "w-full justify-between text-base" : ""
        }`}
      >
        <span>{currentLang?.flag}</span>
        <span>{currentLang?.label}</span>
        <FaCaretDown
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute z-[9999] mt-2 min-w-[160px] rounded-md border border-gray-100 bg-white py-1 shadow-lg dark:border-iron dark:bg-onyx ${
            mobile ? "left-0" : "right-0"
          }`}
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                changeLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors hover:bg-cream dark:hover:bg-flint ${
                language === lang.code
                  ? "font-semibold text-brand"
                  : "text-gray-700 dark:text-fog"
              }`}
            >
              <span className="text-base">{lang.flag}</span>
              <span>{lang.label}</span>
              {language === lang.code && (
                <span className="ml-auto text-brand">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
