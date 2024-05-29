import React, { useEffect, useState } from "react";
import PaginationButtons from "../components/PaginationBtns";
import { Link } from "react-router-dom";
import ImageBanner from "../components/ImageBanner";
import SpinnerLoading from "../components/SpinnerLoading";
import ViewsBook from "../OurBooks/ViewsBook";
import SearchBooks from "../components/SearchBooks";

const AllBooks = () => {
    const [booksData, setBooksData] = useState([]);
    const [membersData, setMembersData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 12;
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        fetch("https://pega-book-server.onrender.com/all-books")
            .then((res) => res.json())
            .then((books) => setBooksData(books.reverse()));

        fetch("https://pega-book-server.onrender.com/all-members")
            .then((res) => res.json())
            .then((members) => {
                setMembersData(members);
            });
    }, []);

    const matchedBooks = [];

    booksData.forEach((book) => {
        const matchingMember = membersData.find(
            (member) => member.memberID === book.sharerID
        );

        if (matchingMember) {
            matchedBooks.push({
                _id: book._id,
                bookTitle: book.bookTitle,
                authorName: book.authorName,
                imageUrl: book.imageUrl,
                status: book.status,
                memberName: matchingMember.memberName,
                borrowedBy: book.borrowedBy,
            });
        }
    });

    useEffect(() => {
        // Cuộn lên trên khi component được render
        window.scrollTo(0, 0);
        return () => {};
    });

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = matchedBooks.slice(indexOfFirstBook, indexOfLastBook);

    return (
        <div className="flex flex-col min-h-screen">
            <ImageBanner />

            <ViewsBook headline="Xem nhiều nhất" />

            <div className="my-10 px-4 lg:px-24 bg-[#fffffff2]">
                <div className="mb-12">
                    <SearchBooks />
                </div>
                <h2 className="text-4xl font-bold font-title text-left">
                    All books are here
                </h2>

                {currentBooks.length > 0 ? (
                    <div className="grid justify-between gap-x-8 my-12 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                        {currentBooks.map((book) => (
                            <Link to={`/book/${book._id}`} key={book._id}>
                                <div className="flex gap-4 py-6">
                                    <img
                                        src={book.imageUrl}
                                        alt=""
                                        className="h-52 w-36 border border-solid border-opacity-10 transform hover:scale-105 duration-300 object-cover shrink-0 shadow-md rounded-tr-xl rounded-br-xl hover:shadow-lg focus:shadow-xl"
                                    />
                                    <div className="my-auto">
                                        <h2 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                                            <div className="line-clamp-2">
                                                <p>{book.bookTitle}</p>
                                            </div>
                                        </h2>
                                        <p className="text-sm font-normal text-gray-700 dark:text-gray-400 line-clamp-1">
                                            {book.authorName}
                                        </p>
                                        <p className="text-sm mt-2">
                                            Chia sẻ bởi:{" "}
                                            <span className="font-semibold dark:text-gray-400 text-[#825445] hover:underline cursor-pointer line-clamp-1">
                                                {book.memberName}
                                            </span>
                                        </p>
                                        <hr className="my-2 text-sm" />
                                        <p className="font-semibold underline text-pink-800">
                                            {book.status}
                                        </p>
                                        <p className="font-semibold text-sm text-gray-700 line-clamp-1">
                                            {book.borrowedBy}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <SpinnerLoading />
                )}
                <PaginationButtons
                    booksPerPage={booksPerPage}
                    totalBooks={matchedBooks.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
};
export default AllBooks;
