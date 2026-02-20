import { useEffect, useState } from "react";

import { Card } from "flowbite-react";
import { ImBooks } from "react-icons/im";
import { FaBookReader } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { MdPeopleAlt } from "react-icons/md";
import { Link } from "react-router-dom";
import SpinnerLoading from "../../components/SpinnerLoading";

const Dashboard = () => {
  const [allMembers, setAllMembers] = useState([]);
  const [latestMembers, setLatestMembers] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0); // State to hold total number of books
  const [totalMembers, setTotalMembers] = useState(0); // State to hold total number of members
  const [totalSharers, setTotalSharers] = useState(0); // State to hold total number of sharers
  const [totalBorrower, setTotalBorrower] = useState(0); // State to hold total number of borrower

  useEffect(() => {
    fetch("https://pega-book-server.onrender.com/all-members")
      .then((res) => res.json())
      .then((members) => {
        setAllMembers(members);
        setTotalMembers(members.length);
        const lastFiveMembers = members.slice(-5).reverse();
        setLatestMembers(lastFiveMembers);

        fetch("https://pega-book-server.onrender.com/all-books")
          .then((res) => res.json())
          .then((books) => {
            setAllBooks(books);
            setTotalBooks(books.length);
            const lastFiveBooks = books.slice(-5).reverse();
            setAllBooks(lastFiveBooks);

            const borrowers = [
              ...new Set(books.map((book) => book.borrowedBy)),
            ].filter((borrower) => borrower);
            setTotalBorrower(borrowers.length);

            // Tìm mảng của memberID giống với memberID trong all-books
            const relevantMembers = members.filter((member) =>
              books.some((book) => book.sharerID === member.memberID),
            );

            setTotalSharers(relevantMembers.length);
          });
      });
  }, []);

  const matchedBooks = [];

  allBooks.forEach((book) => {
    const matchingMember = allMembers.find(
      (member) => member.memberID === book.sharerID,
    );
    if (matchingMember) {
      matchedBooks.push({
        bookTitle: book.bookTitle,
        authorName: book.authorName,
        imageUrl: book.imageUrl,
        category: book.category,
        memberName: matchingMember.memberName,
      });
    }
  });

  // console.log(matchedBooks);

  return (
    <div className="w-full">
      {/* Total Data */}
      <div className="my-12 grid h-40 grid-cols-2 gap-4 px-4 lg:grid-cols-4">
        <Card href="#" className="">
          <div className="flex h-12 w-12 rounded-full bg-cream">
            <ImBooks className="m-auto h-7 w-7" />
          </div>
          <h2 className="font-title text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {totalBooks} {/* Display total number of books */}
          </h2>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Total Books
          </p>
        </Card>
        <Card href="#" className="">
          <div className="flex h-12 w-12 rounded-full bg-cream">
            <MdPeopleAlt className="m-auto h-7 w-7" />
          </div>
          <h2 className="font-title text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {totalMembers}
          </h2>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Total Members
          </p>
        </Card>
        <Card href="#" className="">
          <div className="flex h-12 w-12 rounded-full bg-cream">
            <BsFillPersonLinesFill className="m-auto h-7 w-7" />
          </div>
          <h2 className="font-title text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {totalSharers}
            {/* Display total number of unique sharers */}
          </h2>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Total Sharers
          </p>
        </Card>

        <Card href="#" className="">
          <div className="flex h-12 w-12 rounded-full bg-cream">
            <FaBookReader className="m-auto h-7 w-7" />
          </div>
          <h2 className="font-title text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {totalBorrower}
          </h2>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Total Borrowers
          </p>
        </Card>
      </div>

      {/* Total People & Books */}
      <div className="mt-64 flex flex-col lg:mt-0 lg:flex-row">
        {/* People */}
        <div className="mb-12 w-full px-4 lg:w-1/3">
          <Card className="max-w-sm">
            <div className="mb-4 flex items-center justify-between">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Latest Members
              </h5>
              <Link
                to={"/admin/dashboard/manage-members"}
                className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                View all
              </Link>
            </div>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-md leading-none text-gray-500 dark:text-white">
                MEMBER NAME
              </p>
              <p className="text-md leading-none text-gray-500 dark:text-white">
                WORK PLACE
              </p>
            </div>
            {latestMembers.length > 0 ? (
              <div>
                {latestMembers &&
                  latestMembers.map((member, index) => (
                    <div key={index}>
                      <div className="flow-root">
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                          <li className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                              <div className="h-16 w-16 shrink-0 rounded-full border border-solid border-opacity-10 shadow-md hover:shadow-lg">
                                <img
                                  src={member.memberAvatar}
                                  alt=""
                                  className="block h-16 w-16 shrink-0 rounded-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                  {member.memberName}
                                </p>
                                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                                  {member.memberID}
                                </p>
                              </div>
                              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                {member.workPlace}
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <SpinnerLoading />
            )}
          </Card>
        </div>

        {/* Books */}
        <div className="mb-12 w-full px-4 lg:w-2/3">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Latest Books
              </h5>
              <Link
                to={"/admin/dashboard/manage"}
                className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                View all
              </Link>
            </div>
            <div className="mb-4 flex w-full justify-between gap-5">
              <p className="text-md w-2/4 leading-none text-gray-500 dark:text-white">
                BOOK NAME
              </p>
              <p className="text-md hidden leading-none text-gray-500 dark:text-white md:block md:w-1/4">
                CATEGORY
              </p>
              <p className="text-md text-right leading-none text-gray-500 dark:text-white md:w-1/4">
                SHARED BY
              </p>
            </div>
            {matchedBooks.length > 0 ? (
              <div>
                {matchedBooks.map((matchedBook, index) => (
                  <div key={index}>
                    <div className="flow-root">
                      <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        <div className="flex items-center justify-between py-3 sm:py-4">
                          <div className="flex w-2/3 items-center space-x-4 md:w-2/4">
                            <div className="h-16 w-12 shrink-0 border border-solid border-opacity-10 shadow-md hover:shadow-lg">
                              <img
                                src={matchedBook.imageUrl}
                                alt=""
                                className="block h-16 w-12 rounded-sm object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="line-clamp-2 text-sm font-medium text-gray-900 dark:text-white">
                                {matchedBook.bookTitle}
                              </p>
                              <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                                {matchedBook.authorName}
                              </p>
                            </div>
                          </div>
                          <div className="hidden w-1/4 text-base font-semibold text-gray-900 dark:text-white md:block">
                            {matchedBook.category}
                          </div>

                          <div className="text-right text-base font-semibold text-gray-900 dark:text-white md:w-1/4">
                            {matchedBook.memberName}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <SpinnerLoading />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
