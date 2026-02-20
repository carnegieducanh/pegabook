import React, { useEffect, useState } from "react";
import PaginationButtons from "../components/PaginationBtns";
import { ImProfile } from "react-icons/im";
import { Link } from "react-router-dom";
import ImageBanner from "../components/ImageBanner";
import SpinnerLoading from "../components/SpinnerLoading";

const Sharers = () => {
  const [allMembers, setAllMembers] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 12;

  useEffect(() => {
    // Cuộn lên trên khi component được render
    window.scrollTo(0, 0);

    // Cleanup effect để tránh việc thực hiện multiple subscriptions nếu có sự thay đổi trong component
    return () => {};
  });

  const [matchedMembers, setMatchedMembers] = useState([]);
  const filteredMembers = matchedMembers.filter(
    (member) => member.sharedBooksCount > 0,
  );

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

              // Thêm thông tin của thành viên và số lượng sách đã chia sẻ vào mảng matchedMembersData
              matchedMembersData.push({
                member_id: member._id,
                memberID: member.memberID,
                memberName: member.memberName,
                memberAvatar: member.memberAvatar,
                workPlace: member.workPlace,
                comment: member.comment,
                sharedBooksCount: matchedBooks.length,
              });
            });

            // Cập nhật state matchedMembers với mảng matchedMembersData
            setMatchedMembers(matchedMembersData);
          });
      });
  }, []);

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers
    ? filteredMembers.slice(indexOfFirstMember, indexOfLastMember)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex min-h-screen flex-col">
      <ImageBanner />

      <div className="bg-[#fffffff2] px-4 py-10 dark:bg-[#181a1b] lg:px-36">
        <h2 className="text-left font-title text-3xl">Về người chia sẻ</h2>
        <p className="pl-2 pt-4 text-left text-sm">FEATURED SHARERS</p>
        {currentMembers.length > 0 ? (
          <div className="grid grid-cols-1 justify-between gap-x-8 sm:grid-cols-2 md:grid-cols-3">
            {currentMembers &&
              currentMembers.map((member, index) => (
                <div key={index}>
                  <Link
                    to={`/member/${member.member_id}`}
                    className="flex gap-4 pt-6"
                  >
                    <div className="h-20 w-20 rounded-full border border-solid border-opacity-10 shadow-md hover:shadow-lg">
                      <img
                        src={member.memberAvatar}
                        alt=""
                        className="block h-20 w-20 shrink-0 rounded-full object-cover"
                      />
                    </div>
                    <div className="">
                      <h2 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                        <div className="line-clamp-2">
                          <p>{member.memberName}</p>
                        </div>
                      </h2>
                      <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                        {member.workPlace}
                      </p>
                      <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                        Đã chia sẻ: {member.sharedBooksCount} cuốn sách
                      </p>
                      <div className="flex items-center gap-1">
                        <ImProfile />
                        <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                          Xem profile
                        </p>
                      </div>
                    </div>
                  </Link>
                  <hr className="my-2 inline-block w-full" />
                  <p className="w-full">{member.comment}</p>
                </div>
              ))}
          </div>
        ) : (
          <SpinnerLoading />
        )}
      </div>

      <PaginationButtons
        booksPerPage={membersPerPage}
        totalBooks={currentMembers ? currentMembers.length : 0}
        paginate={paginate}
      />
    </div>
  );
};

export default Sharers;
