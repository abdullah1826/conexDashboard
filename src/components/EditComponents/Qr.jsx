import React from "react";
import { MdColorize } from "react-icons/md";

const Qr = () => {
  return (
    <div className="w-[90%] h-[90%] flex flex-col justify-center items-center">
      <div className="w-[155px] h-[47px] rounded-[36px] shadow-lg font-[600] text-[16px] flex justify-center items-center">
        QR Code
      </div>
      <img
        src="https://placehold.co/120x120"
        alt=""
        className="h-[100px] w-[100px] rounded-full mt-[55px]"
      />
      <h2 className="font-[500] sm:text-[16px] text-[20px] mt-2">Add Custom Logo</h2>
      <p className="font-[400] text-[12px] text-[#666565] text-center sm:w-[47%] w-[75%]">
        Add custom logo to be displayed in the middle of the Qr Code.
      </p>
      <div className="w-[100%] mt-5 flex justify-center">
        <div className="sm:w-[50%] w-[100%] h-[35px]  rounded-[36px] flex  items-center bg-[#F2F2F2]">
          <div className="w-[22%] h-[100%] font-[500] text-[11px] flex justify-center items-center">
            Card Color
          </div>

          <div className="w-[78%] h-[100%] flex justify-evenly items-center">
            <div className="h-[18px] w-[18px] rounded-full bg-black flex justify-center items-center">
              <MdColorize className="text-[white] text-[14px] cursor-pointer" />
            </div>
            <div className="h-[18px] w-[18px] rounded-full bg-[#E70A0A] cursor-pointer"></div>
            <div className="h-[18px] w-[18px] rounded-full bg-[#0ED416] cursor-pointer"></div>
            <div className="h-[18px] w-[18px] rounded-full bg-[#3076FF] cursor-pointer"></div>
            <div className="h-[18px] w-[18px] rounded-full bg-[#F439D6] cursor-pointer"></div>
            <div className="h-[18px] w-[18px] rounded-full bg-[#6732FF] cursor-pointer"></div>
            <div className="h-[18px] w-[18px] rounded-full bg-[#FCE410] cursor-pointer"></div>
            <div className="h-[18px] w-[18px] rounded-full bg-[#1BE4FF] cursor-pointer"></div>
            <div className="h-[18px] w-[18px] rounded-full bg-[#DEA527] cursor-pointer"></div>
          </div>
        </div>
      </div>

      <h2 className="text-[#AEABAB] text-[12px] font-[400] mt-1">
        Choose Color
      </h2>

      <div className="w-[100%] flex justify-center items-center mt-5">
        <button className="w-[120px] h-[40px] rounded-[15px] mr-2 font-[600] text-[12px]  shadow-md">
          Cancel
        </button>
        <button className="w-[120px] h-[40px] rounded-[15px] ml-2 font-[600] text-[12px]  shadow-md bg-black text-white">
          Update
        </button>
      </div>
    </div>
  );
};

export default Qr;
