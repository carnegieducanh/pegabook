import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import API_BASE_URL from "../../config/api";

const DashMemberBook = ({ memberBooks }) => {
  const [data, setData] = useState([]);

  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputEntered, setInputEntered] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/all-books`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  // console.log(memberBooks);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const div = document.getElementById("searchResultsDiv");
      if (div && !div.contains(event.target)) {
        div.style.opacity = 0; // Sử dụng opacity để làm mềm mại việc biến mất
        setTimeout(() => {
          setShowResults(false);
          div.style.opacity = 1; // Reset lại opacity sau khi ẩn
        }, 0); // Thời gian chờ trước khi ẩn (ở đây là 300ms)
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const filterBooks = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearch(
      memberBooks.filter((f) => f.bookTitle.toLowerCase().includes(searchTerm)),
    );
    setInputEntered(true);
    setShowResults(true);
  };

  const handleBookSelect = (book) => {
    // console.log("Clicked on Book:", book);
    setSelectedBook(book);
    setInputEntered(true);
    setShowResults(true);
  };

  return (
    <div className="w-96">
      <div className="relative flex justify-start rounded-s-sm border border-solid bg-ghost outline-none dark:bg-void">
        <IoIosSearch className="absolute left-2 top-2 my-auto h-6 w-6 dark:text-linen" />

        <input
          id="search"
          type="search"
          name="search"
          className="w-full border-none bg-ghost pl-10 font-normal outline-none dark:bg-void dark:text-linen"
          placeholder="Search a book"
          onChange={filterBooks}
          autoComplete="off"
        />
      </div>

      {showResults && inputEntered && (
        <div
          id="searchResultsDiv"
          className="max-h-40 overflow-y-scroll rounded-lg bg-cream px-5 py-5 text-center shadow hover:shadow-md"
        >
          {loading ? (
            <h3 className="font-bold">Loading...</h3>
          ) : search.length > 0 ? (
            search.map((book, index) => (
              <div key={book._id} onClick={() => handleBookSelect(book)}>
                <Link to={`/member/dashboard/book/${book._id}`}>
                  <div className="flex h-20 cursor-pointer gap-7 px-5 py-2 hover:bg-ash">
                    <img
                      src={book.imageUrl}
                      alt=""
                      className="mr-2 h-16 w-12 shrink-0 object-cover"
                    />
                    <div className="flex h-full flex-col justify-center truncate text-left">
                      <p className="font-bold">{book.bookTitle}</p>
                      <p>{book.authorName}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>
              {search.length === 0
                ? "No matching Books found."
                : "Enter a search term."}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default DashMemberBook;
