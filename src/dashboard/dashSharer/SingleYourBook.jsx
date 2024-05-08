import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { Button, Rating } from "flowbite-react";
import ToggleShowMore from "../../components/ToggleShowMore";
import { IoPersonAdd, IoPersonRemoveOutline } from "react-icons/io5";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

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
                console.log("All Books:", data);
            });
    }, []);

    useEffect(() => {
        fetch("https://pega-book-server.onrender.com/all-books")
            .then((res) => res.json())
            .then((data) => {
                setAllBooksData(data);
                console.log("All Books:", data);
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

    // Chuyển đến trang khác
    const navigate = useNavigate();

    // delete a book
    const handleDelete = (id) => {
        // Sử dụng window.confirm để hiển thị thông báo
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this book?"
        );

        // Kiểm tra xem người dùng đã xác nhận hay không
        if (isConfirmed) {
            fetch(`https://pega-book-server.onrender.com/book/${id}`, {
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
        <div className="min-h-screen px-4 my-12 ">
            <h2 className="mb-4 text-3xl font-bold">Sách của bạn</h2>
            <div className="py-5 lg:px-10 h-full flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/5 flex lg:flex-col flex-row gap-8 lg:gap-0 mb-5">
                    <img
                        src={imageUrl}
                        alt=""
                        className="h-72 w-48 transform hover:scale-105 duration-300 shadow-xl rounded-tr-xl rounded-br-xl"
                    />

                    {/* Status */}
                    <div className="text-left flex flex-col gap-2 mt-5l">
                        <div className="font-medium text-gray-900 underline hover:no-underline dark:text-white">
                            <h3 className="text-leftfont-medium ">Status</h3>
                        </div>

                        <div className="text-left">
                            <p className="text-lg">{status}</p>
                            <p className="text-xl text-pink-700">{borrower}</p>
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
                <div className="flex flex-col gap-2 w-full lg:w-4/5">
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

                        <div className="font-medium text-gray-900 underline hover:no-underline dark:text-white">
                            {category}
                        </div>
                    </div>

                    <hr />

                    <div className="flex gap-2 md:gap-10 mt-5 text-lg">
                        <div className="flex flex-col gap-10">
                            <Button className="w-48">
                                <Link
                                    className="font-semibold my-auto flex items-center"
                                    to={`/member/dashboard/add-borrower/${_id}`}
                                >
                                    <IoPersonAdd />
                                    <div className="px-2">Add borrower</div>
                                </Link>
                            </Button>
                            <Button className="w-48">
                                <Link
                                    className="font-semibold my-auto flex items-center"
                                    to={`/member/dashboard/edit-books/${_id}`}
                                >
                                    <GrEdit />
                                    <div className="px-2">Edit book</div>
                                </Link>
                            </Button>
                        </div>

                        <div className="flex flex-col gap-10">
                            <Button className="bg-red-800 w-48">
                                <Link
                                    className="font-semibold my-auto flex items-center"
                                    to={`/member/dashboard/remove-borrower/${_id}`}
                                >
                                    <IoPersonRemoveOutline />
                                    <div className="px-2">Remove borrower</div>
                                </Link>
                            </Button>

                            <Button
                                onClick={() => handleDelete(_id)}
                                className="font-semibold my-auto flex items-center bg-red-800 w-48"
                            >
                                <RiDeleteBin6Line />
                                <div className="px-2">Delete book</div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleYourBook;
