import React, { useState } from "react";
import { Checkbox, Label } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import bookrow from "../assets/bookrow.jpg";

const LoginBorrower = ({}) => {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;
        const password = form.password.value;

        fetch("https://pega-book-server.onrender.com/all-members")
            .then((res) => res.json())
            .then((data) => {
                const userBorrower = data.find(
                    (user) => user.password === password
                );
                if (userBorrower) {
                    alert("Bạn đã đăng nhập thành công");
                    navigate(`/borrower/dashboard/${userBorrower._id}`);
                } else {
                    setError("Mật khẩu không chính xác");
                }
            })
            .catch((error) => {
                console.error("Lỗi khi lấy dữ liệu người dùng:", error);
            });
    };

    // Hàm xử lý sự kiện thay đổi ô password
    const handlePasswordChange = (event) => {
        event.target.value = event.target.value.toUpperCase(); // Chuyển đổi thành chữ hoa
    };

    return (
        <div className="bg-[#e5e7eb] min-h-screen flex flex-col justify-between">
            <div className="py-4 px-4 lg:px-24 flex justify-between items-center text-base gap-8">
                {/* logo */}
                <Link to="/">
                    {/* <img src={navLogo} alt="" /> */}
                    <h2 className="text-[#a69060] text-4xl font-semibold">
                        PEGABOOK
                    </h2>
                    {/* <FaBlog className="inline-block" /> */}
                    <p className="pt-2 text-[#5a5a5a]">
                        Viet Nam Team Book Library
                    </p>
                </Link>
            </div>

            <div className="flex max-w-sm bg-[#F4F1EA] mx-auto border border-gray-300 p-10 rounded-md">
                <form onSubmit={handleLogin}>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Đăng nhập vào tài khoản của bạn để{" "}
                            <span className="text-red-500 underline">
                                trả sách
                            </span>
                        </h3>

                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="password"
                                    value="Mã số thành viên của bạn"
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
                            <p className="text-red-600 text-base">{error}</p>
                        )}

                        <div className="w-full">
                            <button className="bg-cyan-700 text-white rounded-md px-6 py-2">
                                Đăng nhập vào tài khoản của bạn
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="flex w-full bg-bottom bg-repeat-x text-center text-gray-600 text-xs overflow-hidden">
                <img src={bookrow} alt="" />
                <img src={bookrow} alt="" />
                <img src={bookrow} alt="" />
                <img src={bookrow} alt="" />
            </div>
        </div>
    );
};

export default LoginBorrower;
