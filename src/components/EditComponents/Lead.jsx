import styled from "@emotion/styled";
import { FormControlLabel, Switch } from "@mui/material";
import React from "react";

const Lead = () => {
  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 50,
    height: 26,
    padding: 0,
    // position: "relative",
    // right: 0,
    // marginLeft: "50px",
    // border: "1px solid black",

    "& .MuiSwitch-switchBase": {
      padding: 0,
      marginTop: 2,
      marginLeft: 2,
      //   marginRight: -5,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(24px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme?.palette?.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme?.palette?.mode === "light"
            ? theme?.palette?.grey[100]
            : theme?.palette?.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme?.palette?.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme?.palette?.mode === "light" ? "#E9E9EA" : "#BBBBBB",
      opacity: 1,
      transition: theme?.transitions?.create(["background-color"], {
        duration: 500,
      }),
    },
  }));
  return (
    <div className="w-[85%] h-[90%]">
      <div className="w-[159px] h-[47px] rounded-[36px] shadow-lg font-[600] text-[16px] flex justify-center items-center">
        Lead Capture
      </div>
      <div className="w-[100%] flex justify-between mt-8">
        <div className="w-[75%]">
          <h2 className="text-[15px] font-[500]">Lead Capture Mode</h2>
          <p className="font-[400] text-[11px] text-[#7D7C7C] sm:w-[90%] w-[100%]">
            When lead capture mode is enabled, the lead form will popup as soon
            as your profile is shared
          </p>
        </div>
        <div className="sm:w-[15%] w-[2%]  flex justify-center items-center">
          <FormControlLabel control={<IOSSwitch defaultChecked />} />
        </div>
      </div>
      <div className="mt-5">
        <h2 className="font-[600] text-[12px]">Form Header</h2>
        <input
          type="text"
          name=""
          id=""
          className="w-[210px] h-[34px] outline-none bg-[#F3F3F3] border border-[#ACABAB] rounded-[10px] p-[10px] mt-1"
        />
      </div>

      <div className="w-[100%] mt-5">
        <div className="w-[75%]">
          <h2 className="text-[15px] font-[500]">Input Fields</h2>
          <p className="font-[400] text-[11px] text-[#7D7C7C] sm:w-[90%] w-[127%]">
            When lead capture mode is enabled, the lead form will popup as soon
            as your profile is shared
          </p>

          <div className="sm:w-[429px] w-[132%] h-[163px] border rounded-[26px] shadow-xl mt-3 flex flex-col justify-center items-center">
            <div className="h-[70%] w-[90%]  flex flex-col justify-between">
              <div className="w-[100%] flex justify-between ">
                <div className="w-[30%] h-[48px] rounded-[36px] border border-[#737373] bg-black font-[500] sm:text-[12px] text-[10px] text-[white] flex justify-center items-center hover:text-white cursor-pointer">
                  Full Name
                </div>
                <div className="w-[30%] h-[48px] rounded-[36px] border border-[#737373] bg-black font-[500] sm:text-[12px] text-[10px] text-[white] flex justify-center items-center hover:text-white cursor-pointer">
                  Email
                </div>
                <div className="w-[30%] h-[48px] rounded-[36px] border border-[#737373] bg-black font-[500] sm:text-[12px] text-[10px] text-[white] flex justify-center items-center hover:text-white cursor-pointer">
                  Phone Number
                </div>
              </div>

              <div className="w-[100%] flex justify-between ">
                <div className="w-[30%] h-[48px] rounded-[36px] border border-[#737373] font-[500] sm:text-[12px] text-[10px] hover:bg-black flex justify-center items-center hover:text-white cursor-pointer">
                  Job Title
                </div>
                <div className="w-[30%] h-[48px] rounded-[36px] border border-[#737373] font-[500] sm:text-[12px] text-[10px] hover:bg-black flex justify-center items-center hover:text-white cursor-pointer">
                  Company
                </div>
                <div className="w-[30%] h-[48px] rounded-[36px] border border-[#737373] font-[500] sm:text-[12px] text-[10px] hover:bg-black flex justify-center items-center hover:text-white cursor-pointer">
                  Note
                </div>
              </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Lead;
