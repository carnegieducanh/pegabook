import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import PaginationButtons from "../components/PaginationBtns";
import ToggleShowMore from "../components/ToggleShowMore";
import ImageBanner from "../components/ImageBanner";
import API_BASE_URL from "../config/api";
import { useLanguage } from "../contexts/LanguageProvider";

const ProfileMember = () => {
  const { t } = useLanguage();
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
    <div className="min-h-screen dark:bg-obsidian">
      <ImageBanner />

      <div className="bg-veil px-4 py-10 dark:bg-obsidian lg:px-24">
        <h2 className="text-4xl font-semibold">{t("profileMember.title")}</h2>

        <div className="mt-10 flex items-center gap-4">
          <div className="h-36 w-36 rounded-full border border-solid border-opacity-10 shadow-md hover:shadow-lg">
            <img
              src={memberAvatar}
              alt=""
              className="h-36 w-36 shrink-0 rounded-full object-cover"
            />
          </div>
          <div className="text-lg">
            <h2 className="font-bold tracking-tight text-gray-900 dark:text-blush">
              <div className="line-clamp-2">
                <p>{memberName}</p>
              </div>
            </h2>
            <p className="font-normal text-gray-700 dark:text-pebble">
              {workPlace}
            </p>
            <p className="font-normal text-gray-700 dark:text-pebble">
              {t("profileMember.bookShared.shared")}: {memberBooks.length}{" "}
              {t("profileMember.bookShared.bookLength")}
            </p>
          </div>
        </div>
        <hr className="my-2 block w-full lg:w-1/3" />
        <div className="text-lg">
          <div className="w-full">
            <span className="font-semibold italic underline">
              {t("profileMember.bookShared.myself")}:
            </span>
            <br />
            <ToggleShowMore text={review} />
          </div>
          <div className="mt-5 w-full">
            <span className="font-semibold italic underline">
              {t("profileMember.bookShared.feeling")}:
            </span>
            <br />
            {comment}
          </div>
        </div>
      </div>
      <div className="px-4 lg:px-24">
        <h2 className="mb-4 text-3xl font-semibold">
          {t("profileMember.bookShared.title")}
        </h2>
        <div className="bg-veil dark:bg-obsidian">
          <div className="grid grid-cols-1 justify-between gap-x-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {currentBooks &&
              currentBooks.map((book) => (
                <Link to={`/book/${book._id}`} key={book._id}>
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

                        <hr className="my-2" />

                        <p className="line-clamp-2 text-sm">{book.status}</p>
                        <p className="line-clamp-1 text-sm font-semibold text-pink-700 dark:text-blush">
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
          totalBooks={memberBooks.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default ProfileMember;
