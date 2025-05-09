import { useEffect, useState } from "react";
import PaginationButtons from "../components/PaginationBtns";
import { Link } from "react-router-dom";
import ImageBanner from "../components/ImageBanner";
import SpinnerLoading from "../components/SpinnerLoading";
import ViewsBook from "../OurBooks/ViewsBook";
import SearchBooks from "../components/SearchBooks";

import SearchForm from "../components/Genrecategory/CategoryForm";
import CategoryForm from "../components/Genrecategory/CategoryForm";

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

  // eslint-disable-next-line no-unused-vars
  const [searchFormValues, setSearchFormValues] = useState({
    genres: [],
  });
  // console.log("SearchForm:", searchFormValues);

  const matchedBooks = [];

  if (Array.isArray(searchFormValues.genres)) {
    searchFormValues.genres.forEach((book) => {
      const matchingMember = membersData.find(
        (member) => member.memberID === book.sharerID,
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
  }

  useEffect(() => {
    // Cuộn lên trên khi component được render
    window.scrollTo(0, 0);
    return () => {};
  }, []);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = matchedBooks.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div className="flex min-h-screen flex-col">
      <ImageBanner />

      <ViewsBook headline="Xem nhiều nhất" />

      <div className="my-10 bg-[#fffffff2] px-4 lg:px-24">
        <div className="mb-12 md:w-1/3">
          <SearchBooks />
        </div>

        <h3 className="text-left font-title text-2xl font-bold">Categories:</h3>
        <CategoryForm setSearchFormValues={setSearchFormValues} />

        <h2 className="text-left font-title text-4xl font-bold">
          Our Book List
        </h2>

        {currentBooks.length > 0 ? (
          <div className="grid grid-cols-1 justify-between gap-x-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            {currentBooks.map((book) => (
              <Link to={`/book/${book._id}`} key={book._id}>
                <div className="flex gap-4 py-6">
                  <img
                    src={book.imageUrl}
                    alt=""
                    className="h-52 w-36 shrink-0 transform rounded-br-xl rounded-tr-xl border border-solid border-opacity-10 object-cover shadow-md shadow-slate-900/30 duration-300 hover:scale-105 hover:shadow-lg focus:shadow-xl dark:shadow-slate-900/30"
                  />
                  <div className="my-auto">
                    <h2 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                      <div className="line-clamp-2">
                        <p>{book.bookTitle}</p>
                      </div>
                    </h2>
                    <p className="line-clamp-1 text-sm font-normal text-gray-700 dark:text-gray-400">
                      {book.authorName}
                    </p>
                    <p className="mt-2 text-sm">
                      Chia sẻ bởi:{" "}
                      <span className="line-clamp-1 cursor-pointer font-semibold text-[#825445] hover:underline dark:text-gray-400">
                        {book.memberName}
                      </span>
                    </p>
                    <hr className="my-2 text-sm" />
                    <p className="font-semibold text-pink-800 underline">
                      {book.status}
                    </p>
                    <p className="line-clamp-1 text-sm font-semibold text-gray-700">
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
