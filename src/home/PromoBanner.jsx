import { Link } from "react-router-dom";
import bookPic from "../assets/awardbooks.png";
import promoBannerPic from "../assets/Promo Banner Pic.jpg";

const PromoBanner = () => {
  return (
    <div className="mt-16 bg-gray-100 px-4 py-12 lg:px-24">
      <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
        <div className="md:w-1/2">
          <h2 className="mb-6 font-title text-4xl font-bold leading-snug">
            Truy cập trực tuyến – Thuận tiện mọi lúc, mọi nơi!
          </h2>
          <p className="mb-10 text-lg md:w-5/6">
            Dù bạn đang ở quán cà phê, trên tàu điện, hay cuộn tròn trong chăn
            giữa đêm khuya,{" "}
            <span className="text-xl font-medium text-[#a69060]">Pegabook</span>{" "}
            cho phép bạn mượn sách trực tuyến thông qua kết nối internet. Bạn có
            thể chủ động lựa chọn thời gian mượn, đặt trước và hình thức nhận
            sách phù hợp với lịch trình cá nhân, giúp việc đọc trở nên linh hoạt
            và thuận tiện hơn.
          </p>
          <Link to="/all-books">
            <button className="block rounded bg-[#a69060] px-5 py-2 text-lg text-white transition-all duration-300 hover:bg-black">
              Khám phá thêm
            </button>
          </Link>
        </div>

        <div className="md:w-1/2">
          <img src={promoBannerPic} alt="" className="rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
