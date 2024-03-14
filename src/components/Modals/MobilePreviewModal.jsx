import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { RxCross2 } from "react-icons/rx";
import Mobile from "../Mobile";

const MobilePreviewModal = ({ modal, handleModal }) => {
  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    height: 500,
    bgcolor: "white",
    // border: '2px solid #000',
    boxShadow: 24,
    border: "none",
    outline: "none",
    borderRadius: "18px",
    // backgroundColor: "white",
    // p: "32px",
  };

  return (
    <div>
      <Modal
        open={modal}
        onClose={() => handleModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <div className="h-[100%] w-[100%] ">
            <div className="w-[100%] flex justify-end h-[5%]">
              <RxCross2
                onClick={() => handleModal()}
                className="mr-[5px] mt-1 text-xl cursor-pointer"
              />
            </div>
            <div className="h-[95%] w-[100%] flex justify-center items-center">
              <Mobile />
            </div>
          </div>
        </Box>
      </Modal>
      {/* <ToastContainer position="top-center" autoClose={2000} /> */}
    </div>
  );
};

export default MobilePreviewModal;
