import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { FaStar } from "react-icons/fa";

// import required modules
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import SpinnerLoading from "../components/SpinnerLoading";

const TrendingBooks = ({ headline }) => {
    const [membersData, setMembersData] = useState(null);
    const [booksData, setBooksData] = useState([]);
    const [memberName, setMemberName] = useState({});

    useEffect(() => {
        fetch("https://pega-book-server.onrender.com/all-members")
            .then((res) => res.json())
            .then((data) => setMembersData(data));
    }, []);

    useEffect(() => {
        fetch("https://pega-book-server.onrender.com/all-books")
            .then((res) => res.json())
            .then((data) => setBooksData(data.slice(-9).reverse()));
    }, []);

    useEffect(() => {
        if (membersData && booksData) {
            const api1BooksIDs = new Set(
                booksData.map((item) => item.sharerID)
            );

            let memberNamesMap = {};
            api1BooksIDs.forEach((sharerID) => {
                membersData.forEach((member) => {
                    if (sharerID === member.memberID) {
                        memberNamesMap[sharerID] = member.memberName;
                        return;
                    }
                });
            });
            setMemberName(memberNamesMap); // Cập nhật memberName
        }
    }, [membersData, booksData]);

    return (
        <div className="py-4 px-4 lg:px-24 text-center">
            <p className="text-xl  text-[#a69060]">Trending Books</p>
            <h2 className="text-5xl text-center font-bold font-title text-black my-2">
                {headline}
            </h2>
            <p className=" text-gray-700 text-lg">
                Với hệ thống đăng ký đơn giản, các bạn có thể mượn sách miễn phí
                trong thời gian xác định. Từ các tiểu thuyết nổi tiếng đến sách
                chuyên ngành,{" "}
                <span className="text-[#a69060] text-xl font-medium">
                    Pegabook
                </span>{" "}
                đảm bảo có một bộ sưu tập đa dạng để đáp ứng nhu cầu đọc sách
                của mọi người.
            </p>

            {/* {card} */}
            <div className="mt-12 ">
                {booksData.length > 0 ? (
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={0}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            400: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            576: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 40,
                            },
                            992: {
                                slidesPerView: 4,
                                spaceBetween: 50,
                            },
                            1200: {
                                slidesPerView: 5,
                                spaceBetween: 50,
                            },
                            1500: {
                                slidesPerView: 6,
                                spaceBetween: 50,
                            },
                        }}
                        modules={[Pagination]}
                        className="mySwiper w-full h-full"
                    >
                        {booksData.map((book) => (
                            <SwiperSlide key={book._id}>
                                <Link to={`/book/${book._id}`}>
                                    <div
                                        data-aos="zoom-in"
                                        className=" bg-white dark:bg-gray-800 group flex flex-col justify-between gap-4 lg:w-52 h-[440px] lg:h-full"
                                    >
                                        <div className="mt-1 text-left mx-auto flex flex-col justify-between gap-1 lg:w-52">
                                            <p className="block text-center  text-gray-500 text-sm line-clamp-2">
                                                {book.category}
                                            </p>
                                            <img
                                                src={book.imageUrl}
                                                alt=""
                                                className="w-44 lg:w-52 h-64 lg:h-80 block mx-auto my-1 transform group-hover:scale-105 duration-300 shadow-xl object-cover rounded-tr-xl rounded-br-xl shrink-0"
                                            />

                                            <div className="w-44">
                                                <h3 className="text-sm font-bold line-clamp-1 ">
                                                    {book.bookTitle}
                                                </h3>
                                                <p className="text-[#a69060] text-sm line-clamp-1">
                                                    {book.authorName}
                                                </p>
                                                <div className="flex gap-1">
                                                    <FaStar className="text-yellow-500" />
                                                    <FaStar className="text-yellow-500" />
                                                    <FaStar className="text-yellow-500" />
                                                    <FaStar className="text-yellow-500" />
                                                    <FaStar className="text-yellow-500" />
                                                </div>
                                                <p className="text-sm line-clamp-1">
                                                    Chia sẻ bởi
                                                </p>
                                                <p className="text-[#a69060] text-sm font-semibold -mt-1">
                                                    {memberName[book.sharerID]}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="flex justify-center items-center w-full h-full">
                        <SpinnerLoading />
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrendingBooks;
