import BannerCard from "./BannerCard";
import SearchBooks from "../components/SearchBooks";

const Banner = () => {
  return (
    <div className="bg-gray-200 px-4 shadow-md lg:px-24">
      <div className="flex flex-col justify-center gap-12 py-28 md:flex-row md:justify-between md:py-40">
        {/* left side */}
        <div className="h-full space-y-8 md:w-1/2">
          <h2 className="font-title text-4xl font-bold leading-snug text-black">
            Thư viện Sách Phi lợi nhuận{" "}
            <span className="text-[#a69060]">Pegabook Japan</span>
          </h2>
          <p className="text-lg md:w-4/5">
            Là không gian chia sẻ tri thức, nơi bạn có thể tiếp cận những cuốn
            sách giá trị hoàn toàn miễn phí. Thư viện được xây dựng với mong
            muốn kết nối sách với người đọc, gìn giữ và lan tỏa tri thức đến
            cộng đồng những người yêu sách và học hỏi.
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
