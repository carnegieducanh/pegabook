import { useState } from "react";
import { Checkbox, Label, Modal } from "flowbite-react";

const LoginBorrower = ({ _id }) => {
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;

        const userName = form.userName.value;
        const password = form.password.value;

        fetch("https://pega-book-server.onrender.com/all-members")
            .then((res) => res.json())
            .then((data) => {
                const userMember = data.find(
                    (user) =>
                        user.userName === userName && user.password === password
                );
                if (userMember) {
                    // Kiểm tra nếu password trùng với memberID
                    if (
                        userName === userMember.memberID &&
                        password === userMember.password
                    ) {
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
                    setError("User name hoặc mật khẩu không chính xác");
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
                    <Modal.Header onClick={() => window.location.reload()} />

                    <Modal.Body>
                        <form onSubmit={handleLogin}>
                            <div className="space-y-6">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                    Đăng nhập vào{" "}
                                    <span className="text-[#a69060] text-xl font-medium">
                                        Pegabook
                                    </span>{" "}
                                </h3>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="userName"
                                            value="User của bạn"
                                        />
                                    </div>
                                    <input
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
                                </div>

                                {error && (
                                    <p className="text-red-600 text-base">
                                        {error}
                                    </p>
                                )}
                                {/* <div className="flex justify-between">
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="remember" />
                                        <Label htmlFor="remember">
                                            Ghi nhớ đăng nhập
                                        </Label>
                                    </div>
                                    <a
                                        href="#"
                                        className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
                                    >
                                        Quên mật khẩu?
                                    </a>
                                </div> */}
                                <div className="w-full hidden">
                                    <button className="bg-cyan-700 text-white rounded-md px-6 py-2">
                                        Đăng nhập vào tài khoản của bạn
                                    </button>
                                </div>
                                {/* <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                                    Chưa đăng ký?&nbsp;
                                    <a
                                        href="#"
                                        className="text-cyan-700 hover:underline dark:text-cyan-500"
                                    >
                                        Tạo tài khoản
                                    </a>
                                </div> */}
                            </div>
                        </form>
                    </Modal.Body>
                </div>
            </Modal>
        </div>
    );
};

export default LoginBorrower;
