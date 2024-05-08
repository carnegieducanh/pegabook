import React, { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import userAvatar from "../../assets/user avatar.png";
import SearchMembers from "../../components/SearchMembers";
import { Datepicker } from "flowbite-react";

function AddBorrower() {
    const [status, setStatus] = useState("Đang mượn bởi");
    const [bookedTime, setBookedTime] = useState("Thời gian mượn");

    const { id } = useParams();
    console.log(id);

    const { sharedBy_id } = useLoaderData();

    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        setStatus(newStatus);
    };

    const handleBookedTimeChange = (event) => {
        const newBookedTime = event.target.value;
        setBookedTime(newBookedTime);
    };

    // Chuyển đến trang khác
    const navigate = useNavigate();

    // handle book update
    const handleUpdate = (event) => {
        event.preventDefault();
        const form = event.target;

        // const memberName = form.searchInput.value;
        const status = form.status.value;
        const borrowedBy = form.borrowedBy.value;
        const borrowerID = form.borrowerID.value;
        const bookedTime = form.bookedTime.value;
        const borrowedDate = form.borrowedDate.value;
        const returnDate = form.returnDate.value;

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
                navigate(`/member/dashboard/manage/${sharedBy_id}`);
            });
    };
    return (
        <div className="px-4 my-12 w-full ">
            <h2 className="mb-8 text-3xl font-bold">Add borrower</h2>

            <form
                onSubmit={handleUpdate}
                className="flex  flex-col flex-wrap gap-4"
            >
                {/* ======= Sharer's Info ======= */}
                <div className="mx-auto">
                    <div className="">
                        <img
                            id="searchAvatar"
                            name="memberAvatar"
                            src={userAvatar}
                            alt=""
                            className="rounded-full object-cover border-4  w-32 h-32"
                        />
                    </div>
                </div>
                <div className="flex flex-col mx-auto gap-8">
                    <div className="hidden">
                        <div className="mb-2 block">
                            <Label htmlFor="status" value="Status" />
                        </div>
                        <TextInput
                            id="status"
                            name="status"
                            value={status}
                            onChange={handleStatusChange}
                            required
                            readOnly
                        />
                    </div>

                    <div>
                        <div className="mb-2 block ">
                            <Label htmlFor="memberName" value="Member name" />
                        </div>
                        <div>
                            <SearchMembers />
                        </div>
                    </div>
                    <div className="hidden">
                        <div className="mb-2 block">
                            <Label htmlFor="bookedTime" value="Booked Time" />
                        </div>
                        <TextInput
                            id="bookedTime"
                            name="bookedTime"
                            value={bookedTime}
                            onChange={handleBookedTimeChange}
                            required
                            readOnly
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="borrowedDate"
                                    value="Borrowed Date"
                                />
                            </div>
                            <Datepicker id="borrowedDate" name="borrowedDate" />
                        </div>

                        {/* Datepicker 2 */}
                        <div className="">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="returnDate"
                                    value="Return Date"
                                />
                            </div>
                            <Datepicker id="returnDate" name="returnDate" />
                        </div>
                    </div>

                    <Button type="submit" className="mt-5 mx-auto w-full">
                        Add this account
                    </Button>
                </div>
                <div className="gap-4 hidden">
                    <div className="lg:w-1/2">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="borrowedBy"
                                value="Book borrowed by (current people)"
                            />
                        </div>
                        <TextInput
                            id="borrowedBy"
                            name="borrowedBy"
                            type="text"
                            placeholder="Book borrowed by"
                            readOnly
                        />
                    </div>

                    <div className="lg:w-1/2">
                        <div className="mb-2 block">
                            <Label htmlFor="borrowerID" value="Borrower ID" />
                        </div>
                        <TextInput
                            id="borrowerID"
                            name="borrowerID"
                            type="text"
                            placeholder="Borrower ID"
                            required
                            readOnly
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddBorrower;
