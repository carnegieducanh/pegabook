import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import userAvatar from "../../assets/user avatar.png";
import SearchSharer from "../../components/SearchSharer";

const CreateSharer = () => {
    const [sharerPw, setSharerPw] = useState("ilovepj");

    const handleSharerPwChange = (event) => {
        const newPw = event.target.value;
        setSharerPw(newPw);
    };

    // Chuyển đến trang khác
    const navigate = useNavigate();

    // handle member submission
    const handleMemberSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        const memberName = form.searchInputSharer.value;
        const memberAvatar = form.memberAvatar.value;
        const id = form._id.value;
        const memberID = form.memberID.value;
        const email = form.email.value;
        const sharerPassword = form.sharerPassword.value;

        const memberObj = {
            memberName,
            memberAvatar,
            memberID,
            email,
            sharerPassword,
        };
        console.log(memberObj);

        fetch(`https://pega-book-server.onrender.com/member/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(memberObj),
        })
            .then((res) => res.json())
            .then(() => {
                // console.log(data);
                alert("Member added successfully!!!");

                // Chuyển đến trang khác
                navigate("/admin/dashboard/main");
            });
    };

    return (
        <div className="px-4 my-12 w-full">
            <h2 className="mb-8 text-3xl font-bold">Create a Sharer</h2>

            <form
                onSubmit={handleMemberSubmit}
                className="flex lg:w-[1024px] flex-col flex-wrap gap-4"
            >
                {/* ======= Sharer's Info ======= */}
                <div className="mx-auto">
                    <div className="mb-2 block">
                        <Label htmlFor="memberAvatar" value="Member Avatar" />
                    </div>
                    <div className="">
                        <img
                            id="searchAvatar"
                            name="memberAvatar"
                            src={userAvatar}
                            alt=""
                            className="rounded-full object-cover border-4 w-32 h-32"
                        />
                    </div>
                </div>
                <div className="flex flex-col mx-auto w-full lg:w-1/2 gap-8">
                    <div>
                        <div className="mb-2 block ">
                            <div className="mb-2 block ">
                                <Label htmlFor="sharedBy" value="Member name" />
                            </div>
                            <div>
                                <SearchSharer />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="email"
                                value="Nhập Email người chia sẻ"
                                className="text-red-700"
                            />
                        </div>
                        <TextInput
                            id="searchEmail"
                            name="email"
                            type="text"
                            placeholder="Email"
                            required
                        />
                    </div>
                </div>

                {/* 5nd row */}
                <div className="mx-auto w-full lg:w-1/2">
                    <h2 className="my-4 text-xl font-bold">
                        Create a login Account (automatic)
                    </h2>
                    {/* Member User */}
                    <div className="flex gap-8 ">
                        <div className="w-1/2">
                            <div className="mb-2 block">
                                <Label htmlFor="memberID" value="User name" />
                            </div>
                            <TextInput
                                id="searchID"
                                name="memberID"
                                type="text"
                                placeholder="User name"
                                readOnly
                                required
                            />
                        </div>

                        <div className="w-1/2">
                            <div className="mb-2 block">
                                <Label htmlFor="password" value="Password" />
                            </div>
                            <TextInput
                                id="searchPassword"
                                name="sharerPassword"
                                type="text"
                                placeholder="Password"
                                value={sharerPw}
                                onChange={handleSharerPwChange}
                                readOnly
                                required
                            />
                        </div>
                    </div>

                    <Button type="submit" className="mt-10 w-full">
                        Add this account
                    </Button>
                </div>

                <div className="hidden">
                    <div className="mb-2 block">
                        <Label htmlFor="id" value="_id" />
                    </div>
                    <TextInput
                        id="search_id"
                        name="_id"
                        type="text"
                        placeholder="id"
                        required
                        readOnly
                    />
                </div>
            </form>
        </div>
    );
};

export default CreateSharer;
