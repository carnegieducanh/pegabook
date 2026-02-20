import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import SpinnerLoading from "../components/SpinnerLoading";
import { useLanguage } from "../contects/LanguageProvider";

const TrendingBooks = ({ headline }) => {
  const { t } = useLanguage();

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
      const api1BooksIDs = new Set(booksData.map((item) => item.sharerID));

      let memberNamesMap = {};
      api1BooksIDs.forEach((sharerID) => {
        membersData.forEach((member) => {
          if (sharerID === member.memberID) {
            memberNamesMap[sharerID] = member.memberName;
            return;
          }
        });
      });
      setMemberName(memberNamesMap);
    }
  }, [membersData, booksData]);

  return (
    <div className="px-4 py-4 text-center lg:px-24">
      <p className="text-xl text-[#a69060]">{t("trending.label")}</p>
      <h2 className="my-2 text-center font-title text-5xl font-bold leading-snug text-black dark:text-[#cdc4b7]">
        {headline}
      </h2>
      <p className="text-lg text-gray-700 dark:text-[#aca49a]">
        {t("trending.description")}
      </p>

      {/* {card} */}
      <div className="mt-12">
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
            className="mySwiper h-full w-full"
          >
            {booksData.map((book) => (
              <SwiperSlide key={book._id}>
                <Link to={`/book/${book._id}`}>
                  <div
                    data-aos="zoom-in"
                    className="group flex h-[440px] flex-col justify-between gap-4 bg-white dark:bg-[#181a1b] lg:h-full lg:w-52"
                  >
                    <div className="mx-auto mt-1 flex flex-col justify-between gap-1 text-left lg:w-52">
                      <p className="line-clamp-2 block text-center text-sm text-gray-500 dark:text-[#aca49a]">
                        {book.category}
                      </p>
                      <img
                        src={book.imageUrl}
                        alt=""
                        className="mx-auto my-2 block h-64 w-44 shrink-0 transform rounded-br-xl rounded-tr-xl object-cover shadow-xl shadow-slate-900/30 duration-300 group-hover:scale-105 dark:shadow-black/30 lg:h-80 lg:w-52"
                      />

                      <div className="w-44">
                        <h3 className="line-clamp-1 text-sm font-bold">
                          {book.bookTitle}
                        </h3>
                        <p className="line-clamp-1 text-sm font-bold text-[#a69060]">
                          {book.authorName}
                        </p>

                        <p className="line-clamp-1 text-sm">
                          {t("trending.sharedBy")}
                        </p>
                        <p className="text-md -mt-1 font-semibold text-[#825445]">
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
          <div className="flex h-full w-full items-center justify-center">
            <SpinnerLoading />
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingBooks;
