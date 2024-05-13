import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";

import { IoMdPersonAdd } from "react-icons/io";
import { FaBookOpenReader } from "react-icons/fa6";
import { FaBook, FaUserCircle } from "react-icons/fa";
import { HiArrowSmRight, HiChartPie, HiViewBoards } from "react-icons/hi";

import userImg from "../../assets/awardbooks.png";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../dashSharer/DashSelected.css";

const DashSidebar = () => {
    const [selectedItem, setSelectedItem] = useState(null); // State để lưu trạng thái của Sidebar.Item được chọn

    // Function để cập nhật phần tử được chọn khi một Link được click
    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // toggle menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <Sidebar
            aria-label="Sidebar with content separator example"
            className="w-full lg:w-1/5"
        >
            <div className="flex w-full justify-between">
                <Sidebar.Logo href="/" img={userImg} imgAlt="Flowbite logo">
                    Pegabook ❤️!
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
                    <Link to={"/admin/dashboard/main"}>
                        <Sidebar.Item
                            icon={HiChartPie}
                            className={
                                selectedItem === "main" ? "selected" : ""
                            }
                            onClick={() => handleItemClick("main")}
                        >
                            Dashboard
                        </Sidebar.Item>
                    </Link>
                    <Link to={"/admin/dashboard/add-member"}>
                        <Sidebar.Item
                            icon={IoMdPersonAdd}
                            className={
                                selectedItem === "add-member" ? "selected" : ""
                            }
                            onClick={() => handleItemClick("add-member")}
                        >
                            Add Member
                        </Sidebar.Item>
                    </Link>

                    {/* <Link to={"/admin/dashboard/create-sharer"}>
                        <Sidebar.Item icon={FaUserCircle}>
                            Create a Sharer
                        </Sidebar.Item>
                    </Link> */}

                    <Link to={"/admin/dashboard/manage-members"}>
                        <Sidebar.Item
                            icon={FaBookOpenReader}
                            className={
                                selectedItem === "manage-members"
                                    ? "selected"
                                    : ""
                            }
                            onClick={() => handleItemClick("manage-members")}
                        >
                            Manage Members
                        </Sidebar.Item>
                    </Link>

                    <Link to={"/admin/dashboard/manage"}>
                        <Sidebar.Item
                            icon={FaBook}
                            className={
                                selectedItem === "manage" ? "selected" : ""
                            }
                            onClick={() => handleItemClick("manage")}
                        >
                            Manage Books
                        </Sidebar.Item>
                    </Link>

                    <Link to={"/logout"}>
                        <Sidebar.Item
                            icon={HiArrowSmRight}
                            className={
                                selectedItem === "logout" ? "selected" : ""
                            }
                            onClick={() => handleItemClick("logout")}
                        >
                            Log Out
                        </Sidebar.Item>
                    </Link>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                    <Sidebar.Item href="#" icon={HiChartPie}>
                        Upgrade to Pro
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiViewBoards}>
                        Documentation
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={BiBuoy}>
                        Help
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>

            {/* === MOBILE MENU=== */}
            <div className={` ${isMenuOpen ? "block z-50" : "hidden"}`}>
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Link to={"/admin/dashboard/main"}>
                            <Sidebar.Item icon={HiChartPie}>
                                Dashboard
                            </Sidebar.Item>
                        </Link>
                        <Link to={"/admin/dashboard/add-member"}>
                            <Sidebar.Item icon={IoMdPersonAdd}>
                                Add Member
                            </Sidebar.Item>
                        </Link>

                        <Link to={"/admin/dashboard/manage-members"}>
                            <Sidebar.Item icon={FaBookOpenReader}>
                                Manage Members
                            </Sidebar.Item>
                        </Link>

                        <Link to={"/admin/dashboard/manage"}>
                            <Sidebar.Item icon={FaBook}>
                                Manage Books
                            </Sidebar.Item>
                        </Link>

                        <Link to={"/logout"}>
                            <Sidebar.Item icon={HiArrowSmRight}>
                                Log Out
                            </Sidebar.Item>
                        </Link>
                    </Sidebar.ItemGroup>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="#" icon={HiChartPie}>
                            Upgrade to Pro
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiViewBoards}>
                            Documentation
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={BiBuoy}>
                            Help
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </div>
        </Sidebar>
    );
};
export default DashSidebar;
