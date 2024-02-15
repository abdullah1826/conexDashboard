import React from "react";
import InputComponent from "../components/SignComponents/InputComponent";
import ImageContainer from "../components/SignComponents/ImageContainer";
import signup from "../imgs/signup.png";

const SignUp = () => {
  var screen=window.innerWidth
  return (
    <div className="h-[100vh] w-[100%] flex justify-center items-center">
      <div className="w-[97%] h-[95%] rounded-[60px] sm:bg-[#ECECEC] flex items-center justify-evenly">
        <InputComponent type="signup" />
        {screen>=450 ? <ImageContainer type="signup" img={signup} />:null}
      </div>
    </div>
  );
};

export default SignUp;
