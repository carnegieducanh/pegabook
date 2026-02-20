import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../contects/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import bookrow from "../../assets/bookrow.jpg";

const Logout = () => {
    const { logOut } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";
    const handleLogout = () => {
        logOut()
            .then(() => {
                // Sign-out successful.
                alert("Sign-out successful!!!");
                navigate(from, { replace: true });
            })
            .catch((error) => {
                // An error happened.
            });
    };

    return (
        <div>
            <div className="py-4 px-4 lg:px-24 bg-cream flex justify-between items-center text-base gap-8">
                {/* logo */}
                <Link to="/">
                    {/* <img src={navLogo} alt="" /> */}
                    <h2 className="text-brand text-4xl font-medium">
                        PEGABOOK
                    </h2>

                    <p className="pt-2 text-dusk">Viet Nam Team with ❤️</p>
                </Link>
            </div>
            <div className="h-screen bg-cream flex items-center justify-center">
                <button
                    className="bg-cyan-700 px-8 py-2 text-white rounded"
                    onClick={handleLogout}
                >
                    Click here to Log out
                </button>
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

export default Logout;
