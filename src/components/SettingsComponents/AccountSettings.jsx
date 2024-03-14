import React, { useEffect, useState } from "react";
import { updataCompanyAbout } from "../../Services";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Switch } from "@mui/material";
import {
  setbioLock,
  setlocationLock,
  setnameLock,
  setphoneLock,
} from "../../redux/profileInfoSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const AccountSettings = ({ companyProfile }) => {
  let [data, setData] = useState({
    name: "",
    phone: "",
    address: "",
    bio: "",
  });

  useEffect(() => {
    setData({
      name: companyProfile?.name,
      phone: companyProfile?.phone,
      address: companyProfile?.address,
      bio: companyProfile?.bio,
    });
  }, [companyProfile]);
  console.log(companyProfile);

  let dispatch = useDispatch();
  const nameLock = useSelector((state) => state.profileInfoSlice.nameLock);
  const phoneLock = useSelector((state) => state.profileInfoSlice.phoneLock);
  const locationLock = useSelector(
    (state) => state.profileInfoSlice.locationLock
  );

  console.log(phoneLock);
  const bioLock = useSelector((state) => state.profileInfoSlice.bioLock);

  return (
    <div className="h-[300px] sm:w-[600px] mt-7">
      <div className="w-[100%] flex justify-between">
        <div className="w-[47%] ">
          <div className="flex items-center">
            <h2 className="font-[500] text-[14px] ml-2">Name</h2>
            <Switch
              size="small"
              checked={!nameLock}
              onChange={() => dispatch(setnameLock(!nameLock))}
              // inputProps={{ 'aria-label': 'controlled' }}
              className="ml-1"
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
            <h2 className="font-[500] text-[14px] ml-2">Phone</h2>
            <Switch
              size="small"
              checked={!phoneLock}
              onChange={() => dispatch(setphoneLock(!phoneLock))}
              // inputProps={{ 'aria-label': 'controlled' }}
              className="ml-1"
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
            <h2 className="font-[500] text-[14px] ml-2">Location</h2>
            <Switch
              size="small"
              checked={!locationLock}
              onChange={() => dispatch(setlocationLock(!locationLock))}
              // inputProps={{ 'aria-label': 'controlled' }}
              className="ml-1"
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
            <h2 className="font-[500] text-[14px] ml-2">Bio</h2>
            <Switch
              size="small"
              checked={!bioLock}
              onChange={() => dispatch(setbioLock(!bioLock))}
              // inputProps={{ 'aria-label': 'controlled' }}
              className="ml-1"
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
          Account Settings
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
              })
            }
          >
            Save
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
