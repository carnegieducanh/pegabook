import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";

import { FaBook } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TbPasswordUser } from "react-icons/tb";
import { FaBookReader } from "react-icons/fa";
import {
    HiArrowSmRight,
    HiChartPie,
    HiOutlineCloudUpload,
} from "react-icons/hi";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";

const DashSharerSidebar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { id } = useParams();
    const [sharer, setSharer] = useState({});

    // toggle menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        fetch(`https://pega-book-server.onrender.com/member/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setSharer(data);
                console.log(data);
            });
    }, []);
    return (
        <Sidebar className="w-full lg:w-1/5">
            <div className="flex w-full justify-between">
                <Sidebar.Logo className="-pl-3">
                    <div className="flex gap-2">
                        <img
                            src={sharer.memberAvatar}
                            alt=""
                            className="w-8 h-8 rounded-full object-cover shrink-0"
                        />

                        <p>{sharer.memberName}</p>
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
                    <Link to={`/sharer/dashboard/${sharer._id}`}>
                        <Sidebar.Item icon={HiChartPie}>Thống kê</Sidebar.Item>
                    </Link>

                    <Link
                        to={`/sharer/dashboard/manage/borrower/${sharer._id}`}
                    >
                        <Sidebar.Item icon={FaBookReader}>
                            Người mượn sách
                        </Sidebar.Item>
                    </Link>

                    <Link to={`/sharer/dashboard/upload/${sharer._id}`}>
                        <Sidebar.Item icon={HiOutlineCloudUpload}>
                            Thêm sách mới
                        </Sidebar.Item>
                    </Link>
                    <Link to={`/sharer/dashboard/manage/${sharer._id}`}>
                        <Sidebar.Item icon={FaBook}>Sách của bạn</Sidebar.Item>
                    </Link>
                    <Link to={`/sharer/dashboard/profile/${sharer._id}`}>
                        <Sidebar.Item icon={CgProfile}>
                            Hồ sơ cá nhân
                        </Sidebar.Item>
                    </Link>

                    <Link to={`/sharer/dashboard/changePassword/${sharer._id}`}>
                        <Sidebar.Item icon={TbPasswordUser}>
                            Đổi mật khẩu
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
                        <Link to={`/sharer/dashboard/${sharer._id}`}>
                            <Sidebar.Item icon={HiChartPie}>
                                Thống kê
                            </Sidebar.Item>
                        </Link>

                        <Link
                            to={`/sharer/dashboard/manage/borrower/${sharer._id}`}
                        >
                            <Sidebar.Item icon={FaBookReader}>
                                Người mượn sách
                            </Sidebar.Item>
                        </Link>

                        <Link to={`/sharer/dashboard/upload/${sharer._id}`}>
                            <Sidebar.Item icon={HiOutlineCloudUpload}>
                                Thêm sách mới
                            </Sidebar.Item>
                        </Link>
                        <Link to={`/sharer/dashboard/manage/${sharer._id}`}>
                            <Sidebar.Item icon={FaBook}>
                                Sách của bạn
                            </Sidebar.Item>
                        </Link>
                        <Link to={`/sharer/dashboard/profile/${sharer._id}`}>
                            <Sidebar.Item icon={CgProfile}>
                                Hồ sơ cá nhân
                            </Sidebar.Item>
                        </Link>

                        <Link
                            to={`/sharer/dashboard/changePassword/${sharer._id}`}
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
export default DashSharerSidebar;
