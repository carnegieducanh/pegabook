import { useEffect, useState } from "react";

import { useLoaderData, useParams } from "react-router-dom";
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
      "Are you sure you want to delete this book?",
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
    (book) => book.borrowerID === memberID,
  );
  console.log(memberBooks);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;

  const currentBooks = memberBooks
    ? memberBooks.slice(indexOfFirstBook, indexOfLastBook)
    : [];
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="my-12 w-full px-4">
      <div className="flex flex-col justify-between lg:flex-row">
        <h2 className="mb-4 text-3xl font-bold">
          Sách bạn đã đọc: {""} {memberBooks.length} cuốn sách
        </h2>
      </div>
      {/* <p className="px-4 my-4 underline">
                Chọn 1 cuốn sách để khám phá thêm
            </p> */}
      <div className="bg-veil">
        <div className="grid justify-between gap-x-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {currentBooks &&
            currentBooks.map((book, index) => (
              <div
                key={index}
                className="group flex flex-col justify-between gap-4 py-6"
              >
                <div data-aos="zoom-in" className="flex gap-4">
                  <img
                    src={book.imageUrl}
                    alt=""
                    className="h-52 w-36 shrink-0 transform rounded-br-lg rounded-tr-lg border border-solid border-opacity-10 object-cover shadow-md duration-300 hover:shadow-lg focus:shadow-xl group-hover:scale-105"
                  />
                  <div className="my-auto">
                    <h2 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                      <div className="line-clamp-2">
                        <p>{book.bookTitle}</p>
                      </div>
                    </h2>
                    <p className="line-clamp-2 text-sm font-normal text-gray-700 dark:text-gray-400">
                      {book.authorName}
                    </p>

                    <p className="line-clamp-2 text-sm font-normal text-gray-700 underline dark:text-gray-400">
                      {book.category}
                    </p>

                    <hr className="my-2" />

                    <p className="line-clamp-2 text-sm">Chia sẻ bởi</p>
                    <p className="line-clamp-1 text-sm font-semibold text-pink-800">
                      {book.sharedBy}
                    </p>
                  </div>
                </div>
                <a
                  onClick={() => handleDelete(book._id)}
                  className="flex w-1/2 cursor-pointer items-center gap-2 hover:underline"
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
