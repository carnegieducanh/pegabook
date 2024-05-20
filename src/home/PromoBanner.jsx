import { Link } from "react-router-dom";
import bookPic from "../assets/awardbooks.png";
import promoBannerPic from "../assets/Promo Banner Pic.jpg";

const PromoBanner = () => {
    return (
        <div className="mt-16 py-12 bg-gray-100 px-4 lg:px-24">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                <div className="md:w-1/2">
                    <h2 className="text-4xl font-bold mb-6 leading-snug">
                        Sự <span className="text-[#a69060]">Thuận Tiện</span> và{" "}
                        Linh Hoạt
                    </h2>
                    <p className="mb-10 text-lg md:w-5/6">
                        Bạn có thể truy cập Thư viện Sách Phi lợi nhuận của{" "}
                        <span className="text-[#a69060] text-xl font-medium">
                            Pegabook
                        </span>{" "}
                        bất cứ nơi nào có kết nối internet. Không chỉ có thể
                        mượn sách trực tuyến, mà còn có thể đặt lịch trước và
                        chọn địa điểm thuận tiện để nhận sách.
                    </p>
                    <Link to="/all-books">
                        <button className="block bg-[#a69060] text-white font-semibold px-5 py-2 rounded hover:bg-black transition-all duration-300">
                            Khám phá thêm
                        </button>
                    </Link>
                </div>

                <div className="md:w-1/2 ">
                    <img src={promoBannerPic} alt="" className="rounded-md" />
                </div>
            </div>
        </div>
    );
};

export default PromoBanner;
