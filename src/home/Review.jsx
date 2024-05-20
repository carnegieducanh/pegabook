import { useEffect, useState } from "react";
import Slider from "react-slick";
import SpinnerLoading from "../components/SpinnerLoading";

const Review = () => {
    const [membersData, setMembersData] = useState([]);

    useEffect(() => {
        fetch("https://pega-book-server.onrender.com/all-members")
            .then((res) => res.json())
            .then((data) => setMembersData(data));
    }, []);

    var settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        // slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        pauseOnHover: true,
        pauseOnFocus: true,
        responsive: [
            {
                breakpoint: 10000,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <>
            <div data-aos="fade-up" data-aos-duration="300" className="py-10">
                <div className="px-4 lg:px-24">
                    <div className="text-center mb-20 max-w-[600px] mx-auto">
                        <p className="text-lg text-[#a69060]">
                            Tận Hưởng Niềm Đam Mê
                        </p>
                        <h1 className="text-3xl font-bold">Reviews</h1>
                        <p className="text-lg text-gray-700">
                            Hãy trở thành thành viên của{" "}
                            <span className="text-[#a69060] text-xl font-medium">
                                Pegabook
                            </span>{" "}
                            ngay hôm nay để trải nghiệm thế giới của tri thức và
                            sự đam mê đọc sách. Đăng ký là hoàn toàn miễn phí,
                            và{" "}
                            <span className="text-[#a69060] text-xl font-medium">
                                Pegabook
                            </span>{" "}
                            mong đợi sự tham gia tích cực của bạn để chúng ta có
                            thể cùng nhau xây dựng một cộng đồng đọc sách phong
                            phú và mang tính cộng đồng.
                        </p>
                    </div>
                    <div
                        data-aos="zoom-in"
                        data-aos-duration="300"
                        className=" grid grid-cols-1 mx-auto gap-6"
                    >
                        {membersData.length > 0 ? (
                            <Slider {...settings}>
                                {membersData &&
                                    membersData.map((member) => {
                                        return (
                                            <div
                                                className="my-6 w-96"
                                                key={member._id}
                                            >
                                                <div className=" flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl bg-gray-100 dark:bg-gray-800 relative h-56">
                                                    <div>
                                                        <img
                                                            className="rounded-full w-20 h-20 object-cover"
                                                            src={
                                                                member.memberAvatar
                                                            }
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div>
                                                            <p className="text-gray-500 line-clamp-2">
                                                                {member.comment}
                                                            </p>
                                                            <h1 className="text-xl font-bold text-black/80 dark:text-light">
                                                                {
                                                                    member.memberName
                                                                }
                                                            </h1>
                                                        </div>
                                                    </div>

                                                    <p className="text-black/20 text-9xl font-serif absolute top-0 right-0">
                                                        ,,
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </Slider>
                        ) : (
                            <div className="flex justify-center items-center w-full h-full">
                                <SpinnerLoading />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Review;
