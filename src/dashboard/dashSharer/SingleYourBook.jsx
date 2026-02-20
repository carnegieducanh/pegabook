import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { Button, Rating } from "flowbite-react";
import ToggleShowMore from "../../components/ToggleShowMore";
import { IoPersonAdd, IoPersonRemoveOutline } from "react-icons/io5";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import API_BASE_URL from "../../config/api";

const SingleYourBook = () => {
  const [memberData, setMemberData] = useState(null);
  const [allBookData, setAllBooksData] = useState();
  const [count, setCount] = useState(0);
  const [sharerName, setSharerName] = useState();
  const [sharedBy_id, setSharedBy_id] = useState();
  const [sharerAvatar, setSharerAvatar] = useState();
  const [sharerComment, setSharerComment] = useState();
  const [sharerWorkPlace, setSharerWorkPlace] = useState();
  const [borrower, setBorrower] = useState();
  const [borrowerAvatar, setBorrowerAvatar] = useState();
  const [borrowerWorkPlace, setBorrowerWorkPlace] = useState();

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

  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {};
  }, [_id]); // Thay đổi _id để trigger useEffect khi có sự thay đổi

  useEffect(() => {
    fetch(`${API_BASE_URL}/all-members`)
      .then((res) => res.json())
      .then((data) => {
        setMemberData(data);
      });
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/all-books`)
      .then((res) => res.json())
      .then((data) => {
        setAllBooksData(data);
      });
  }, []);

  useEffect(() => {
    if (memberData && allBookData) {
      let totalCount = 0;
      let sharedByCurrent = [];
      let sharedBy_id = [];
      let sharerAvatar = [];
      let sharerComment = [];
      let sharerWorkPlace = [];
      let borrowerName = [];
      let borrowerAvatar = [];
      let borrowerWorkPlace = [];

      allBookData.forEach((book) => {
        if (sharerID === book.sharerID) {
          totalCount++;
        }
      });

      memberData.forEach((member) => {
        if (sharerID === member.memberID) {
          sharedByCurrent = member.memberName;
          sharedBy_id = member._id;
          sharerAvatar = member.memberAvatar;
          sharerComment = member.comment;
          sharerWorkPlace = member.workPlace;
          return; // Thêm break để dừng vòng lặp sau khi tìm thấy
        }
      });

      memberData.forEach((borrower) => {
        if (borrowerID === borrower.memberID) {
          borrowerName = borrower.memberName;
          borrowerAvatar = borrower.memberAvatar;
          borrowerWorkPlace = borrower.workPlace;
          return; // Thêm break để dừng vòng lặp sau khi tìm thấy
        }
      });

      // Cập nhật state cho biến đếm
      setCount(totalCount);
      setSharerName(sharedByCurrent);
      setSharerAvatar(sharerAvatar);
      setSharedBy_id(sharedBy_id);
      setSharerComment(sharerComment);
      setSharerWorkPlace(sharerWorkPlace);
      setBorrower(borrowerName);
      setBorrowerAvatar(borrowerAvatar);
      setBorrowerWorkPlace(borrowerWorkPlace);
    }
  }, [memberData, allBookData]);

  // console.log(sharedBy_id);

  // Chuyển đến trang khác
  const navigate = useNavigate();

  // delete a book
  const handleDelete = (id) => {
    // Sử dụng window.confirm để hiển thị thông báo
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this book?",
    );

    // Kiểm tra xem người dùng đã xác nhận hay không
    if (isConfirmed) {
      fetch(`${API_BASE_URL}/book/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          alert("Book is deleted successfully!");

          // Chuyển đến trang khác
          navigate(`/member/dashboard/manage/${sharedBy_id}`);
        });
    }
  };

  return (
    <div className="my-12 min-h-screen w-full px-4">
      <h2 className="mb-4 text-3xl font-bold">Sách của bạn</h2>
      <div className="flex h-full flex-col py-5 lg:flex-row lg:px-10">
        <div className="mb-5 flex w-full flex-row gap-8 lg:w-1/5 lg:flex-col lg:gap-0">
          <img
            src={imageUrl}
            alt=""
            className="h-72 w-48 shrink-0 transform rounded-br-xl rounded-tr-xl object-cover shadow-xl duration-300 hover:scale-105"
          />

          {/* Status */}
          <div className="mt-5l flex flex-col gap-2 text-left">
            <div className="mt-2 font-medium text-gray-900 underline hover:no-underline dark:text-white">
              <h3 className="text-leftfont-medium">Status</h3>
            </div>

            <div className="text-left">
              <p className="text-lg">{status}</p>
              <p className="text-xl text-pink-700">{borrower}</p>
              <p className="text-gray-500">{borrowerWorkPlace}</p>
            </div>
            <div className="text-left text-gray-500">
              <p className="text-lg text-black">{bookedTime}</p>
              <div className="flex flex-col md:flex-row md:gap-2 md:whitespace-nowrap">
                <p>{borrowedDate}</p>
                {"-"}
                <p>{returnDate}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 lg:w-4/5">
          {/* about Author */}
          <h2 className="text-4xl font-medium">{bookTitle}</h2>
          <div className="flex gap-2 text-center">
            <p className="text-xl">{authorName}</p>
            <HiMiniCheckBadge className="text-sienna my-auto text-2xl" />
          </div>
          <div>
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
                {views}+ views
              </a>
            </Rating>
          </div>

          <ToggleShowMore text={bookDescription} />

          <div className="flex gap-4">
            <span className="text-sienna">Thể loại</span>

            <div className="font-medium text-gray-900 underline hover:no-underline dark:text-white">
              {category}
            </div>
          </div>

          <hr />

          <div className="mt-5 flex gap-2 text-lg md:gap-10">
            <div className="flex flex-col gap-10">
              <Link
                className="my-auto flex items-center font-semibold"
                to={`/member/dashboard/add-borrower/${_id}`}
              >
                <Button className="bg-cream w-48 text-black hover:text-white">
                  <IoPersonAdd />
                  <div className="px-2">Thêm người mượn</div>
                </Button>
              </Link>

              <Link
                className="my-auto flex items-center font-semibold"
                to={`/member/dashboard/edit-books/${_id}`}
              >
                <Button className="bg-cream w-48 text-black hover:text-white">
                  <GrEdit />
                  <div className="px-2">Sửa nội dung sách</div>
                </Button>
              </Link>
            </div>

            <div className="flex flex-col gap-10">
              <Link
                className="my-auto flex items-center font-semibold"
                to={`/member/dashboard/remove-borrower/${_id}`}
              >
                <Button className="bg-mist w-48 text-black hover:text-white">
                  <IoPersonRemoveOutline />
                  <div className="px-2">Hủy người mượn</div>
                </Button>
              </Link>

              <Button
                onClick={() => handleDelete(_id)}
                className="bg-mist my-auto flex w-48 items-center font-semibold text-black hover:text-white"
              >
                <RiDeleteBin6Line />
                <div className="px-2">Xóa sách</div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleYourBook;
