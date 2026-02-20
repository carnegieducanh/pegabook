import { Avatar, Blockquote } from "flowbite-react";
import ImageBanner from "../components/ImageBanner";
import { useEffect, useState } from "react";
import SpinnerLoading from "./SpinnerLoading";

const Gratitude = () => {
  const [allMembers, setAllMembers] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [matchedMembers, setMatchedMembers] = useState([]);
  const filteredMembers = matchedMembers.filter(
    (member) => member.sharedBooksCount > 0,
  );

  useEffect(() => {
    // Cuộn lên trên khi component được render
    window.scrollTo(0, 0);

    return () => {};
  });

  useEffect(() => {
    fetch("https://pega-book-server.onrender.com/all-members")
      .then((res) => res.json())
      .then((members) => {
        setAllMembers(members);

        fetch("https://pega-book-server.onrender.com/all-books")
          .then((res) => res.json())
          .then((books) => {
            setAllBooks(books);

            const matchedMembersData = [];

            // Duyệt qua từng thành viên
            members.forEach((member) => {
              // Tìm các cuốn sách của thành viên hiện tại
              const matchedBooks = books.filter(
                (book) => book.sharerID === member.memberID,
              );

              matchedMembersData.push({
                memberName: member.memberName,
                sharedBooksCount: matchedBooks.length,
              });
            });

            setMatchedMembers(matchedMembersData);
          });
      });
  }, []);
  return (
    <div className="min-h-screen dark:bg-[#181a1b]">
      <ImageBanner />

      <div className="bg-[#fffffff2] px-4 py-10 dark:bg-[#181a1b] lg:px-36">
        <h2 className="text-left font-title text-4xl font-bold">Lời cảm ơn</h2>

        <div className="my-10 text-lg">
          <p className="mb-3 text-gray-700 dark:text-[#aca49a]">
            Team Pegabook xin bày tỏ sự trân trọng biết ơn đến tất cả các thành
            viên vì những đóng góp to lớn trong việc xây dựng và phát triển thư
            viện sách chia sẻ kiến thức này. Sự nhiệt tình và sáng tạo của các
            bạn đã biến Pegabook từ những ý tưởng mơ hồ trở thành hiện thực, tạo
            nên một thư viện sách như ngày hôm nay.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
            <Blockquote className="mb-3 border-l-4 border-gray-300 bg-gray-50 p-4 dark:border-gray-500 dark:bg-[#1b1d1e]">
              <p className="text-lg">
                🙏 Gửi lời cảm ơn chân thành đến tất cả những thành viên đã và
                đang chia sẻ những cuốn sách hay tới Pegabook:
              </p>{" "}
              {filteredMembers.length > 0 ? (
                <div className="py-2 text-xl font-semibold italic text-[#99154b] dark:text-[#ea6391]">
                  "
                  {filteredMembers &&
                    filteredMembers.map((member, index) => (
                      <span key={index}>{member.memberName}, </span>
                    ))}
                  ..."
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <SpinnerLoading />
                </div>
              )}
            </Blockquote>
          </div>
        </div>
        <figcaption className="flex space-x-3 text-lg">
          <div className="flex items-center divide-x-2 divide-gray-300">
            <cite className="pr-3 font-medium text-gray-900 dark:text-[#cdc4b7]">
              Người đại diện
            </cite>
            <cite className="pl-3 text-gray-700 dark:text-[#aca49a]">
              thành viên team Pegabook
            </cite>
          </div>
        </figcaption>
      </div>
    </div>
  );
};

export default Gratitude;
