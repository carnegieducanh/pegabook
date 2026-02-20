import { useState } from "react";
import { Checkbox, Label } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import bookrow from "../assets/bookrow.jpg";
import SpinnerLoading from "../components/SpinnerLoading";

const LoginMember = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State to manage loading status
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const userName = form.userName.value;
    const password = form.password.value;

    setLoading(true); // Set loading to true when starting to fetch data

    fetch("https://pega-book-server.onrender.com/all-members")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false); // Set loading to false after data is fetched
        const userMember = data.find(
          (user) => user.userName === userName && user.password === password,
        );
        if (userMember) {
          alert("Bạn đã đăng nhập thành công");
          navigate(`/member/dashboard/${userMember._id}`);
        } else {
          setError("Email hoặc mật khẩu không chính xác");
        }
      })
      .catch((error) => {
        setLoading(false); // Set loading to false if there's an error
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      });
  };

  // Hàm xử lý sự kiện thay đổi ô password
  const handleUserNameChange = (event) => {
    event.target.value = event.target.value.toUpperCase(); // Chuyển đổi thành chữ hoa
  };

  return (
    <div className="dark:bg-onyx flex min-h-screen flex-col justify-between bg-gray-200">
      <div className="flex items-center justify-between gap-8 px-4 py-4 text-base lg:px-24">
        {/* logo */}
        <Link to="/">
          {/* <img src={navLogo} alt="" /> */}
          <h2 className="text-brand text-4xl font-medium">PEGABOOK</h2>

          <p className="text-dusk pt-2">Viet Nam Team with ❤️</p>
        </Link>
      </div>
      {loading ? ( // Display SpinnerLoading if loading is true
        <div className="mx-auto">
          <SpinnerLoading />
        </div>
      ) : (
        <div className="bg-cream dark:bg-obsidian mx-auto flex max-w-sm rounded-md border border-gray-300 p-10">
          <form onSubmit={handleLogin}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Đăng nhập vào nền tảng của{" "}
                <span className="text-brand text-xl font-medium">
                  Pegabook
                </span>{" "}
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="userName" value="User của bạn" />
                </div>
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  placeholder="user name"
                  required
                  onChange={handleUserNameChange} // Gọi hàm xử lý sự kiện thay đổi userName
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Mật khẩu của bạn" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password"
                  required
                />
              </div>

              {error && <p className="text-base text-red-600">{error}</p>}
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember">Ghi nhớ đăng nhập</Label>
                </div>
                {/* <a
                  href="#"
                  className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
                >
                  Quên mật khẩu?
                </a> */}
              </div>
              <div className="w-full">
                <button className="rounded-md bg-cyan-700 px-6 py-2 text-white">
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
        </div>
      )}

      <div className="flex w-full overflow-hidden bg-bottom bg-repeat-x text-center text-xs text-gray-600">
        <img src={bookrow} alt="" />
        <img src={bookrow} alt="" />
        <img src={bookrow} alt="" />
        <img src={bookrow} alt="" />
      </div>
    </div>
  );
};

export default LoginMember;
