import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";

import { FaBook } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { HiArrowSmRight } from "react-icons/hi";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";

const DashBorrowerSidebar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { id } = useParams();
    const [borrower, setBorrower] = useState({});
    // const { memberName } = useLoaderData();

    // toggle menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        fetch(`https://pega-book-server.onrender.com/member/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setBorrower(data);
            });
    }, []);
    return (
        <Sidebar className="w-full lg:w-1/5">
            <div className="flex w-full justify-between">
                <Sidebar.Logo className="-pl-3">
                    <div className="flex gap-2">
                        <img
                            src={borrower.memberAvatar}
                            alt=""
                            className="w-8 h-8 rounded-full object-cover shrink-0"
                        />

                        <p>{borrower.memberName}</p>
                    </div>
                </Sidebar.Logo>
                <div className="lg:hidden">
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

            {/* === Desktop Menu  === */}
            <Sidebar.Items className="hidden lg:block">
                <Sidebar.ItemGroup>
                    <Link to={`/borrower/dashboard/${borrower._id}`}>
                        <Sidebar.Item icon={FaBook}>Trả sách</Sidebar.Item>
                    </Link>
                    <Link to={`/borrower/dashboard/profile/${borrower._id}`}>
                        <Sidebar.Item icon={CgProfile}>
                            Hồ sơ cá nhân
                        </Sidebar.Item>
                    </Link>
                    <Link to={"/logout"}>
                        <Sidebar.Item icon={HiArrowSmRight}>
                            Đăng xuất
                        </Sidebar.Item>
                    </Link>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                    <Sidebar.Item href="#" icon={BiBuoy}>
                        Help
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>

            {/* === MOBILE MENU=== */}
            <div className={`${isMenuOpen ? "block z-50" : "hidden"}`}>
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item
                            href={`/borrower/dashboard/${borrower._id}`}
                            icon={FaBook}
                        >
                            Trả sách
                        </Sidebar.Item>

                        <Sidebar.Item
                            href={`/borrower/dashboard/profile/${borrower._id}`}
                            icon={CgProfile}
                        >
                            Hồ sơ cá nhân
                        </Sidebar.Item>

                        <Sidebar.Item href="/logout" icon={HiArrowSmRight}>
                            Đăng xuất
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="#" icon={BiBuoy}>
                            Help
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </div>
        </Sidebar>
    );
};
export default DashBorrowerSidebar;
