import { useState } from "react";
import { Link } from "react-router-dom";
import { FaCaretDown, FaUser } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import DarkModeToggle from "./DarkModeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

const MobileDropdown = ({ label, items, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative cursor-pointer">
      <div
        className="flex items-center justify-between gap-2 text-lg text-black hover:text-brand dark:text-fog dark:hover:text-brand"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {icon}
          {label}
        </div>
        <FaCaretDown
          className={`text-brand transition-all duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <ul className="mt-2 space-y-3 p-2">
          {items.map(({ link, path }) => (
            <Link
              key={path}
              to={path}
              className="block cursor-pointer text-lg text-black hover:text-brand hover:underline dark:text-fog dark:hover:text-brand"
            >
              <div className="flex items-center gap-2">
                <IoIosArrowForward className="text-brand" />
                {link}
              </div>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

const NavMobileMenu = ({
  isOpen,
  onClose,
  navItems,
  communityLinks,
  communityIcon,
  navMember,
  memberSession,
  t,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed left-0 right-0 top-0 mt-[95px] space-y-4 bg-cream px-4 py-7 dark:bg-obsidian">
      {/* Nav items chính */}
      {navItems.map(({ link, path, icon }) => (
        <Link
          key={path}
          to={path}
          className="cursor-pointer text-lg text-black dark:text-fog hover:text-brand dark:hover:text-brand"
          onClick={onClose}
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {icon}
              {link}
            </div>
            <IoIosArrowForward className="text-brand" />
          </div>
        </Link>
      ))}

      {/* Dropdown Cộng đồng */}
      <MobileDropdown
        label={t("nav.community")}
        items={communityLinks}
        icon={communityIcon}
      />

      {/* Tham gia hoặc Member Dashboard */}
      {memberSession ? (
        <MobileDropdown
          label={memberSession.memberName}
          items={navMember}
          icon={<FaUser />}
        />
      ) : (
        <Link
          to="/login-member"
          className="flex items-center justify-between text-lg text-black hover:text-brand dark:text-fog dark:hover:text-brand"
          onClick={onClose}
        >
          <div className="flex items-center gap-2">
            <FaUser />
            {t("nav.join")}
          </div>
          <IoIosArrowForward className="text-brand" />
        </Link>
      )}

      {/* Chọn ngôn ngữ */}
      <div className="mt-4 border-t border-gray-200 pt-4">
        <LanguageSwitcher mobile />
      </div>

      {/* Toggle dark mode */}
      <div className="mt-4 border-t border-gray-200 pt-4">
        <p className="mb-2 text-sm text-gray-500 dark:text-dust">
          {t("nav.themeLabel")}
        </p>
        <DarkModeToggle />
      </div>
    </div>
  );
};

export default NavMobileMenu;
