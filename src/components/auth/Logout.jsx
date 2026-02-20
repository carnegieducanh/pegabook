import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import bookrow from "../../assets/bookrow.jpg";

const Logout = () => {
  const { logOut } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  // Ưu tiên lấy thông tin từ memberSession (member login)
  const memberSession = (() => {
    try {
      const saved = localStorage.getItem("memberSession");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  })();

  const avatarSrc = memberSession?.memberAvatar;
  const displayName = memberSession?.memberName;
  const dashboardPath = memberSession?._id
    ? `/member/dashboard/${memberSession._id}`
    : "/";

  const handleLogout = () => {
    localStorage.removeItem("memberSession");
    logOut()
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch(() => {});
  };

  return (
    <div className="bg-cream dark:bg-obsidian flex min-h-screen flex-col">
      {/* Header */}
      <div className="bg-cream dark:bg-obsidian flex items-center justify-between gap-8 px-4 py-4 text-base lg:px-24">
        <Link to="/">
          <h2 className="text-brand text-4xl font-medium">PEGABOOK</h2>
          <p className="text-dusk pt-2">Viet Nam Team with ❤️</p>
        </Link>
      </div>

      {/* Main content */}
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          {/* Title */}
          <p className="whitespace-nowrap text-xl font-semibold text-gray-700 dark:text-[#cdc4b7]">
            Đăng nhập lại Pegabook
          </p>

          {/* Avatar + tên - click để về dashboard */}
          <button
            onClick={() => navigate(dashboardPath)}
            className="flex items-center gap-4 transition-opacity hover:opacity-75 focus:outline-none"
            title="Quay lại Dashboard"
          >
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt={displayName || "Member"}
                className="border-brand h-20 w-20 rounded-full border-4 object-cover shadow-lg"
              />
            ) : (
              <div className="border-brand bg-brand flex h-20 w-20 items-center justify-center rounded-full border-4 shadow-lg">
                <span className="text-3xl font-bold text-white">
                  {(displayName || "M").charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            {displayName && (
              <span className="text-lg font-medium text-gray-700 dark:text-[#cdc4b7]">
                {displayName}
              </span>
            )}
          </button>

          {/* Nút Đăng xuất - cùng độ rộng với tiêu đề */}
          <button
            className="bg-cobalt dark:bg-cobalt w-full rounded-lg py-2 font-semibold text-white transition-colors hover:bg-red-600"
            onClick={handleLogout}
          >
            Thoát
          </button>
        </div>
      </div>

      {/* Footer bookrow */}
      <div className="flex w-full overflow-hidden bg-bottom bg-repeat-x text-center text-xs text-gray-600">
        <img src={bookrow} alt="" />
        <img src={bookrow} alt="" />
        <img src={bookrow} alt="" />
        <img src={bookrow} alt="" />
      </div>
    </div>
  );
};

export default Logout;
