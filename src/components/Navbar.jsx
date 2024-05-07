import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";

// react icons
import { FaBarsStaggered, FaBlog, FaXmark } from "react-icons/fa6";
import { AuthContext } from "../contects/AuthProvider";
import { FaUser } from "react-icons/fa6";

import userImg from "../assets/awardbooks.png";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    // Khai báo user và kiểm tra xem người dùng đã đăng nhập hay không
    const { user } = useContext(AuthContext);
    const isUserLoggedIn = !user;
    // console.log(user);

    // toggle menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsSticky(true);
            } else setIsSticky(false);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // navItems here
    const navItems = [
        { link: "Trang chủ", path: "/" },
        { link: "Thư viện sách", path: "/our-books" },
    ];

    const navSignIn = [
        { link: "Chia sẻ sách", path: "/login-sharer" },
        { link: "Trả sách ", path: "/login-borrower" },
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
            path: "/Comments",
        },
    ];

    const navUser = [
        { link: user ? user.email : "", path: "/admin/dashboard" },
        { link: "Dashboard", path: "/admin/dashboard" },
        { link: "Log out", path: "logout" },
    ];

    return (
        <header className="w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300">
            <nav
                className={`py-4 px-4 lg:px-24 ${
                    isSticky
                        ? "sticky top-0 left-0 right-0 bg-[#F4F1EA] shadow-md"
                        : ""
                }`}
            >
                <div className="flex justify-between items-center text-base gap-8">
                    {/* logo */}
                    <Link to="/">
                        {/* <img src={navLogo} alt="" /> */}
                        <h2 className="text-[#a69060] text-4xl font-semibold">
                            PEGABOOK
                        </h2>
                        {/* <FaBlog className="inline-block" /> */}
                        <p className="pt-2 text-[#5a5a5a]">
                            Viet Nam Team with ❤️
                        </p>
                    </Link>

                    {/* nav item for large device */}
                    <ul className="md:flex space-x-12 hidden">
                        {navItems.map(({ link, path }) => (
                            <Link
                                key={path}
                                to={path}
                                className="block text-lg text-black cursor-pointer hover:text-[#a69060]"
                            >
                                {link}
                            </Link>
                        ))}

                        {/* Simple Dropdown and Links */}
                        <div className="group relative cursor-pointer">
                            <div className="text-lg text-black cursor-pointer hover:text-[#a69060] flex items-center justify-between gap-2">
                                Cộng đồng{" "}
                                <span>
                                    <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                                </span>
                            </div>
                            <div className="absolute z-[9999] hidden w-[150px] rounded-md bg-white p-2 text-black group-hover:block shadow-mdv">
                                <ul className="space-y-3">
                                    {DropdownLinks.map(({ link, path }) => (
                                        <Link
                                            key={path}
                                            to={path}
                                            className="block text-lg text-black cursor-pointer hover:text-[#a69060] hover:underline"
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
                            <div className="group relative cursor-pointer">
                                <div className="text-lg text-black cursor-pointer hover:text-[#a69060] flex items-center justify-between gap-2">
                                    <FaUser />
                                    Join{" "}
                                    <span>
                                        <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                                    </span>
                                </div>
                                <div className="absolute -right-4 lg:left-0 z-[9999] hidden w-[150px] rounded-md bg-white p-2 text-black group-hover:block shadow-mdv">
                                    {/* Sign in / Join */}
                                    <ul className="space-y-3 ">
                                        {navSignIn.map(({ link, path }) => (
                                            <Link
                                                key={path}
                                                to={path}
                                                className="block text-lg text-black cursor-pointer hover:text-[#a69060] hover:underline "
                                            >
                                                {link}
                                            </Link>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </>
                    )}

                    {/* <button>
                            <FaBarsStaggered className="w-5 hover:text-blue-700" />
                        </button> */}

                    {!isUserLoggedIn && (
                        <div className="group relative cursor-pointer">
                            <div className="text-lg text-black cursor-pointer hover:text-[#a69060] flex items-center justify-between gap-2">
                                <img
                                    src={userImg}
                                    alt=""
                                    className="w-10 h-10"
                                />
                                <span>
                                    <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                                </span>
                            </div>
                            <div className="absolute right-0 z-[9999] hidden rounded-md bg-white p-2 text-black group-hover:block shadow-mdv">
                                {/* Sign in / Join */}
                                <ul className="space-y-3">
                                    {navUser.map(({ link, path }) => (
                                        <Link
                                            key={path}
                                            to={path}
                                            className="block text-lg text-black cursor-pointer hover:text-[#a69060] hover:underline"
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
                            className="text-black focus:outline-none"
                        >
                            {isMenuOpen ? (
                                <FaXmark className="h-5 w-5 text-black" />
                            ) : (
                                <FaBarsStaggered className="h-5 w-5 text-black" />
                            )}
                        </button>
                    </div>
                </div>

                {/* ===== navItems for sm devices ====== */}
                <div
                    className={`space-y-4 px-4 mt-[68px] py-7 bg-[#f4f1ea] ${
                        isMenuOpen
                            ? "block fixed top-0 right-0 left-0"
                            : "hidden"
                    }`}
                >
                    {navItems.map(({ link, path }) => (
                        <Link
                            key={path}
                            to={path}
                            className="block text-base text-black uppercase cursor-pointe"
                        >
                            {link}
                        </Link>
                    ))}
                    <div className="group relative cursor-pointer">
                        <div className="text-lg text-black cursor-pointer hover:text-[#a69060] flex items-center justify-start gap-2">
                            Cộng đồng{" "}
                            <span>
                                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                            </span>
                        </div>
                        <div className="absolute z-[9999] hidden w-[150px] rounded-md bg-white p-2 text-black group-hover:block shadow-mdv">
                            <ul className="space-y-3">
                                {DropdownLinks.map(({ link, path }) => (
                                    <Link
                                        key={path}
                                        to={path}
                                        className="block text-lg text-black cursor-pointer hover:text-[#a69060] hover:underline"
                                    >
                                        {link}
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
