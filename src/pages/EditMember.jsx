import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { SlArrowLeft } from "react-icons/sl";
import prfl from "../imgs/prfl.jpeg";
import { useNavigate, useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import { BsQrCode } from "react-icons/bs";
import { FaFilter } from "react-icons/fa";
import { FormControlLabel, Switch } from "@mui/material";
import styled from "@emotion/styled";
import About from "../components/EditComponents/About";
import MobileContainer from "../components/EditComponents/MobileContainer";
import Content from "../components/EditComponents/Content";
import Qr from "../components/EditComponents/Qr";
import Lead from "../components/EditComponents/Lead";
import { RiShareFill } from "react-icons/ri";
import { getSingleChild } from "../Services";
import {
  setName,
  setEmail,
  setColor,
  setPhone,
  setCoverUrl,
  setProfileurl,
  setDesignation,
  setAddress,
  setBio,
  setLinks,
  setDirect,
  setQrLogo,
  setQrColor,
  setFormHeader,
  setNameVisible,
  setEmailVisible,
  setPhoneVisible,
  setJobVisible,
  setCompanyVisible,
  setNoteVisible,
  setLead,
  setPoweredVizz,
  setTextColor,
  setbtnColor,
  setlinkColor,
  setlinkBgColor,
  setShareBtnColor,
  setLogoUrl,
  setDirectMode,
  setProfilePictureLock,
  setlogoLock,
  setcoverLock,
  setnameLock,
  setphoneLock,
  setbioLock,
  setlocationLock,
} from "../redux/profileInfoSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import prsnPlshldr from "../imgs/prsnPlshldr.png";

const EditMember = () => {
  let navigate = useNavigate();
  let { uid } = useParams();
  let dispatch = useDispatch();
  console.log(uid);
  let [singleProfile, setsingleProfile] = useState({});
  let [route, setroute] = useState({
    isAbout: true,
    isContent: false,
    isQr: false,
    isLead: false,
  });

  let handleRoute = (route) => {
    if (route === "about") {
      setroute({
        isAbout: true,
        isContent: false,
        isQr: false,
        isLead: false,
      });
    } else if (route === "content") {
      setroute({
        isAbout: false,
        isContent: true,
        isQr: false,
        isLead: false,
      });
    } else if (route === "qr") {
      setroute({
        isAbout: false,
        isContent: false,
        isQr: true,
        isLead: false,
      });
    } else if (route === "lead") {
      setroute({
        isAbout: false,
        isContent: false,
        isQr: false,
        isLead: true,
      });
    }
  };
  var screen = window.innerWidth;
  useEffect(() => {
    getSingleChild(uid, setsingleProfile);
  }, []);

  console.log(singleProfile[uid]);
  const name = useSelector((state) => state.profileInfoSlice.name);
  const profile = useSelector((state) => state.profileInfoSlice.profileUrl);
  useEffect(() => {
    dispatch(setName(singleProfile[uid]?.name));
    dispatch(setEmail(singleProfile[uid]?.email));
    dispatch(setColor(singleProfile[uid]?.color));
    dispatch(setTextColor(singleProfile[uid]?.textColor));
    dispatch(setPhone(singleProfile[uid]?.phone));
    dispatch(setCoverUrl(singleProfile[uid]?.coverUrl));
    dispatch(setProfileurl(singleProfile[uid]?.profileUrl));
    dispatch(setLogoUrl(singleProfile[uid]?.logoUrl));
    dispatch(setDesignation(singleProfile[uid]?.job));
    dispatch(setAddress(singleProfile[uid]?.address));
    dispatch(setBio(singleProfile[uid]?.bio));
    dispatch(setProfilePictureLock(singleProfile[uid]?.profilePictureLock));
    dispatch(setlogoLock(singleProfile[uid]?.logoLock));
    dispatch(setcoverLock(singleProfile[uid]?.coverLock));
    dispatch(setnameLock(singleProfile[uid]?.nameLock));
    dispatch(setphoneLock(singleProfile[uid]?.phoneLock));
    dispatch(setbioLock(singleProfile[uid]?.bioLock));
    dispatch(setlocationLock(singleProfile[uid]?.locationLock));
    if (typeof singleProfile[uid]?.links === "object") {
      dispatch(setLinks(Object.values(singleProfile[uid]?.links)));
    }

    dispatch(
      setDirect({
        name: singleProfile[uid]?.direct?.name,
        value: singleProfile[uid]?.direct?.value,
        linkID: singleProfile[uid]?.direct?.linkID,
      })
    );
    dispatch(setDirectMode(singleProfile?.[uid]?.directMode));
    dispatch(setQrLogo(singleProfile?.[uid]?.qrLogoUrl));
    dispatch(setQrColor(singleProfile?.[uid]?.qrColor));
    dispatch(setLead(singleProfile?.[uid]?.leadMode));
    dispatch(setFormHeader(singleProfile?.[uid]?.formHeader));
    dispatch(setNameVisible(singleProfile?.[uid]?.leadForm?.Fname));
    dispatch(setEmailVisible(singleProfile?.[uid]?.leadForm?.email));
    dispatch(setPhoneVisible(singleProfile?.[uid]?.leadForm?.phone));
    dispatch(setJobVisible(singleProfile?.[uid]?.leadForm?.job));
    dispatch(setCompanyVisible(singleProfile?.[uid]?.leadForm?.company));
    dispatch(setNoteVisible(singleProfile?.[uid]?.leadForm?.note));
    // dispatch(setPoweredVizz(singleProfile?.data?.poweredVizz));
    // dispatch(setTextColor(singleProfile?.data?.textColor));
    // dispatch(setbtnColor(singleProfile?.data?.saveBtnColor));
    // dispatch(setShareBtnColor(singleProfile?.data?.shareBtnColor));
    // dispatch(setlinkColor(singleProfile?.data?.linkColor));
    // dispatch(setlinkBgColor(singleProfile?.data?.linkBgColor));
  }, [singleProfile[uid]]);

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

  useEffect(() => {
    dispatch(
      setProfilePictureLock(companyProfile?.[companyId]?.profilePictureLock)
    );
    dispatch(setlogoLock(companyProfile?.[companyId]?.logoLock));
    dispatch(setcoverLock(companyProfile?.[companyId]?.coverLock));
    dispatch(setnameLock(companyProfile?.[companyId]?.nameLock));
    dispatch(setphoneLock(companyProfile?.[companyId]?.phoneLock));
    dispatch(setbioLock(companyProfile?.[companyId]?.bioLock));
  }, [companyProfile?.[companyId]]);

  let handleCancelQr = () => {
    dispatch(setQrColor(singleProfile?.[uid]?.qrColor));
    dispatch(setQrLogo(singleProfile?.[uid]?.qrLogoUrl));
  };
  return (
    <div
      className="w-[100%] flex bg-[#F8F8F8] h-[100vh] max-h-[100vh]"
      style={screen <= 450 ? { justifyContent: "center" } : null}
    >
      {screen >= 450 ? <Sidebar /> : null}
      <div className="sm:w-[80%] w-[90%] flex justify-center overflow-y-scroll">
        <div className="sm:w-[90%] w-[100%] ">
          <div className="w-[100%] flex justify-between   mt-[30px]  items-center">
            <div className="sm:w-[27%] w-[70%] h-[65px] flex justify-evenly items-center">
              <SlArrowLeft
                className="text-2xl cursor-pointer"
                onClick={() => navigate("/home")}
              />
              <div className="bg-[#B1AEAE] h-[20px] w-[2px]"></div>
              <img
                src={profile ? profile : prsnPlshldr}
                alt=""
                className="sm:h-[65px] sm:w-[65px] h-[55px] w-[55px] rounded-full object-cover"
              />
              <p className="font-[600] text-[16px]">{name}</p>
            </div>

            <div
              className="w-[20%] h-[47px]  flex justify-center
            "
            >
              <div
                className="sm:h-[47px] h-[30px] w-[149px] bg-[white] rounded-[36px] cursor-pointer flex items-center shadow-xl  justify-center"
                style={screen <= 450 ? { marginTop: "8px" } : null}
              >
                <p className="sm:text-[17px] text-[12px] ">share</p>
                {"\u00A0"}{" "}
                <RiShareFill
                  style={screen <= 450 ? { fontSize: "12px" } : null}
                />
              </div>
            </div>
          </div>
          <div className="w-[100%] h-[590px] mt-5 flex flex-col items-center">
            {screen <= 450 ? (
              <div className="sm:w-[70%] w-[100%] h-[70px] sm:mb-[0px] mb-[15px]  sm:rounded-t-[35px] sm:rounded-[0px] rounded-[44px] bg-white flex justify-center items-center ">
                <div className="sm:w-[70%] w-[92%] h-[45px] sm:mb-[0px]   sm:rounded-t-[35px] sm:rounded-[0px] rounded-[44px] bg-white flex">
                  <div
                    className="w-[25%] h-[100%]  sm:rounded-tl-[35px] sm:rounded-[0px] rounded-[44px]  sm:border-r cursor-pointer hover:bg-black hover:text-white flex justify-center items-center"
                    onClick={() => handleRoute("about")}
                  >
                    <FaUser className="text-[16px] ml-2 " />
                    <p className="font-[600] sm:text-[16px] text-[10px] ml-1">
                      {" "}
                      {screen <= 450 && route?.isAbout === true
                        ? "About"
                        : null}
                      {screen >= 450 ? "About" : null}
                    </p>
                  </div>

                  <div
                    className="w-[25%] h-[100%]  sm:rounded-[0px] rounded-[44px]   sm:border-r cursor-pointer hover:bg-black flex items-center justify-center hover:text-white text-black"
                    onClick={() => handleRoute("content")}
                  >
                    <IoMdMenu className="text-[16px] ml-2 " />
                    <p className="font-[600] sm:text-[16px] text-[10px] ml-1">
                      {screen <= 450 && route?.isContent === true
                        ? "Content"
                        : null}
                      {screen >= 450 ? "Content" : null}
                    </p>
                  </div>
                  <div
                    className="w-[25%] h-[100%]   sm:rounded-[0px] rounded-[44px]   sm:border-r cursor-pointer hover:bg-black flex items-center justify-center hover:text-white text-black"
                    onClick={() => handleRoute("qr")}
                  >
                    <BsQrCode className="text-[16px] ml-2 " />
                    <p className="font-[600] sm:text-[16px] text-[10px] ml-1">
                      {screen <= 450 && route?.isQr === true ? "Qr Code" : null}
                      {screen >= 450 ? "Qr Code" : null}
                    </p>
                  </div>
                  <div
                    className="w-[25%] h-[100%]  sm:rounded-tr-[35px] sm:rounded-[0px] rounded-[44px] cursor-pointer hover:bg-black flex items-center justify-center hover:text-white text-black"
                    onClick={() => handleRoute("lead")}
                  >
                    <FaFilter className="text-[16px] ml-2 " />
                    <p className="font-[600] sm:text-[16px] text-[10px] ml-1">
                      {screen <= 450 && route?.isLead === true ? "Leads" : null}
                      {screen >= 450 ? "Leads" : null}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
            {screen >= 450 ? (
              <div className="sm:w-[70%] w-[98%] h-[55px] sm:mb-[0px]   sm:rounded-t-[35px] sm:rounded-[0px] rounded-[44px] bg-white flex">
                <div
                  className="w-[25%] h-[100%]  sm:rounded-tl-[35px] sm:rounded-[0px] rounded-[44px]  sm:border-r cursor-pointer hover:bg-black hover:text-white flex justify-center items-center"
                  onClick={() => handleRoute("about")}
                  style={
                    route?.isAbout
                      ? { backgroundColor: "black", color: "white" }
                      : null
                  }
                >
                  <FaUser className="text-[16px] ml-2 " />
                  <p className="font-[600] sm:text-[16px] text-[10px] ml-1">
                    {" "}
                    {screen <= 450 && route?.isAbout === true ? "About" : null}
                    {screen >= 450 ? "About" : null}
                  </p>
                </div>

                <div
                  className="w-[25%] h-[100%]  sm:rounded-[0px] rounded-[44px]   sm:border-r cursor-pointer hover:bg-black flex items-center justify-center hover:text-white text-black"
                  onClick={() => handleRoute("content")}
                  style={
                    route?.isContent
                      ? { backgroundColor: "black", color: "white" }
                      : null
                  }
                >
                  <IoMdMenu className="text-[16px] ml-2 " />
                  <p className="font-[600] sm:text-[16px] text-[10px] ml-1">
                    {screen <= 450 && route?.isContent === true
                      ? "Content"
                      : null}
                    {screen >= 450 ? "Content" : null}
                  </p>
                </div>
                <div
                  className="w-[25%] h-[100%]   sm:rounded-[0px] rounded-[44px]   sm:border-r cursor-pointer hover:bg-black flex items-center justify-center hover:text-white text-black"
                  onClick={() => handleRoute("qr")}
                  style={
                    route?.isQr
                      ? { backgroundColor: "black", color: "white" }
                      : null
                  }
                >
                  <BsQrCode className="text-[16px] ml-2 " />
                  <p className="font-[600] sm:text-[16px] text-[10px] ml-1">
                    {screen <= 450 && route?.isQr === true ? "Qr Code" : null}
                    {screen >= 450 ? "Qr Code" : null}
                  </p>
                </div>
                <div
                  className="w-[25%] h-[100%]  sm:rounded-tr-[35px] sm:rounded-[0px] rounded-[44px] cursor-pointer hover:bg-black flex items-center justify-center hover:text-white text-black"
                  onClick={() => handleRoute("lead")}
                  style={
                    route?.isLead
                      ? { backgroundColor: "black", color: "white" }
                      : null
                  }
                >
                  <FaFilter className="text-[16px] ml-2 " />
                  <p className="font-[600] sm:text-[16px] text-[10px] ml-1">
                    {screen <= 450 && route?.isLead === true ? "Leads" : null}
                    {screen >= 450 ? "Leads" : null}
                  </p>
                </div>
              </div>
            ) : null}
            <div className="w-[100%] h-[535px]  rounded-[35px] shadow-xl bg-white flex">
              <div className="sm:w-[70%] w-[100%] h-[100%]  flex justify-center items-center">
                {route?.isAbout === true && <About uid={uid} />}
                {route?.isContent === true && <Content uid={uid} />}
                {route?.isQr === true && (
                  <Qr uid={uid} handleCancelQr={handleCancelQr} />
                )}
                {route?.isLead === true && <Lead uid={uid} />}
              </div>
              {screen >= 450 ? (
                <div className="w-[30%] h-[100%] border-l">
                  <MobileContainer />
                </div>
              ) : null}
            </div>
          </div>
          <br />
        </div>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        theme="colored"
        hideProgressBar
      />
    </div>
  );
};

export default EditMember;
