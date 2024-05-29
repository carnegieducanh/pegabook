import { useEffect, useState } from "react";

import { Link, useLoaderData, useParams } from "react-router-dom";
import PaginationButtons from "../../components/PaginationBtns";
import DashSearchBook from "./DashSearchBook";

const YourBooks = () => {
    const [member, setMember] = useState([]);
    const [allBooks, setAllBooks] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 12;

    const { id } = useParams();

    const { memberID } = useLoaderData();
    console.log(memberID);

    useEffect(() => {
        fetch(`https://pega-book-server.onrender.com/member/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setMember(data);
                // console.log("book shared by:", data);
            });
    }, []);

    useEffect(() => {
        fetch("https://pega-book-server.onrender.com/all-books")
            .then((res) => res.json())
            .then((data) => {
                setAllBooks(data);
                // console.log("All Books:", data);
            });
    }, []);

    // Lọc ra các cuốn sách có memberID trùng với memberID từ API `https://pega-book-server.onrender.com/member/${id}`

    const memberBooks = allBooks.filter((book) => book.sharerID === memberID);
    // console.log(memberBooks);

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = memberBooks
        ? memberBooks.slice(indexOfFirstBook, indexOfLastBook)
        : [];
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="px-4 my-12 w-full">
            <div className="flex flex-col lg:flex-row justify-between">
                <h2 className="mb-4 text-3xl font-bold">Sách của bạn</h2>

                <DashSearchBook memberBooks={memberBooks} />
            </div>
            <p className="px-4 my-4 underline">
                Chọn 1 cuốn sách để khám phá thêm
            </p>
            <div className="bg-[#fffffff2]">
                <div className="grid justify-between gap-x-8 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                    {currentBooks &&
                        currentBooks.map((book) => (
                            <Link
                                to={`/member/dashboard/book/${book._id}`}
                                key={book._id}
                            >
                                <div className="flex flex-col group justify-between gap-4 py-6">
                                    <div
                                        data-aos="zoom-in"
                                        className="flex gap-4"
                                    >
                                        <img
                                            src={book.imageUrl}
                                            alt=""
                                            className="h-52 w-36 border border-solid border-opacity-10 object-cover shadow-md hover:shadow-lg focus:shadow-xl shrink-0 rounded-tr-lg rounded-br-lg transform group-hover:scale-105 duration-300"
                                        />
                                        <div className="my-auto">
                                            <h2 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                                                <div className="line-clamp-2">
                                                    <p>{book.bookTitle}</p>
                                                </div>
                                            </h2>
                                            <p className="text-sm font-normal text-gray-700 dark:text-gray-400 line-clamp-2">
                                                {book.authorName}
                                            </p>

                                            <p className="text-sm font-normal text-gray-700 dark:text-gray-400 line-clamp-2 underline">
                                                {book.category}
                                            </p>

                                            <hr className="my-2" />

                                            <p className="text-sm line-clamp-2">
                                                {book.status}
                                            </p>
                                            <p className="text-sm font-semibold text-pink-800 line-clamp-1">
                                                {book.borrowedBy}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>

            <PaginationButtons
                booksPerPage={booksPerPage}
                totalBooks={memberBooks ? memberBooks.length : 0}
                paginate={paginate}
            />
        </div>
    );
};

export default YourBooks;
