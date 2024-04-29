import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
// import { db } from "../../Firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { RxCross2 } from "react-icons/rx";
import { deleteContact } from "../../Services";

const DeleteModal = ({ deleteModal, handledeleteModal, text, func }) => {
  // --------------------------------------------------Create Single self profile----------------------------------

  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    height: 130,
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
        open={deleteModal}
        onClose={() => handledeleteModal()}
        aria-labelledby="deleteModal-deleteModal-title"
        aria-describedby="deleteModal-deleteModal-description"
      >
        <Box sx={style2}>
          <div className="h-[100%] w-[100%]">
            <p className="text-center font-[500] mt-[30px]">{text}</p>
            <div className="w-[100%] flex justify-center items-center mt-2">
              <div
                className="h-[30px] w-[70px] rounded-full border flex justify-center items-center text-sm mr-[5px] cursor-pointer"
                onClick={() => handledeleteModal()}
              >
                Cancel
              </div>
              <div
                className="h-[30px] w-[70px] rounded-full border flex justify-center items-center text-sm ml-[5px] bg-black text-white cursor-pointer"
                onClick={() => {
                  func(), handledeleteModal();
                }}
              >
                Sure
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      {/* <ToastContainer position="top-center" autoClose={2000} /> */}
    </div>
  );
};

export default DeleteModal;
