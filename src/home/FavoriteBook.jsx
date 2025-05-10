import { useEffect, useState } from "react";
import FavoriteBookImg from "../assets/favoritebook.jpg";
import { Link } from "react-router-dom";
import { Avatar } from "flowbite-react";
import SpinnerLoading from "../components/SpinnerLoading";

const FavoriteBook = () => {
  const [allMembers, setAllMembers] = useState([]);
  const [latestMembers, setLatestMembers] = useState([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0); // State to hold total number of books
  const [totalViews, setTotalViews] = useState(0); // State to hold total number of views

  useEffect(() => {
    fetch("https://pega-book-server.onrender.com/all-members")
      .then((res) => res.json())
      .then((members) => {
        setAllMembers(members);
        setTotalMembers(members.length);
        const lastFiveMembers = members.slice(-7).reverse();
        setLatestMembers(lastFiveMembers);

        fetch("https://pega-book-server.onrender.com/all-books")
          .then((res) => res.json())
          .then((books) => {
            // setAllBooks(books);
            setTotalBooks(books.length);

            // Ensure views are numbers and calculate total views
            const totalBookViews = books.reduce((sum, book) => {
              const views = parseInt(book.views, 10);
              return sum + (isNaN(views) ? 0 : views);
            }, 0);

            setTotalViews(totalBookViews);
          });
      });
  }, []);

  return (
    <div className="my-20 flex flex-col-reverse items-center justify-between gap-12 px-4 lg:flex-row lg:px-24">
      <div className="flex-1">
        <img src={FavoriteBookImg} alt="" className="rounded" />
      </div>

      <div className="flex-2 space-y-6 lg:w-1/2">
        <h2 className="my-5 font-title text-5xl font-bold leading-snug md:w-3/4">
          🌈 Sách gì cũng có – Trừ sách nấu món ngoài hành tinh!
        </h2>
        <p className="mb-10 text-lg md:w-5/6">
          Tại{" "}
          <span className="text-xl font-medium text-[#a69060]">Pegabook</span> ,
          chúng tôi tự hào sở hữu một bộ sưu tập sách “đa vũ trụ” – từ văn hóa,
          nghệ thuật, đến khoa học, kỹ thuật và những lĩnh vực mà bạn có thể
          chưa từng nghĩ tới. Dù bạn là người mê lịch sử, đam mê vẽ vời, hay tò
          mò về cách vũ trụ vận hành (hoặc đơn giản chỉ muốn biết cách pha trà
          chuẩn Nhật), thì{" "}
          <span className="text-xl font-medium text-[#a69060]">Pegabook</span>{" "}
          luôn có thứ gì đó để bạn "mê như điếu đổ". Đọc một cuốn sách là mở ra
          một thế giới – mà ở đây, thế giới đó hơi... quá nhiều!
        </p>
        {/* stats */}
        <div className="my-14 flex flex-row justify-between gap-6 md:w-3/4">
          <div>
            <h3 className="text-3xl font-bold">{totalMembers}+</h3>
            <p className="text-base">Thành viên</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">{totalBooks}+</h3>
            <p className="text-base">Cuốn sách</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">{totalViews}+</h3>
            <p className="text-base">Lượt xem</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {latestMembers.length > 0 ? (
            <Avatar.Group>
              {latestMembers &&
                latestMembers.map((member, index) => (
                  <div key={index}>
                    <Avatar img={member.memberAvatar} rounded stacked />
                  </div>
                ))}

              <Avatar.Counter total={9} href="/Members" />
            </Avatar.Group>
          ) : (
            <SpinnerLoading />
          )}
        </div>

        <Link to="/Members">
          <button className="mt-12 block rounded bg-[#a69060] px-5 py-2 text-lg text-white transition-all duration-300 hover:bg-black">
            Khám phá thêm
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FavoriteBook;
