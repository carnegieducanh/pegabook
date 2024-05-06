import { useEffect, useState } from "react";

import { Card } from "flowbite-react";
import { ImBooks } from "react-icons/im";
import { FaBookReader } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { MdPeopleAlt } from "react-icons/md";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [allMembers, setAllMembers] = useState([]);
    const [latestMembers, setLatestMembers] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [totalBooks, setTotalBooks] = useState(0); // State to hold total number of books
    const [totalMembers, setTotalMembers] = useState(0); // State to hold total number of members
    const [totalSharers, setTotalSharers] = useState(0); // State to hold total number of sharers
    const [totalBorrower, setTotalBorrower] = useState(0); // State to hold total number of borrower

    useEffect(() => {
        fetch("https://pega-book-server.onrender.com/all-members")
            .then((res) => res.json())
            .then((members) => {
                setAllMembers(members);
                setTotalMembers(members.length);
                const lastFiveMembers = members.slice(-5).reverse();
                setLatestMembers(lastFiveMembers);

                fetch("https://pega-book-server.onrender.com/all-books")
                    .then((res) => res.json())
                    .then((books) => {
                        setAllBooks(books);
                        setTotalBooks(books.length);
                        const lastFiveBooks = books.slice(-5).reverse();
                        setAllBooks(lastFiveBooks);

                        const borrowers = [
                            ...new Set(books.map((book) => book.borrowedBy)),
                        ].filter((borrower) => borrower);
                        setTotalBorrower(borrowers.length);

                        // Tìm mảng của memberID giống với memberID trong all-books
                        const relevantMembers = members.filter((member) =>
                            books.some(
                                (book) => book.memberID === member.memberID
                            )
                        );

                        setTotalSharers(relevantMembers.length);

                        // console.log("Relevant Members:", relevantMembers);
                    });
            });
    }, []);

    const matchedBooks = [];

    allBooks.forEach((book) => {
        const matchingMember = allMembers.find(
            (member) => member.memberID === book.memberID
        );
        if (matchingMember) {
            matchedBooks.push({
                bookTitle: book.bookTitle,
                authorName: book.authorName,
                imageUrl: book.imageUrl,
                category: book.category,
                memberName: matchingMember.memberName,
            });
        }
    });

    // console.log(matchedBooks);

    return (
        <div className="w-full">
            {/* Total Data */}
            <div className="px-4 my-12 grid grid-cols-2 lg:grid-cols-4 gap-4 h-40">
                <Card href="#" className="">
                    <div className="flex h-12 w-12 rounded-full bg-[#F4F1EA]">
                        <ImBooks className="h-7 w-7 m-auto" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {totalBooks} {/* Display total number of books */}
                    </h2>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Total Book
                    </p>
                </Card>
                <Card href="#" className="">
                    <div className="flex h-12 w-12 rounded-full bg-[#F4F1EA]">
                        <MdPeopleAlt className="h-7 w-7 m-auto" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {totalMembers}
                    </h2>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Total Member
                    </p>
                </Card>
                <Card href="#" className="">
                    <div className="flex h-12 w-12 rounded-full bg-[#F4F1EA]">
                        <BsFillPersonLinesFill className="h-7 w-7 m-auto" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {totalSharers}
                        {/* Display total number of unique sharers */}
                    </h2>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Total Sharer
                    </p>
                </Card>

                <Card href="#" className="">
                    <div className="flex h-12 w-12 rounded-full bg-[#F4F1EA]">
                        <FaBookReader className="h-7 w-7 m-auto" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {totalBorrower}
                    </h2>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Total Borrowers
                    </p>
                </Card>
            </div>

            {/* Total People & Books */}
            <div className="flex flex-col lg:flex-row mt-64 lg:mt-0">
                {/* People */}
                <div className="px-4 mb-12 w-full lg:w-1/3">
                    <Card className="max-w-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                                Latest Members
                            </h5>
                            <Link
                                to={"/admin/dashboard/manage-members"}
                                className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                            >
                                View all
                            </Link>
                        </div>
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-md leading-none text-gray-500 dark:text-white">
                                MEMBER NAME
                            </p>
                            <p className="text-md leading-none text-gray-500 dark:text-white">
                                WORK PLACE
                            </p>
                        </div>
                        <div>
                            {latestMembers &&
                                latestMembers.map((member, index) => (
                                    <div key={index}>
                                        <div className="flow-root">
                                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                                <li className="py-3 sm:py-4">
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
                                                        <div className="flex-1">
                                                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                                                {
                                                                    member.memberName
                                                                }
                                                            </p>
                                                            <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                                                                {
                                                                    member.memberID
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                            {member.workPlace}
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
                <div className="px-4 mb-12 w-full lg:w-2/3">
                    <Card>
                        <div className="mb-4 flex items-center justify-between">
                            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                                Latest Books
                            </h5>
                            <Link
                                to={"/admin/dashboard/manage"}
                                className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                            >
                                View all
                            </Link>
                        </div>
                        <div className="mb-4 flex gap-5 w-full">
                            <p className="text-md leading-none text-gray-500 dark:text-white w-2/4">
                                BOOK NAME
                            </p>
                            <p className="text-md leading-none text-gray-500 dark:text-white w-1/4">
                                SHARED BY
                            </p>
                            <p className="text-md leading-none text-gray-500 dark:text-white w-1/4">
                                CATEGORY
                            </p>
                        </div>
                        <div>
                            {matchedBooks.map((matchedBook, index) => (
                                <div key={index}>
                                    <div className="flow-root">
                                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                            <div className="py-3 sm:py-4 flex items-center">
                                                <div className="flex space-x-4 w-2/4 items-center">
                                                    <div className="border border-solid border-opacity-10 shadow-md hover:shadow-lg w-12 h-16">
                                                        <img
                                                            src={
                                                                matchedBook.imageUrl
                                                            }
                                                            alt=""
                                                            className="block w-12 h-16 object-cover shrink-0"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                                                            {
                                                                matchedBook.bookTitle
                                                            }
                                                        </p>
                                                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                                                            {
                                                                matchedBook.authorName
                                                            }
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="w-1/4 text-base font-semibold text-gray-900 dark:text-white">
                                                    {matchedBook.memberName}
                                                </div>

                                                <div className="w-1/4 text-base font-semibold text-gray-900 dark:text-white">
                                                    {matchedBook.category}
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

export default Dashboard;
