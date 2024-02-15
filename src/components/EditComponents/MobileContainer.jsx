import React from "react";

const MobileContainer = () => {
  return (
    <div className="h-[100%] w-[100%] flex flex-col justify-center items-center">
      <p className="text-[#ACACAC] text-[12px] font-[500]">Live Preview</p>
      <button className="w-[110px] h-[38px] mt-3 rounded-[11px] border-black border font-[500] text-[14px]">
        View Card
      </button>
    </div>
  );
};

export default MobileContainer;
