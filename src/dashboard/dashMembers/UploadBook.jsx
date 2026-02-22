import React, { useEffect, useState } from "react";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import BookUpload from "../../components/BookUpload";
import bookCategories from "../../data/BookCategories";
import API_BASE_URL from "../../config/api";
import { useLanguage } from "../../contexts/LanguageProvider";

const UploadBook = () => {
  const { id } = useParams();
  const { t } = useLanguage();

  const [bookImage, setBookImage] = useState(""); // State để lưu trữ URL của hình ảnh

  const [currentViews, setCurrentViews] = useState(0); // Thêm state cho views

  // Hàm callback để cập nhật memberAvatar
  const handleBookImageChange = (imgUrl) => {
    setBookImage(imgUrl);
  };

  const { memberID, _id, email } = useLoaderData();

  const [status, setStatus] = useState("bookStatus.available");

  const [selectedBookCategory, setSelectedBookCategory] = useState(
    bookCategories[0].value,
  );

  const handleChangeSelectedValue = (event) => {
    setSelectedBookCategory(event.target.value);
  };

  // Chuyển đến trang khác
  const navigate = useNavigate();

  // handle book submission
  const handleBookSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;
    const sharedBy_id = _id;

    const bookObj = {
      bookTitle,
      authorName,
      imageUrl: bookImage,
      category,
      bookDescription,
      status: status, // Thêm trường status vào object bookObj
      sharerID: memberID,
      sharedBy_id,
      views: currentViews,
    };

    // send data to database
    fetch(`${API_BASE_URL}/upload-book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookObj),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Book uploaded successfully!!!");
        // Chuyển đến trang khác
        navigate(`/member/dashboard/manage/${id}`);
      });

    const email = form.email.value;

    const updateMemberObj = {
      email,
    };

    // update data to database
    fetch(`${API_BASE_URL}/member/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateMemberObj),
    }).then((res) => res.json());
  };
  return (
    <div className="my-12 w-full px-4">
      <h2 className="mb-8 text-3xl font-bold">Thêm sách mới</h2>

      <form
        onSubmit={handleBookSubmit}
        className="flex flex-col flex-wrap gap-4"
      >
        {/* first row */}
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="flex flex-col gap-4 lg:w-1/2">
            <div className="">
              <div className="mb-2 block">
                <Label htmlFor="bookTitle" value="Tên cuốn sách" />
              </div>
              <TextInput
                id="bookTitle"
                name="bookTitle"
                type="text"
                placeholder="Book name"
                required
              />
            </div>

            <div className="">
              <div className="mb-2 block">
                <Label htmlFor="authorName" value="Tên tác giả" />
              </div>
              <TextInput
                id="authorName"
                name="authorName"
                type="text"
                placeholder="Author Name"
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="inputState" value="Book Category" />
              </div>

              <select
                name="categoryName"
                id="inputState"
                className="w-full rounded"
                value={selectedBookCategory}
                onChange={handleChangeSelectedValue}
              >
                {bookCategories.map((option) => (
                  <option key={option.key} value={option.value}>
                    {t(`categories.${option.key}`)}
                  </option>
                ))}
              </select>
            </div>
            <div className="hidden">
              <div className="mb-2 block">
                <Label htmlFor="Status" value="Status" />
              </div>
              <TextInput
                id="Status"
                name="Status"
                type="text"
                value={status} // Sử dụng giá trị từ state
                onChange={(event) => setStatus(event.target.value)} // Cập nhật giá trị khi người dùng thay đổi
                readOnly
                required
              />
            </div>
          </div>

          <div className="lg:w-1/2">
            <BookUpload onBookImageChange={handleBookImageChange} />
          </div>
        </div>

        {/* bookDescription */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="bookDescription" value="Nội dung cuốn sách" />
          </div>
          <Textarea
            id="bookDescription"
            name="bookDescription"
            placeholder="Tóm tắt nội dung sách của bạn..."
            required
            className="w-full"
            rows={6}
          />
        </div>

        <div className="w-full lg:w-1/2">
          <div className="mb-2 block">
            <Label
              htmlFor="email"
              value="Thêm hoặc xác nhận lại Email của bạn (Để nhận yêu cầu mượn sách từ thành viên)"
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

        <Button type="submit" className="mt-5">
          Upload Book
        </Button>
      </form>
    </div>
  );
};

export default UploadBook;
