import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCaretDown, FaUser } from "react-icons/fa";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { AuthContext } from "../../contects/AuthProvider";
import { useLanguage } from "../../contects/LanguageProvider";
import userImg from "../../assets/awardbooks.png";
import DarkModeToggle from "./DarkModeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import NavMobileMenu from "./NavMobileMenu";

const LINK_CLS =
  "block cursor-pointer text-lg text-black hover:text-brand hover:underline dark:text-fog dark:hover:text-brand";
const TRIGGER_CLS =
  "flex cursor-pointer items-center justify-between gap-2 text-lg text-black hover:text-brand dark:text-fog dark:hover:text-brand";
const DROPDOWN_CLS =
  "shadow-mdv absolute z-[9999] hidden w-[160px] rounded-md bg-white p-2 text-black group-hover:block dark:bg-onyx";

const DesktopDropdown = ({ trigger, items }) => (
  <div className="group relative cursor-pointer">
    <div className={TRIGGER_CLS}>
      {trigger}
      <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
    </div>
    <div className={DROPDOWN_CLS}>
      <ul className="space-y-3">
        {items.map(({ link, path }) => (
          <Link key={path} to={path} className={LINK_CLS}>
            {link}
          </Link>
        ))}
      </ul>
    </div>
  </div>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [memberSession, setMemberSession] = useState(() => {
    try {
      const saved = localStorage.getItem("memberSession");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const { user } = useContext(AuthContext);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { link: t("nav.home"), path: "/" },
    { link: t("nav.library"), path: "/all-books" },
  ];

  const communityLinks = [
    { link: t("nav.members"), path: "/Members" },
    { link: t("nav.sharers"), path: "/Sharers" },
    { link: t("nav.gratitude"), path: "/gratitude" },
  ];

  const navSignIn = [
    { link: t("nav.member"), path: "/login-member" },
    { link: t("nav.admin"), path: "/admin/dashboard" },
  ];

  const navUser = [
    { link: user?.email ?? "", path: "/admin/dashboard" },
    { link: t("nav.dashboard"), path: "/admin/dashboard" },
    { link: t("nav.logout"), path: "logout" },
  ];

  const navMember = [
    {
      link: "Vào Dashboard",
      path: `/member/dashboard/${memberSession?._id}`,
    },
    { link: t("nav.logout"), path: "/logout" },
  ];

  return (
    <header className="dark:bg-obsidian fixed left-0 right-0 top-0 z-50 w-full bg-transparent transition-all duration-300 ease-in">
      <nav
        className={`py-4 pl-4 pr-4 transition-all duration-300 ease-in-out md:px-4 lg:px-24 ${
          isSticky
            ? "bg-cream/90 dark:bg-ember sticky left-0 right-0 top-0 shadow-md backdrop-blur-md"
            : ""
        }`}
      >
        <div className="flex items-center justify-between text-base">
          {/* Logo */}
          <Link to="/">
            <h2 className="text-brand text-4xl font-medium">PEGABOOK</h2>
            <p className="text-dusk dark:text-dust pt-2">{t("nav.tagline")}</p>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden space-x-12 md:flex">
            {navItems.map(({ link, path }) => (
              <Link
                key={path}
                to={path}
                className="hover:text-brand dark:text-fog dark:hover:text-brand block cursor-pointer text-lg text-black"
              >
                {link}
              </Link>
            ))}
            <DesktopDropdown
              trigger={t("nav.community")}
              items={communityLinks}
            />
          </ul>

          {/* Desktop phải: dark mode + ngôn ngữ + auth */}
          <div className="hidden items-center gap-3 md:flex">
            <DarkModeToggle />
            <LanguageSwitcher />
            {!user && !memberSession && (
              <DesktopDropdown
                trigger={
                  <>
                    <FaUser /> {t("nav.join")}
                  </>
                }
                items={navSignIn}
              />
            )}
            {!user && memberSession && (
              <DesktopDropdown
                trigger={
                  <img
                    src={memberSession.memberAvatar}
                    alt={memberSession.memberName}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                }
                items={navMember}
              />
            )}
            {user && (
              <DesktopDropdown
                trigger={<img src={userImg} alt="" className="h-10 w-10" />}
                items={navUser}
              />
            )}
          </div>

          {/* Nút hamburger (mobile) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-brand rounded-full border p-3 focus:outline-none md:hidden"
          >
            {isMenuOpen ? (
              <FaXmark className="h-5 w-5 text-white" />
            ) : (
              <FaBarsStaggered className="h-5 w-5 text-white" />
            )}
          </button>
        </div>

        {/* Menu mobile */}
        <NavMobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          navItems={navItems}
          communityLinks={communityLinks}
          navSignIn={navSignIn}
          navMember={navMember}
          memberSession={memberSession}
          t={t}
        />
      </nav>
    </header>
  );
};

export default Navbar;
