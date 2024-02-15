import React from "react";
import InputComponent from "../components/SignComponents/InputComponent";
import ImageContainer from "../components/SignComponents/ImageContainer";
import forget from "../imgs/forget.png";

const ForgetPassword = () => {
  var screen=window.innerWidth
  return (
    <div className="h-[100vh] w-[100%] flex justify-center items-center">
      <div className="w-[97%] h-[95%] rounded-[60px] sm:bg-[#ECECEC] flex items-center justify-evenly">
        <InputComponent type="forget" />
        {screen>=450 ? <ImageContainer type="forget" img={forget} />:null}
      </div>
    </div>
  );
};

export default ForgetPassword;
