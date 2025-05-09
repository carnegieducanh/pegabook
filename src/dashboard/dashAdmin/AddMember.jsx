import { useEffect, useState } from "react";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import "react-datepicker/dist/react-datepicker.css";

import ImageUpload from "../../components/ImageUpload";
import { useNavigate } from "react-router-dom";

const AddMember = () => {
  const [memberID, setMemberID] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("ilovepj");
  const [memberData, setMemberData] = useState([]);

  const [commentDefault, setCommentDefault] = useState(
    "Sách là ngọn đèn chiếu sáng cho tâm trí, là ngọn lửa truyền cảm hứng cho trí tuệ.!",
  );

  const handleCommentChange = (event) => {
    const newComment = event.target.value;
    setCommentDefault(newComment);
  };

  const [avatar, setAvatar] = useState(""); // State để lưu trữ URL của hình ảnh

  // Hàm callback để cập nhật memberAvatar
  const handleAvatarChange = (avatarUrl) => {
    setAvatar(avatarUrl);
  };

  useEffect(() => {
    // Auto-fill password when Member ID changes
    setUserName(memberID);
  }, [memberID]);

  const handleMemberIDChange = (event) => {
    const newMemberID = event.target.value.toUpperCase();
    // const uppercaseValue = newMemberID.toUpperCase();
    setMemberID(newMemberID);
  };

  const handlePasswordChange = (event) => {
    const newUser = event.target.value;
    setPassword(newUser);
  };

  useEffect(() => {
    fetch("https://pega-book-server.onrender.com/all-members")
      .then((res) => res.json())
      .then((data) => {
        setMemberData(data);
      });
  }, []);

  // Trạng thái lỗi cho memberID
  const [memberIDError, setMemberIDError] = useState(false);

  // Chuyển đến trang khác
  const navigate = useNavigate();

  // handle member submission
  const handleMemberSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const memberName = form.memberName.value;
    const workPlace = form.workPlace.value;
    const userName = form.userName.value;
    const memberID = form.memberID.value;
    const password = form.password.value;
    const comment = form.comment.value;
    const review = form.review.value;

    // Kiểm tra trùng lặp memberID
    if (memberData.some((member) => member.memberID === memberID)) {
      alert("Đã tồn tại member ID");
      return;
    }

    // Kiểm tra độ dài của memberID
    if (memberID.length !== 11) {
      setMemberIDError(true); // Đặt trạng thái lỗi thành true
      return;
    }

    // Nếu đến đây, có nghĩa là memberID hợp lệ, đặt trạng thái lỗi thành false
    setMemberIDError(false);

    const memberObj = {
      memberName,
      memberAvatar: avatar,
      workPlace,
      memberID,
      userName,
      password,
      comment,
      review,
    };

    fetch("https://pega-book-server.onrender.com/add-member", {
      method: "POST",
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
        navigate("/admin/dashboard/manage-members");
      });
  };

  return (
    <div className="my-12 w-full px-4">
      <h2 className="mb-8 font-title text-3xl font-bold">Add Member</h2>

      <form
        onSubmit={handleMemberSubmit}
        className="flex flex-col flex-wrap gap-4"
      >
        {/* first row */}
        <ImageUpload onAvatarChange={handleAvatarChange} />

        <div className="mx-auto flex w-full flex-col gap-4 lg:w-1/2">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="memberName" value="Member Name" />
            </div>
            <TextInput
              id="memberName"
              name="memberName"
              type="text"
              placeholder="Member name"
              required
            />
          </div>

          {/* 2nd row */}
          <div className="flex flex-col gap-4 md:flex-row">
            {/* Member ID */}
            <div className="w-full lg:w-1/2">
              <div className="mb-2 block">
                <Label
                  htmlFor="memberID"
                  value="Member ID (bắt đầu bằng PEGA)"
                />
              </div>
              <TextInput
                id="memberID"
                name="memberID"
                type="text"
                placeholder="PEGA2000000"
                required
                value={memberID} // Gán giá trị của state vào input
                onChange={handleMemberIDChange}
              />
              {memberIDError && (
                <p className="font-semibold text-red-700">
                  Member ID must be 11 characters long!!!.
                </p>
              )}
            </div>

            <div className="w-full lg:w-1/2">
              <div className="mb-2 block">
                <Label htmlFor="workPlace" value="Pegabook 5/ 4/ Office" />
              </div>
              <TextInput
                id="workPlace"
                name="workPlace"
                type="text"
                placeholder="Pegabook 5/ 4/ Office"
                required
              />
            </div>
          </div>

          {/* review */}
          <div className="hidden">
            <div className="mb-2 block">
              <Label htmlFor="review" value="Review" />
            </div>
            <Textarea
              id="review"
              name="review"
              placeholder="Write your review..."
              // required
              className="w-full"
              rows={5}
            />
          </div>

          {/* Comment */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="comment" value="Comment default" />
            </div>
            <Textarea
              id="comment"
              name="comment"
              className="w-full"
              rows={2}
              value={commentDefault}
              onChange={handleCommentChange}
              required
            />
          </div>

          {/* 5nd row */}
          <div>
            <h2 className="mt-2 font-title text-xl font-bold">
              Create a login User (automatically)
            </h2>
            {/* Member User */}
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
                  value={userName}
                  readOnly
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
                  value={password}
                  onChange={handlePasswordChange}
                  readOnly
                  required
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="mt-5">
            Add this Member
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddMember;
