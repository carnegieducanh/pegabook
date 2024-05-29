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
        (member) => member.sharedBooksCount > 0
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
                                (book) => book.sharerID === member.memberID
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
        <div className="flex flex-col min-h-screen">
            <ImageBanner />

            <div className="py-10 px-4 lg:px-36 bg-[#fffffff2]">
                <h2 className="text-3xl text-left font-title">
                    Về người chia sẻ
                </h2>
                <p className="text-sm text-left pl-2 pt-4">FEATURED SHARERS</p>
                {currentMembers.length > 0 ? (
                    <div className="grid justify-between gap-x-8 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                        {currentMembers &&
                            currentMembers.map((member, index) => (
                                <div key={index}>
                                    <Link
                                        to={`/member/${member.member_id}`}
                                        className="flex gap-4 pt-6"
                                    >
                                        <div className="border border-solid border-opacity-10 shadow-md hover:shadow-lg w-20 h-20 rounded-full">
                                            <img
                                                src={member.memberAvatar}
                                                alt=""
                                                className="block w-20 h-20 rounded-full object-cover shrink-0"
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
                                                Đã chia sẻ:{" "}
                                                {member.sharedBooksCount} cuốn
                                                sách
                                            </p>
                                            <div className="flex gap-1 items-center">
                                                <ImProfile />
                                                <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                                                    Xem profile
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                    <hr className="inline-block my-2 w-full" />
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
