import { useEffect, useState } from "react";
import Slider from "react-slick";
import SpinnerLoading from "../components/SpinnerLoading";
import { useLanguage } from "../contects/LanguageProvider";
import API_BASE_URL from "../config/api";

const Review = () => {
  const { t } = useLanguage();
  const [membersData, setMembersData] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/all-members`)
      .then((res) => res.json())
      .then((data) => setMembersData(data));
  }, []);

  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
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
      <div
        data-aos="fade-up"
        data-aos-duration="300"
        className="dark:bg-void py-10"
      >
        <div className="px-4lg:px-24">
          <div className="mx-auto mb-20 max-w-[600px] text-center">
            <p className="text-brand text-lg">{t("review.eyebrow")}</p>
            <h1 className="dark:text-pebble font-title text-3xl font-bold">
              {t("review.title")}
            </h1>
            <p className="dark:text-pebble text-lg text-gray-700">
              <span className="text-brand text-xl font-medium">Pegabook</span>{" "}
              {t("review.description")}
            </p>
          </div>
          <div
            data-aos="zoom-in"
            data-aos-duration="300"
            className="mx-auto grid grid-cols-1 gap-6"
          >
            {membersData.length > 0 ? (
              <Slider {...settings}>
                {membersData &&
                  membersData.map((member) => {
                    return (
                      <div className="my-6 w-96" key={member._id}>
                        <div className="dark:bg-obsidian relative mx-4 flex h-56 flex-col gap-4 rounded-xl bg-gray-100 px-6 py-8 shadow-lg">
                          <div>
                            <img
                              className="h-20 w-20 rounded-full object-cover"
                              src={member.memberAvatar}
                              alt=""
                            />
                          </div>
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="dark:text-pebble line-clamp-2 text-gray-500">
                                {member.comment}
                              </p>
                              <h1 className="dark:text-light dark:text-linen text-xl font-bold text-black/80">
                                {member.memberName}
                              </h1>
                            </div>
                          </div>

                          <p className="dark:text-pebble absolute right-0 top-0 font-serif text-9xl text-black/20">
                            ,,
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </Slider>
            ) : (
              <div className="flex h-full w-full items-center justify-center">
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
