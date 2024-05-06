import { useState } from "react";
import { Label, Modal } from "flowbite-react";
import { Link } from "react-router-dom";

const LoginMember = ({ _id }) => {
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;

        const password = form.password.value;

        fetch("https://pega-book-server.onrender.com/all-members")
            .then((res) => res.json())
            .then((data) => {
                const userMember = data.find(
                    (user) => user.password === password
                );
                if (userMember) {
                    // Kiểm tra nếu password trùng với memberID
                    if (password === userMember.memberID) {
                        document.getElementById("memberName").value =
                            userMember.memberName;
                        document.getElementById("memberID").value =
                            userMember.memberID;
                        document.getElementById("workPlace").value =
                            userMember.workPlace;
                    }
                    alert("Bạn đã đăng nhập thành công");
                    onCloseModal(); // Đóng modal sau khi alert hiển thị
                } else {
                    setError("Mật khẩu không chính xác");
                }
            })
            .catch((error) => {
                console.error("Lỗi khi lấy dữ liệu người dùng:", error);
            });
    };

    function onCloseModal() {
        setOpenModal(false);
    }

    // Hàm xử lý sự kiện thay đổi ô password
    const handlePasswordChange = (event) => {
        event.target.value = event.target.value.toUpperCase(); // Chuyển đổi thành chữ hoa
    };

    return (
        <div>
            <button
                className="bg-[#a69060] text-white text-lg hover:scale-105 duration-300 py-1 px-6 rounded-full mt-3 mx-auto w-48"
                onClick={() => setOpenModal(true)}
            >
                Đặt mượn
            </button>

            <Modal
                show={openModal}
                size="sm"
                onClose={onCloseModal}
                popup
                className="bg-[#ccc] pt-60 md:pt-10"
            >
                <div className="bg-[#F4F1EA] rounded-md my-auto">
                    <Link to={"/"}>
                        <Modal.Header />
                    </Link>
                    <Modal.Body>
                        <form onSubmit={handleLogin}>
                            <div className="space-y-6 ">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                    Đăng nhập vào nền tảng của chúng tôi
                                </h3>

                                <div>
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
                                        required
                                        onChange={handlePasswordChange} // Gọi hàm xử lý sự kiện thay đổi password
                                    />
                                </div>

                                {error && (
                                    <p className="text-red-600 text-base">
                                        {error}
                                    </p>
                                )}

                                <div className="w-full">
                                    <button className="bg-cyan-700 text-white rounded-md px-6 py-2">
                                        Đăng nhập vào tài khoản của bạn
                                    </button>
                                </div>
                                <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                                    Chưa đăng ký?
                                    <a
                                        href="#!"
                                        className="text-cyan-700 hover:underline dark:text-cyan-500"
                                    >
                                        Tạo tài khoản
                                    </a>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                </div>
            </Modal>
        </div>
    );
};

export default LoginMember;
