import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { Rating } from "flowbite-react";
import { ImProfile } from "react-icons/im";
import LoginBorrower from "../components/auth/LoginBorrower";
import ToggleShowMore from "../components/ToggleShowMore";
import ImageBanner from "../components/ImageBanner";
import BorrowForm from "./BorrowForm";
import useBookData from "../hooks/useBookData";
import API_BASE_URL from "../config/api";
import { useLanguage } from "../contexts/LanguageProvider";

const SingleBook = () => {
  const { t } = useLanguage();
  const [showBorrowForm, setShowBorrowForm] = useState(false);
  const [loggedInMember, setLoggedInMember] = useState(null);

  useEffect(() => {
    const session = localStorage.getItem("memberSession");
    if (!session) return;
    const { _id } = JSON.parse(session);
    fetch(`${API_BASE_URL}/all-members`)
      .then((res) => res.json())
      .then((data) => {
        const member = data.find((m) => m._id === _id);
        if (member) {
          setLoggedInMember({
            memberName: member.memberName,
            memberID: member.memberID,
            workPlace: member.workPlace,
          });
        }
      })
      .catch(() => {});
  }, []);

  const {
    _id,
    bookTitle,
    imageUrl,
    authorName,
    bookDescription,
    category,
    sharerID,
    status,
    borrowerID,
    bookedTime,
    borrowedDate,
    returnDate,
    views,
  } = useLoaderData();

  const { sharer, borrowerInfo, count } = useBookData(sharerID, borrowerID);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [_id]);

  return (
    <div className="flex min-h-screen flex-col">
      <ImageBanner />

      <div className="flex h-full flex-col gap-10 px-8 py-10 md:flex-row lg:px-40">
        {/* Cột trái: ảnh + trạng thái */}
        <div className="flex gap-3 text-left md:flex-col md:gap-0 lg:pl-12">
          <div>
            <img
              src={imageUrl}
              alt=""
              className="h-72 w-48 shrink-0 transform rounded-br-xl rounded-tr-xl object-cover shadow-xl shadow-slate-900/30 duration-300 hover:scale-105"
            />
            <div className="my-2 w-48">
              {loggedInMember ? (
                <button
                  className="mx-auto mt-3 w-48 rounded-full bg-brand px-6 py-1 text-lg text-white duration-300 hover:scale-105"
                  onClick={() => setShowBorrowForm(true)}
                >
                  {t("singleBook.button")}
                </button>
              ) : (
                <LoginBorrower
                  onLoginSuccess={(memberData) => {
                    setLoggedInMember(memberData);
                    setShowBorrowForm(true);
                  }}
                />
              )}
            </div>
          </div>

          {/* Trạng thái sách */}
          <div className="flex flex-col gap-2 text-left">
            <h3 className="font-medium">{t("singleBook.status")}</h3>
            <div>
              <p className="text-lg">{status}</p>
              <p className="text-xl text-pink-800 dark:text-blush">
                {borrowerInfo.name}
              </p>
              <p className="text-gray-500">{borrowerInfo.workPlace}</p>
            </div>
            <div className="text-gray-500">
              <p className="text-lg text-black dark:text-sienna-soft">
                {bookedTime}
              </p>
              <div className="flex flex-col md:flex-row md:gap-2 md:whitespace-nowrap">
                <p>{borrowedDate}</p>
                {" - "}
                <p>{returnDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cột phải: nội dung sách */}
        <div className="flex flex-col gap-2 lg:w-[110%]">
          {showBorrowForm && (
            <BorrowForm
              bookTitle={bookTitle}
              authorName={authorName}
              sharerEmail={sharer.email}
              memberData={loggedInMember}
            />
          )}

          <h2 className="font-title text-4xl font-medium">{bookTitle}</h2>

          <div className="flex gap-2 text-center">
            <p className="text-xl">{authorName}</p>
            <HiMiniCheckBadge className="my-auto text-2xl text-sienna" />
          </div>

          <Rating>
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star filled={false} />
            <p className="text-md ml-2 font-medium text-gray-500 dark:text-gray-400">
              4.95 out of 5
            </p>
            <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
            <a
              href="#"
              className="text-md font-medium text-gray-900 underline hover:no-underline dark:text-white"
            >
              {views}+ {t("singleBook.views")}
            </a>
          </Rating>

          <ToggleShowMore text={bookDescription} />

          <div className="flex gap-4">
            <span className="text-sienna dark:text-blush">
              {t("singleBook.categorie")}
            </span>
            <a
              href="#"
              className="font-medium text-gray-900 underline hover:no-underline dark:text-white"
            >
              {category}
            </a>
          </div>

          <hr />

          {/* Thông tin người chia sẻ */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-medium">{t("profileMember.title")}</h2>
            <Link
              to={`/member/${sharer.id}`}
              className="flex gap-4 text-center"
            >
              <div className="my-auto h-20 w-20 rounded-full border border-solid border-opacity-10 object-cover shadow-md hover:shadow-lg">
                <img
                  src={sharer.avatar}
                  alt=""
                  className="h-20 w-20 shrink-0 rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex gap-1 text-center">
                  <p className="text-xl">{sharer.name}</p>
                  <HiMiniCheckBadge className="mt-1 text-xl text-sienna" />
                </div>
                <p className="text-gray-500">{sharer.workPlace}</p>
                <p className="flex gap-2 text-gray-500">
                  <span>{t("profileMember.bookShared.shared")}:</span> {count}{" "}
                  {t("profileMember.bookShared.bookLength")}
                </p>
                <div className="flex items-center gap-1">
                  <ImProfile />
                  <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                    {t("profileMember.bookShared.profile")}
                  </p>
                </div>
              </div>
            </Link>
            <p>{sharer.comment}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
