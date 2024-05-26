import React, { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import BookUpload from "../../components/BookUpload";
import bookCategories from "../../components/BookCategories"; // Import bookCategories

const YourEditBooks = () => {
    const { id } = useParams();

    const [bookImage, setBookImage] = useState(""); // State để lưu trữ URL của hình ảnh

    // Hàm callback để cập nhật memberAvatar
    const handleBookImageChange = (imgUrl) => {
        setBookImage(imgUrl);
    };

    const { bookTitle, authorName, imageUrl, bookDescription, sharedBy_id } =
        useLoaderData();

    const [selectedBookCategory, setSelectedBookCategory] = useState(
        bookCategories[0]
    );

    const handleChangeSelectedValue = (event) => {
        setSelectedBookCategory(event.target.value);
    };

    // Chuyển đến trang khác
    const navigate = useNavigate();

    // handle book update
    const handleUpdate = (event) => {
        event.preventDefault();
        const form = event.target;

        const bookTitle = form.bookTitle.value;
        const authorName = form.authorName.value;
        const category = form.categoryName.value;
        const bookDescription = form.bookDescription.value;

        const updateBookObj = {
            bookTitle,
            authorName,
            imageUrl: bookImage || imageUrl,
            category,
            bookDescription,
            // views: currentViews,
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
        <div className="px-4 my-12">
            <h2 className="mb-8 text-3xl font-bold">Sửa nội dung sách</h2>

            <form onSubmit={handleUpdate} className="flex  flex-col">
                {/* first row */}
                <div className="flex flex-col-reverse lg:flex-row mb-4">
                    <div className="flex flex-col lg:w-1/2 gap-4">
                        <div className="">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="bookTitle"
                                    value="Tên cuốn sách"
                                />
                            </div>
                            <TextInput
                                id="bookTitle"
                                name="bookTitle"
                                type="text"
                                placeholder="Book name"
                                defaultValue={bookTitle}
                                required
                            />
                        </div>

                        <div className="">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="authorName"
                                    value="Tên tác giả"
                                />
                            </div>
                            <TextInput
                                id="authorName"
                                name="authorName"
                                type="text"
                                placeholder="Author Name"
                                defaultValue={authorName}
                                required
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="inputState"
                                    value="Book Category"
                                />
                            </div>

                            <select
                                name="categoryName"
                                id="inputState"
                                className="w-full rounded"
                                value={selectedBookCategory}
                                onChange={handleChangeSelectedValue}
                            >
                                {bookCategories.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <BookUpload
                            onBookImageChange={handleBookImageChange}
                            imageUrl={imageUrl}
                        />
                    </div>
                </div>

                {/* bookDescription */}
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="bookDescription"
                            value="Nội dung cuốn sách"
                        />
                    </div>
                    <Textarea
                        id="bookDescription"
                        name="bookDescription"
                        placeholder="Tóm tắt nội dung sách của bạn..."
                        defaultValue={bookDescription}
                        required
                        className="w-full"
                        rows={6}
                    />
                </div>

                <Button type="submit" className="mt-10">
                    Hoàn tất
                </Button>
            </form>
        </div>
    );
};

export default YourEditBooks;
