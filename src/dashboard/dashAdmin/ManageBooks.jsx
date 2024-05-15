import { useEffect, useState } from "react";
import { Table } from "flowbite-react";

import PaginationButtons from "../../components/PaginationBtns";

import { RiDeleteBinLine } from "react-icons/ri";

const ManageBooks = () => {
    const [allBooks, setAllBooks] = useState([]);
    const [allMembers, setAllMembers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 10;
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        fetch("https://pega-book-server.onrender.com/all-books")
            .then((res) => res.json())
            .then((books) => {
                setAllBooks(books);
                // console.log("All Books:", books);
            });

        fetch("https://pega-book-server.onrender.com/all-members")
            .then((res) => res.json())
            .then((members) => {
                setAllMembers(members);
                // console.log("All members:", members);
            });
    }, []);

    const matchedBooks = [];

    allBooks.forEach((book) => {
        const matchingMember = allMembers.find(
            (member) => member.memberID === book.sharerID
        );
        if (matchingMember) {
            matchedBooks.push({
                _id: book._id,
                bookTitle: book.bookTitle,
                authorName: book.authorName,
                imageUrl: book.imageUrl,
                category: book.category,
                memberName: matchingMember.memberName,
            });
        }
    });

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = matchedBooks.slice(indexOfFirstBook, indexOfLastBook);
    // console.log(currentBooks);

    // delete a book
    const handleDelete = (id) => {
        // Sử dụng window.confirm để hiển thị thông báo
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this book?"
        );

        // Kiểm tra xem người dùng đã xác nhận hay không
        if (isConfirmed) {
            fetch(`https://pega-book-server.onrender.com/book/${id}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then(() => {
                    alert("Book is deleted successfully!");
                    location.reload();
                });
        }
    };

    return (
        <div className="px-4 my-12">
            <h2 className="mb-8 text-3xl font-bold">Manage Your Books</h2>

            {/* table for book data */}
            <Table className="lg:w-[1100px]">
                <Table.Head>
                    <Table.HeadCell>No.</Table.HeadCell>
                    <Table.HeadCell>Book Name</Table.HeadCell>
                    <Table.HeadCell>IMG</Table.HeadCell>
                    <Table.HeadCell>Author Name</Table.HeadCell>
                    <Table.HeadCell>Category</Table.HeadCell>
                    <Table.HeadCell>Shared by</Table.HeadCell>
                    {/* <Table.HeadCell>Borrowing By</Table.HeadCell> */}
                    <Table.HeadCell>
                        <span>Edit or Manage</span>
                    </Table.HeadCell>
                </Table.Head>
                {currentBooks.map((book, index) => (
                    <Table.Body className="divide-y" key={book._id}>
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {index + 1}
                            </Table.Cell>
                            <Table.Cell className="font-medium text-gray-900 dark:text-white w-1/5">
                                {book.bookTitle}
                            </Table.Cell>
                            <Table.Cell className="">
                                <img
                                    src={book.imageUrl}
                                    alt=""
                                    className="h-14 w-10 rounded-sm"
                                />
                            </Table.Cell>
                            <Table.Cell>{book.authorName}</Table.Cell>
                            <Table.Cell>{book.category}</Table.Cell>
                            <Table.Cell>{book.memberName}</Table.Cell>
                            {/* <Table.Cell>{book.borrowedBy}</Table.Cell> */}
                            <Table.Cell>
                                <div className="mx-auto my-auto flex ">
                                    <button
                                        onClick={() => handleDelete(book._id)}
                                        className="bg-red-600 px-4 py-1 font-semibold text-white rounded-sm"
                                    >
                                        <RiDeleteBinLine />
                                    </button>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                ))}
            </Table>

            <PaginationButtons
                booksPerPage={booksPerPage}
                totalBooks={allBooks.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
};

export default ManageBooks;
