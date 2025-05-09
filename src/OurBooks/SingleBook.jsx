import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { Button, Label, Rating, TextInput, Textarea } from "flowbite-react";
import LoginBorrower from "../components/LoginBorrower";
import { Datepicker } from "flowbite-react";
import { BsFillSendFill } from "react-icons/bs";
import emailjs from "@emailjs/browser";
import ToggleShowMore from "../components/ToggleShowMore";
import ImageBanner from "../components/ImageBanner";
import { RiMailSendLine } from "react-icons/ri";
import { RiMessage3Line } from "react-icons/ri";
import { TiArrowBackOutline } from "react-icons/ti";
import { ImProfile } from "react-icons/im";

const SingleBook = () => {
  const [memberData, setMemberData] = useState(null);
  const [allBookData, setAllBooksData] = useState();
  const [count, setCount] = useState(0);
  const [sharerName, setSharerName] = useState();
  const [sharedBy_id, setSharedBy_id] = useState();
  const [sharerAvatar, setSharerAvatar] = useState();
  const [sharerComment, setSharerComment] = useState();
  const [sharerWorkPlace, setSharerWorkPlace] = useState();
  const [sharerEmail, setSharerEmail] = useState();
  const [borrower, setBorrower] = useState();
  // const [borrowerAvatar, setBorrowerAvatar] = useState();
  const [borrowerWorkPlace, setBorrowerWorkPlace] = useState();

  const [showMemberInfo, setShowMemberInfo] = useState(false);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false); //vô hiệu hóa button "Send" khi hoaàn tất form

  const handleLoginClick = () => {
    setShowMemberInfo(true);
  };

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
    fetch("https://pega-book-server.onrender.com/all-members")
      .then((res) => res.json())
      .then((data) => {
        setMemberData(data);
        // console.log("All Books:", data);
      });
  }, []);

  useEffect(() => {
    fetch("https://pega-book-server.onrender.com/all-books")
      .then((res) => res.json())
      .then((data) => {
        setAllBooksData(data);
        // console.log("All Books:", data);
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
      let sharerEmail = [];
      let borrowerName = [];
      // let borrowerAvatar = [];
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
          sharerEmail = member.email;
          return; // Thêm break để dừng vòng lặp sau khi tìm thấy
        }
      });

      memberData.forEach((borrower) => {
        if (borrowerID === borrower.memberID) {
          borrowerName = borrower.memberName;
          // borrowerAvatar = borrower.memberAvatar;
          borrowerWorkPlace = borrower.workPlace;
          return; // Thêm break để dừng vòng lặp sau khi tìm thấy
        }
      });

      // Cập nhật state cho biến đếm
      setCount(totalCount);
      setSharedBy_id(sharedBy_id);
      setSharerName(sharedByCurrent);
      setSharerAvatar(sharerAvatar);
      setSharerComment(sharerComment);
      setSharerWorkPlace(sharerWorkPlace);
      setSharerEmail(sharerEmail);
      setBorrower(borrowerName);
      // setBorrowerAvatar(borrowerAvatar);
      setBorrowerWorkPlace(borrowerWorkPlace);
    }
  }, [memberData, allBookData]);

  // ********** Send Email **********

  const sendEmail = (event) => {
    // Ngăn chặn hành động mặc định của form
    event.preventDefault();

    // Sử dụng window.confirm để hiển thị thông báo
    const isConfirmed = window.confirm(
      "Are you sure you want to send this mail?",
    );

    // Kiểm tra xem người dùng đã xác nhận hay không
    if (isConfirmed) {
      emailjs.sendForm(
        "service_fl9nzck",
        "template_md4bn27",
        event.target, // Sử dụng event.target để truyền form vào hàm sendForm
        "62seVVbY10pzmV4fj",
      );

      alert("Message sent successfully.");
      // window.location.reload();
      // location.reload();
      setIsButtonDisabled(true);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <ImageBanner />

      <div className="flex h-full flex-col gap-10 px-8 py-10 md:flex-row lg:px-40">
        <div className="flex gap-3 text-left md:flex-col md:gap-0 lg:pl-12">
          <div>
            <img
              src={imageUrl}
              alt=""
              className="h-72 w-48 shrink-0 transform rounded-br-xl rounded-tr-xl object-cover shadow-xl shadow-slate-900/30 duration-300 hover:scale-105"
            />
            <div onClick={handleLoginClick} className="my-2 w-48">
              <LoginBorrower _id={_id} />
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-2 text-left">
            <a
              href="#"
              className="font-medium text-gray-900 underline hover:no-underline dark:text-white"
            >
              <h3 className="text-left font-medium">Status</h3>
            </a>

            <div className="text-left">
              <p className="text-lg">{status}</p>
              <p className="text-xl text-pink-800">{borrower}</p>
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
        <div className="flex flex-col gap-2 lg:w-[110%]">
          {showMemberInfo && (
            <div>
              {/* ======= ĐĂNG KÝ MƯỢN SÁCH ======= */}
              <div className="mb-5 flex flex-col gap-2">
                <div className="flex gap-2">
                  <RiMailSendLine />
                  <h2 className="font-title text-2xl font-medium text-pink-800">
                    Bạn có tin nhắn từ đội ngũ Pegabook!
                  </h2>
                </div>
                <div className="flex flex-col gap-2 px-4">
                  <div className="flex gap-2">
                    <RiMessage3Line />
                    <p className="text-md">
                      Để đảm bảo bạn có thể hoàn thành việc đọc hiệu quả, bạn
                      chỉ nên mượn tối đa 2 cuốn sách cho mỗi lần.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <RiMessage3Line />
                    <p className="text-md">
                      Mỗi cuốn sách giống như một người bạn thông thái, hãy trân
                      trọng và giữ gìn cẩn thận nhé.
                    </p>
                  </div>
                </div>
              </div>

              {/* FORM Begin */}
              <form
                onSubmit={sendEmail}
                className="flex flex-col flex-wrap gap-4"
              >
                <div className="flex gap-8">
                  {/* Datepicker 1 */}
                  <div className="w-1/2">
                    <div className="mb-2 block whitespace-nowrap">
                      <Label
                        htmlFor="borrowedDate"
                        value="Ngày bạn muốn mượn"
                      />
                    </div>
                    <Datepicker id="borrowedDate" name="borrowedDate" />
                  </div>

                  {/* Datepicker 2 */}
                  <div className="w-1/2">
                    <div className="mb-2 block whitespace-nowrap">
                      <Label
                        htmlFor="returnDate"
                        value="Ngày bạn dự định trả"
                      />
                    </div>
                    <Datepicker id="returnDate" name="returnDate" />
                  </div>
                </div>

                {/* Lờì nhắn đến người chia sẻ */}
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="comment" value="Lời nhắn của bạn" />
                  </div>
                  <Textarea
                    id="comment"
                    name="comment"
                    placeholder="Viết lời nhắn của bạn đến Pegabook hoặc người chia sẻ sách..."
                    required
                    className="w-full"
                    rows={2}
                  />
                </div>
                {/* Email người nhận */}
                <div className="hidden">
                  <div className="-my-10 block">
                    <Label htmlFor="email" value="Email người chia sẻ" />
                  </div>
                  <TextInput
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Email"
                    defaultValue={sharerEmail}
                    readOnly
                    required
                  />
                </div>
                <h2 className="text-xl font-medium">Thông tin về bạn</h2>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="memberName" value="Tên của bạn" />
                  </div>
                  <TextInput
                    id="memberName"
                    name="memberName"
                    type="text"
                    placeholder="Member name"
                    // defaultValue={memberName}
                    readOnly
                    required
                  />
                </div>

                <div className="flex gap-8">
                  <div className="w-1/2">
                    <div className="mb-2 block">
                      <Label htmlFor="memberID" value="Mã thành viên" />
                    </div>
                    <TextInput
                      id="memberID"
                      name="memberID"
                      type="text"
                      placeholder="Member ID"
                      required
                      readOnly
                    />
                  </div>

                  <div className="w-1/2">
                    <div className="mb-2 block">
                      <Label htmlFor="workPlace" value="Nơi làm việc" />
                    </div>
                    <TextInput
                      id="workPlace"
                      name="workPlace"
                      type="text"
                      placeholder="Work Place"
                      required
                      readOnly
                    />
                  </div>
                </div>

                {/* Book info */}
                <div className="flex gap-8">
                  <div className="w-1/2">
                    <div className="mb-2 block">
                      <Label htmlFor="bookTitle" value="Tên sách mượn" />
                    </div>
                    <TextInput
                      id="bookTitle"
                      name="bookTitle"
                      type="text"
                      placeholder="Tên sách"
                      defaultValue={bookTitle}
                      required
                      readOnly
                    />
                  </div>

                  <div className="w-1/2">
                    <div className="mb-2 block">
                      <Label htmlFor="authorName" value="Tên tác giả" />
                    </div>
                    <TextInput
                      id="authorName"
                      name="authorName"
                      type="text"
                      placeholder="Tên tác giả"
                      defaultValue={authorName}
                      required
                      readOnly
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="mb-2 bg-[#a69060]"
                  onClick={handleLoginClick}
                  disabled={isButtonDisabled}
                >
                  <div className="flex items-center gap-2">
                    <p>Đăng ký mượn sách</p>
                    <BsFillSendFill />
                  </div>
                </Button>

                <Button
                  className="mb-5 bg-[#354d75]"
                  onClick={() => {
                    window.location.href = "/all-books";
                  }}
                >
                  <div className="flex items-center gap-2">
                    <p>Quay lại thư viện</p>
                    <TiArrowBackOutline size={24} />
                  </div>
                </Button>
              </form>
            </div>
          )}

          {/* about Author */}
          <h2 className="font-title text-4xl font-medium">{bookTitle}</h2>
          <div className="flex gap-2 text-center">
            <p className="text-xl">{authorName}</p>
            <HiMiniCheckBadge className="my-auto text-2xl text-[#825445]" />
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
                {views}+ lượt xem
              </a>
            </Rating>
          </div>

          <ToggleShowMore text={bookDescription} />

          <div className="flex gap-4">
            <span className="text-[#825445]">Thể loại</span>

            <a
              href="#"
              className="font-medium text-gray-900 underline hover:no-underline dark:text-white"
            >
              {category}
            </a>
          </div>
          <hr />
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-medium">Về người chia sẻ</h2>

            <Link
              to={`/member/${sharedBy_id}`}
              className="flex gap-4 text-center"
            >
              <div className="my-auto h-20 w-20 rounded-full border border-solid border-opacity-10 object-cover shadow-md hover:shadow-lg">
                <img
                  src={sharerAvatar}
                  alt=""
                  className="h-20 w-20 shrink-0 rounded-full object-cover"
                />
              </div>

              <div className="flex flex-col text-left">
                <div className="flex gap-1 text-center">
                  <p className="text-xl">{sharerName}</p>
                  <HiMiniCheckBadge className="mt-1 text-xl text-[#825445]" />
                </div>
                <p className="text-gray-500">{sharerWorkPlace}</p>
                <p className="flex gap-2 text-gray-500">
                  <span>Đã chia sẻ:</span>
                  {count} cuốn sách
                </p>
                <div className="flex items-center gap-1">
                  <ImProfile />
                  <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                    Xem profile
                  </p>
                </div>
              </div>
            </Link>
            <div>
              <p className="">{sharerComment}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
