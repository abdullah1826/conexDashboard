import React, { useState } from "react";
import { MdDragIndicator } from "react-icons/md";
import Linkedin from "../../imgs/Linkedin.png";
import { IoMdAdd } from "react-icons/io";
import SocialLinkModal from "../Modals/SocialLinkModal";
import { useSelector } from "react-redux";
import { returnIcons } from "../../assets/ReturnSocialIcons";
import { renoveLink } from "../../Services";

const AccountLinks = ({ uid }) => {
  let [modal, setmodal] = useState(false);
  let handleModal = () => {
    setmodal(!modal);
  };
  const links = useSelector((state) => state.profileInfoSlice.links);
  return (
    <div className="h-[400px] w-[100%]  mt-7 flex flex-col  relative">
      <SocialLinkModal modal={modal} handleClose={handleModal} uid={uid} />
      {links?.map((elm) => {
        return (
          <div className="sm:w-[70%] w-[100%] h-[57px] bg-white rounded-[36px] shadow-lg flex justify-center items-center mt-4">
            <div className="w-[95%] h-[80%] flex justify-between">
              <div className="w-[129px] flex items-center ">
                <MdDragIndicator className="text-[#E1E1E1] text-xl" />
                <div className="w-[30px]">
                  <img
                    src={returnIcons(elm?.linkID)}
                    alt=""
                    className="h-[29px]  w-[29px]"
                  />
                </div>

                <p className="font-[600] text-[14px] ml-2">{elm?.name}</p>
              </div>
              <div className="w-[155px] flex items-center justify-between">
                <div
                  className="w-[74px] h-[30px] rounded-[36px] shadow-lg font-[600] text-[8px] flex justify-center items-center cursor-pointer border"
                  onClick={() =>
                    renoveLink(
                      {
                        image: "",
                        linkID: elm?.linkID,
                        name: elm?.name,
                        value: elm?.value,
                        shareable: elm?.shareable,
                      },
                      uid,
                      links,
                      () => {}
                    )
                  }
                >
                  Remove Link
                </div>
                <div className="w-[74px] h-[30px] rounded-[36px] shadow-lg bg-black text-white font-[600] text-[8px] flex justify-center items-center cursor-pointer border">
                  Open Link
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div
        className="sm:w-[70%] w-[100%] h-[57px] bg-white rounded-[36px] shadow-lg flex justify-center items-center  absolute bottom-2"
        onClick={() => handleModal()}
      >
        <IoMdAdd className="text-[#878787] " />
        <p className="text-[12px] font-[500] text-[#878787] ml-[2px]">
          Add Links and Contacts
        </p>
      </div>
    </div>
  );
};

export default AccountLinks;
