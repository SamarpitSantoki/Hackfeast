import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  login,
  getUser,
  getIsAuthenticated,
} from "../../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(getIsAuthenticated);
  const isError = useSelector((state) => state.auth.isError);
  const user = useSelector(getUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState();

  useEffect(() => {
    if (isAuthenticated) {
      console.log("user", user);
      sessionStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    }
  }, [isAuthenticated]);

  //function to handle the login
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };
  if (isError) {
    setMsg("Invalid Credentials");
  }
  console.log(isAuthenticated);
  // if (isAuthenticated) {
  //   return <Navigate to="/" />;
  // }

  return (
    <div className="lg:flex">
      <div className="lg:w-1/2 xl:max-w-screen-sm">
        <div className="py-12 bg-[#e8fcfb] lg:bg-white  flex justify-center lg:justify-start lg:px-12">
          <div className="cursor-pointer flex items-center">
            <Link to={`https://${window.location.hostname}:1338/`}>
              <div className="text-2xl text-medi-200 tracking-wide ml-2 font-semibold inline-flex items-center">
                <img
                  alt="logo"
                  height="44px"
                  width="44px"
                  src="/images/logo_medi.png"
                  className="h-11 color-black filter"
                />
                <p className="ml-2">MediCare</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h2
            className="text-center text-4xl text-medi-100 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold"
          >
            Log in
          </h2>
          <div className="mt-12">
            <form>
              <div>
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Email Address
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-medi"
                  placeholder="sgp@gmail.com"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Password
                  </div>
                  <div>
                    <a
                      href="#"
                      className="text-xs font-display font-semibold text-medi hover:text-medi cursor-pointer"
                    >
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {msg ? (
                <div
                  className="mt-2 p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                  role="alert"
                >
                  <span className="font-medium">Error : </span>
                  {msg}
                </div>
              ) : (
                ""
              )}
              <div className="mt-10">
                <button
                  className="bg-medi-100 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-medi-200
                                shadow-lg"
                  onClick={handleSubmit}
                >
                  Log In
                </button>
              </div>
            </form>
            <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
              Don&apos;t have an account ?
              <Link
                to="/auth/register"
                className="cursor-pointer text-medi-100 hover:text-medi-200"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
