import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import userAvatar from "../../assets/user avatar.jpg";
import { TiArrowBackOutline } from "react-icons/ti";

function RemoveBorrower() {
  const [bookedTime, setBookedTime] = useState("Thời gian mượn");

  const [memberData, setMemberData] = useState(null);
  const [allBookData, setAllBooksData] = useState();
  const [borrower, setBorrower] = useState();
  const [borrowerAvatar, setBorrowerAvatar] = useState();
  const [sharerName, setSharerName] = useState();
  const [currentViews, setCurrentViews] = useState(0); // Thêm state cho views
  const [borrowedByUser, setBorrowedByUser] = useState();
  const { id } = useParams();

  const {
    sharedBy_id,
    _id,
    bookTitle,
    imageUrl,
    authorName,
    category,
    sharerID,
    borrowerID,
    borrowedDate,
    returnDate,
    views,
  } = useLoaderData();

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentViews(views); // Khởi tạo giá trị views từ dữ liệu tải về
    return () => {};
  }, [_id]); // Thay đổi _id để trigger useEffect khi có sự thay đổi

  // Chuyển đến trang khác
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://pega-book-server.onrender.com/all-members")
      .then((res) => res.json())
      .then((data) => {
        setMemberData(data);
      });
  }, []);

  useEffect(() => {
    fetch("https://pega-book-server.onrender.com/all-books")
      .then((res) => res.json())
      .then((data) => {
        setAllBooksData(data);
      });
  }, []);

  useEffect(() => {
    if (memberData && allBookData) {
      let borrowerName = [];
      let borrowerAvatar = [];
      let borrowedByUser = [];
      let sharedByCurrent = [];

      memberData.forEach((borrower) => {
        if (borrowerID === borrower.memberID) {
          borrowerName = borrower.memberName;
          borrowerAvatar = borrower.memberAvatar;
          borrowedByUser = borrower.userName;
          return; // Thêm break để dừng vòng lặp sau khi tìm thấy
        }
      });

      memberData.forEach((member) => {
        if (sharerID === member.memberID) {
          sharedByCurrent = member.memberName;

          return; // Thêm break để dừng vòng lặp sau khi tìm thấy
        }
      });

      // Cập nhật state cho biến đếm

      setBorrower(borrowerName);
      setBorrowerAvatar(borrowerAvatar);
      setBorrowedByUser(borrowedByUser);
      setSharerName(sharedByCurrent);
      // setBorrowerWorkPlace(borrowerWorkPlace);
    }
  }, [memberData, allBookData]);

  // handle book update
  const handleUpdate = (event) => {
    event.preventDefault();

    // const memberName = form.searchInput.value;
    const status = "Có thể mượn";
    const borrowedBy = "";
    const borrowerID = "";
    const bookedTime = "";
    const borrowedDate = "";

    const updateBookRead = {
      bookTitle,
      imageUrl,
      authorName,
      category,
      sharedBy: sharerName,
      borrowerID: borrowedByUser,
      returnDate,
    };

    // send data to database
    fetch("https://pega-book-server.onrender.com/upload-bookRead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateBookRead),
    })
      .then((res) => res.json())
      .then((data) => {
        // alert("Book uploaded successfully!!!");
      });

    const updatedViews = currentViews + 1; // Tăng giá trị của views lên 1
    setCurrentViews(updatedViews); // Cập nhật state của views

    const updateBookObj = {
      status,
      borrowedBy,
      borrowerID,
      bookedTime,
      borrowedDate,
      returnDate: "", // Xóa giá trị returnDate trong bản ghi
      views: updatedViews,
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
        navigate(`/member/dashboard/book/${id}`);
      });
  };
  return (
    <div className="my-12 w-full px-4">
      <h2 className="mb-8 text-3xl font-bold">Hủy người mượn</h2>

      <form onSubmit={handleUpdate} className="flex flex-col flex-wrap gap-4">
        {/* ======= Sharer's Info ======= */}
        <div className="mx-auto">
          <div className="relative mx-auto h-32 w-32">
            <img
              id="memberAvatar"
              name="memberAvatar"
              src={borrowerAvatar || userAvatar}
              alt=""
              className="h-full w-full rounded-full border-4 border-[lightgray] object-cover"
            />
          </div>
        </div>
        <div className="mx-auto flex w-full flex-col gap-8 lg:w-1/2">
          <div className="">
            <div className="mb-2 block">
              <Label htmlFor="userName" value="Tên người mượn" />
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
                <Label htmlFor="bookTitle" value="Tên cuốn sách" />
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
                <Label htmlFor="bookedTime" value="Booked Time" />
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
          <div className="flex gap-4">
            <div className="w-1/2">
              <div className="mb-2 block">
                <Label htmlFor="borrowedDate" value="Ngày mượn" />
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
                <Label htmlFor="returnDate" value="Ngày trả" />
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
            Hủy người mượn này
          </Button>
          <Button
            className="mb-5 bg-cobalt"
            onClick={() => {
              window.location.href = `/member/dashboard/manage/borrower/${sharedBy_id}`;
            }}
          >
            <div className="flex items-center gap-2">
              <p>Quay lại mục trước</p>
              <TiArrowBackOutline size={24} />
            </div>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default RemoveBorrower;
