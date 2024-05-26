import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";

import { FaBook } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TbPasswordUser } from "react-icons/tb";
import { FaBookReader } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa6";
import {
    HiArrowSmRight,
    HiChartPie,
    HiOutlineCloudUpload,
} from "react-icons/hi";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import "../dashSharer/DashSelected.css";

const DashMemberSidebar = () => {
    const [selectedItem, setSelectedItem] = useState(null); // State để lưu trạng thái của Sidebar.Item được chọn

    // Function để cập nhật phần tử được chọn khi một Link được click
    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { id } = useParams();
    const [member, setMember] = useState({});

    // toggle menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        fetch(`https://pega-book-server.onrender.com/member/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setMember(data);
            });
    }, []);
    return (
        <Sidebar className="w-full lg:w-1/5">
            <div className="flex w-full justify-between items-center my-3 py-auto">
                <Link to={`/member/dashboard/${member._id}`}>
                    <Sidebar.Logo className="-pl-3 my-auto">
                        <div className="flex gap-2 items-center">
                            <img
                                src={member.memberAvatar}
                                alt=""
                                className="w-12 h-12 rounded-full object-cover shrink-0"
                            />

                            <p>{member.memberName}</p>
                        </div>
                    </Sidebar.Logo>
                </Link>

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
                    <Link to={`/member/dashboard/${member._id}`}>
                        <Sidebar.Item
                            icon={HiChartPie} // Kiểm tra nếu phần tử này được chọn thì thêm lớp CSS 'selected'
                            className={
                                selectedItem === "dashboard" ? "selected" : ""
                            }
                            onClick={() => handleItemClick("dashboard")}
                        >
                            Thống kê
                        </Sidebar.Item>
                    </Link>

                    <Link to={`/member/dashboard/upload/${member._id}`}>
                        <Sidebar.Item
                            icon={HiOutlineCloudUpload}
                            className={
                                selectedItem === "upload" ? "selected" : ""
                            }
                            onClick={() => handleItemClick("upload")}
                        >
                            Thêm sách mới
                        </Sidebar.Item>
                    </Link>

                    <Link to={`/member/dashboard/manage/${member._id}`}>
                        <Sidebar.Item
                            icon={FaAddressBook}
                            className={
                                selectedItem === "manage" ? "selected" : ""
                            }
                            onClick={() => handleItemClick("manage")}
                        >
                            Sách của bạn
                        </Sidebar.Item>
                    </Link>

                    <Link
                        to={`/member/dashboard/manage/borrower/${member._id}`}
                    >
                        <Sidebar.Item
                            icon={FaBookReader}
                            className={
                                selectedItem === "borrower" ? "selected" : ""
                            }
                            onClick={() => handleItemClick("borrower")}
                        >
                            Sách cho mượn
                        </Sidebar.Item>
                    </Link>

                    <Link to={`/member/dashboard/borrowed-book/${member._id}`}>
                        <Sidebar.Item
                            icon={FaBook}
                            className={
                                selectedItem === "borrowed-book"
                                    ? "selected"
                                    : ""
                            }
                            onClick={() => handleItemClick("borrowed-book")}
                        >
                            Trả sách
                        </Sidebar.Item>
                    </Link>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                    <Link to={`/member/dashboard/profile/${member._id}`}>
                        <Sidebar.Item
                            icon={CgProfile}
                            className={
                                selectedItem === "profile" ? "selected" : ""
                            }
                            onClick={() => handleItemClick("profile")}
                        >
                            Hồ sơ cá nhân
                        </Sidebar.Item>
                    </Link>

                    <Link to={`/member/dashboard/changePassword/${member._id}`}>
                        <Sidebar.Item
                            icon={TbPasswordUser}
                            className={
                                selectedItem === "changePassword"
                                    ? "selected"
                                    : ""
                            }
                            onClick={() => handleItemClick("changePassword")}
                        >
                            Đổi mật khẩu
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
                            Đăng xuất
                        </Sidebar.Item>
                    </Link>
                    {/* <Sidebar.Item href="#" icon={BiBuoy}>
                        Help
                    </Sidebar.Item> */}
                </Sidebar.ItemGroup>
            </Sidebar.Items>

            {/* === MOBILE MENU=== */}
            <div className={`${isMenuOpen ? "block z-50" : "hidden"}`}>
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Link to={`/member/dashboard/${member._id}`}>
                            <Sidebar.Item icon={HiChartPie}>
                                Thống kê
                            </Sidebar.Item>
                        </Link>

                        <Link to={`/member/dashboard/upload/${member._id}`}>
                            <Sidebar.Item icon={HiOutlineCloudUpload}>
                                Thêm sách mới
                            </Sidebar.Item>
                        </Link>
                        <Link to={`/member/dashboard/manage/${member._id}`}>
                            <Sidebar.Item icon={FaAddressBook}>
                                Sách của bạn
                            </Sidebar.Item>
                        </Link>
                        <Link
                            to={`/member/dashboard/manage/borrower/${member._id}`}
                        >
                            <Sidebar.Item icon={FaBookReader}>
                                Sách cho mượn
                            </Sidebar.Item>
                        </Link>

                        <Link
                            to={`/member/dashboard/borrowed-book/${member._id}`}
                        >
                            <Sidebar.Item icon={FaBook}>Trả sách</Sidebar.Item>
                        </Link>
                    </Sidebar.ItemGroup>
                    <Sidebar.ItemGroup>
                        <Link to={`/member/dashboard/profile/${member._id}`}>
                            <Sidebar.Item icon={CgProfile}>
                                Hồ sơ cá nhân
                            </Sidebar.Item>
                        </Link>

                        <Link
                            to={`/member/dashboard/changePassword/${member._id}`}
                        >
                            <Sidebar.Item icon={TbPasswordUser}>
                                Đổi mật khẩu
                            </Sidebar.Item>
                        </Link>

                        <Link to={"/logout"}>
                            <Sidebar.Item icon={HiArrowSmRight}>
                                Đăng xuất
                            </Sidebar.Item>
                        </Link>
                        {/* <Sidebar.Item href="#" icon={BiBuoy}>
                            Help
                        </Sidebar.Item> */}
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </div>
        </Sidebar>
    );
};
export default DashMemberSidebar;
