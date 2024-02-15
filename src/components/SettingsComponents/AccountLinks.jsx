import React from "react";
import { MdDragIndicator } from "react-icons/md";
import Linkedin from "../../imgs/Linkedin.png";
import { IoMdAdd } from "react-icons/io";

const AccountLinks = () => {
  return (
    <div className="h-[400px] w-[100%]  mt-7 flex flex-col items-center">
      <div className="sm:w-[90%] w-[100%] h-[57px] bg-white rounded-[36px] shadow-lg flex justify-center items-center mt-4">
        <div className="w-[95%] h-[80%] flex justify-between">
          <div className="w-[129px] flex items-center justify-between">
            <MdDragIndicator className="text-[#E1E1E1] text-xl" />
            <img src={Linkedin} alt="" className="h-[29px]  w-[29px]" />
            <p className="font-[600] text-[14px]">Linkedin</p>
          </div>
          <div className="w-[155px] flex items-center justify-between">
            <div className="w-[74px] h-[30px] rounded-[36px] shadow-lg font-[600] text-[8px] flex justify-center items-center cursor-pointer border">
              Remove Link
            </div>
            <div className="w-[74px] h-[30px] rounded-[36px] shadow-lg bg-black text-white font-[600] text-[8px] flex justify-center items-center cursor-pointer border">
              Open Link
            </div>
          </div>
        </div>
      </div>

      <div className="sm:w-[90%] w-[100%] h-[57px] bg-white rounded-[36px] shadow-lg flex justify-center items-center mt-4">
        <div className="w-[95%] h-[80%] flex justify-between">
          <div className="w-[129px] flex items-center justify-between">
            <MdDragIndicator className="text-[#E1E1E1] text-xl" />
            <img src={Linkedin} alt="" className="h-[29px]  w-[29px]" />
            <p className="font-[600] text-[14px]">Linkedin</p>
          </div>
          <div className="w-[155px] flex items-center justify-between">
            <div className="w-[74px] h-[30px] rounded-[36px] shadow-lg font-[600] text-[8px] flex justify-center items-center cursor-pointer border">
              Remove Link
            </div>
            <div className="w-[74px] h-[30px] rounded-[36px] shadow-lg bg-black text-white font-[600] text-[8px] flex justify-center items-center cursor-pointer border">
              Open Link
            </div>
          </div>
        </div>
      </div>

      <div className="sm:w-[90%] w-[100%] h-[57px] bg-white rounded-[36px] shadow-lg flex justify-center items-center mt-4">
        <div className="w-[95%] h-[80%] flex justify-between">
          <div className="w-[129px] flex items-center justify-between">
            <MdDragIndicator className="text-[#E1E1E1] text-xl" />
            <img src={Linkedin} alt="" className="h-[29px]  w-[29px]" />
            <p className="font-[600] text-[14px]">Linkedin</p>
          </div>
          <div className="w-[155px] flex items-center justify-between">
            <div className="w-[74px] h-[30px] rounded-[36px] shadow-lg font-[600] text-[8px] flex justify-center items-center cursor-pointer border">
              Remove Link
            </div>
            <div className="w-[74px] h-[30px] rounded-[36px] shadow-lg bg-black text-white font-[600] text-[8px] flex justify-center items-center cursor-pointer border">
              Open Link
            </div>
          </div>
        </div>
      </div>

      <div className="sm:w-[90%] w-[100%] h-[57px] bg-white rounded-[36px] shadow-lg flex justify-center items-center mt-4">
        <div className="w-[95%] h-[80%] flex justify-between">
          <div className="w-[129px] flex items-center justify-between">
            <MdDragIndicator className="text-[#E1E1E1] text-xl" />
            <img src={Linkedin} alt="" className="h-[29px]  w-[29px]" />
            <p className="font-[600] text-[14px]">Linkedin</p>
          </div>
          <div className="w-[155px] flex items-center justify-between">
            <div className="w-[74px] h-[30px] rounded-[36px] shadow-lg font-[600] text-[8px] flex justify-center items-center cursor-pointer border">
              Remove Link
            </div>
            <div className="w-[74px] h-[30px] rounded-[36px] shadow-lg bg-black text-white font-[600] text-[8px] flex justify-center items-center cursor-pointer border">
              Open Link
            </div>
          </div>
        </div>
      </div>

      <div className="sm:w-[90%] w-[100%] h-[57px] bg-white rounded-[36px] shadow-lg flex justify-center items-center mt-4">
        <IoMdAdd className="text-[#878787] " />
        <p className="text-[12px] font-[500] text-[#878787] ml-[2px]">
          Add Links and Contacts
        </p>
      </div>
    </div>
  );
};

export default AccountLinks;
