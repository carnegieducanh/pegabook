import { useEffect, useState } from "react";

import { Card } from "flowbite-react";
import { ImBooks } from "react-icons/im";
import { Link, useLoaderData } from "react-router-dom";
import { FaBookReader } from "react-icons/fa";

const DashSharer = () => {
    const [borrower, setBorrower] = useState([]);
    const [allBooks, setAllBooks] = useState([]);

    const [showBooks, setShowBooks] = useState([]);

    const { memberID, _id } = useLoaderData();
    // console.log(memberID);

    useEffect(() => {
        fetch("https://pega-book-server.onrender.com/all-members")
            .then((res) => res.json())
            .then((data) => {
                setBorrower(data);
            });
    }, []);

    useEffect(() => {
        fetch("https://pega-book-server.onrender.com/all-books")
            .then((res) => res.json())
            .then((data) => {
                setShowBooks(data);
                setAllBooks(data);
            });
    }, []);

    // Lọc ra các cuốn sách có sharerID trùng với memberID thành viên
    const yourBooks = showBooks.filter((book) => book.sharerID === memberID);
    const lastFiveBooks = yourBooks.slice(-5).reverse();

    // Lọc ra các cuốn sách có người mượn
    const borrowers = yourBooks.filter((book) => book.borrowedBy);

    // Lọc ra các thành viên có memberID giống với borrowerID của các cuốn sách
    const matchedMembers = borrower.filter((member) =>
        yourBooks.some((book) => book.borrowerID === member.memberID)
    );
    // console.log(matchedMembers);

    const lastFiveMembers = matchedMembers.slice(-5).reverse();

    // Lọc ra các cuốn sách có borrowerID trùng với memberID từ API `https://pega-book-server.onrender.com/member/${id}`

    const yourBorrowedBooks = allBooks.filter(
        (book) => book.borrowerID === memberID
    );

    return (
        <div className="w-full">
            {/* Total Data */}
            <div className="px-4 my-12 grid grid-cols-2 lg:grid-cols-4 gap-4 h-40">
                {/* <Card href="#" className="invisible"></Card> */}
                <Card href={`/member/dashboard/manage/${_id}`} className="">
                    <div className="flex h-12 w-12 rounded-full bg-[#F4F1EA]">
                        <ImBooks className="h-7 w-7 m-auto" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {yourBooks.length}
                    </h2>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Tổng số sách bạn có
                    </p>
                </Card>

                <Card
                    href={`/member/dashboard/borrowed-book/${_id}`}
                    className=""
                >
                    <div className="flex h-12 w-12 rounded-full bg-[#F4F1EA]">
                        <FaBookReader className="h-7 w-7 m-auto" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {yourBorrowedBooks.length}
                    </h2>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Sách bạn đang mượn
                    </p>
                </Card>

                <Card
                    href={`/member/dashboard/manage/borrower/${_id}`}
                    className=""
                >
                    <div className="flex h-12 w-12 rounded-full bg-[#F4F1EA]">
                        <FaBookReader className="h-7 w-7 m-auto" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {borrowers.length}
                    </h2>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Sách bạn đang cho mượn
                    </p>
                </Card>

                <Card
                    href={`/member/dashboard/manage/borrower/${_id}`}
                    className=""
                >
                    <div className="flex h-12 w-12 rounded-full bg-[#F4F1EA]">
                        <FaBookReader className="h-7 w-7 m-auto" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {matchedMembers.length}
                    </h2>
                    <p className="font-normal text-gray-700 dark:text-gray-400 ">
                        Số người mượn sách bạn
                    </p>
                </Card>
            </div>

            {/* Total People & Books */}
            <div className="flex flex-col gap-6 lg:flex-row mt-[300px] lg:mt-0">
                {/* People */}
                <div className="px-4 w-full lg:w-1/3">
                    <Card className="">
                        <div className="mb-4 flex items-center justify-between">
                            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                                Người mượn sách
                            </h5>
                            <Link
                                to={`/member/dashboard/manage/borrower/${_id}`}
                                className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                            >
                                View all
                            </Link>
                        </div>
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-md leading-none text-gray-500 dark:text-white">
                                MEMBER NAME
                            </p>
                        </div>
                        <div>
                            {lastFiveMembers &&
                                lastFiveMembers.map((member, index) => (
                                    <div key={index}>
                                        <div className="flow-root">
                                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                                <li className="py-3 sm:py-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-4">
                                                            <div className="border border-solid border-opacity-10 shadow-md hover:shadow-lg w-16 h-16 rounded-full shrink-0">
                                                                <img
                                                                    src={
                                                                        member.memberAvatar
                                                                    }
                                                                    alt=""
                                                                    className="block w-16 h-16 rounded-full object-cover shrink-0"
                                                                />
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                                                    {
                                                                        member.memberName
                                                                    }
                                                                </p>
                                                                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                                                                    {
                                                                        member.workPlace
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </Card>
                </div>

                {/* Books */}
                <div className="px-4 w-full lg:w-2/3">
                    <Card>
                        <div className="mb-4 flex items-center justify-between">
                            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                                Sách của bạn
                            </h5>
                            <Link
                                to={`/member/dashboard/manage/${_id}`}
                                className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                            >
                                View all
                            </Link>
                        </div>
                        <div className="mb-4 flex gap-5 items-center justify-between">
                            <p className="text-md leading-none text-gray-500 dark:text-white w-2/4">
                                BOOK NAME
                            </p>
                            <p className="text-md leading-none text-gray-500 dark:text-white hidden md:block w-1/4">
                                CATEGORY
                            </p>
                            <p className="text-md leading-none text-gray-500 dark:text-white text-right w-1/4">
                                STATUS
                            </p>
                        </div>
                        <div>
                            {lastFiveBooks &&
                                lastFiveBooks.map((book, index) => (
                                    <div key={index}>
                                        <div className="flow-root">
                                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                                <div className="py-3 sm:py-4 flex items-center justify-center">
                                                    <div className="flex gap-4 w-full md:w-2/4 items-center">
                                                        <div className="border border-solid border-opacity-10 shadow-md hover:shadow-lg w-12 h-16">
                                                            <img
                                                                src={
                                                                    book.imageUrl
                                                                }
                                                                alt=""
                                                                className="block w-12 h-16 object-cover shrink-0"
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                                                                {book.bookTitle}
                                                            </p>
                                                            <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                                                                {
                                                                    book.authorName
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="w-1/3">
                                                        <p className="text-center hidden md:block">
                                                            {book.category}
                                                        </p>
                                                    </div>
                                                    <div className="w-2/3 md:w-1/3">
                                                        <div className="flex flex-col items-end text-base text-gray-900 dark:text-white">
                                                            <p className="text-right">
                                                                {book.status}
                                                            </p>
                                                            <p className="font-semibold text-right">
                                                                {
                                                                    book.borrowedBy
                                                                }
                                                            </p>
                                                            <div className="flex gap-1 text-right whitespace-nowrap">
                                                                <p>
                                                                    {
                                                                        book.borrowedDate
                                                                    }
                                                                </p>{" "}
                                                                -
                                                                <p>
                                                                    {
                                                                        book.returnDate
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DashSharer;
