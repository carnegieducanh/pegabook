import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

import SpinnerLoading from "../components/SpinnerLoading";

const OtherBookCards = ({ headline, books }) => {
  // console.log(books);
  return (
    <div className="my-16 px-4 text-center lg:px-24">
      <h2 className="my-2 text-center font-title text-5xl font-bold leading-snug text-black">
        {headline}
      </h2>
      <p className="pt-2 text-lg text-gray-700">
        Tại <span className="text-xl font-medium text-[#a69060]">Pegabook</span>
        , chúng tôi không chỉ chia sẻ sách – mà còn chia sẻ con người. Thông qua
        các sự kiện, hội thảo, và nhóm đọc sách (vâng, đôi khi có cả bánh trà),
        bạn sẽ có cơ hội gặp gỡ những tâm hồn đồng điệu, thảo luận sôi nổi về
        những trang sách yêu thích, và biết đâu… tìm được bạn tâm giao qua một
        đoạn văn hay! Cộng đồng đọc sách{" "}
        <span className="text-xl font-medium text-[#a69060]">Pegabook</span> –
        nơi “mọt sách” không còn phải đọc một mình.
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
            className="mySwiper h-full w-full"
          >
            {books.map((book) => (
              <SwiperSlide key={book._id}>
                <Link to={`/book/${book._id}`}>
                  <div
                    data-aos="zoom-in"
                    className="group flex h-[400px] flex-col justify-between gap-4 bg-white dark:bg-gray-800 lg:h-full lg:w-52"
                  >
                    <div className="mx-auto mt-1 flex flex-col justify-between gap-1 text-left lg:w-52">
                      <p className="line-clamp-2 block text-center text-sm text-gray-500">
                        {book.category}
                      </p>
                      <img
                        src={book.imageUrl}
                        alt=""
                        className="mx-auto my-2 block h-64 w-44 transform rounded-br-lg rounded-tr-lg object-cover shadow-xl shadow-slate-900/30 duration-300 group-hover:scale-105 dark:shadow-black/30 lg:h-80 lg:w-52"
                      />

                      <h3 className="line-clamp-1 text-sm font-bold">
                        {book.bookTitle}
                      </h3>
                      <p className="line-clamp-1 text-left text-sm font-bold text-[#a69060]">
                        {book.authorName}
                      </p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <SpinnerLoading />
          </div>
        )}
      </div>
    </div>
  );
};

export default OtherBookCards;
