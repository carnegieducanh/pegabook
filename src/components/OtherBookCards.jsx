import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import SpinnerLoading from "./SpinnerLoading";

const OtherBookCards = ({ headline, books }) => {
    // console.log(books);
    return (
        <div className="px-4 lg:px-24 text-center my-16">
            <h2 className="text-5xl text-center font-bold text-black my-2">
                {headline}
            </h2>
            <p className=" text-gray-700 text-lg pt-2">
                <span className="text-[#a69060] text-xl font-medium">
                    Pegabook
                </span>{" "}
                tổ chức các sự kiện, hội thảo và nhóm đọc sách để tạo cơ hội cho
                thành viên chia sẻ ý kiến, gặp gỡ những người đam mê sách và tạo
                ra một cộng đồng đọc sách mạnh mẽ.
            </p>

            {/* {card} */}
            <div className="mt-12">
                {books.length > 0 ? (
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                            1024: {
                                slidesPerView: 5,
                                spaceBetween: 50,
                            },
                        }}
                        modules={[Pagination]}
                        className="mySwiper w-full h-full"
                    >
                        {books.map((book) => (
                            <SwiperSlide key={book._id}>
                                <Link to={`/book/${book._id}`}>
                                    <div
                                        data-aos="zoom-in"
                                        className=" bg-white dark:bg-gray-800 group flex flex-col justify-between gap-4 lg:w-52 h-[400px] lg:h-full "
                                    >
                                        <div className="mt-1 text-left mx-auto flex flex-col justify-between gap-1 lg:w-52">
                                            <p className="block text-center text-gray-500 text-sm line-clamp-2">
                                                {book.category}
                                            </p>
                                            <img
                                                src={book.imageUrl}
                                                alt=""
                                                className="w-44 lg:w-52 h-64 lg:h-80 block mx-auto my-1 transform group-hover:scale-105 duration-300 shadow-xl object-cover  rounded-tr-lg rounded-br-lg"
                                            />

                                            <h3 className="text-sm font-bold line-clamp-1 ">
                                                {book.bookTitle}
                                            </h3>
                                            <p className="text-[#a69060] text-sm text-left line-clamp-1">
                                                {book.authorName}
                                            </p>
                                            <div className="w-36 flex md:mx-0 gap-2">
                                                <div className="block my-auto">
                                                    <FaStar className="text-yellow-500 " />
                                                </div>
                                                <p className="font-medium">
                                                    4.5
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

export default OtherBookCards;
