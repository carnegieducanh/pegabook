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

const SingleBook = () => {
  const [showBorrowForm, setShowBorrowForm] = useState(false);

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
            <div onClick={() => setShowBorrowForm(true)} className="my-2 w-48">
              <LoginBorrower _id={_id} />
            </div>
          </div>

          {/* Trạng thái sách */}
          <div className="flex flex-col gap-2 text-left">
            <h3 className="font-medium">Status</h3>
            <div>
              <p className="text-lg">{status}</p>
              <p className="dark:text-blush text-xl text-pink-800">
                {borrowerInfo.name}
              </p>
              <p className="text-gray-500">{borrowerInfo.workPlace}</p>
            </div>
            <div className="text-gray-500">
              <p className="dark:text-sienna-soft text-lg text-black">
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
            />
          )}

          <h2 className="font-title text-4xl font-medium">{bookTitle}</h2>

          <div className="flex gap-2 text-center">
            <p className="text-xl">{authorName}</p>
            <HiMiniCheckBadge className="text-sienna my-auto text-2xl" />
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
              {views}+ lượt xem
            </a>
          </Rating>

          <ToggleShowMore text={bookDescription} />

          <div className="flex gap-4">
            <span className="text-sienna">Thể loại</span>
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
            <h2 className="text-2xl font-medium">Về người chia sẻ</h2>
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
                  <HiMiniCheckBadge className="text-sienna mt-1 text-xl" />
                </div>
                <p className="text-gray-500">{sharer.workPlace}</p>
                <p className="flex gap-2 text-gray-500">
                  <span>Đã chia sẻ:</span> {count} cuốn sách
                </p>
                <div className="flex items-center gap-1">
                  <ImProfile />
                  <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                    Xem profile
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
