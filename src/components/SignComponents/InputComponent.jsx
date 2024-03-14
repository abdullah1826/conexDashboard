import React, { useState } from "react";
import logo from "../../imgs/logo.png";
import { useLocation } from "react-router-dom";
import img1 from "../../imgs/signup.png";
import img2 from "../../imgs/signin.png";
import img3 from "../../imgs/forget.png";
import { useNavigate } from "react-router-dom";
import { PiEye } from "react-icons/pi";
import { PiEyeClosed } from "react-icons/pi";

const InputComponent = ({ type, handleSubmit }) => {
  let navigate = useNavigate();
  const location = useLocation();
  const isSignupPage = location.pathname === "/signin";
  const isLoginPage = location.pathname === "/signup";

  let [data, setData] = useState({
    email: "",
    password: "",
    userName: "",
  });

  let [showPass, setShowPass] = useState(false);

  let imgSrc;

  if (isSignupPage) {
    imgSrc = img1;
  } else if (isLoginPage) {
    imgSrc = img2;
  } else {
    // Provide a default image source or handle other cases
    imgSrc = img3;
  }
  var screen = window.innerWidth;
  return (
    <div className="sm:w-[45%] w-[100%] h-[97%] sm:border rounded-[60px] bg-white relative">
      <div className="w-[100%] flex justify-center flex-col items-center mt-[15px]">
        <img src={logo} alt="" className="w-[189px] h-[46px]" />
        <p className="font-[400] text-[12px]">
          {}
          Connect Smarter and Grow Faster
        </p>
        {imgSrc && (
          <img
            src={imgSrc}
            style={{ width: "210px", height: "156px", marginTop: "5px" }}
            alt="Image"
            className="sm:hidden"
          />
        )}
      </div>
      <div className="w-[100%] flex flex-col items-center sm:mt-[70px] mt-2 ">
        {type === "signup" && (
          <input
            type="text"
            className="sm:w-[83%] w-[90%]  sm:h-[60px] h-[50px]  rounded-[46px]  bg-[#F7F7F7] outline-none pl-[15px]"
            placeholder="Name"
          />
        )}

        <input
          type="text"
          className="sm:w-[83%] w-[90%] sm:h-[60px] h-[50px] rounded-[46px]  bg-[#F7F7F7] outline-none pl-[15px] mt-5"
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
          value={data?.email}
        />
        <div className="sm:w-[83%] w-[90%] sm:h-[60px] h-[50px] flex justify-center items-center relative mt-5">
          <input
            type={showPass ? "text" : "password"}
            className="h-[100%] w-[100%] rounded-[46px]  bg-[#F7F7F7] outline-none pl-[15px] "
            placeholder="Password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            value={data?.password}
          />
          {showPass ? (
            <PiEye
              className="absolute right-4 text-[22px] cursor-pointer"
              onClick={() => setShowPass(false)}
            />
          ) : (
            <PiEyeClosed
              className="absolute right-4 text-[22px] cursor-pointer"
              onClick={() => setShowPass(true)}
            />
          )}
        </div>
        {type === "signin" ? (
          <div
            className="sm:w-[75%] w-[80%] flex justify-end"
            onClick={() => navigate("/forgetpassword")}
          >
            <div className="font-[400] text-[14px] mt-[10px] underline cursor-pointer">
              Forgot Password
            </div>
          </div>
        ) : null}
        <div
          className="sm:w-[83%] w-[90%] sm:h-[60px] h-[50px] rounded-[46px]  bg-[black] text-[white] pl-[15px] mt-4 font-[500] text-[22px] flex justify-center items-center cursor-pointer"
          onClick={() => handleSubmit(data, () => navigate("/"))}
        >
          {type === "signin"
            ? "Login"
            : type === "signup"
            ? "Create Account"
            : "Send"}
        </div>

        <p className="font-[400] text-[14px] mt-[10px] ">
          {type === "signin" ? (
            <>
              Don't have an account?
              <span
                className="font-[600] text-[14px] cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </>
          ) : type === "signup" ? (
            <>
              Already have an account?
              <span
                className="font-[600] text-[14px] cursor-pointer"
                onClick={() => navigate("/signin")}
              >
                Login
              </span>
            </>
          ) : null}
        </p>
      </div>
    </div>
  );
};

export default InputComponent;
