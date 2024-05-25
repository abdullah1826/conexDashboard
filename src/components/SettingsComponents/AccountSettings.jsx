import React, { useEffect, useState } from "react";
import { updataCompanyAbout } from "../../Services";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormControlLabel, Switch, styled } from "@mui/material";
import {
  setProfilePictureLock,
  setbioLock,
  setcoverLock,
  setlocationLock,
  setlogoLock,
  setnameLock,
  setphoneLock,
} from "../../redux/profileInfoSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const AccountSettings = ({ companyProfile }) => {
  // -------------------------------------------------Mui customize switch-----------------------------------

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      // disableRipple

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

  let [data, setData] = useState({
    name: "",
    phone: "",
    address: "",
    bio: "",
  });
  const { t } = useTranslation();
  useEffect(() => {
    setData({
      name: companyProfile?.name,
      phone: companyProfile?.phone,
      address: companyProfile?.address,
      bio: companyProfile?.bio,
    });
  }, [companyProfile]);
  console.log(companyProfile);

  const resetLockValues = () => {
    dispatch(setProfilePictureLock(companyProfile?.profilePictureLock));
    dispatch(setlogoLock(companyProfile?.logoLock));
    dispatch(setcoverLock(companyProfile?.coverLock));
    dispatch(setnameLock(companyProfile?.nameLock));
    dispatch(setphoneLock(companyProfile?.phoneLock));
    dispatch(setbioLock(companyProfile?.bioLock));
    dispatch(setlocationLock(companyProfile?.locationLock));
  };

  let dispatch = useDispatch();
  const nameLock = useSelector((state) => state.profileInfoSlice.nameLock);
  const phoneLock = useSelector((state) => state.profileInfoSlice.phoneLock);
  const locationLock = useSelector(
    (state) => state.profileInfoSlice.locationLock
  );
  const bioLock = useSelector((state) => state.profileInfoSlice.bioLock);

  console.log(
    "name lock: ",
    nameLock,
    "phone lock: ",
    phoneLock,
    "location lock: ",
    locationLock
  );

  return (
    <div className="h-[300px] sm:w-[600px] mt-7">
      <div className="w-[100%] flex justify-between">
        <div className="w-[47%] ">
          <div className="flex items-center">
            <h2 className="font-[500] text-[14px] ml-2">{t("Name")}</h2>
            {/* <Switch
              size="small"
              checked={!nameLock}
              onChange={() => dispatch(setnameLock(!nameLock))}
              className="ml-1"
            /> */}

            <FormControlLabel
              control={
                <IOSSwitch
                  checked={!nameLock}
                  onChange={() => dispatch(setnameLock(!nameLock))}
                  className="ml-5"
                />
              }
            />
          </div>
          <input
            type="text"
            className="w-[98%] pl-[4%] sm:h-[46px] h-[30px] p-2  outline-none bg-white text-gray-500 rounded-[36px] mt-1"
            onChange={(e) => setData({ ...data, name: e.target.value })}
            value={data?.name}
          />
        </div>
        <div className="w-[47%] ">
          <div className="flex items-center">
            <h2 className="font-[500] text-[14px] ml-2">{t("Phone Number")}</h2>
            {/* <Switch
              size="small"
              checked={!phoneLock}
              onChange={() => dispatch(setphoneLock(!phoneLock))}
            
              className="ml-1"
            /> */}

            <FormControlLabel
              control={
                <IOSSwitch
                  checked={!phoneLock}
                  onChange={() => dispatch(setphoneLock(!phoneLock))}
                  className="ml-5"
                />
              }
            />
          </div>
          <input
            type="text"
            className="w-[98%] pl-[4%] sm:h-[46px] h-[30px] p-2 outline-none bg-white text-gray-500 rounded-[36px] mt-1"
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            value={data?.phone}
          />
        </div>
      </div>

      <div className="w-[100%] mt-3">
        <div className="w-[100%] ">
          <div className="flex items-center">
            <h2 className="font-[500] text-[14px] ml-2">{t("Location")}</h2>
            {/* <Switch
              size="small"
              checked={!locationLock}
              onChange={() => dispatch(setlocationLock(!locationLock))}
             
              className="ml-1"
            /> */}

            <FormControlLabel
              control={
                <IOSSwitch
                  checked={!locationLock}
                  onChange={() => dispatch(setlocationLock(!locationLock))}
                  className="ml-5"
                />
              }
            />
          </div>

          <input
            type="text"
            className="w-[99%] pl-[4%] sm:h-[46px] h-[30px] p-2 outline-none bg-white text-gray-500 rounded-[36px] mt-1"
            onChange={(e) => setData({ ...data, address: e.target.value })}
            value={data?.address}
          />
        </div>
      </div>

      <div className="w-[100%] mt-3">
        <div className="w-[100%] ">
          <div className="flex items-center">
            <h2 className="font-[500] text-[14px] ml-2">{t("Bio")}</h2>
            {/* <Switch
              size="small"
              checked={!bioLock}
              onChange={() => dispatch(setbioLock(!bioLock))}
          
              className="ml-1"
            /> */}

            <FormControlLabel
              control={
                <IOSSwitch
                  checked={!bioLock}
                  onChange={() => dispatch(setbioLock(!bioLock))}
                  className="ml-5"
                />
              }
            />
          </div>
          <textarea
            className="w-[99%] pl-[4%] sm:h-[80px] h-[50px] p-2 outline-none bg-white text-gray-500 rounded-[36px] mt-1"
            onChange={(e) => setData({ ...data, bio: e.target.value })}
            value={data?.bio}
          ></textarea>
        </div>
      </div>

      <div className="w-[100%] mt-7">
        <h2 className="font-[500] text-[14px] ml-2 text-gray-500">
          {t("Account Settings")}
        </h2>
        <div className="w-[99%] pl-[4%] sm:h-[46px] h-[30px] outline-none bg-white rounded-[36px] mt-1 flex justify-end">
          <div
            className="w-[25%] h-[100%] rounded-[36px] bg-black flex justify-center items-center text-white cursor-pointer sm:text-[16px] text-[12px]"
            onClick={() =>
              updataCompanyAbout(companyProfile?.id, {
                ...data,
                nameLock,
                phoneLock,
                locationLock,
                bioLock,
                resetLockValues,
              })
            }
          >
            {t("Save")}
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        theme="colored"
        hideProgressBar
      />
      <br />
    </div>
  );
};

export default AccountSettings;
