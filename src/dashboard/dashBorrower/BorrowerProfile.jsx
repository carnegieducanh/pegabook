import React, { useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import ImageUpload from "../../components/ImageUpload";

const BorrowerProfile = () => {
    const { id } = useParams();
    const { _id, memberAvatar, workPlace, memberID, comment } = useLoaderData();

    const [avatar, setAvatar] = useState(""); // State để lưu trữ URL của hình ảnh

    // Hàm callback để cập nhật memberAvatar
    const handleAvatarChange = (avatarUrl) => {
        setAvatar(avatarUrl);
    };

    // Chuyển đến trang khác
    const navigate = useNavigate();

    // handle member submission
    const handleUpdateMember = (event) => {
        event.preventDefault();

        const form = event.target;
        const memberID = form.memberID.value;
        const workPlace = form.workPlace.value;
        const comment = form.comment.value;

        const updateMemberObj = {
            memberAvatar: avatar || memberAvatar,
            workPlace,
            memberID,
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
            .then((data) => {
                // console.log(data);
                alert("Member updated successfully!!!");

                // Chuyển đến trang khác
                navigate(`/borrower/dashboard/${_id}`);
            });
    };
    return (
        <div className="px-4 my-12 w-full">
            <h2 className="mb-8 text-3xl font-bold">Sửa hồ sơ cá nhân</h2>

            <form
                onSubmit={handleUpdateMember}
                className="flex  flex-col flex-wrap gap-4"
            >
                <ImageUpload
                    onAvatarChange={handleAvatarChange}
                    memberAvatar={memberAvatar}
                />

                {/*3nd row */}
                <div className="flex flex-col mx-auto w-full lg:w-1/2 gap-4">
                    {/* Member ID */}
                    <div className="">
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
                    <div className="">
                        <div className="mb-2 block">
                            <Label htmlFor="workPlace" value="Nơi làm việc" />
                        </div>
                        <TextInput
                            id="workPlace"
                            name="workPlace"
                            type="text"
                            placeholder="Work place"
                            defaultValue={workPlace}
                            required
                            readOnly
                        />
                    </div>

                    {/* comment */}
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="comment"
                                value="Bạn có muốn sửa/thêm bình luận???"
                            />
                        </div>
                        <Textarea
                            id="comment"
                            name="comment"
                            placeholder="Write your comment..."
                            defaultValue={comment}
                            required
                            className="w-full"
                            rows={2}
                        />
                    </div>

                    <Button type="submit" className="mt-5">
                        Update
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default BorrowerProfile;
