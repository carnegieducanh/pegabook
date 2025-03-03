import { useEffect, useState } from "react";

import { Link, useLoaderData, useParams } from "react-router-dom";
import PaginationButtons from "../../components/PaginationBtns";

const BorrowedBooks = () => {
    const [member, setMember] = useState([]);
    const [allBooks, setAllBooks] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 12;

    const { id } = useParams();

    const { memberID } = useLoaderData();
    // console.log(memberID);

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

    // Lọc ra các cuốn sách có borrowerID trùng với memberID từ API `https://pega-book-server.onrender.com/member/${id}`

    const memberBooks = allBooks.filter((book) => book.borrowerID === memberID);

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = memberBooks
        ? memberBooks.slice(indexOfFirstBook, indexOfLastBook)
        : [];
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="px-4 my-12 w-full">
            <h2 className="mb-4 text-3xl font-bold">Sách bạn đang mượn</h2>
            <p className="px-4 underline">Chọn 1 cuốn sách bạn muốn trả</p>
            <div className=" lg:px-10 bg-[#fffffff2]">
                <div className="grid justify-between gap-x-8 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                    {currentBooks &&
                        currentBooks.map((book) => (
                            <Link
                                to={`/member/dashboard/return-book/${book._id}`}
                                key={book._id}
                            >
                                <div className="flex flex-col justify-between gap-4 py-6">
                                    <div className="flex h-full gap-4 ">
                                        <img
                                            src={book.imageUrl}
                                            alt=""
                                            className="h-52 w-36 border border-solid border-opacity-10 transform hover:scale-105 duration-300 object-cover shadow-md hover:shadow-lg focus:shadow-xl shrink-0 rounded-tr-lg rounded-br-lg"
                                        />
                                        <div className="my-auto">
                                            <h2 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                                                <div className="line-clamp-2">
                                                    <p>{book.bookTitle}</p>
                                                </div>
                                            </h2>
                                            <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                                                {book.authorName}
                                            </p>
                                            <hr className="my-2" />
                                        </div>
                                    </div>
                                    <div className="text-gray-500">
                                        <p className=" text-sm ">
                                            {book.bookedTime}
                                        </p>
                                        <div className="flex gap-2 text-black">
                                            <p>{book.borrowedDate}</p>
                                            {"-"}
                                            <p>{book.returnDate}</p>
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

export default BorrowedBooks;
