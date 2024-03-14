import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { RxCross2 } from "react-icons/rx";
import SelectSearch from "react-select-search";
import { BiSearchAlt } from "react-icons/bi";
import prsnPlshldr from "../../imgs/prsnPlshldr.png";
import Checkbox from "@mui/material/Checkbox";
import { addTeamMember, getAllChilds, getAllTeamMembers } from "../../Services";
import bgplhldr from "../../imgs/bgplhldr.png";
import { MdOutlineCancel, MdOutlineMail } from "react-icons/md";

import { FaExchangeAlt } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { IoBriefcaseOutline } from "react-icons/io5";
import csv from "../../imgs/csv.png";
import zap from "../../imgs/zap.png";
import { TfiDownload } from "react-icons/tfi";
import { FaRegMessage } from "react-icons/fa6";

const SingleLeadModal = ({ leadModal, handleLeadModal, singleLead }) => {
  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 530,
    bgcolor: "white",
    // border: '2px solid #000',
    boxShadow: 24,
    border: "none",
    outline: "none",
    borderRadius: "18px",
    // p: "32px",
  };

  return (
    <div>
      <Modal
        open={leadModal}
        onClose={() => handleLeadModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <div className="h-[100%] w-[100%]">
            <div className="w-[99%] flex justify-end mt-1">
              <MdOutlineCancel
                className="text-2xl cursor-pointer"
                onClick={() => handleLeadModal()}
              />
            </div>
            <div className="w-[100%] flex justify-center mt-[10px]">
              <div className="w-[75%] flex justify-between items-center">
                <img
                  src={prsnPlshldr}
                  alt=""
                  className="h-[130px] w-[130px] rounded-full"
                />

                <FaExchangeAlt className="text-[45px]" />

                <img
                  src={prsnPlshldr}
                  alt=""
                  className="h-[130px] w-[130px] rounded-full"
                />
              </div>
            </div>

            <div className="w-[100%] flex justify-center mt-[40px]">
              <div className="w-[70%] flex justify-between ">
                <div className=" w-[40%]">
                  <h2 className="font-[400] text-[24px]">{singleLead?.name}</h2>
                  <div className="flex items-center mt-4">
                    <div className="flex justify-center items-center h-[32px] w-[32px] rounded-full bg-[#F3F3F3]">
                      <MdOutlineMail />
                    </div>
                    <p className="text-[#818181] text-[12px] font-[400] ml-2">
                      {singleLead?.email}
                    </p>
                  </div>

                  <div className="flex items-center mt-4">
                    <div className="flex justify-center items-center h-[32px] w-[32px] rounded-full bg-[#F3F3F3]">
                      <IoBriefcaseOutline />
                    </div>
                    <p className="text-[#818181] text-[12px] font-[400] ml-2">
                      {singleLead?.job}
                    </p>
                  </div>

                  <div className="flex items-center mt-4">
                    <div className="flex justify-center items-center h-[32px] w-[32px] rounded-full bg-[#F3F3F3]">
                      <FiPhone />
                    </div>
                    <p className="text-[#818181] text-[12px] font-[400] ml-2">
                      {singleLead?.phone}
                    </p>
                  </div>

                  <div className="flex  mt-4 w-[100%] h-[100px]">
                    <div className="w-[15%]">
                      <div className="flex justify-center items-center h-[32px] w-[32px] rounded-full bg-[#F3F3F3]">
                        <FaRegMessage />
                      </div>
                    </div>
                    <div className="w-[80%]">
                      <p className="text-[#818181] text-[12px] font-[400] ml-2">
                        {singleLead?.message} skdksjdks ldklskdl lklk lklklkl
                        ;lklklkl lkl lklklk lk;klklk lklk kaj lklklknlk lklk
                      </p>
                    </div>
                  </div>
                </div>
                <div className=" w-[40%]">
                  <div className="w-[100%] flex justify-center">
                    <h2 className="font-[400] text-[18px]">Export as</h2>
                  </div>
                  <div className="h-[113px] rounded-[18px] border shadow-lg mt-2 flex justify-center flex-col items-center cursor-pointer">
                    <img src={zap} alt="" className="h-[35px] w-[35px]" />
                    <div className="flex text-[14px] font-[500] mt-1">
                      Zapier File <TfiDownload className="text-lg ml-1" />
                    </div>
                  </div>

                  <div className="h-[113px] rounded-[18px] border shadow-lg mt-2 flex justify-center flex-col items-center cursor-pointer">
                    <img src={csv} alt="" className="h-[35px] w-[35px]" />
                    <div className="flex text-[14px] font-[500] mt-1">
                      Csv File <TfiDownload className="text-lg ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SingleLeadModal;
