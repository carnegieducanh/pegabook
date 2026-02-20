import { useState } from "react";
import { Label, Modal } from "flowbite-react";
import API_BASE_URL from "../../config/api";

const LoginBorrower = ({ onLoginSuccess }) => {
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const userName = form.userName.value;
    const password = form.password.value;

    setLoading(true);
    setError("");

    fetch(`${API_BASE_URL}/all-members`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        const userMember = data.find(
          (user) => user.userName === userName && user.password === password,
        );
        if (userMember) {
          const session = {
            _id: userMember._id,
            memberName: userMember.memberName,
            memberAvatar: userMember.memberAvatar,
          };
          localStorage.setItem("memberSession", JSON.stringify(session));
          // Thông báo Navbar cập nhật avatar
          window.dispatchEvent(new Event("memberSessionUpdated"));
          alert("Bạn đã đăng nhập thành công");
          onCloseModal();
          if (onLoginSuccess) {
            onLoginSuccess({
              memberName: userMember.memberName,
              memberID: userMember.memberID,
              workPlace: userMember.workPlace,
            });
          }
        } else {
          setError("Tên đăng nhập hoặc mật khẩu không chính xác");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error("Lỗi khi lấy dữ liệu người dùng:", err);
      });
  };

  function onCloseModal() {
    setOpenModal(false);
    setError("");
  }

  const handleUserNameChange = (event) => {
    event.target.value = event.target.value.toUpperCase();
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
          <Modal.Header />

          <Modal.Body>
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Đăng nhập vào{" "}
                  <span className="text-brand text-xl font-medium">
                    Pegabook
                  </span>
                </h3>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="userName" value="User của bạn" />
                  </div>
                  <input
                    className="rounded-md w-full"
                    id="userName"
                    name="userName"
                    type="text"
                    placeholder="PEGA2000000"
                    required
                    onChange={handleUserNameChange}
                  />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="password" value="Mật khẩu" />
                  </div>
                  <input
                    className="rounded-md w-full"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-brand w-full rounded-md px-4 py-2 text-white disabled:opacity-60"
                >
                  {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>
              </div>
            </form>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
};

export default LoginBorrower;
