import React from "react";

const ImageContainer = ({ img }) => {
  return (
    <div className="w-[45%] h-[97%]  border rounded-[60px] bg-black flex justify-center items-center">
      <img src={img} alt="" className="max-h-[100%] w-[100%] object-contain" />
    </div>
  );
};

export default ImageContainer;
