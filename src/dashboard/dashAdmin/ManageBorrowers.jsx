import React, { useEffect, useState } from "react";

import { Link, useLoaderData } from "react-router-dom";
import API_BASE_URL from "../../config/api";

const ManageBorrowers = () => {
    const [borrower, setBorrower] = useState([]);

    const [allBookData, setAllBooksData] = useState([]);

    // const { memberID } = useLoaderData();

    useEffect(() => {
        fetch(`${API_BASE_URL}/all-members`)
            .then((res) => res.json())
            .then((borrowers) => {
                setBorrower(borrowers);

                fetch(`${API_BASE_URL}/all-books`)
                    .then((res) => res.json())
                    .then((books) => {
                        setAllBooksData(books);
                    });
            });
    }, []);

    // Lọc ra các cuốn sách đang chia sẻ
    // const yourBooks = allBookData.filter((book) => book.sharerID === memberID);

    // Lọc ra các cuốn sách có người mượn
    const borrowedBooks = allBookData.filter((book) => book.borrowerID);

    // Lọc ra các người mượn
    const borrowers = borrower.filter((member) =>
        allBookData.some((book) => book.borrowerID === member.memberID)
    );

    // Gom nhóm borrowedBooks theo borrowerID và đếm số lượng phần tử trong mỗi nhóm
    const borrowedBooksGrouped = borrowedBooks.reduce((acc, book) => {
        acc[book.borrowerID] = (acc[book.borrowerID] || 0) + 1;
        return acc;
    }, {});

    // Tính số lượng trùng nhau của từng memberID trong borrowedBooks so với memberID trong borrowers
    const memberBorrowed = borrowers.map((member) => ({
        memberName: member.memberName,
        memberAvatar: member.memberAvatar,
        memberID: member.memberID,
        workPlace: member.workPlace,
        borrowedCount: borrowedBooksGrouped[member.memberID] || 0,
        borrowedBooksIMG: borrowedBooks
            .filter((book) => book.borrowerID === member.memberID)
            .map((book) => ({
                imageUrl: book.imageUrl,
                bookId: book._id,
            })),
    }));

    // console.log("số lượng trùng nhau:", memberBorrowed);

    return (
        <div className="px-4 py-12 w-full">
            <h2 className="mb-8 text-3xl font-bold">Thành viên đang mượn</h2>
            <div className="grid justify-between gap-x-8 lg:grid-cols-3 md:grid-cols-2 ">
                {memberBorrowed &&
                    memberBorrowed.map((member, index) => (
                        <div key={index}>
                            <div className="flex gap-4 pt-6">
                                <div className="border border-solid border-opacity-10 shadow-md hover:shadow-lg w-16 h-16 rounded-full">
                                    <img
                                        src={member.memberAvatar}
                                        alt=""
                                        className="block w-16 h-16 rounded-full object-cover shrink-0"
                                    />
                                </div>
                                <div className="w-[70%]">
                                    <h2 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                                        <div className="line-clamp-2">
                                            <p>{member.memberName}</p>
                                        </div>
                                    </h2>
                                    <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                                        {member.workPlace}
                                    </p>
                                    <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                                        Đang mượn: {member.borrowedCount} cuốn
                                        sách
                                    </p>

                                    <hr className="inline-block my-2 w-full" />

                                    <div className="grid justify-between gap-4 grid-cols-3">
                                        {member.borrowedBooksIMG.map(
                                            (book, index) => (
                                                <Link
                                                    key={index}
                                                    // to={`/member/dashboard/book/${book.bookId}`}
                                                >
                                                    <img
                                                        src={book.imageUrl}
                                                        alt=""
                                                        className="h-20 w-14 rounded-sm"
                                                    />
                                                </Link>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ManageBorrowers;
