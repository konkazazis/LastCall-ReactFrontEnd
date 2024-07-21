import { React, useState } from "react";
import { Navigate } from "react-router-dom";
import Login from "./login";
import SignUp from "./signup";
import CV from "../assets/cv.webp";
import logo from "../assets/lastcallnobg.png";

const LandingPage = () => {
  const [userId, setUserId] = useState(null);
  const [component, setComponent] = useState(<SignUp />);
  const changeComponent = (component) => {
    setComponent(component);
  };

  const [token, setToken] = useState(localStorage.getItem("token"));
  if (token && token !== null) {
    return <Navigate replace to="/home" />;
  }

  return (
    <div>
      <div className="min-h-screen h-[600px] w-screen mx-0 flex items-center justify-center bg-gray-50">
        <div className="flex items-center justify-center w-[30%] h-full mx-6">
          <div className="">
            {component.type === SignUp ? (
              <div className="w-[25rem]">
                <div>
                  <img src={logo} alt="" className="w-[200px] h-[200px]" />
                  <h1 className="text-3xl font-semibold mb-4">
                    Manage your bar. Sign up now!
                  </h1>
                </div>
                <SignUp />
                <p className="mt-2 text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    onClick={() => changeComponent(<Login />)}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            ) : (
              <div className="w-[25rem]">
                <div>
                  <img src={logo} alt="" className="w-[200px] h-[200px]" />
                  <h1 className="text-3xl font-semibold mb-4">
                    Welcome back! Sign in to your account.
                  </h1>
                </div>
                <Login />
                <p className="mt-2 text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    onClick={() => changeComponent(<SignUp />)}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex bg-slate-400 items-center justify-center w-[70%] h-full bg-opacity-25 mb-2">
          <div className=" w-[50%] text-xl leading-relaxed">
            Welcome to <b>LastCall</b>, the ultimate tool for managing your bar
            with ease and efficiency. Our intuitive app streamlines operations,
            from inventory tracking to sales analysis, allowing you to focus on
            what matters most – serving your customers and growing your business
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
