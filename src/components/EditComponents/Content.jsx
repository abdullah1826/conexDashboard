import styled from "@emotion/styled";
import { FormControlLabel, Switch } from "@mui/material";
import React from "react";
import { PiDotsSixBold } from "react-icons/pi";
import behance from "../../imgs/Behance.png";
import Linkedin from "../../imgs/Linkedin.png";
import Snapchat from "../../imgs/Snapchat.png";
import { useSelector } from "react-redux";
import { returnIcons } from "../../assets/ReturnSocialIcons";

const Content = ({ uid }) => {
  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 38,
    height: 22,
    padding: 0,
    // position: "relative",
    // right: 0,
    // marginLeft: "50px",
    // border: "1px solid black",

    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
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
      width: 18,
      height: 18,
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

  const links = useSelector((state) => state.profileInfoSlice.links);
  return (
    <div className="w-[90%] h-[90%]">
      <div className="w-[100%] ">
        <div className="sm:w-[55%] w-[100%] h-[50px]  rounded-[36px] shadow-lg flex justify-center items-center">
          <div className="flex w-[50%] items-center  justify-around ">
            <p className="font-[500] text-[14px] ml-2">Lead Mode</p>
            <FormControlLabel control={<IOSSwitch defaultChecked />} />
          </div>
          <div className="flex w-[50%] items-center  justify-around ">
            <p className="font-[500] text-[14px] ml-2">Lead Mode</p>
            <FormControlLabel
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
            />
          </div>
        </div>

        <div className="w-[100%]  flex justify-between flex-wrap mt-2">
          {links?.map((elm) => {
            return (
              <div className="sm:w-[190px] w-[49%] h-[180px] rounded-[24px] shadow-lg mt-6">
                <div className="w-[100%] flex justify-center items-center mt-3">
                  <PiDotsSixBold className="text-2xl text-[#EDEDED] cursor-grab" />
                </div>
                <div className="w-[100%] flex flex-col justify-center items-center mt-4">
                  <img
                    src={returnIcons(elm?.linkID)}
                    alt=""
                    className="h-[45px] w-[45px] object-cover"
                  />
                  <h2 className="font-[500] text-[15px] mt-2">{elm?.name}</h2>
                </div>

                <div className="w-[100%] flex justify-center items-center mt-4">
                  <button className="w-[62px] h-[27px] rounded-[16px] border mr-1 text-[8px] font-[500]">
                    Remove Link
                  </button>
                  <button className="w-[62px] h-[27px] rounded-[16px] border ml-1 text-[8px] font-[500] bg-black text-white">
                    Open Link
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Content;
