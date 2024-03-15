import React, { useEffect, useState } from "react";
import bgplhldr from "../imgs/bgplhldr.png";
import prsnPlshldr from "../imgs/prsnPlshldr.png";
import lgoplchldr from "../imgs/lgoplchldr.jpg";
import { useSelector } from "react-redux";
import { returnIcons } from "../assets/ReturnSocialIcons";
import { getSingleChild } from "../Services";

const Mobile = ({ linkInfo, ifAdded }) => {
  const name = useSelector((state) => state.profileInfoSlice.name);
  const email = useSelector((state) => state.profileInfoSlice.email);
  const color = useSelector((state) => state.profileInfoSlice.color);
  const textColor = useSelector((state) => state.profileInfoSlice.textColor);
  const phone = useSelector((state) => state.profileInfoSlice.phone);
  const cover = useSelector((state) => state.profileInfoSlice.coverUrl);
  const profile = useSelector((state) => state.profileInfoSlice.profileUrl);
  const logo = useSelector((state) => state.profileInfoSlice.logoUrl);
  const address = useSelector((state) => state.profileInfoSlice.address);
  const bio = useSelector((state) => state.profileInfoSlice.bio);
  const links = useSelector((state) => state.profileInfoSlice.links);
  const formHeader = useSelector((state) => state.profileInfoSlice.formHeader);

  const nameVisible = useSelector(
    (state) => state.profileInfoSlice.nameVisible
  );
  const emailVisible = useSelector(
    (state) => state.profileInfoSlice.emailVisible
  );
  const companyVisible = useSelector(
    (state) => state.profileInfoSlice.companyVisible
  );
  const jobVisible = useSelector((state) => state.profileInfoSlice.jobVisible);
  const noteVisible = useSelector(
    (state) => state.profileInfoSlice.noteVisible
  );
  const phoneVisible = useSelector(
    (state) => state.profileInfoSlice.phoneVisible
  );

  const leadMode = useSelector((state) => state.profileInfoSlice.leadMode);
  const designation = useSelector(
    (state) => state.profileInfoSlice.designation
  );
  // const email = useSelector((state) => state.profileInfoSlice.email);
  // const color = useSelector((state) => state.profileInfoSlice.color);

  // -----------------------------------------hex to rgba for bg color-------------------------------------

  let hexToRGBA = (hex) => {
    // Remove the '#' character if present
    hex = hex?.replace("#", "");

    // Convert the hex value to RGB
    const red = parseInt(hex?.substring(0, 2), 16);
    const green = parseInt(hex?.substring(2, 4), 16);
    const blue = parseInt(hex?.substring(4, 6), 16);

    // Convert RGB to RGBA with alpha value 0.1
    const rgba = `rgba(${red}, ${green}, ${blue}, 0.1)`;

    return rgba;
  };

  const nameLock = useSelector((state) => state.profileInfoSlice.nameLock);
  const phoneLock = useSelector((state) => state.profileInfoSlice.phoneLock);
  const locationLock = useSelector(
    (state) => state.profileInfoSlice.locationLock
  );
  const bioLock = useSelector((state) => state.profileInfoSlice.bioLock);

  const profilePictureLock = useSelector(
    (state) => state.profileInfoSlice.profilePictureLock
  );
  const logoLock = useSelector((state) => state.profileInfoSlice.logoLock);
  const coverLock = useSelector((state) => state.profileInfoSlice.coverLock);
  console.log(locationLock);

  let [companyId, setCompanyId] = useState("");
  let conexParent = localStorage.getItem("conexParent");
  let connexUid = localStorage.getItem("connexUid");
  let [companyProfile, setCompanyProfile] = useState({});
  useEffect(() => {
    if (conexParent) {
      setCompanyId(conexParent);
    } else {
      setCompanyId(connexUid);
    }
  }, []);

  useEffect(() => {
    getSingleChild(companyId, setCompanyProfile);
  }, [companyId]);

  return (
    <div
      className="w-[253px] h-[455px] rounded-[35px] border mt-2 overflow-y-scroll relative"
      style={{ backgroundColor: hexToRGBA(color) }}
    >
      {leadMode && (
        <div className="absolute w-[100%] flex justify-center items-center h-[455px]">
          <div className="h-[380px] w-[85%] border bg-white z-20 rounded-md flex justify-center items-center">
            <div className="h-[90%] w-[85%] ">
              <div className="w-[100%] border-b border-black mt-[2px] flex justify-center text-[13px]">
                {formHeader}
              </div>
              {nameVisible && (
                <div className="mt-[10px] h-[37px] w-[97%] pl-[3%] text-[12px] border border-black rounded-lg flex items-center ">
                  Name
                </div>
              )}
              {emailVisible && (
                <div className="mt-[10px] h-[37px] w-[97%] pl-[3%] text-[12px] border border-black rounded-lg flex items-center ">
                  Email
                </div>
              )}
              {phoneVisible && (
                <div className="mt-[10px] h-[37px] w-[97%] pl-[3%] text-[12px] border border-black rounded-lg flex items-center ">
                  Phone
                </div>
              )}
              {companyVisible && (
                <div className="mt-[10px] h-[37px] w-[97%] pl-[3%] text-[12px] border border-black rounded-lg flex items-center ">
                  Company
                </div>
              )}

              {jobVisible && (
                <div className="mt-[10px] h-[37px] w-[97%] pl-[3%] text-[12px] border border-black rounded-lg flex items-center ">
                  Job
                </div>
              )}
              {noteVisible && (
                <div className="mt-3 h-[37px] w-[97%] pl-[3%] text-[12px] border border-black rounded-lg flex items-center ">
                  Note
                </div>
              )}
              <div className="w-[100%] flex justify-center items-center mt-2">
                <div className="w-[70px] h-[30px] border rounded-full flex justify-center items-center text-xs mr-1">
                  Cancel
                </div>
                <div
                  className="w-[70px] h-[30px] border rounded-full flex justify-center items-center text-white text-xs ml-1"
                  style={{ backgroundColor: color }}
                >
                  Submit
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="w-[100%] h-[150px] rounded-t-[35px] relative">
        {!logoLock ? (
          <img
            src={
              logo
                ? logo
                : companyProfile?.[companyId]?.logoUrl
                ? companyProfile?.[companyId]?.logoUrl
                : lgoplchldr
            }
            alt=""
            className="h-[45px] w-[45px] rounded-full absolute bottom-[-20px] left-3"
          />
        ) : (
          <img
            src={lgoplchldr}
            alt=""
            className="h-[45px] w-[45px] rounded-full absolute bottom-[-20px] left-3"
          />
        )}

        <div className="w-[100%] flex justify-center absolute bottom-[-30px]">
          {!profilePictureLock ? (
            <img
              src={
                profile
                  ? profile
                  : companyProfile?.[companyId]?.profileUrl
                  ? companyProfile?.[companyId]?.profileUrl
                  : prsnPlshldr
              }
              alt=""
              className="h-[82px] w-[82px] rounded-full"
            />
          ) : (
            <img
              src={prsnPlshldr}
              alt=""
              className="h-[82px] w-[82px] rounded-full"
            />
          )}
        </div>
        {!coverLock ? (
          <img
            src={
              cover
                ? cover
                : companyProfile?.[companyId]?.coverUrl
                ? companyProfile?.[companyId]?.coverUrl
                : bgplhldr
            }
            alt=""
            className="w-[100%] h-[150px] rounded-t-[35px] object-cover"
          />
        ) : (
          <img
            src={bgplhldr}
            alt=""
            className="w-[100%] h-[150px] rounded-t-[35px] object-cover"
          />
        )}
      </div>

      <div
        className="w-[100%] flex flex-col items-center mt-[40px]"
        style={{ color: textColor }}
      >
        {!nameLock && (
          <h2 className="font-[500] text-[16px] text-center">{name}</h2>
        )}
        {/* <p className="text-[#656363] font-[400] text-[11px] w-[90%] text-center">
          Mern Stack developer at avicenne
        </p> */}
        <p
          className=" font-[400] text-[11px] w-[90%] text-center"
          style={{ color: textColor }}
        >
          {email}
        </p>
        <p
          className=" font-[400] text-[11px] w-[90%] text-center"
          style={{ color: textColor }}
        >
          {designation}
        </p>
        {!phoneLock && (
          <p
            className=" font-[400] text-[11px] w-[90%] text-center"
            style={{ color: textColor }}
          >
            {phone}
          </p>
        )}

        {locationLock && (
          <p
            className=" font-[400] text-[11px] w-[90%] text-center"
            style={{ color: textColor }}
          >
            {address}
          </p>
        )}

        {!bioLock && (
          <p
            className="font-[400] text-[11px] w-[90%] text-center"
            style={{ color: textColor }}
          >
            {bio}
          </p>
        )}
      </div>

      <div className="w-[100%] flex justify-center mt-2">
        <div
          className="w-[65%] h-[36px] border rounded-xl text-white flex justify-center items-center text-[12px]"
          style={{ backgroundColor: color }}
        >
          Let's Connect
        </div>
      </div>

      <div className="w-[100%] flex justify-center mt-3">
        <div className="w-[90%] grid grid-cols-4 ml-6 gap-y-3">
          {links?.map((elm) => {
            return (
              <div className="w-[35px] h-[50px] flex flex-col items-center">
                <img
                  src={returnIcons(elm?.linkID)}
                  alt=""
                  className="h-[35px] w-[35px]"
                />
                <p className="text-[8px] mt-[2px]" style={{ color: textColor }}>
                  {elm?.name}
                </p>
              </div>
            );
          })}

          {ifAdded === false && (
            <div className="w-[35px] h-[50px] flex flex-col items-center">
              <img
                src={returnIcons(linkInfo?.linkID)}
                alt=""
                className="h-[35px] w-[35px]"
              />
              <p className="text-[8px] mt-[2px]">{linkInfo?.name}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mobile;
