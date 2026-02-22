import { useEffect, useState } from "react";

import { Link, useLoaderData, useParams } from "react-router-dom";
import PaginationButtons from "../../components/PaginationBtns";
import DashMemberBook from "./DashMemberBook";
import API_BASE_URL from "../../config/api";
import { useLanguage } from "../../contexts/LanguageProvider";
import { getStatusLabel } from "../../utils/getStatusLabel";

const YourBooks = () => {
  const { t } = useLanguage();
  const [member, setMember] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;

  const { id } = useParams();

  const { memberID } = useLoaderData();

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

  // Lọc ra các cuốn sách có memberID trùng với memberID từ API `${API_BASE_URL}/member/${id}`

  const memberBooks = allBooks.filter((book) => book.sharerID === memberID);
  // console.log(memberBooks);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = memberBooks
    ? memberBooks.slice(indexOfFirstBook, indexOfLastBook)
    : [];
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="my-12 w-full px-4">
      <div className="flex flex-col justify-between lg:flex-row">
        <h2 className="mb-4 text-3xl font-bold dark:text-pebble">
          Sách của bạn
        </h2>

        <DashMemberBook memberBooks={memberBooks} />
      </div>
      <p className="my-4 px-4 underline dark:text-pebble">
        Chọn 1 cuốn sách để khám phá thêm
      </p>
      <div className="bg-veil dark:bg-obsidian">
        <div className="grid justify-between gap-x-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {currentBooks &&
            currentBooks.map((book) => (
              <Link to={`/member/dashboard/book/${book._id}`} key={book._id}>
                <div className="group flex flex-col justify-between gap-4 py-6">
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

                      <p className="line-clamp-2 text-sm dark:text-linen">
                        {getStatusLabel(book.status, t)}
                      </p>
                      <p className="line-clamp-1 text-sm font-semibold text-pink-800 dark:text-blush">
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
