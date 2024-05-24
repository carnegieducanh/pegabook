import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contects/AuthProvider";
import googleLogo from "../assets/google-logo.svg";
import bookrow from "../assets/bookrow.jpg";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [error, setError] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/admin/dashboard";

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        login(email, password)
            .then((userCredential) => {
                // Log in
                const user = userCredential.user;
                alert("Login successful!!");
                navigate(from, { replace: true });
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage);
            });
    };
    return (
        <div>
            <div className="py-4 px-4 lg:px-24 bg-[#F4F1EA] flex justify-between items-center text-base gap-8">
                {/* logo */}
                <Link to="/">
                    {/* <img src={navLogo} alt="" /> */}
                    <h2 className="text-[#a69060] text-4xl font-semibold">
                        PEGABOOK
                    </h2>
                    {/* <FaBlog className="inline-block" /> */}
                    <p className="pt-2 text-[#5a5a5a]">Viet Nam Team with ❤️</p>
                </Link>
            </div>
            <div className="h-screen bg-[#F4F1EA] py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 md:max-w-xl sm:mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <div>
                                <h1 className="text-2xl font-semibold">
                                    Please Login to Dashboard
                                </h1>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {/* form start */}
                                <form
                                    onSubmit={handleLogin}
                                    className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
                                >
                                    <div className="relative">
                                        <input
                                            // autocomplete="off"
                                            id="email"
                                            name="email"
                                            type="text"
                                            className="h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                            placeholder="Email address"
                                        />
                                    </div>
                                    <div className="relative">
                                        <input
                                            // autocomplete="off"
                                            id="password"
                                            name="password"
                                            type="password"
                                            className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                            placeholder="Password"
                                        />
                                    </div>

                                    {error ? (
                                        <p className="text-red-600 text-base">
                                            Email or Password is not correct
                                        </p>
                                    ) : (
                                        ""
                                    )}

                                    <p>
                                        If you haven't an account. Please{" "}
                                        <Link
                                            to="/sign-up"
                                            className="text-blue-600 underline"
                                        >
                                            Sign up
                                        </Link>{" "}
                                        Here
                                    </p>
                                    <div className="relative">
                                        <button className="bg-blue-500 text-white rounded-md px-6 py-2">
                                            Log in
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <hr />
                            <div className="flex w-full items-center flex-col mt-5 gap-3">
                                <button className="block">
                                    <img
                                        src={googleLogo}
                                        alt=""
                                        className="w-12 h12 inline-block"
                                    />
                                    Login With Google
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
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

export default Login;
