import { useState } from "react";
import { Label, Modal } from "flowbite-react";
import API_BASE_URL from "../../config/api";
import { useLanguage } from "../../contexts/LanguageProvider";

const LoginBorrower = ({ onLoginSuccess }) => {
  const { t } = useLanguage();
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
          alert(t("loginMember.alert"));
          onCloseModal();
          if (onLoginSuccess) {
            onLoginSuccess({
              memberName: userMember.memberName,
              memberID: userMember.memberID,
              workPlace: userMember.workPlace,
            });
          }
        } else {
          setError(t("loginMember.setError"));
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
        className="mx-auto mt-3 w-48 rounded-full bg-brand px-6 py-1 text-lg text-white duration-300 hover:scale-105"
        onClick={() => setOpenModal(true)}
      >
        {t("singleBook.button")}
      </button>

      <Modal
        show={openModal}
        size="sm"
        onClose={onCloseModal}
        popup
        className="bg-gray-300 bg-opacity-95 pt-60 dark:bg-opacity-95 md:pt-10"
      >
        <div className="my-auto rounded-md bg-cream dark:bg-obsidian">
          <Modal.Header />

          <Modal.Body>
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  {t("loginMember.title")}{" "}
                  <span className="text-xl font-medium text-brand">
                    Pegabook
                  </span>
                </h3>

                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="userName"
                      value={t("loginMember.labelUse")}
                    />
                  </div>
                  <input
                    className="w-full rounded-md"
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
                    <Label
                      htmlFor="password"
                      value={t("loginMember.labelPass")}
                    />
                  </div>
                  <input
                    className="w-full rounded-md"
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
                  className="w-full rounded-md bg-brand px-4 py-2 text-white disabled:opacity-60"
                >
                  {loading
                    ? t("loginMember.loading1")
                    : t("loginMember.loading2")}
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
