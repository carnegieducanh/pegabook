import React from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";

function YourPassword() {
    const { id } = useParams();
    const { _id, memberAvatar, memberID, password } = useLoaderData();

    //   ===========================================

    // Chuyển đến trang khác
    const navigate = useNavigate();

    // handle member submission
    const handleUpdateMember = (event) => {
        event.preventDefault();

        const form = event.target;

        const password = form.newPassword.value;

        const updateMemberObj = {
            password,
        };

        // update data to database
        fetch(`https://pega-book-server.onrender.com/member/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateMemberObj),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                alert("Member updated successfully!!!");

                // Chuyển đến trang khác
                navigate(`/member/dashboard/${_id}`);
            });
    };
    return (
        <div className="px-4 my-12 w-full">
            <h2 className="mb-8 text-3xl font-bold">Change your password</h2>

            <form
                onSubmit={handleUpdateMember}
                className="flex  flex-col flex-wrap gap-4"
            >
                {/* first row */}
                <div className="flex gap-5 mx-auto">
                    <div className="relative mx-auto w-32 h-32">
                        <img
                            src={memberAvatar}
                            alt=""
                            className="rounded-full object-cover border-4 border-[lightgray] w-full h-full"
                        />
                    </div>
                </div>

                {/* Member User */}
                <h2 className="mx-auto text-xl font-bold">Your account</h2>
                <div className="flex flex-col mx-auto w-full lg:w-1/2 gap-4">
                    <div className="">
                        <div className="mb-2 block">
                            <Label htmlFor="userName" value="User name" />
                        </div>
                        <TextInput
                            id="userName"
                            name="userName"
                            type="text"
                            placeholder="User name"
                            defaultValue={memberID}
                            readOnly
                            required
                        />
                    </div>

                    <div className="">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="password"
                                value="Current password"
                            />
                        </div>
                        <TextInput
                            id="password"
                            name="password"
                            type="text"
                            defaultValue={password}
                            readOnly
                            required
                        />
                    </div>

                    <div className="">
                        <div className="mb-2 block">
                            <Label htmlFor="newPassword" value="New password" />
                        </div>
                        <TextInput
                            id="newPassword"
                            name="newPassword"
                            type="text"
                            required
                        />
                    </div>

                    <Button type="submit" className="mt-5">
                        Update
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default YourPassword;
