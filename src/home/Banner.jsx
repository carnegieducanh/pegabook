import BannerCard from "./BannerCard";
import SearchBooks from "../components/SearchBooks";

const Banner = () => {
    return (
        <div className="px-4 lg:px-24 bg-gray-200 shadow-md">
            <div className="flex flex-col md:flex-row md:justify-between justify-center gap-12 py-28 md:py-40">
                {/* left side */}
                <div className="md:w-1/2 space-y-8 h-full">
                    <h2 className="text-4xl font-bold font-title leading-snug text-black">
                        Thư viện Sách Phi lợi nhuận - Nguồn tri thức mở cho
                        những con người đặc biệt, những tâm hồn sáng tạo{" "}
                        <span className="text-[#a69060]">
                            tại Pegabook Japan!
                        </span>
                    </h2>
                    <p className="md:w-4/5 text-lg">
                        Chào mừng các bạn đến với Thư viện Sách Phi lợi nhuận.
                        Tại đây,{" "}
                        <span className="text-[#a69060] text-xl font-medium">
                            Pegabook
                        </span>{" "}
                        mong muốn mang đến cho bạn không gian đọc sách độc đáo
                        và phong phú để nâng cao kiến thức và tận hưởng niềm đam
                        mê đọc sách của mình.
                    </p>
                    <div className="md:w-2/3">
                        <SearchBooks />
                    </div>
                </div>

                {/* Right side */}
                <div>
                    <BannerCard></BannerCard>
                </div>
            </div>
        </div>
    );
};

export default Banner;
