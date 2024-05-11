import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { Button, Label, Rating, TextInput, Textarea } from "flowbite-react";
import LoginMember from "../components/LoginToBorrow";
import { Datepicker } from "flowbite-react";
import { BsFillSendFill } from "react-icons/bs";
import emailjs from "@emailjs/browser";
import ToggleShowMore from "../components/ToggleShowMore";
import ImageBanner from "../components/ImageBanner";

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
    const [borrowerAvatar, setBorrowerAvatar] = useState();
    const [borrowerWorkPlace, setBorrowerWorkPlace] = useState();

    const [showMemberInfo, setShowMemberInfo] = useState(false);

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
        memberID,
        status,
        borrowerID,
        bookedTime,
        borrowedDate,
        returnDate,
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
            let borrowerAvatar = [];
            let borrowerWorkPlace = [];

            allBookData.forEach((book) => {
                if (memberID === book.memberID) {
                    totalCount++;
                }
            });

            memberData.forEach((member) => {
                if (memberID === member.memberID) {
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
                    borrowerAvatar = borrower.memberAvatar;
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
            setBorrowerAvatar(borrowerAvatar);
            setBorrowerWorkPlace(borrowerWorkPlace);
        }
    }, [memberData, allBookData]);

    const navigate = useNavigate();

    // ********** Send Email **********
    const sendEmail = (event) => {
        event.preventDefault();
        alert("Message sent successfully.");
        window.location.reload(); // Reload lại trang
        // navigate("/our-books");

        emailjs.sendForm(
            "service_iu86g7t",
            "template_md4bn27",
            event.target,
            "62seVVbY10pzmV4fj"
        );
    };

    return (
        <div className="flex flex-col min-h-screen">
            <ImageBanner />

            <div className="py-10 px-8 lg:px-40 h-full flex flex-col md:flex-row gap-10 ">
                <div className="lg:w-[30%] lg:pl-12 flex md:flex-col gap-3 md:gap-0 text-left ">
                    <div>
                        <img
                            src={imageUrl}
                            alt=""
                            className="w-48 h-72 lg:h-72 lg:w-48 transform hover:scale-105 duration-300 shadow-xl rounded-tr-xl rounded-br-xl object-cover shrink-0"
                        />
                        <div onClick={handleLoginClick} className="mb-5">
                            <LoginMember _id={_id} />
                        </div>
                    </div>

                    {/* Status */}
                    <div className="text-left flex flex-col gap-2">
                        <a
                            href="#"
                            className="font-medium text-gray-900 underline hover:no-underline dark:text-white"
                        >
                            <h3 className="text-left font-medium ">Status</h3>
                        </a>

                        <div className="text-left">
                            <p className="text-lg">{status}</p>
                            <p className="text-xl  text-pink-800">{borrower}</p>
                            <p className="text-gray-500">{borrowerWorkPlace}</p>
                        </div>
                        <div className="text-gray-500 text-left">
                            <p className="text-black text-lg">{bookedTime}</p>
                            <div className="flex gap-2">
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
                            {/* ======= Member Info Begin ======= */}

                            {/* FORM Begin */}
                            <form
                                onSubmit={sendEmail}
                                className="flex flex-col flex-wrap gap-4"
                            >
                                <div className="flex gap-8">
                                    {/* Datepicker 1 */}
                                    <div className="w-1/2">
                                        <div className="mb-2 block">
                                            <Label
                                                htmlFor="borrowedDate"
                                                value="Ngày bạn muốn mượn"
                                            />
                                        </div>
                                        <Datepicker
                                            id="borrowedDate"
                                            name="borrowedDate"
                                        />
                                    </div>

                                    {/* Datepicker 2 */}
                                    <div className="w-1/2">
                                        <div className="mb-2 block">
                                            <Label
                                                htmlFor="returnDate"
                                                value="Ngày bạn dự định trả"
                                            />
                                        </div>
                                        <Datepicker
                                            id="returnDate"
                                            name="returnDate"
                                        />
                                    </div>
                                </div>

                                {/* Lờì nhắn đến người chia sẻ */}
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="comment"
                                            value="Lời nhắn của bạn"
                                        />
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
                                {/* Email người nhận */}
                                <div className="hidden">
                                    <div className="-my-10 block">
                                        <Label
                                            htmlFor="email"
                                            value="Email người chia sẻ"
                                        />
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
                                <h2 className="text-xl font-medium">
                                    Thông tin về bạn
                                </h2>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="memberName"
                                            value="Tên của bạn"
                                        />
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
                                            <Label
                                                htmlFor="memberID"
                                                value="Mã thành viên"
                                            />
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
                                            <Label
                                                htmlFor="workPlace"
                                                value="Nơi làm việc"
                                            />
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
                                            <Label
                                                htmlFor="bookTitle"
                                                value="Tên sách mượn"
                                            />
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
                                            <Label
                                                htmlFor="authorName"
                                                value="Tên tác giả"
                                            />
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
                                    className="mb-5 bg-[#a69060]"
                                >
                                    <div className="flex items-center gap-2 ">
                                        <p>Đăng ký mượn sách</p>
                                        <BsFillSendFill />
                                    </div>
                                </Button>
                            </form>
                        </div>
                    )}

                    {/* about Author */}
                    <h2 className="text-4xl font-medium">{bookTitle}</h2>
                    <div className="flex text-center gap-2">
                        <p className="text-xl">{authorName}</p>
                        <HiMiniCheckBadge className="text-[#825445] text-2xl my-auto" />
                    </div>
                    <div>
                        <Rating>
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star filled={false} />
                            <p className="ml-2 text-md font-medium text-gray-500 dark:text-gray-400">
                                4.95 out of 5
                            </p>
                            <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                            <a
                                href="#"
                                className="text-md font-medium text-gray-900 underline hover:no-underline dark:text-white"
                            >
                                100+ reviews
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
                        <h2 className="text-2xl font-medium">
                            Về người chia sẻ
                        </h2>

                        <Link
                            to={`/member/${sharedBy_id}`}
                            className="flex text-center gap-4"
                        >
                            <div className="border border-solid border-opacity-10 object-cover shadow-md hover:shadow-lg w-16 h-16 rounded-full">
                                <img
                                    src={sharerAvatar}
                                    alt=""
                                    className="w-16 h-16 rounded-full object-cover shrink-0"
                                />
                            </div>

                            <div className="flex flex-col text-left">
                                <div className="flex text-center gap-1">
                                    <p className="text-xl">{sharerName}</p>
                                    <HiMiniCheckBadge className="text-[#825445] text-xl mt-1" />
                                </div>
                                <p className="text-gray-500">
                                    {sharerWorkPlace}
                                </p>
                                <p className="text-gray-500 flex gap-2">
                                    <span>Đã chia sẻ:</span>
                                    {count} books
                                </p>
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
