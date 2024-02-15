import React from "react";
import InputComponent from "../components/SignComponents/InputComponent";
import ImageContainer from "../components/SignComponents/ImageContainer";
import signin from "../imgs/signin.png";
import { handleLogin } from "../Services";

const SignIn = () => {
  var screen = window.innerWidth;
  console.log(screen);
  return (
    <div className="h-[100vh] w-[100%] flex justify-center items-center">
      <div className="w-[97%] h-[95%] rounded-[60px] sm:bg-[#ECECEC] flex items-center justify-evenly">
        <InputComponent type="signin" handleSubmit={handleLogin} />
        {screen >= 450 ? <ImageContainer type="signin" img={signin} /> : null}
      </div>
    </div>
  );
};

export default SignIn;
