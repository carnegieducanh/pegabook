import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Button, Label, TextInput, Textarea } from "flowbite-react";

import ImageUpload from "../../components/ImageUpload";

const EditMember = () => {
    const [avatar, setAvatar] = useState(""); // State để lưu trữ URL của hình ảnh

    // Hàm callback để cập nhật memberAvatar
    const handleAvatarChange = (avatarUrl) => {
        setAvatar(avatarUrl);
    };

    const { id } = useParams();
    const {
        memberName,
        memberAvatar,
        workPlace,
        memberID,
        email,
        userName,
        password,
        comment,
    } = useLoaderData();

    // Chuyển đến trang khác
    const navigate = useNavigate();

    // handle member submission
    const handleUpdateMember = (event) => {
        event.preventDefault();

        const form = event.target;
        const memberName = form.memberName.value;
        const memberID = form.memberID.value;
        const workPlace = form.workPlace.value;
        const email = form.email.value;
        const userName = form.userName.value;
        const password = form.password.value;
        const comment = form.comment.value;

        const updateMemberObj = {
            memberName,
            memberAvatar: avatar || memberAvatar,
            workPlace,
            memberID,
            email,
            userName,
            password,
            comment,
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
            .then(() => {
                // console.log(data);
                alert("Member updated successfully!!!");

                // Chuyển đến trang khác
                navigate("/admin/dashboard/manage-members");
            });
    };
    return (
        <div className="px-4 my-12 w-full">
            <h2 className="mb-8 text-3xl font-bold font-title">
                Edit the member data
            </h2>

            <form
                onSubmit={handleUpdateMember}
                className="flex  flex-col flex-wrap gap-4"
            >
                {/* first row */}
                <ImageUpload
                    onAvatarChange={handleAvatarChange}
                    memberAvatar={memberAvatar}
                />

                <div className="flex w-full gap-8">
                    <div className="w-1/2">
                        <div className="mb-2 block">
                            <Label htmlFor="memberName" value="Member Name" />
                        </div>
                        <TextInput
                            id="memberName"
                            name="memberName"
                            type="text"
                            placeholder="Member name"
                            defaultValue={memberName}
                            required
                        />
                    </div>

                    {/*2nd row */}

                    <div className="w-1/2">
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>
                        <TextInput
                            id="email"
                            name="email"
                            type="text"
                            placeholder="Email"
                            defaultValue={email}
                            // readOnly
                            // required
                        />
                    </div>
                </div>

                {/*3nd row */}
                <div className="flex gap-8">
                    {/* Member ID */}
                    <div className="w-1/2">
                        <div className="mb-2 block">
                            <Label htmlFor="memberID" value="Member ID" />
                        </div>
                        <TextInput
                            id="memberID"
                            name="memberID"
                            type="text"
                            placeholder="Member ID"
                            defaultValue={memberID}
                            // required
                            readOnly
                        />
                    </div>
                    <div className="w-1/2">
                        <div className="mb-2 block">
                            <Label htmlFor="workPlace" value="Work place" />
                        </div>
                        <TextInput
                            id="workPlace"
                            name="workPlace"
                            type="text"
                            placeholder="Work place"
                            defaultValue={workPlace}
                            required
                        />
                    </div>
                </div>

                {/* comment */}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="comment" value="Comment" />
                    </div>
                    <Textarea
                        id="comment"
                        name="comment"
                        placeholder="Write member's comment..."
                        defaultValue={comment}
                        required
                        className="w-full"
                        rows={2}
                    />
                </div>

                {/* Member User */}
                <h2 className="mt-4 text-xl font-bold">Info user account</h2>
                <div className="flex gap-8">
                    <div className="w-1/2">
                        <div className="mb-2 block">
                            <Label htmlFor="userName" value="User name" />
                        </div>
                        <TextInput
                            id="userName"
                            name="userName"
                            type="text"
                            placeholder="User name"
                            defaultValue={userName}
                            // readOnly
                            required
                        />
                    </div>
                    <div className="w-1/2">
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Password" />
                        </div>
                        <TextInput
                            id="password"
                            name="password"
                            type="text"
                            placeholder="Password"
                            defaultValue={password}
                            // readOnly
                            required
                        />
                    </div>
                </div>

                <Button type="submit" className="mt-5">
                    Update Member
                </Button>
            </form>
        </div>
    );
};

export default EditMember;
