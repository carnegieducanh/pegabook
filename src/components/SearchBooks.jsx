import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";

const SearchBooks = () => {
    const [data, setData] = useState([]);

    const [search, setSearch] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inputEntered, setInputEntered] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    // const { sharedBy } = useLoaderData();

    useEffect(() => {
        fetch("https://pega-book-server.onrender.com/all-books")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setSearch(data);
                setLoading(false);
                // console.log("All Books:", data);
            });
    }, []);

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
            data.filter((f) => f.bookTitle.toLowerCase().includes(searchTerm))
        );
        setInputEntered(true);
        setShowResults(true);
    };

    const handleBookSelect = (book) => {
        setSelectedBook(book);
        setInputEntered(true);
        setShowResults(true);
    };

    return (
        <div className="w-96">
            <div className="flex justify-start border border-solid bg-[#f9fafb] rounded-s-sm outline-none relative">
                <IoIosSearch className="absolute left-2 top-2 w-6 h-6 my-auto" />

                <input
                    id="search"
                    type="search"
                    name="search"
                    className=" bg-[#f9fafb] w-full pl-10 font-normal border-none outline-none"
                    placeholder="Search a book"
                    onChange={filterBooks}
                    autoComplete="off"
                />

                {/* <button className="bg-[#a69060] px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200">
                    Search
                </button> */}
            </div>

            {showResults && inputEntered && (
                <div
                    id="searchResultsDiv"
                    className="bg-[#F4F1EA] rounded-lg max-h-40 overflow-y-scroll shadow hover:shadow-md text-center px-5 py-5"
                >
                    {loading ? (
                        <h3 className="font-bold">Loading...</h3>
                    ) : search.length > 0 ? (
                        search.map((book, index) => (
                            <div
                                key={book._id}
                                onClick={() => handleBookSelect(book)}
                            >
                                <Link to={`/book/${book._id}`}>
                                    <div className="flex gap-7 h-20 py-2 px-5 hover:bg-[#dadada] cursor-pointer">
                                        <img
                                            src={book.imageUrl}
                                            alt=""
                                            className="w-12 h-16 object-cover shrink-0 mr-2"
                                        />
                                        <div className="h-full flex flex-col justify-center text-left truncate ">
                                            <p className="font-bold ">
                                                {book.bookTitle}
                                            </p>
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

export default SearchBooks;
