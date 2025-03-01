import React, { useEffect, useState } from "react";
import PaginationButtons from "../components/PaginationBtns";
import ImageBanner from "../components/ImageBanner";
import SpinnerLoading from "../components/SpinnerLoading";
import NewMember from "./NewMember";

const Members = () => {
    const [allMembers, setAllMembers] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [allBooksRead, setAllBooksRead] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const membersPerPage = 12;

    useEffect(() => {
        // Cuộn lên trên khi component được render
        window.scrollTo(0, 0);

        // Cleanup effect để tránh việc thực hiện multiple subscriptions nếu có sự thay đổi trong component
        return () => {};
    });

    const [matchedMembers, setMatchedMembers] = useState([]);

    useEffect(() => {
        fetch("https://pega-book-server.onrender.com/all-members")
            .then((res) => res.json())
            .then((members) => {
                setAllMembers(members);

                fetch("https://pega-book-server.onrender.com/all-books")
                    .then((res) => res.json())
                    .then((books) => {
                        setAllBooks(books);

                        fetch(
                            "https://pega-book-server.onrender.com/all-booksRead"
                        )
                            .then((res) => res.json())
                            .then((data) => {
                                setAllBooksRead(data);

                                const matchedMembersData = [];

                                // Duyệt qua từng thành viên
                                members.forEach((member) => {
                                    // Tìm các cuốn sách của thành viên hiện tại
                                    const matchedBooks = books.filter(
                                        (book) =>
                                            book.sharerID === member.memberID
                                    );

                                    // Tìm các cuốn sách đang mượn
                                    const borrowingBooks = books.filter(
                                        (book) =>
                                            book.borrowerID === member.memberID
                                    );

                                    // Tìm các cuốn sách đã đọc
                                    const readBooks = data.filter(
                                        (readBook) =>
                                            readBook.borrowerID ===
                                            member.memberID
                                    );

                                    // Loại bỏ sách trùng tiêu đề bằng cách dùng Map
                                    const uniqueBooksMap = new Map();
                                    readBooks.forEach((book) => {
                                        if (
                                            !uniqueBooksMap.has(book.bookTitle)
                                        ) {
                                            uniqueBooksMap.set(
                                                book.bookTitle,
                                                book
                                            );
                                        }
                                    });
                                    const readBooksOnly = Array.from(
                                        uniqueBooksMap.values()
                                    );

                                    // Thêm thông tin của thành viên và số lượng sách đã chia sẻ vào mảng matchedMembersData
                                    matchedMembersData.push({
                                        memberID: member.memberID,
                                        memberName: member.memberName,
                                        memberAvatar: member.memberAvatar,
                                        workPlace: member.workPlace,
                                        comment: member.comment,
                                        sharedBooksCount: matchedBooks.length,
                                        borrowingBooksCount:
                                            borrowingBooks.length,
                                        readBooksCount: readBooksOnly.length,
                                    });
                                });

                                // Sắp xếp matchedMembersData theo readBooksCount từ cao đến thấp
                                matchedMembersData.sort(
                                    (a, b) =>
                                        b.readBooksCount - a.readBooksCount
                                );

                                // Cập nhật state matchedMembers với mảng matchedMembersData
                                setMatchedMembers(matchedMembersData);
                            });
                    });
            });
    }, []);

    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;
    const currentMembers = matchedMembers
        ? matchedMembers.slice(indexOfFirstMember, indexOfLastMember)
        : [];

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="flex flex-col min-h-screen">
            <ImageBanner />

            <div className="py-10 px-4 lg:px-36 bg-[#fffffff2]">
                <h2 className="text-3xl text-left font-title">Về thành viên</h2>

                <NewMember />
                <p className="text-md text-left text-[#99154b] font-medium pl-2 pt-4 underline">
                    Tất cả thành viên
                </p>
                {currentMembers.length > 0 ? (
                    <div className="grid justify-between gap-x-8 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                        {currentMembers &&
                            currentMembers.map((member, index) => (
                                <div key={index}>
                                    <div className="flex items-center gap-4 pt-6">
                                        <div className="border border-solid border-opacity-10 shadow-md hover:shadow-lg w-16 h-16 rounded-full">
                                            <img
                                                src={member.memberAvatar}
                                                alt=""
                                                className="block w-16 h-16 rounded-full object-cover shrink-0"
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
                                                Đang mượn: {""}
                                                {
                                                    member.borrowingBooksCount
                                                }{" "}
                                                cuốn sách
                                            </p>
                                            <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                                                Đã đọc: {""}
                                                {member.readBooksCount} cuốn
                                                sách
                                            </p>
                                        </div>
                                    </div>
                                    <hr className="inline-block my-2 w-full" />
                                    <p className="w-full">{member.comment}</p>
                                </div>
                            ))}
                    </div>
                ) : (
                    <SpinnerLoading />
                )}

                <PaginationButtons
                    booksPerPage={membersPerPage}
                    totalBooks={currentMembers ? currentMembers.length : 0}
                    paginate={paginate}
                />
            </div>
        </div>
    );
};

export default Members;
