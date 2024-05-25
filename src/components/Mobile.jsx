import React, { useEffect, useState } from "react";
import bgplhldr from "../imgs/bgplhldr.png";
import prsnPlshldr from "../imgs/prsnPlshldr.png";
import lgoplchldr from "../imgs/lgoplchldr.jpg";
import { useSelector } from "react-redux";
import { returnIcons } from "../assets/ReturnSocialIcons";
import { getSingleChild, splitString } from "../Services";
import {
  setOrgLogo,
  setOrganizationCover,
  setOrganizationProfile,
} from "../redux/profileInfoSlice";
import { BsGlobe2 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

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
  const organizationProfile = useSelector(
    (state) => state.profileInfoSlice.organizationProfile
  );
  const organizationLogo = useSelector(
    (state) => state.profileInfoSlice.organizationLogo
  );
  const organizationCover = useSelector(
    (state) => state.profileInfoSlice.organizationCover
  );
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
  let dispatch = useDispatch();
  let getCompanyData = (data) => {
    dispatch(setOrganizationCover(data?.[companyId]?.coverUrl));
    dispatch(setOrgLogo(data?.[companyId]?.logoUrl));
    dispatch(setOrganizationProfile(data?.[companyId]?.profileUrl));
    setCompanyProfile(data?.[companyId]);
  };

  useEffect(() => {
    getSingleChild(companyId, getCompanyData);
  }, [companyId]);

  console.log(companyProfile);

  let returnWeblink = () => {
    let web = links?.find((elm) => {
      return elm?.linkID === 54;
    });

    return web;
  };

  console.log(companyProfile);

  console.log(textColor);

  const { t } = useTranslation();

  const OrReturner = (val1, val2) => {
    return val1 || val2;
  };

  return (
    <div
      className="w-[253px] h-[455px] rounded-[35px] border mt-2 overflow-y-scroll relative"
      // style={{ backgroundColor: hexToRGBA(color) }}
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
                  {t("Name")}
                </div>
              )}
              {emailVisible && (
                <div className="mt-[10px] h-[37px] w-[97%] pl-[3%] text-[12px] border border-black rounded-lg flex items-center ">
                  {t("Email")}
                </div>
              )}
              {phoneVisible && (
                <div className="mt-[10px] h-[37px] w-[97%] pl-[3%] text-[12px] border border-black rounded-lg flex items-center ">
                  {t("Phone")}
                </div>
              )}
              {companyVisible && (
                <div className="mt-[10px] h-[37px] w-[97%] pl-[3%] text-[12px] border border-black rounded-lg flex items-center ">
                  {t("Company")}
                </div>
              )}

              {jobVisible && (
                <div className="mt-[10px] h-[37px] w-[97%] pl-[3%] text-[12px] border border-black rounded-lg flex items-center ">
                  {t("Job")}
                </div>
              )}
              {noteVisible && (
                <div className="mt-3 h-[37px] w-[97%] pl-[3%] text-[12px] border border-black rounded-lg flex items-center ">
                  {t("Note")}
                </div>
              )}
              <div className="w-[100%] flex justify-center items-center mt-2">
                <div className="w-[70px] h-[30px] border rounded-full flex justify-center items-center text-xs mr-1">
                  {t("Cancel")}
                </div>
                <div
                  className="w-[70px] h-[30px] border rounded-full flex justify-center items-center text-white text-xs ml-1"
                  style={{ backgroundColor: color ? color : "black" }}
                >
                  {t("Submit")}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="w-[100%] h-[150px] rounded-t-[35px] relative">
        {!logoLock ? (
          <img
            src={logo ? logo : organizationLogo ? organizationLogo : lgoplchldr}
            alt=""
            className="h-[45px] w-[45px] rounded-full absolute bottom-[-20px] left-3 object-cover"
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
                  : organizationProfile
                  ? organizationProfile
                  : prsnPlshldr
              }
              alt=""
              className="h-[82px] w-[82px] rounded-full object-cover"
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
              cover ? cover : organizationCover ? organizationCover : bgplhldr
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
        style={{ color: textColor ? textColor : companyProfile?.textColor }}
      >
        {!nameLock && (
          <h2 className="font-[500] text-[16px] text-center">
            {name ? splitString(name, 23) : companyProfile?.name}
          </h2>
        )}
        {/* <p className="text-[#656363] font-[400] text-[11px] w-[90%] text-center">
          Mern Stack developer at avicenne
        </p> */}

        <p
          className=" font-[400] text-[11px] w-[90%] text-center"
          style={{ color: textColor ? textColor : companyProfile?.textColor }}
        >
          {designation}
        </p>

        {/* {!locationLock && (
          <p
            className=" font-[400] text-[11px] w-[90%] text-center"
            style={{ color: textColor }}
          >
            {address}
          </p>
        )} */}

        {!bioLock && (
          <p
            className="font-[400] text-[11px] w-[90%] text-center"
            style={{ color: textColor ? textColor : companyProfile?.textColor }}
          >
            {bio ? bio : companyProfile?.bio}
          </p>
        )}
      </div>

      <div className="w-[100%] flex flex-col items-center mt-2">
        <div className="w-[65%] flex justify-center gap-3 items-center">
          <div
            className="h-[32px] w-[32px] flex justify-center items-center rounded-full"
            style={{ backgroundColor: color ? color : companyProfile?.color }}
          >
            <i class="fa fa-users text-white"></i>
          </div>
          {!phoneLock && OrReturner(phone, companyProfile?.phone) && (
            <div
              className="h-[32px] w-[32px] flex justify-center items-center rounded-full"
              style={{
                backgroundColor: color ? color : companyProfile?.color,
              }}
            >
              <i class="fa fa-phone text-white"></i>
            </div>
          )}
          {email && (
            <div
              className="h-[32px] w-[32px] flex justify-center items-center rounded-full"
              style={{ backgroundColor: color ? color : companyProfile?.color }}
            >
              <i class="fa fa-envelope text-white"></i>
            </div>
          )}
          {!locationLock && OrReturner(address, companyProfile?.address) && (
            <div
              className="h-[32px] w-[32px] flex justify-center items-center rounded-full"
              style={{
                backgroundColor: color ? color : companyProfile?.color,
                display: locationLock ? "none" : null,
              }}
            >
              <i class="fa fa-map-marker text-white"></i>
            </div>
          )}
        </div>
        <div
          className="w-[65%] h-[36px]  rounded-2xl text-white flex justify-center items-center text-[12px] mt-3"
          style={{ backgroundColor: color ? color : companyProfile?.color }}
        >
          {t("Let's Connect")}
        </div>
        {returnWeblink() && (
          <div
            className="w-[80%] h-[36px]  rounded-2xl  flex  items-center text-[12px] mt-3 relative "
            style={{
              backgroundColor: "#e6e6e6",
              display: !returnWeblink()?.shareable ? "none" : null,
            }}
          >
            <div
              className="h-[42px] w-[42px] rounded-full absolute left-[-10px] flex justify-center items-center "
              style={{ backgroundColor: color ? color : companyProfile?.color }}
            >
              <BsGlobe2 className="text-2xl bg-white rounded-full" />
            </div>
            <p className="text-[11px] w-[65%] absolute left-[37px]">
              {splitString(returnWeblink()?.value, 26)}
            </p>
          </div>
        )}
      </div>

      <div className="w-[100%] flex justify-center mt-3">
        <div className="w-[90%] grid grid-cols-4 ml-6 gap-y-3">
          {links?.map((elm) => {
            return linkInfo?.linkID != elm?.linkID ? (
              <div
                className="w-[35px] h-[50px] flex flex-col items-center"
                style={{
                  display:
                    !elm?.shareable || elm?.linkID === 54 ? "none" : null,
                }}
              >
                <img
                  src={elm?.image ? elm?.image : returnIcons(elm?.linkID)}
                  alt=""
                  className="h-[35px] w-[35px]"
                  style={{ borderRadius: elm?.image ? "8px" : "0px" }}
                />
                <p
                  className="text-[8px] mt-[2px] text-center"
                  style={{
                    color: textColor ? textColor : companyProfile?.textColor,
                  }}
                >
                  {splitString(elm?.name, 15)}
                </p>
              </div>
            ) : (
              <div className="w-[35px] h-[50px] flex flex-col items-center ">
                <img
                  src={
                    linkInfo?.image
                      ? linkInfo?.image
                      : returnIcons(linkInfo?.linkID)
                  }
                  alt=""
                  className=" rounded-lg object-cover min-h-[35px] min-w-[35px] max-h-[35px] max-w-[35px]"
                />
                <p
                  className="text-[8px] mt-[2px] text-center"
                  style={{
                    color: textColor ? textColor : companyProfile?.textColor,
                  }}
                >
                  {splitString(linkInfo?.name, 15)}
                </p>
              </div>
            );
          })}

          {ifAdded === false && (
            <div className="w-[35px] h-[50px] flex flex-col items-center ">
              <img
                src={
                  linkInfo?.image
                    ? linkInfo?.image
                    : returnIcons(linkInfo?.linkID)
                }
                alt=""
                className="min-h-[35px] min-w-[35px] max-h-[35px] max-w-[35px] rounded-lg object-cover"
              />
              <p
                className="text-[8px] mt-[2px] text-center"
                style={{
                  color: textColor ? textColor : companyProfile?.textColor,
                }}
              >
                {splitString(linkInfo?.name, 15)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mobile;
