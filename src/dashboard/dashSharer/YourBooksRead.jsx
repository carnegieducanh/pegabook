import { useEffect, useState } from "react";

import { Link, useLoaderData, useParams } from "react-router-dom";
import PaginationButtons from "../../components/PaginationBtns";

import { RiDeleteBinLine } from "react-icons/ri";

const YourBooksRead = () => {
    const [allBooksRead, setAllBooksRead] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 12;

    const { id } = useParams();
    // console.log(id);

    const { memberID } = useLoaderData();
    // console.log(memberID);

    useEffect(() => {
        fetch("https://pega-book-server.onrender.com/all-booksRead")
            .then((res) => res.json())
            .then((data) => {
                // Sử dụng Map để loại bỏ sách trùng tiêu đề
                const uniqueBooksMap = new Map();
                data.forEach((book) => {
                    if (!uniqueBooksMap.has(book.bookTitle)) {
                        uniqueBooksMap.set(book.bookTitle, book);
                    }
                });
                setAllBooksRead(Array.from(uniqueBooksMap.values()));
            });
    }, []);

    // delete a book
    const handleDelete = (id) => {
        // Sử dụng window.confirm để hiển thị thông báo
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this book?"
        );

        // Kiểm tra xem người dùng đã xác nhận hay không
        if (isConfirmed) {
            fetch(`https://pega-book-server.onrender.com/bookRead/${id}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then(() => {
                    alert("Book is deleted successfully!");
                    location.reload();
                });
        }
    };

    const memberBooks = allBooksRead.filter(
        (book) => book.borrowerID === memberID
    );
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
                <h2 className="mb-4 text-3xl font-bold">
                    Sách bạn đã đọc: {""} {memberBooks.length} cuốn sách
                </h2>
            </div>
            {/* <p className="px-4 my-4 underline">
                Chọn 1 cuốn sách để khám phá thêm
            </p> */}
            <div className="bg-[#fffffff2]">
                <div className="grid justify-between gap-x-8 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                    {currentBooks &&
                        currentBooks.map((book, index) => (
                            <div
                                key={index}
                                className="flex flex-col group justify-between gap-4 py-6"
                            >
                                <div data-aos="zoom-in" className="flex gap-4">
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
                                            Chia sẻ bởi
                                        </p>
                                        <p className="text-sm font-semibold text-pink-800 line-clamp-1">
                                            {book.sharedBy}
                                        </p>
                                    </div>
                                </div>
                                <a
                                    onClick={() => handleDelete(book._id)}
                                    className="cursor-pointer hover:underline w-1/2 flex items-center gap-2"
                                >
                                    <RiDeleteBinLine /> Xóa sách
                                </a>
                            </div>
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

export default YourBooksRead;
