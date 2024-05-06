import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import userAvatar from "../../assets/user avatar.png";

function RemoveBorrower() {
    const [status, setStatus] = useState("Đang mượn bởi");
    const [bookedTime, setBookedTime] = useState("Thời gian mượn");

    const [memberData, setMemberData] = useState(null);

    const [borrower, setBorrower] = useState();
    const [borrowerAvatar, setBorrowerAvatar] = useState();
    // const [borrowerWorkPlace, setBorrowerWorkPlace] = useState();

    const { id } = useParams();
    console.log(id);

    const { sharedBy_id, borrowerID, bookTitle, borrowedDate, returnDate } =
        useLoaderData();
    // console.log(borrowerID);

    // Chuyển đến trang khác
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://pega-book-server.onrender.com/all-members")
            .then((res) => res.json())
            .then((data) => {
                setMemberData(data);
                console.log("All Books:", data);
            });
    }, []);

    useEffect(() => {
        if (memberData) {
            let borrowerName = [];
            let borrowerAvatar = [];
            // let borrowerWorkPlace = [];

            memberData.forEach((borrower) => {
                if (borrowerID === borrower.memberID) {
                    borrowerName = borrower.memberName;
                    borrowerAvatar = borrower.memberAvatar;
                    // borrowerWorkPlace = borrower.workPlace;
                    return; // Thêm break để dừng vòng lặp sau khi tìm thấy
                }
            });

            // Cập nhật state cho biến đếm

            setBorrower(borrowerName);
            setBorrowerAvatar(borrowerAvatar);
            // setBorrowerWorkPlace(borrowerWorkPlace);
        }
    }, [memberData]);

    // handle book update
    const handleUpdate = (event) => {
        event.preventDefault();

        // const memberName = form.searchInput.value;
        const status = "Có thể mượn";
        const borrowedBy = "";
        const borrowerID = "";
        const bookedTime = "";
        const borrowedDate = "";
        const returnDate = "";

        const updateBookObj = {
            status,
            borrowedBy,
            borrowerID,
            bookedTime,
            borrowedDate,
            returnDate,
        };

        // update book data
        fetch(`https://pega-book-server.onrender.com/book/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateBookObj),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                alert("Book updated successfully!!!");

                // Chuyển đến trang khác
                navigate(`/sharer/dashboard/manage/${sharedBy_id}`);
            });
    };
    return (
        <div className="px-4 my-12 w-full">
            <h2 className="mb-8 text-3xl font-bold">Remove borrower</h2>

            <form
                onSubmit={handleUpdate}
                className="flex  flex-col flex-wrap gap-4"
            >
                {/* ======= Sharer's Info ======= */}
                <div className="mx-auto">
                    <div className="relative mx-auto w-32 h-32">
                        <img
                            id="memberAvatar"
                            name="memberAvatar"
                            src={borrowerAvatar || userAvatar}
                            alt=""
                            className="rounded-full object-cover border-4 border-[lightgray] w-full h-full"
                        />
                    </div>
                </div>
                <div className="flex flex-col mx-auto gap-8 w-full lg:w-1/2">
                    <div className="">
                        <div className="mb-2 block">
                            <Label htmlFor="userName" value="User name" />
                        </div>
                        <TextInput
                            id="userName"
                            name="userName"
                            type="text"
                            placeholder="User name"
                            defaultValue={borrower}
                            readOnly
                            required
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <div className="mb-2 block">
                                <Label htmlFor="bookTitle" value="Book Title" />
                            </div>
                            <TextInput
                                id="bookTitle"
                                name="bookTitle"
                                value={bookTitle}
                                required
                                readOnly
                            />
                        </div>
                        <div className="w-1/2">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="bookedTime"
                                    value="Booked Time"
                                />
                            </div>
                            <TextInput
                                id="bookedTime"
                                name="bookedTime"
                                value={bookedTime}
                                required
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="flex gap-4 ">
                        <div className="w-1/2">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="borrowedDate"
                                    value="Borrowed Date"
                                />
                            </div>
                            <TextInput
                                id="borrowedDate"
                                name="borrowedDate"
                                type="text"
                                // placeholder="Book borrowed by"
                                defaultValue={borrowedDate}
                                readOnly
                            />
                        </div>

                        <div className="w-1/2">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="returnDate"
                                    value="Return Date"
                                />
                            </div>
                            <TextInput
                                id="returnDate"
                                name="returnDate"
                                type="text"
                                // placeholder="Borrower ID"
                                defaultValue={returnDate}
                                required
                                readOnly
                            />
                        </div>
                    </div>

                    <Button type="submit" className="mt-5">
                        Remove this borrower
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default RemoveBorrower;
