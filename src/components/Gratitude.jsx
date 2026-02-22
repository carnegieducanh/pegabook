import { Avatar, Blockquote } from "flowbite-react";
import ImageBanner from "../components/ImageBanner";
import { useEffect, useState } from "react";
import SpinnerLoading from "./SpinnerLoading";
import API_BASE_URL from "../config/api";
import { useLanguage } from "../contexts/LanguageProvider";

const Gratitude = () => {
  const { t } = useLanguage();
  const [allMembers, setAllMembers] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [matchedMembers, setMatchedMembers] = useState([]);
  const filteredMembers = matchedMembers.filter(
    (member) => member.sharedBooksCount > 0,
  );

  useEffect(() => {
    // Cuộn lên trên khi component được render
    window.scrollTo(0, 0);

    return () => {};
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/all-members`)
      .then((res) => res.json())
      .then((members) => {
        setAllMembers(members);

        fetch(`${API_BASE_URL}/all-books`)
          .then((res) => res.json())
          .then((books) => {
            setAllBooks(books);

            const matchedMembersData = [];

            // Duyệt qua từng thành viên
            members.forEach((member) => {
              // Tìm các cuốn sách của thành viên hiện tại
              const matchedBooks = books.filter(
                (book) => book.sharerID === member.memberID,
              );

              matchedMembersData.push({
                memberName: member.memberName,
                sharedBooksCount: matchedBooks.length,
              });
            });

            setMatchedMembers(matchedMembersData);
          });
      });
  }, []);
  return (
    <div className="min-h-screen dark:bg-void">
      <ImageBanner />

      <div className="bg-veil px-4 py-10 dark:bg-void lg:px-36">
        <h2 className="text-left font-title text-4xl font-bold">
          {t("gratitude.title")}
        </h2>

        <div className="my-10 text-lg">
          <p className="mb-3 text-gray-700 dark:text-pebble">
            {t("gratitude.description")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
            <Blockquote className="mb-3 border-l-4 border-gray-300 bg-gray-50 p-4 dark:border-gray-500 dark:bg-void">
              <p className="text-lg">🙏 {t("gratitude.blockquote")}:</p>{" "}
              {filteredMembers.length > 0 ? (
                <div className="py-2 text-xl font-semibold italic text-maroon dark:text-blush">
                  "
                  {filteredMembers &&
                    filteredMembers.map((member, index) => (
                      <span key={index}>{member.memberName}, </span>
                    ))}
                  ..."
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <SpinnerLoading />
                </div>
              )}
            </Blockquote>
          </div>
        </div>
        <figcaption className="flex space-x-3 text-lg">
          <div className="flex items-center divide-x-2 divide-gray-300">
            <cite className="pr-3 font-medium text-gray-900 dark:text-linen">
              {t("gratitude.figcaption")}
            </cite>
            <cite className="pl-3 text-gray-700 dark:text-pebble">
              {t("gratitude.cite")}
            </cite>
          </div>
        </figcaption>
      </div>
    </div>
  );
};

export default Gratitude;
