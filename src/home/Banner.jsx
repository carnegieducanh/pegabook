import BannerCard from "./BannerCard";
import SearchBooks from "../components/SearchBooks";

const Banner = () => {
    return (
        <div className="px-8 lg:px-24 bg-gray-200 shadow-md flex items-center">
            <div className="flex w-full flex-col md:flex-row justify-between items-center gap-12 py-28 md:py-40">
                {/* left side */}
                <div className="md:w-1/2 space-y-8 h-full">
                    <h2 className="text-4xl font-bold leading-snug text-black">
                        Thư viện Sách Phi lợi nhuận - Nguồn tri thức miễn phí
                        cho những người đặc biệt, những tâm hồn sáng tạo{" "}
                        <span className="text-[#a69060]">
                            tại Pegabook Japan!
                        </span>
                    </h2>
                    <p className="md:w-4/5 text-lg">
                        Chào mừng các thành viên Việt Nam của{" "}
                        <span className="text-[#a69060] text-xl font-medium">
                            Pegabook
                        </span>{" "}
                        đến với Thư viện Sách Phi lợi nhuận. Tại đây,{" "}
                        <span className="text-[#a69060] text-xl font-medium">
                            Pegabook
                        </span>{" "}
                        cam kết mang đến cho bạn không gian đọc sách độc đáo và
                        phong phú để nâng cao kiến thức và tận hưởng niềm đam mê
                        đọc sách của mình.
                    </p>
                    <div>
                        <SearchBooks />
                    </div>
                </div>

                {/* right side */}
                <div>
                    <BannerCard></BannerCard>
                </div>
            </div>
        </div>
    );
};

export default Banner;
