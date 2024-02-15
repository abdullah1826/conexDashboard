import React from "react";
import bg from "../imgs/bg.jpg";
// import prfl from "../imgs/nlogo.jpeg";
import primg from "../imgs/nlogo.jpg";
import { FaBriefcase } from "react-icons/fa6";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { CiLock } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { FiShare2 } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import bgplhldr from "../imgs/bgplhldr.png";
import prsnPlshldr from "../imgs/prsnPlshldr.png";
import lgoplchldr from "../imgs/lgoplchldr.jpg";

const MemberCard = ({ profile }) => {
  let navigate = useNavigate();
  var screen = window.innerWidth;
  return (
    <div className="sm:w-[265px] w-[100%] sm:h-[290px] h-[300px]  rounded-3xl mt-[20px] bg-[white] ">
      <div className="rounded-t-3xl h-[154px]  w-[100%] relative ">
        <img
          src={profile?.logoUrl ? profile?.logoUrl : lgoplchldr}
          alt="prfl"
          className="h-[42px] w-[42px] rounded-full absolute bottom-[10px] left-[18px]  object-cover "
          style={{ zIndex: "1" }}
        />
        <div className="h-[85px] w-[85px] absolute bottom-[0px] left-[90px]">
          <div className="h-[85px] w-[85px] relative">
            <img
              src={profile?.profileUrl ? profile?.profileUrl : prsnPlshldr}
              alt="prfl"
              className="h-[85px] w-[85px] rounded-full object-cover"
            />
          </div>
        </div>
        <img
          src={profile?.coverUrl ? profile?.coverUrl : bgplhldr}
          alt="bg"
          className="h-[124px] w-[100%] object-cover rounded-t-3xl"
        />
      </div>

      <div className="w-[100%] flex justify-center   mt-3">
        <div className="w-[90%] flex justify-between">
          <div className="h-[114px] w-[48%]  rounded-[7px] bg-[#FBFBFB] flex justify-center items-center">
            <div className="h-[85%] w-[86%]">
              <h2 className="font-[500] text-[12px]">{profile?.name}</h2>
              <div className="flex mt-1">
                <FaBriefcase className="text-xs text-black" />
                <p
                  className="font-[500] sm:text-[9px] text-[11px] ml-[4px] text-[#3D3C3C]"
                  style={screen <= 450 ? { marginTop: "-1px" } : null}
                >
                  {profile?.title}
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
                <div className="h-[53px] w-[46%] bg-[#FBFBFB] rounded-[6px] flex flex-col justify-center items-center">
                  <CiLock className="text-[#3D3C3C] sm:text-[16px] text-[21px]" />
                  <p className="font-[500] sm:text-[9px] text-[12px] text-[#3D3C3C]">
                    Lock
                  </p>
                </div>
                <div
                  className="h-[53px] w-[46%] bg-[#FBFBFB] rounded-[6px] flex flex-col justify-center items-center cursor-pointer"
                  onClick={() => navigate(`/edit/${profile?.id}`)}
                >
                  <FiEdit className="text-[#3D3C3C] sm:text-[14px] text-[17px]" />
                  <p className="font-[500] sm:text-[9px] text-[12px] text-[#3D3C3C] mt-1">
                    Edit
                  </p>
                </div>
              </div>

              <div className="w-[100%] flex justify-between">
                <div className="h-[53px] w-[46%] bg-[#FBFBFB] rounded-[6px] flex flex-col justify-center items-center">
                  <FiShare2 className="text-[#3D3C3C] sm:text-[16px] text-[21px]" />
                  <p className="font-[500] sm:text-[9px] text-[12px] text-[#3D3C3C]">
                    Share
                  </p>
                </div>
                <div className="h-[53px] w-[46%] bg-[#FBFBFB] rounded-[6px] flex flex-col justify-center items-center">
                  <IoTrashOutline className="text-[#3D3C3C] sm:text-[16px] text-[21px]" />
                  <p className="font-[500] sm:text-[9px] text-[12px] text-[#3D3C3C]">
                    Delete
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
