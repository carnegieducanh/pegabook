import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";

// react icons
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { AuthContext } from "../contects/AuthProvider";
import { FaUser } from "react-icons/fa6";

import userImg from "../assets/awardbooks.png";
import { IoIosArrowForward } from "react-icons/io";

// Language context
import { useLanguage, SUPPORTED_LANGUAGES } from "../contects/LanguageProvider";

// Theme context
import { useTheme } from "../contects/ThemeProvider";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Trạng thái hiển thị dropdown cộng đồng và join
  const [isDropdownLinksOpen, setIsDropdownLinksOpen] = useState(false);
  const [isNavSignInOpen, setIsNavSignInOpen] = useState(false);

  // Trạng thái dropdown chọn ngôn ngữ (desktop và mobile riêng biệt)
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);

  // Ref để đóng dropdown ngôn ngữ khi click ra ngoài
  const langDropdownRef = useRef(null);

  // Lấy hàm dịch và hàm đổi ngôn ngữ từ context
  const { language, changeLanguage, t } = useLanguage();

  // Lấy trạng thái và hàm toggle dark mode
  const { isDark, toggleTheme } = useTheme();

  // Toggle DropdownLinks
  const toggleDropdownLinks = () => {
    setIsDropdownLinksOpen(!isDropdownLinksOpen);
  };

  // Toggle navSignIn
  const toggleNavSignIn = () => {
    setIsNavSignInOpen(!isNavSignInOpen);
  };

  // Khai báo user và kiểm tra xem người dùng đã đăng nhập hay không
  const { user } = useContext(AuthContext);
  const isUserLoggedIn = !user;

  // toggle menu mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeDropdowns = () => {
    setIsMenuOpen(false);
    setIsDropdownLinksOpen(false);
    setIsNavSignInOpen(false);
    setIsLangOpen(false);
    setIsMobileLangOpen(false);
  };

  // Đóng dropdown ngôn ngữ khi click ra ngoài vùng dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(e.target)
      ) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tìm thông tin ngôn ngữ hiện tại (flag + label) để hiển thị trên nút
  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === language);

  // navItems — dùng t() để lấy bản dịch theo ngôn ngữ hiện tại
  const navItems = [
    { link: t("nav.home"), path: "/" },
    { link: t("nav.library"), path: "/all-books" },
  ];

  const navSignIn = [
    { link: t("nav.member"), path: "/login-member" },
    { link: t("nav.admin"), path: "/admin/dashboard" },
  ];

  const DropdownLinks = [
    { link: t("nav.members"), path: "/Members" },
    { link: t("nav.sharers"), path: "/Sharers" },
    { link: t("nav.gratitude"), path: "/gratitude" },
  ];

  const navUser = [
    { link: user ? user.email : "", path: "/admin/dashboard" },
    { link: t("nav.dashboard"), path: "/admin/dashboard" },
    { link: t("nav.logout"), path: "logout" },
  ];

  // ---- Component con: nút toggle dark/light mode ----
  const DarkModeToggle = () => (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="flex items-center justify-center rounded-full border border-[#a69060] p-2 transition-all hover:bg-[#a69060]/10"
    >
      {isDark ? (
        <BsSunFill className="h-5 w-5 text-[#a69060]" />
      ) : (
        <BsMoonFill className="h-5 w-5 text-[#a69060]" />
      )}
    </button>
  );

  // ---- Component con: nút chọn ngôn ngữ (dùng lại ở desktop và mobile) ----
  const LanguageSwitcher = ({ mobile = false }) => {
    const isOpen = mobile ? isMobileLangOpen : isLangOpen;
    const toggle = () =>
      mobile
        ? setIsMobileLangOpen(!isMobileLangOpen)
        : setIsLangOpen(!isLangOpen);

    return (
      <div
        className={`relative ${mobile ? "w-full" : ""}`}
        ref={mobile ? null : langDropdownRef}
      >
        {/* Nút hiển thị ngôn ngữ hiện tại */}
        <button
          onClick={toggle}
          className={`flex items-center gap-1.5 rounded-full border border-[#a69060] px-3 py-1.5 text-sm font-medium text-[#a69060] transition-all hover:bg-[#a69060] hover:text-white ${
            mobile ? "w-full justify-between text-base" : ""
          }`}
          aria-label="Select language"
        >
          <span>{currentLang?.flag}</span>
          <span>{currentLang?.label}</span>
          <FaCaretDown
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown danh sách ngôn ngữ */}
        {isOpen && (
          <div
            className={`absolute z-[9999] mt-2 min-w-[160px] rounded-md border border-gray-100 bg-white py-1 shadow-lg dark:border-[#3c4043] dark:bg-[#292a2d] ${
              mobile ? "left-0" : "right-0"
            }`}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  changeLanguage(lang.code);
                  toggle();
                }}
                className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors hover:bg-[#f4f1ea] dark:hover:bg-[#35363a] ${
                  language === lang.code
                    ? "font-semibold text-[#a69060]"
                    : "text-gray-700 dark:text-[#e8eaed]"
                }`}
              >
                <span className="text-base">{lang.flag}</span>
                <span>{lang.label}</span>
                {/* Dấu check cho ngôn ngữ đang chọn */}
                {language === lang.code && (
                  <span className="ml-auto text-[#a69060]">✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 w-full bg-transparent transition-all duration-300 ease-in dark:bg-[#202124]">
      <nav
        className={`py-4 pl-4 pr-4 transition-all duration-300 ease-in-out md:px-4 lg:px-24 ${
          isSticky
            ? "sticky left-0 right-0 top-0 bg-[#F4F1EA]/90 shadow-md backdrop-blur-md dark:bg-[#383323]"
            : ""
        }`}
      >
        <div className="flex items-center justify-between text-base">
          {/* logo */}
          <Link to="/">
            <h2 className="text-4xl font-medium text-[#a69060]">PEGABOOK</h2>
            <p className="pt-2 text-[#5a5a5a] dark:text-[#9aa0a6]">
              {t("nav.tagline")}
            </p>
          </Link>

          {/* nav items cho màn hình lớn */}
          <ul className="hidden space-x-12 md:flex">
            {navItems.map(({ link, path }) => (
              <Link
                key={path}
                to={path}
                className="block cursor-pointer text-lg text-black hover:text-[#a69060] dark:text-[#e8eaed] dark:hover:text-[#a69060]"
              >
                {link}
              </Link>
            ))}

            {/* Dropdown Cộng đồng */}
            <div className="group relative cursor-pointer">
              <div className="flex cursor-pointer items-center justify-between gap-2 text-lg text-black hover:text-[#a69060] dark:text-[#e8eaed] dark:hover:text-[#a69060]">
                {t("nav.community")}{" "}
                <span>
                  <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                </span>
              </div>
              <div className="shadow-mdv absolute z-[9999] hidden w-[160px] rounded-md bg-white p-2 text-black group-hover:block dark:bg-[#292a2d]">
                <ul className="space-y-3">
                  {DropdownLinks.map(({ link, path }) => (
                    <Link
                      key={path}
                      to={path}
                      className="block cursor-pointer text-lg text-black hover:text-[#a69060] hover:underline dark:text-[#e8eaed] dark:hover:text-[#a69060]"
                    >
                      {link}
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </ul>

          {/* Phần bên phải: nút ngôn ngữ + Join/User avatar */}
          <div className="hidden items-center gap-3 md:flex">
            {/* ===== NÚT TOGGLE DARK MODE (Desktop) ===== */}
            <DarkModeToggle />
            {/* ===== NÚT CHUYỂN NGÔN NGỮ (Desktop) ===== */}
            <LanguageSwitcher />

            {/* Nút Join (khi chưa đăng nhập) */}
            {isUserLoggedIn && (
              <div className="group relative cursor-pointer">
                <div className="flex cursor-pointer items-center justify-between gap-2 text-lg text-black hover:text-[#a69060] dark:text-[#e8eaed] dark:hover:text-[#a69060]">
                  <FaUser />
                  {t("nav.join")}{" "}
                  <span>
                    <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                  </span>
                </div>
                <div className="shadow-mdv absolute -right-4 z-[9999] hidden w-[160px] rounded-md bg-white p-2 text-black group-hover:block dark:bg-[#292a2d] lg:left-0">
                  <ul className="space-y-3">
                    {navSignIn.map(({ link, path }) => (
                      <Link
                        key={path}
                        to={path}
                        className="block cursor-pointer text-lg text-black hover:text-[#a69060] hover:underline dark:text-[#e8eaed] dark:hover:text-[#a69060]"
                      >
                        {link}
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Avatar user (khi đã đăng nhập) */}
            {!isUserLoggedIn && (
              <div className="group relative cursor-pointer">
                <div className="flex cursor-pointer items-center justify-between gap-2 text-lg text-black hover:text-[#a69060] dark:text-[#e8eaed] dark:hover:text-[#a69060]">
                  <img src={userImg} alt="" className="h-10 w-10" />
                  <span>
                    <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                  </span>
                </div>
                <div className="shadow-mdv absolute right-0 z-[9999] hidden rounded-md bg-white p-2 text-black group-hover:block dark:bg-[#292a2d]">
                  <ul className="space-y-3">
                    {navUser.map(({ link, path }) => (
                      <Link
                        key={path}
                        to={path}
                        className="block cursor-pointer text-lg text-black hover:text-[#a69060] hover:underline dark:text-[#e8eaed] dark:hover:text-[#a69060]"
                      >
                        {link}
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* ===== NÚT HAMBURGER - MOBILE ===== */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="rounded-full border bg-[#a69060] p-3 focus:outline-none"
            >
              {isMenuOpen ? (
                <FaXmark className="h-5 w-5 text-white" />
              ) : (
                <FaBarsStaggered className="h-5 w-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* ===== Menu mobile ===== */}
        <div
          className={`mt-[95px] space-y-4 bg-[#f4f1ea] px-4 py-7 dark:bg-[#202124] ${
            isMenuOpen ? "fixed left-0 right-0 top-0 block" : "hidden"
          }`}
        >
          {navItems.map(({ link, path }) => (
            <Link
              key={path}
              to={path}
              className="cursor-point text-lg text-black dark:text-[#e8eaed]"
              onClick={closeDropdowns}
            >
              <div className="mb-4 flex items-center justify-between">
                {link}
                <IoIosArrowForward className="text-[#a69060]" />
              </div>
            </Link>
          ))}

          {/* Dropdown Cộng đồng (mobile) */}
          <div className="">
            <div className="relative mb-4 cursor-pointer">
              <div
                className="flex items-center justify-between gap-2 text-lg text-black hover:text-[#a69060] dark:text-[#e8eaed] dark:hover:text-[#a69060]"
                onClick={toggleDropdownLinks}
              >
                {t("nav.community")}{" "}
                <FaCaretDown
                  className={`transition-all duration-200 ${
                    isDropdownLinksOpen ? "rotate-180" : ""
                  } text-[#a69060]`}
                />
              </div>
              {isDropdownLinksOpen && (
                <div className="mt-2 p-2 text-black">
                  <ul className="space-y-3">
                    {DropdownLinks.map(({ link, path }) => (
                      <Link
                        key={path}
                        to={path}
                        className="block cursor-pointer text-lg text-black hover:text-[#a69060] hover:underline dark:text-[#e8eaed] dark:hover:text-[#a69060]"
                        onClick={closeDropdowns}
                      >
                        <div className="flex items-center gap-2">
                          <IoIosArrowForward className="text-[#a69060]" />
                          {link}
                        </div>
                      </Link>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Dropdown Join (mobile) */}
            <div className="relative cursor-pointer">
              <div
                className="flex items-center justify-between gap-2 text-lg text-black hover:text-[#a69060] dark:text-[#e8eaed] dark:hover:text-[#a69060]"
                onClick={toggleNavSignIn}
              >
                <div className="flex items-center gap-2">
                  <FaUser />
                  {t("nav.join")}{" "}
                </div>
                <FaCaretDown
                  className={`transition-all duration-200 ${
                    isNavSignInOpen ? "rotate-180" : ""
                  } text-[#a69060]`}
                />
              </div>
              {isNavSignInOpen && (
                <div className="mt-2 p-2 text-black">
                  <ul className="space-y-3">
                    {navSignIn.map(({ link, path }) => (
                      <Link
                        key={path}
                        to={path}
                        className="block cursor-pointer text-lg text-black hover:text-[#a69060] hover:underline dark:text-[#e8eaed] dark:hover:text-[#a69060]"
                        onClick={closeDropdowns}
                      >
                        <div className="flex items-center gap-2">
                          <IoIosArrowForward className="text-[#a69060]" />
                          {link}
                        </div>
                      </Link>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* ===== NÚT CHUYỂN NGÔN NGỮ (Mobile) ===== */}
            <div className="mt-4 border-t border-gray-200 pt-4">
              <div
                className="flex cursor-pointer items-center justify-between gap-2 text-lg text-black hover:text-[#a69060] dark:text-[#e8eaed] dark:hover:text-[#a69060]"
                onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
              >
                <div className="flex items-center gap-2">
                  <span>{currentLang?.flag}</span>
                  <span>{currentLang?.label}</span>
                </div>
                <FaCaretDown
                  className={`transition-all duration-200 ${
                    isMobileLangOpen ? "rotate-180" : ""
                  } text-[#a69060]`}
                />
              </div>
              {isMobileLangOpen && (
                <div className="mt-2 p-2">
                  <ul className="space-y-3">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <li key={lang.code}>
                        <button
                          onClick={() => {
                            changeLanguage(lang.code);
                            setIsMobileLangOpen(false);
                          }}
                          className={`flex w-full items-center gap-2 text-left text-lg ${
                            language === lang.code
                              ? "font-semibold text-[#a69060]"
                              : "text-black hover:text-[#a69060] dark:text-[#e8eaed] dark:hover:text-[#a69060]"
                          }`}
                        >
                          <IoIosArrowForward className="text-[#a69060]" />
                          <span>{lang.flag}</span>
                          <span>{lang.label}</span>
                          {language === lang.code && (
                            <span className="ml-auto text-[#a69060]">✓</span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* ===== NÚT TOGGLE DARK MODE (Mobile) ===== */}
            <div className="mt-4 border-t border-gray-200 pt-4">
              <p className="mb-2 text-sm text-gray-500 dark:text-[#9aa0a6]">
                {t("nav.themeLabel")}
              </p>
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
