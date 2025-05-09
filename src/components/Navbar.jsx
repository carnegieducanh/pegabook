import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";

// react icons
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { AuthContext } from "../contects/AuthProvider";
import { FaUser } from "react-icons/fa6";

import userImg from "../assets/awardbooks.png";
import { IoIosArrowForward } from "react-icons/io";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  //Thêm hai state mới để quản lý trạng thái hiển thị của navSignIn và DropdownLinks:
  const [isDropdownLinksOpen, setIsDropdownLinksOpen] = useState(false);
  const [isNavSignInOpen, setIsNavSignInOpen] = useState(false);

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
  // console.log(user);

  // toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeDropdowns = () => {
    setIsMenuOpen(false);
    setIsDropdownLinksOpen(false);
    setIsNavSignInOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // navItems here
  const navItems = [
    { link: "Trang chủ", path: "/" },
    { link: "Thư viện sách", path: "/all-books" },
  ];

  const navSignIn = [
    { link: "Thành viên", path: "/login-member" },
    // { link: "Trả sách ", path: "/login-borrower" },
    { link: "Admin", path: "/admin/dashboard" },
  ];

  const DropdownLinks = [
    {
      link: "Thành viên",
      path: "/Members",
    },
    {
      link: "Người chia sẻ",
      path: "/Sharers",
    },
    {
      link: "Lời cảm ơn",
      path: "/gratitude",
    },
  ];

  const navUser = [
    { link: user ? user.email : "", path: "/admin/dashboard" },
    { link: "Dashboard", path: "/admin/dashboard" },
    { link: "Log out", path: "logout" },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 w-full bg-transparent transition-all duration-300 ease-in">
      <nav
        className={`py-4 pl-4 pr-4 transition-all duration-300 ease-in-out md:px-4 lg:px-24 ${
          isSticky
            ? "sticky left-0 right-0 top-0 bg-[#F4F1EA]/90 shadow-md backdrop-blur-md"
            : ""
        }`}
      >
        <div className="flex items-center justify-between text-base">
          {/* logo */}
          <Link to="/">
            {/* <img src={navLogo} alt="" /> */}
            <h2 className="text-4xl font-medium text-[#a69060]">PEGABOOK</h2>
            {/* <FaBlog className="inline-block" /> */}
            <p className="pt-2 text-[#5a5a5a]">Viet Nam Team with ❤️</p>
          </Link>

          {/* nav item for large device */}
          <ul className="hidden space-x-12 md:flex">
            {navItems.map(({ link, path }) => (
              <Link
                key={path}
                to={path}
                className="block cursor-pointer text-lg text-black hover:text-[#a69060]"
              >
                {link}
              </Link>
            ))}

            {/* Simple Dropdown and Links */}
            <div className="group relative cursor-pointer">
              <div className="flex cursor-pointer items-center justify-between gap-2 text-lg text-black hover:text-[#a69060]">
                Cộng đồng{" "}
                <span>
                  <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                </span>
              </div>
              <div className="shadow-mdv absolute z-[9999] hidden w-[150px] rounded-md bg-white p-2 text-black group-hover:block">
                <ul className="space-y-3">
                  {DropdownLinks.map(({ link, path }) => (
                    <Link
                      key={path}
                      to={path}
                      className="block cursor-pointer text-lg text-black hover:text-[#a69060] hover:underline"
                    >
                      {link}
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </ul>

          {/* btn for large devices */}
          {isUserLoggedIn && (
            <>
              <div className="group relative hidden cursor-pointer md:block">
                <div className="flex cursor-pointer items-center justify-between gap-2 text-lg text-black hover:text-[#a69060]">
                  <FaUser />
                  Join{" "}
                  <span>
                    <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                  </span>
                </div>
                <div className="shadow-mdv absolute -right-4 z-[9999] hidden w-[150px] rounded-md bg-white p-2 text-black group-hover:block lg:left-0">
                  {/* Sign in / Join */}
                  <ul className="space-y-3">
                    {navSignIn.map(({ link, path }) => (
                      <Link
                        key={path}
                        to={path}
                        className="block cursor-pointer text-lg text-black hover:text-[#a69060] hover:underline"
                      >
                        {link}
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}

          {!isUserLoggedIn && (
            <div className="group relative cursor-pointer">
              <div className="flex cursor-pointer items-center justify-between gap-2 text-lg text-black hover:text-[#a69060]">
                <img src={userImg} alt="" className="h-10 w-10" />
                <span>
                  <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                </span>
              </div>
              <div className="shadow-mdv absolute right-0 z-[9999] hidden rounded-md bg-white p-2 text-black group-hover:block">
                {/* Sign in / Join */}
                <ul className="space-y-3">
                  {navUser.map(({ link, path }) => (
                    <Link
                      key={path}
                      to={path}
                      className="block cursor-pointer text-lg text-black hover:text-[#a69060] hover:underline"
                    >
                      {link}
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* =========== MENU BTN FOR THE MOBILE DEVICES ============= */}
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

        {/* ===== navItems for sm devices ====== */}
        <div
          className={`mt-[95px] space-y-4 bg-[#f4f1ea] px-4 py-7 ${
            isMenuOpen ? "fixed left-0 right-0 top-0 block" : "hidden"
          }`}
        >
          {navItems.map(({ link, path }) => (
            <Link
              key={path}
              to={path}
              className="cursor-point text-lg text-black"
              onClick={closeDropdowns} // Đóng dropdown khi click vào link
            >
              <div className="mb-4 flex items-center justify-between">
                {link}
                <IoIosArrowForward className="text-[#a69060]" />
              </div>
            </Link>
          ))}
          <div className="">
            <div className="relative mb-4 cursor-pointer">
              <div
                className="flex items-center justify-between gap-2 text-lg text-black hover:text-[#a69060]"
                onClick={toggleDropdownLinks}
              >
                Cộng đồng{" "}
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
                        className="block cursor-pointer text-lg text-black hover:text-[#a69060] hover:underline"
                        onClick={closeDropdowns} // Đóng dropdown khi click vào link
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

            {/* Dropdown for Join */}
            <div className="relative cursor-pointer">
              <div
                className="flex items-center justify-between gap-2 text-lg text-black hover:text-[#a69060]"
                onClick={toggleNavSignIn}
              >
                <div className="justify-between> flex items-center gap-2">
                  <FaUser />
                  Join{" "}
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
                        className="block cursor-pointer text-lg text-black hover:text-[#a69060] hover:underline"
                        onClick={closeDropdowns} // Đóng dropdown khi click vào link
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
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
