import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import PaginationButtons from "../components/PaginationBtns";
import ToggleShowMore from "../components/ToggleShowMore";
import ImageBanner from "../components/ImageBanner";

const SingleMember = () => {
    const {
        _id,
        memberName,
        memberAvatar,
        workPlace,
        memberID,
        review,
        comment,
    } = useLoaderData();

    useEffect(() => {
        window.scrollTo(0, 0);

        return () => {};
    }, [_id]); // Thay đổi _id để trigger useEffect khi có sự thay đổi

    const [member, setMember] = useState([]);
    const [allBooks, setAllBooks] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 12;

    const { id } = useParams();
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
        <div className="min-h-screen">
            <ImageBanner />

            <div className="px-4 lg:px-24 py-10  bg-[#fffffff2]">
                <h2 className="text-4xl font-semibold">Về người chia sẻ</h2>

                <div className="mt-10 flex items-center gap-4">
                    <div className="border border-solid border-opacity-10 shadow-md hover:shadow-lg w-36 h-36 rounded-full">
                        <img
                            src={memberAvatar}
                            alt=""
                            className="rounded-full object-cover shrink-0 w-36 h-36"
                        />
                    </div>
                    <div className="text-lg">
                        <h2 className="font-bold tracking-tight text-gray-900 dark:text-white">
                            <div className="line-clamp-2">
                                <p>{memberName}</p>
                            </div>
                        </h2>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {workPlace}
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Đã chia sẻ: {currentBooks.length} cuốn sách
                        </p>
                    </div>
                </div>
                <hr className="block my-2 w-full lg:w-1/3" />
                <div className="text-lg">
                    <p className="w-full">
                        <span className="underline font-semibold">Review:</span>
                        <br />
                        <ToggleShowMore text={review} />
                    </p>
                    <p className="w-full mt-5">
                        <span className="underline font-semibold">
                            Comment:
                        </span>
                        <br />
                        {comment}
                    </p>
                </div>
            </div>
            <div className="px-4 lg:px-24">
                <h2 className="mb-4 text-3xl font-semibold">Sách đã chia sẻ</h2>
                <div className="bg-[#fffffff2]">
                    <div className="grid justify-between gap-x-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                        {currentBooks &&
                            currentBooks.map((book) => (
                                <Link to={`/book/${book._id}`}>
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

                                                <hr className="my-2" />

                                                <p className="text-sm line-clamp-2">
                                                    {book.status}
                                                </p>
                                                <p className="text-sm text-pink-700 font-semibold line-clamp-1">
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
                    totalBooks={currentBooks ? currentBooks.length : 0}
                    paginate={paginate}
                />
            </div>
        </div>
    );
};

export default SingleMember;
