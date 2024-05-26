import React, { useState } from "react";
import bg from "../imgs/bg.jpg";
// import prfl from "../imgs/nlogo.jpeg";
import primg from "../imgs/nlogo.jpg";
import { FaBriefcase } from "react-icons/fa6";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { CiLock, CiUnlock } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { FiShare2 } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import bgplhldr from "../imgs/bgplhldr.png";
import prsnPlshldr from "../imgs/prsnPlshldr.png";
import lgoplchldr from "../imgs/lgoplchldr.jpg";
import { changeProfileStatus, deleteSingleChild } from "../Services";
import ShareCardModal from "./Modals/ShareCardModal";
import DeleteModal from "./Modals/DeleteModal";
import { useTranslation } from "react-i18next";

const MemberCard = ({ profile, companyProfile }) => {
  let navigate = useNavigate();
  var screen = window.innerWidth;
  let [shareModal, setshareModal] = useState(false);
  let [userId, setuserId] = useState("");
  let handleShareModal = () => {
    setshareModal(!shareModal);
  };

  let [deleteModal, setdeleteModal] = useState(false);
  let handledeleteModal = () => {
    setdeleteModal(!deleteModal);
  };
  let conexParent = localStorage.getItem("conexParent");
  const { t } = useTranslation();
  return (
    <div className="sm:w-[265px] w-[100%] sm:h-[290px] h-[300px]  rounded-3xl mt-[20px] bg-[white]">
      <ShareCardModal
        shareModal={shareModal}
        handleShareModal={handleShareModal}
        userId={userId}
      />
      <DeleteModal
        deleteModal={deleteModal}
        handledeleteModal={handledeleteModal}
        text={t("Are you sure to delete this profile?")}
        func={() => deleteSingleChild(userId)}
      />
      <div className="rounded-t-3xl h-[154px]  w-[100%] relative ">
        <img
          src={
            profile?.logoUrl
              ? profile?.logoUrl
              : companyProfile?.logoUrl
              ? companyProfile?.logoUrl
              : lgoplchldr
          }
          alt="prfl"
          className="h-[42px] w-[42px] rounded-full absolute bottom-[10px] left-[18px]  object-cover "
          style={{ zIndex: "1" }}
        />
        <div className="h-[85px] w-[85px] absolute bottom-[0px] left-[90px]">
          <div className="h-[85px] w-[85px] relative">
            <img
              src={
                profile?.profileUrl
                  ? profile?.profileUrl
                  : companyProfile?.profileUrl
                  ? companyProfile?.profileUrl
                  : prsnPlshldr
              }
              alt="prfl"
              className="h-[85px] w-[85px] rounded-full object-cover"
            />
          </div>
        </div>
        <img
          src={
            profile?.coverUrl
              ? profile?.coverUrl
              : companyProfile?.coverUrl
              ? companyProfile?.coverUrl
              : bgplhldr
          }
          alt="bg"
          className="h-[124px] w-[100%] object-cover rounded-t-3xl"
        />
      </div>

      <div className="w-[100%] flex justify-center   mt-3">
        <div className="w-[90%] flex justify-between">
          <div className="h-[114px] w-[48%]  rounded-[7px] bg-[#FBFBFB] flex justify-center items-center">
            <div className="h-[85%] w-[86%]">
              <h2 className="font-[500] text-[12px] line-clamp-2 w-[99%]">
                {profile?.name}
              </h2>
              <div className="flex mt-1">
                <FaBriefcase className="text-xs text-black" />
                <p
                  className="font-[500] sm:text-[9px] text-[11px] ml-[4px] text-[#3D3C3C]"
                  style={screen <= 450 ? { marginTop: "-1px" } : null}
                >
                  {profile?.job}
                </p>
              </div>
              <div className="flex mt-[5px]">
                <div className="w-[15%]">
                  <BsFillInfoSquareFill className="text-xs text-black" />
                </div>

                <div
                  className="font-[500] sm:text-[9px] text-[10px] sm:ml-[4px] ml-[0px] text-[#3D3C3C] w-[100%] overflow-hidden"
                  style={screen <= 450 ? { marginTop: "-2px" } : null}
                >
                  <div className="line-clamp-3">{profile?.bio}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[114px] w-[48%]  flex justify-center items-center">
            <div className="h-[100%] w-[90%] flex flex-col justify-between">
              <div className="w-[100%] flex justify-between">
                <div
                  className="h-[53px] w-[46%] bg-[#FBFBFB] rounded-[6px] flex flex-col justify-center items-center cursor-pointer"
                  onClick={() =>
                    changeProfileStatus(profile?.profileOn, profile?.id)
                  }
                >
                  {profile?.profileOn === 1 ? (
                    <CiLock className="text-[#3D3C3C] sm:text-[16px] text-[21px]" />
                  ) : (
                    <CiUnlock className="text-[#3D3C3C] sm:text-[16px] text-[21px]" />
                  )}

                  <p className="font-[500] sm:text-[9px] text-[12px] text-[#3D3C3C]">
                    {profile?.profileOn === 1 ? t("Lock") : t("Un Lock")}
                  </p>
                </div>

                {conexParent != "superAdmin2" ? (
                  <div
                    className="h-[53px] w-[46%] bg-[#FBFBFB] rounded-[6px] flex flex-col justify-center items-center cursor-pointer"
                    onClick={() => navigate(`/edit/${profile?.id}`)}
                  >
                    <FiEdit className="text-[#3D3C3C] sm:text-[14px] text-[17px]" />
                    <p className="font-[500] sm:text-[9px] text-[12px] text-[#3D3C3C] mt-1">
                      {t("Edit")}
                    </p>
                  </div>
                ) : (
                  <div
                    className="h-[53px] w-[46%] bg-[#FBFBFB] rounded-[6px] flex flex-col justify-center items-center"
                    onClick={() => {
                      handleShareModal(), setuserId(profile?.id);
                    }}
                  >
                    <FiShare2 className="text-[#3D3C3C] sm:text-[16px] text-[21px]" />
                    <p className="font-[500] sm:text-[9px] text-[12px] text-[#3D3C3C]">
                      {t("Share")}
                    </p>
                  </div>
                )}
              </div>

              <div className="w-[100%] flex justify-between">
                {conexParent != "superAdmin2" ? (
                  <div
                    className="h-[53px] w-[46%] bg-[#FBFBFB] rounded-[6px] flex flex-col justify-center items-center"
                    onClick={() => {
                      handleShareModal(), setuserId(profile?.id);
                    }}
                  >
                    <FiShare2 className="text-[#3D3C3C] sm:text-[16px] text-[21px]" />
                    <p className="font-[500] sm:text-[9px] text-[12px] text-[#3D3C3C]">
                      {t("Share")}
                    </p>
                  </div>
                ) : (
                  <div
                    className="h-[53px] w-[46%] bg-[#FBFBFB] rounded-[6px] flex flex-col justify-center items-center cursor-pointer"
                    onClick={() => {
                      handledeleteModal(), setuserId(profile?.id);
                    }}
                  >
                    <IoTrashOutline className="text-[#3D3C3C] sm:text-[16px] text-[21px]" />
                    <p className="font-[500] sm:text-[9px] text-[12px] text-[#3D3C3C]">
                      {t("Delete")}
                    </p>
                  </div>
                )}

                {conexParent != "superAdmin2" && (
                  <div
                    className="h-[53px] w-[46%] bg-[#FBFBFB] rounded-[6px] flex flex-col justify-center items-center cursor-pointer"
                    onClick={() => {
                      handledeleteModal(), setuserId(profile?.id);
                    }}
                  >
                    <IoTrashOutline className="text-[#3D3C3C] sm:text-[16px] text-[21px]" />
                    <p className="font-[500] sm:text-[9px] text-[12px] text-[#3D3C3C]">
                      {t("Delete")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
