import { useEffect, useState } from "react";

import { Card } from "flowbite-react";
import { ImBooks } from "react-icons/im";
import { Link, useLoaderData } from "react-router-dom";
import { FaBookReader } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import { BiSolidBookHeart } from "react-icons/bi";
import API_BASE_URL from "../../config/api";

const DashMember = () => {
  const [borrower, setBorrower] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  const [showBooks, setShowBooks] = useState([]);

  const { memberID, _id } = useLoaderData();
  // console.log(memberID);

  useEffect(() => {
    fetch(`${API_BASE_URL}/all-members`)
      .then((res) => res.json())
      .then((data) => {
        setBorrower(data);
      });
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/all-books`)
      .then((res) => res.json())
      .then((data) => {
        setShowBooks(data);
        setAllBooks(data);
      });
  }, []);

  // Lọc ra các cuốn sách có sharerID trùng với memberID thành viên
  const yourBooks = showBooks.filter((book) => book.sharerID === memberID);
  const lastFiveBooks = yourBooks.slice(-5).reverse();

  // Lọc ra các cuốn sách có người mượn
  const borrowers = yourBooks.filter((book) => book.borrowedBy);

  // Lọc ra các thành viên có memberID giống với borrowerID của các cuốn sách
  const matchedMembers = borrower.filter((member) =>
    yourBooks.some((book) => book.borrowerID === member.memberID),
  );

  const lastFiveMembers = matchedMembers.slice(-5).reverse();

  // Lọc ra các cuốn sách có borrowerID trùng với memberID từ API `${API_BASE_URL}/member/${id}`

  const yourBorrowedBooks = allBooks.filter(
    (book) => book.borrowerID === memberID,
  );

  return (
    <div className="w-full">
      {/* Total Data */}
      <div className="my-12 grid h-40 grid-cols-2 gap-4 px-4 lg:grid-cols-4">
        {/* <Card href="#" className="invisible"></Card> */}
        <Card href={`/member/dashboard/manage/${_id}`} className="">
          <div className="flex h-12 w-12 rounded-full bg-cream">
            <ImBooks className="m-auto h-7 w-7" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {yourBooks.length}
          </h2>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Tổng số sách bạn có
          </p>
        </Card>

        <Card href={`/member/dashboard/borrowed-book/${_id}`} className="">
          <div className="flex h-12 w-12 rounded-full bg-cream">
            <FaBookReader className="m-auto h-7 w-7" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {yourBorrowedBooks.length}
          </h2>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Sách bạn đang mượn
          </p>
        </Card>

        <Card href={`/member/dashboard/manage/borrower/${_id}`} className="">
          <div className="flex h-12 w-12 rounded-full bg-cream">
            <BiSolidBookHeart className="m-auto h-7 w-7" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {borrowers.length}
          </h2>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Sách bạn cho mượn
          </p>
        </Card>

        <Card href={`/member/dashboard/manage/borrower/${_id}`} className="">
          <div className="flex h-12 w-12 rounded-full bg-cream">
            <MdPeopleAlt className="m-auto h-7 w-7" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {matchedMembers.length}
          </h2>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Số người mượn sách bạn
          </p>
        </Card>
      </div>

      {/* Total People & Books */}
      <div className="mt-[300px] flex flex-col gap-6 lg:mt-0 lg:flex-row">
        {/* People */}
        <div className="w-full px-4 lg:w-1/3">
          <Card className="">
            <div className="mb-4 flex items-center justify-between">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Người mượn sách
              </h5>
              <Link
                to={`/member/dashboard/manage/borrower/${_id}`}
                className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                View all
              </Link>
            </div>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-md leading-none text-gray-500 dark:text-white">
                MEMBER NAME
              </p>
            </div>
            <div>
              {lastFiveMembers &&
                lastFiveMembers.map((member, index) => (
                  <div key={index}>
                    <div className="flow-root">
                      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="h-16 w-16 shrink-0 rounded-full border border-solid border-opacity-10 shadow-md hover:shadow-lg">
                                <img
                                  src={member.memberAvatar}
                                  alt=""
                                  className="block h-16 w-16 shrink-0 rounded-full object-cover"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                  {member.memberName}
                                </p>
                                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                                  {member.workPlace}
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </div>

        {/* Books */}
        <div className="w-full px-4 lg:w-2/3">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Sách của bạn
              </h5>
              <Link
                to={`/member/dashboard/manage/${_id}`}
                className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                View all
              </Link>
            </div>
            <div className="mb-4 flex items-center justify-between gap-5">
              <p className="text-md w-2/4 leading-none text-gray-500 dark:text-white">
                BOOK NAME
              </p>
              <p className="text-md hidden w-1/4 leading-none text-gray-500 dark:text-white md:block">
                CATEGORY
              </p>
              <p className="text-md w-1/4 text-right leading-none text-gray-500 dark:text-white">
                STATUS
              </p>
            </div>
            <div>
              {lastFiveBooks &&
                lastFiveBooks.map((book, index) => (
                  <div key={index}>
                    <div className="flow-root">
                      <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        <div className="flex items-center justify-center py-3 sm:py-4">
                          <div className="flex w-full items-center gap-4 md:w-2/4">
                            <div className="h-16 w-12 border border-solid border-opacity-10 shadow-md hover:shadow-lg">
                              <img
                                src={book.imageUrl}
                                alt=""
                                className="block h-16 w-12 shrink-0 object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="line-clamp-2 text-sm font-medium text-gray-900 dark:text-white">
                                {book.bookTitle}
                              </p>
                              <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                                {book.authorName}
                              </p>
                            </div>
                          </div>
                          <div className="w-1/3">
                            <p className="hidden text-center dark:text-linen md:block">
                              {book.category}
                            </p>
                          </div>
                          <div className="w-2/3 md:w-1/3">
                            <div className="flex flex-col items-end text-base text-gray-900 dark:text-white">
                              <p className="text-right">{book.status}</p>
                              <p className="text-right font-semibold text-pink-800">
                                {book.borrowedBy}
                              </p>
                              <div className="hidden gap-1 whitespace-nowrap text-right md:flex">
                                <p>{book.borrowedDate}</p> -
                                <p>{book.returnDate}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashMember;
