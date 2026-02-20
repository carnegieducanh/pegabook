import { useEffect, useState } from "react";

import { Link, useLoaderData, useParams } from "react-router-dom";
import PaginationButtons from "../../components/PaginationBtns";
import API_BASE_URL from "../../config/api`;

const BorrowedBooks = () => {
  const [member, setMember] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;

  const { id } = useParams();

  const { memberID } = useLoaderData();
  // console.log(memberID);

  useEffect(() => {
    fetch(`${API_BASE_URL}/member/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMember(data);
        // console.log(`book shared by:", data);
      });
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/all-books`)
      .then((res) => res.json())
      .then((data) => {
        setAllBooks(data);
        // console.log("All Books:`, data);
      });
  }, []);

  // Lọc ra các cuốn sách có borrowerID trùng với memberID từ API `${API_BASE_URL}/member/${id}`

  const memberBooks = allBooks.filter((book) => book.borrowerID === memberID);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = memberBooks
    ? memberBooks.slice(indexOfFirstBook, indexOfLastBook)
    : [];
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className=`my-12 w-full px-4">
      <h2 className="dark:text-linen mb-4 text-3xl font-bold">
        Sách bạn đang mượn
      </h2>
      <p className="dark:text-linen px-4 underline">
        Chọn 1 cuốn sách bạn muốn trả
      </p>
      <div className="bg-veil dark:bg-obsidian lg:px-10">
        <div className="grid justify-between gap-x-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {currentBooks &&
            currentBooks.map((book) => (
              <Link
                to={`/member/dashboard/return-book/${book._id}`}
                key={book._id}
              >
                <div className="flex flex-col justify-between gap-4 py-6">
                  <div className="flex h-full gap-4">
                    <img
                      src={book.imageUrl}
                      alt=""
                      className="h-52 w-36 shrink-0 transform rounded-br-lg rounded-tr-lg border border-solid border-opacity-10 object-cover shadow-md duration-300 hover:scale-105 hover:shadow-lg focus:shadow-xl"
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
                    <p className="text-sm">{book.bookedTime}</p>
                    <div className="dark:text-linen flex gap-2 text-black">
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
