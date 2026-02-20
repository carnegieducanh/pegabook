import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { BsFillSendFill } from "react-icons/bs";
import { TiArrowBackOutline } from "react-icons/ti";
import { Button, Datepicker, Label, Rating, TextInput, Textarea } from "flowbite-react";
import emailjs from "@emailjs/browser";
import ToggleShowMore from "../../components/ToggleShowMore";

const API_BASE = "https://pega-book-server.onrender.com";

const FormField = ({ label, id, ...props }) => (
  <div>
    <div className="mb-2 block">
      <Label htmlFor={id} value={label} />
    </div>
    <TextInput id={id} name={id} type="text" readOnly required {...props} />
  </div>
);

const ReturnBook = () => {
  const navigate = useNavigate();
  const {
    _id, bookTitle, imageUrl, authorName, bookDescription,
    category, sharerID, status, borrowerID,
    bookedTime, borrowedDate, returnDate, views,
  } = useLoaderData();

  const [count, setCount] = useState(0);
  const [sharer, setSharer] = useState({});
  const [borrower, setBorrower] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [_id]);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/all-members`).then((r) => r.json()),
      fetch(`${API_BASE}/all-books`).then((r) => r.json()),
    ]).then(([members, books]) => {
      setCount(books.filter((b) => b.sharerID === sharerID).length);
      setSharer(members.find((m) => m.memberID === sharerID) ?? {});
      setBorrower(members.find((m) => m.memberID === borrowerID) ?? {});
    });
  }, [sharerID, borrowerID]);

  const sendEmail = (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to send this mail?")) return;

    emailjs
      .sendForm("service_fsg25n8", "template_aawv0y3", e.target, "NbXcMWTgvO9EetTrb")
      .then(
        () => { alert("Message sent successfully."); setIsButtonDisabled(true); },
        () => alert("Failed to send message, please try again."),
      );
  };

  return (
    <div className="my-12 w-full px-4">
      <h2 className="mb-8 text-3xl font-bold">Đăng ký trả sách</h2>

      <div className="my-12 flex h-full flex-col gap-10 lg:flex-row">
        {/* Left: Book cover + status */}
        <div className="flex w-full flex-row gap-3 text-left lg:w-[20%] lg:flex-col">
          <img
            src={imageUrl}
            alt=""
            className="h-72 w-48 shrink-0 transform rounded-br-xl rounded-tr-xl object-cover shadow-xl duration-300 hover:scale-105"
          />
          <div className="mt-5 flex flex-col gap-2 text-left">
            <h3 className="font-medium">Status</h3>
            <div className="text-left">
              <p className="text-lg">{status}</p>
              <p className="text-xl text-pink-800">{borrower.memberName}</p>
              <p className="text-gray-500">{borrower.workPlace}</p>
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

        {/* Right: Form + book info */}
        <div className="flex w-full flex-col gap-2 lg:w-[80%]">
          <form onSubmit={sendEmail} className="flex flex-col flex-wrap gap-4">
            <div className="flex gap-8">
              <div className="w-1/2">
                <div className="mb-2 block">
                  <Label htmlFor="returnDate" value="Chọn ngày bạn dự định trả" />
                </div>
                <Datepicker id="returnDate" name="returnDate" />
              </div>
              <div className="w-1/2" />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="comment" value="Lời nhắn của bạn" />
              </div>
              <Textarea
                id="comment"
                name="comment"
                placeholder="Viết lời nhắn của bạn đến Pega Book hoặc người chia sẻ sách..."
                required
                className="w-full"
                rows={2}
              />
            </div>

            <div className="hidden">
              <TextInput id="email" name="email" type="text" defaultValue={sharer.email} readOnly required />
            </div>

            <h2 className="text-xl font-medium">Thông tin về bạn</h2>

            <FormField label="Tên của bạn" id="memberName" defaultValue={borrower.memberName} />

            <div className="flex gap-8">
              <div className="w-1/2">
                <FormField label="Mã thành viên" id="memberID" defaultValue={borrowerID} />
              </div>
              <div className="w-1/2">
                <FormField label="Nơi làm việc" id="workPlace" defaultValue={borrower.workPlace} />
              </div>
            </div>

            <div className="flex gap-8">
              <div className="w-1/2">
                <FormField label="Tên sách mượn" id="bookTitle" defaultValue={bookTitle} />
              </div>
              <div className="w-1/2">
                <FormField label="Tên tác giả" id="authorName" defaultValue={authorName} />
              </div>
            </div>

            <Button type="submit" className="mb-2 bg-brand" disabled={isButtonDisabled}>
              <div className="flex items-center gap-2">
                <p>Đăng ký trả sách</p>
                <BsFillSendFill />
              </div>
            </Button>

            <Button
              className="mb-5 bg-cobalt"
              onClick={() => navigate(`/member/dashboard/borrowed-book/${borrower._id}`)}
            >
              <div className="flex items-center gap-2">
                <p>Quay lại mục trả sách</p>
                <TiArrowBackOutline size={24} />
              </div>
            </Button>
          </form>

          <h2 className="text-4xl font-medium">{bookTitle}</h2>
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
            <p className="text-md ml-2 font-medium text-gray-500 dark:text-gray-400">4.95 out of 5</p>
            <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
            <a href="#" className="text-md font-medium text-gray-900 underline hover:no-underline dark:text-white">
              {views}+ lượt xem
            </a>
          </Rating>

          <ToggleShowMore text={bookDescription} />

          <div className="flex gap-4">
            <span className="text-sienna">Thể loại</span>
            <a href="#" className="font-medium text-gray-900 underline hover:no-underline dark:text-white">
              {category}
            </a>
          </div>

          <hr />

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-medium">Về người chia sẻ</h2>
            <div className="flex gap-4 text-center">
              <div className="h-16 w-16 rounded-full border border-solid border-opacity-10 object-cover shadow-md hover:shadow-lg">
                <img src={sharer.memberAvatar} alt="" className="h-16 w-16 shrink-0 rounded-full object-cover" />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex gap-1 text-center">
                  <p className="text-xl">{sharer.memberName}</p>
                  <HiMiniCheckBadge className="mt-1 text-xl text-sienna" />
                </div>
                <p className="text-gray-500">{sharer.workPlace}</p>
                <p className="flex gap-2 text-gray-500">
                  <span>Đã chia sẻ:</span>
                  {count} books
                </p>
              </div>
            </div>
            <p>{sharer.comment}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnBook;
