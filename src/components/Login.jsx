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
      <div className="bg-cream dark:bg-onyx flex items-center justify-between gap-8 px-4 py-4 text-base lg:px-24">
        {/* logo */}
        <Link to="/">
          {/* <img src={navLogo} alt="" /> */}
          <h2 className="text-brand text-4xl font-medium">PEGABOOK</h2>
          {/* <FaBlog className="inline-block" /> */}
          <p className="text-dusk pt-2">Viet Nam Team with ❤️</p>
        </Link>
      </div>
      <div className="bg-cream dark:bg-onyx flex h-screen flex-col justify-center py-6 sm:py-12">
        <div className="relative py-3 sm:mx-auto md:max-w-xl">
          <div className="absolute inset-0 -skew-y-6 transform bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl"></div>
          <div className="relative bg-white px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20">
            <div className="mx-auto max-w-md">
              <div>
                <h1 className="text-2xl font-semibold">
                  Please Login to Dashboard
                </h1>
              </div>
              <div className="divide-y divide-gray-200">
                {/* form start */}
                <form
                  onSubmit={handleLogin}
                  className="space-y-4 py-8 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7"
                >
                  <div className="relative">
                    <input
                      // autocomplete="off"
                      id="email"
                      name="email"
                      type="text"
                      className="focus:borer-rose-600 h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                      placeholder="Email address"
                    />
                  </div>
                  <div className="relative">
                    <input
                      // autocomplete="off"
                      id="password"
                      name="password"
                      type="password"
                      className="focus:borer-rose-600 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none"
                      placeholder="Password"
                    />
                  </div>

                  {error ? (
                    <p className="text-base text-red-600">
                      Email or Password is not correct
                    </p>
                  ) : (
                    ""
                  )}

                  <p>
                    If you haven't an account. Please{" "}
                    <Link
                      // to="/sign-up"
                      className="text-blue-600 underline"
                    >
                      Sign up
                    </Link>{" "}
                    Here
                  </p>
                  <div className="relative">
                    <button className="rounded-md bg-blue-500 px-6 py-2 text-white">
                      Log in
                    </button>
                  </div>
                </form>
              </div>

              <hr />
              <div className="mt-5 flex w-full flex-col items-center gap-3">
                <button className="block">
                  <img
                    src={googleLogo}
                    alt=""
                    className="h12 inline-block w-12"
                  />
                  Login With Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full overflow-hidden bg-bottom bg-repeat-x text-center text-xs text-gray-600">
        <img src={bookrow} alt="" />
        <img src={bookrow} alt="" />
        <img src={bookrow} alt="" />
        <img src={bookrow} alt="" />
      </div>
    </div>
  );
};

export default Login;
