import React, { useRef, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import ImageUpload from "../../components/ImageUpload";

const YourProfile = () => {
    const [avatar, setAvatar] = useState(""); // State để lưu trữ URL của hình ảnh

    // Hàm callback để cập nhật memberAvatar
    const handleAvatarChange = (avatarUrl) => {
        setAvatar(avatarUrl);
    };

    const { id } = useParams();
    const {
        _id,
        memberName,
        memberAvatar,
        workPlace,
        memberID,
        email,
        comment,
        review,
    } = useLoaderData();

    // Chuyển đến trang khác
    const navigate = useNavigate();

    // handle member submission
    const handleUpdateMember = (event) => {
        event.preventDefault();

        const form = event.target;
        const workPlace = form.workPlace.value;
        const email = form.email.value;
        const comment = form.comment.value;
        const review = form.review.value;

        const updateMemberObj = {
            memberAvatar: avatar || memberAvatar,
            workPlace,
            email,
            comment,
            review,
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
            <h2 className="mb-8 text-3xl font-bold">Sửa thông tin cá nhân</h2>

            <form
                onSubmit={handleUpdateMember}
                className="flex flex-col flex-wrap gap-4"
            >
                {/* first row */}
                <ImageUpload
                    onAvatarChange={handleAvatarChange}
                    memberAvatar={memberAvatar}
                />

                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="w-full lg:w-1/2">
                        <div className="mb-2 block">
                            <Label htmlFor="memberName" value="Member Name" />
                        </div>
                        <TextInput
                            id="memberName"
                            name="memberName"
                            type="text"
                            placeholder="Member name"
                            defaultValue={memberName}
                            readOnly
                            required
                        />
                    </div>
                    <div className="w-full lg:w-1/2">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="email"
                                value="Email (Nhận yêu cầu mượn sách từ thành viên)"
                            />
                        </div>
                        <TextInput
                            id="email"
                            name="email"
                            type="text"
                            placeholder="Email"
                            defaultValue={email}
                            required
                        />
                    </div>
                </div>

                {/*3nd row */}
                <div className="flex gap-4">
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
                            required
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

                {/* review */}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="review" value="Vài nét về bản thân" />
                    </div>
                    <Textarea
                        id="review"
                        name="review"
                        placeholder="Hãy viết vài điều về bản thân bạn..."
                        defaultValue={review}
                        // required
                        className="w-full"
                        rows={5}
                    />
                </div>

                {/* comment */}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="comment" value="Cảm nghĩ..." />
                    </div>
                    <Textarea
                        id="comment"
                        name="comment"
                        placeholder="Hãy viết cảm nghĩ của bạn"
                        defaultValue={comment}
                        required
                        className="w-full"
                        rows={2}
                    />
                </div>

                <Button type="submit" className="mt-5">
                    Cập nhật thông tin
                </Button>
            </form>
        </div>
    );
};

export default YourProfile;
