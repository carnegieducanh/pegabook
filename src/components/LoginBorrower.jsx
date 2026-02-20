import { useState } from "react";
import { Label, Modal } from "flowbite-react";

const LoginBorrower = ({ _id }) => {
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;

    const userName = form.userName.value;

    fetch("https://pega-book-server.onrender.com/all-members")
      .then((res) => res.json())
      .then((data) => {
        const userMember = data.find((user) => user.userName === userName);
        if (userMember) {
          // Kiểm tra nếu password trùng với memberID
          if (userName === userMember.memberID) {
            document.getElementById("memberName").value = userMember.memberName;
            document.getElementById("memberID").value = userMember.memberID;
            document.getElementById("workPlace").value = userMember.workPlace;
          }
          alert("Bạn đã đăng nhập thành công");
          onCloseModal(); // Đóng modal sau khi alert hiển thị
        } else {
          setError("user name không chính xác");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      });
  };

  function onCloseModal() {
    setOpenModal(false);
  }

  // Hàm xử lý sự kiện thay đổi ô userName
  const handleUserNameChange = (event) => {
    event.target.value = event.target.value.toUpperCase(); // Chuyển đổi thành chữ hoa
  };

  return (
    <div>
      <button
        className="bg-brand mx-auto mt-3 w-48 rounded-full px-6 py-1 text-lg text-white duration-300 hover:scale-105"
        onClick={() => setOpenModal(true)}
      >
        Mượn sách
      </button>

      <Modal
        show={openModal}
        size="sm"
        onClose={onCloseModal}
        popup
        className="bg-gray-300 bg-opacity-95 pt-60 dark:bg-opacity-95 md:pt-10"
      >
        <div className="bg-cream dark:bg-obsidian my-auto rounded-md">
          <Modal.Header onClick={() => window.location.reload()} />

          <Modal.Body>
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Đăng nhập vào{" "}
                  <span className="text-brand text-xl font-medium">
                    Pegabook
                  </span>{" "}
                </h3>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="userName" value="User của bạn" />
                  </div>
                  <input
                    className="rounded-md"
                    id="userName"
                    name="userName"
                    type="text"
                    placeholder="PEGA2000000"
                    required
                    onChange={handleUserNameChange}
                  />
                </div>
                {/* <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="password"
                                            value="Mật khẩu của bạn"
                                        />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="password"
                                        required
                                    />
                                </div> */}

                {error && <p className="text-base text-red-600">{error}</p>}
              </div>
            </form>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
};

export default LoginBorrower;
