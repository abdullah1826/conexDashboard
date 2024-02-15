import React from "react";

const AccountSettings = () => {
  return (
    <div className="h-[300px] sm:w-[600px] mt-7">
      <div className="w-[100%] flex justify-between">
        <div className="w-[47%] ">
          <h2 className="font-[500] text-[14px] ml-2">First name</h2>
          <input
            type="text"
            className="w-[98%] pl-[4%] sm:h-[46px] h-[30px] p-2  outline-none bg-white text-gray-500 rounded-[36px] mt-1"
          />
        </div>
        <div className="w-[47%] ">
          <h2 className="font-[500] text-[14px] ml-2">Last name</h2>
          <input
            type="text"
            className="w-[98%] pl-[4%] sm:h-[46px] h-[30px] p-2 outline-none bg-white text-gray-500 rounded-[36px] mt-1"
          />
        </div>
      </div>

      <div className="w-[100%] mt-3">
        <div className="w-[100%] ">
          <h2 className="font-[500] text-[14px] ml-2">Email</h2>
          <input
            type="text"
            className="w-[99%] pl-[4%] sm:h-[46px] h-[30px] p-2 outline-none bg-white text-gray-500 rounded-[36px] mt-1"
          />
        </div>
      </div>

      <div className="w-[100%] mt-7">
      <h2 className="font-[500] text-[14px] ml-2 text-gray-500">Account Security</h2>
        <div className="w-[99%] pl-[4%] sm:h-[46px] h-[30px] outline-none bg-white rounded-[36px] mt-1 flex justify-end">
          <div className="w-[25%] h-[100%] rounded-[36px] bg-black flex justify-center items-center text-white cursor-pointer sm:text-[16px] text-[12px]">
            Reset
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default AccountSettings;
