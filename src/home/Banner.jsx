import BannerCard from "./BannerCard";
import SearchBooks from "../components/SearchBooks";

const Banner = () => {
  return (
    <div className="bg-gray-200 px-4 shadow-md lg:px-24">
      <div className="flex flex-col justify-center gap-12 py-28 md:flex-row md:justify-between md:py-40">
        {/* left side */}
        <div className="h-full space-y-8 md:w-1/2">
          <h2 className="font-title text-4xl font-bold leading-snug text-black">
            📚 Thư viện Sách Phi lợi nhuận – nơi tri thức không cần ví tiền, chỉ
            cần <span className="text-[#a69060]">ĐAM MÊ!</span>
          </h2>
          <p className="text-lg md:w-4/5">
            Chào mừng các bạn, những người tò mò (và có gu đọc sách tuyệt vời)!
            đến với{" "}
            <span className="text-xl font-medium text-[#a69060]">
              Thư viện Sách Phi lợi nhuận
            </span>{" "}
            của Pegabook Japan – nơi mà những cuốn sách hay đang chờ được “giải
            cứu” khỏi bụi thời gian và đến tay những tâm hồn sáng tạo như bạn.
            Hãy tự nhiên khám phá kho tàng tri thức này – không cần thẻ thành
            viên, không cần ví dày, chỉ cần một trái tim yêu sách và một chút
            thời gian rảnh rỗi!
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
