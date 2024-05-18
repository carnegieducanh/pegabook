import React, { useState } from "react";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaLocationArrow,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const FooterLinks = [
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
const Footer = () => {
    return (
        <div className="px-4 lg:px-24 bg-[#F4F1EA] dark:bg-gray-950">
            <section className="container">
                <div className="flex py-5">
                    {/* company Details */}
                    <div className="py-6">
                        <h1 className="text-[#a69060] text-4xl font-semibold mb-5">
                            PEGABOOK
                        </h1>
                        <p>
                            Tận Hưởng Niềm Đam Mê Đọc Sách <br />
                            Cùng{" "}
                            <span className="text-[#a69060] text-xl font-medium">
                                Pegabook
                            </span>{" "}
                        </p>
                    </div>
                    {/* Links */}

                    <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 col-span-3 md:px-10 ">
                        <div className="">
                            <div className="py-8 px-4 ">
                                <h1 className="sm:text-xl sm:text-left text-justify mb-3">
                                    Trang chủ
                                </h1>
                            </div>
                        </div>
                        <div className="">
                            <div className="py-8 px-4 ">
                                <h1 className="sm:text-xl sm:text-left text-justify mb-3">
                                    Thư viện sách
                                </h1>
                            </div>
                        </div>
                        <div className="">
                            <div className="py-8 px-4 ">
                                <h1 className="sm:text-xl sm:text-left text-justify mb-3">
                                    Cộng đồng
                                </h1>
                                <ul className="flex flex-col gap-3 ">
                                    {FooterLinks.map(({ link, path }) => (
                                        <Link
                                            key={path}
                                            to={path}
                                            className="cursor-pointer hover:translate-x-1 duration-300 hover:text-primary space-x-1"
                                        >
                                            <span>&#11162;</span>
                                            <span>{link}</span>
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <div className="py-8 px-4 ">
                                <h1 className="sm:text-xl sm:text-left text-justify mb-3">
                                    Kết nối{" "}
                                    <span className="text-[#a69060] text-xl font-medium">
                                        Pegabook
                                    </span>{" "}
                                </h1>
                                {/* Social Handle */}
                                <div className="flex items-center gap-3 mt-6">
                                    <a href="#">
                                        <FaInstagram className="text-3xl" />
                                    </a>
                                    <a href="#">
                                        <FaFacebook className="text-3xl" />
                                    </a>
                                    <a href="#">
                                        <FaLinkedin className="text-3xl" />
                                    </a>
                                </div>
                                <br />
                                <div className="flex items-center gap-3 text-sm">
                                    <FaLocationArrow />
                                    <p>PEGABOOK JAPAN INC.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="text-center py-10 border-t-2 border-gray-300/50">
                        @Copyright 2024 All rights reserved || Made with ❤️ by
                        Viet Nam Team of Pegabook Japan
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Footer;
