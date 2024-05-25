import { Box, Modal } from "@mui/material";
import { push, ref, update } from "firebase/database";
import React, { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";

import { BsFillPeopleFill } from "react-icons/bs";
// import { db } from "../../Firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { RxCross2 } from "react-icons/rx";
import { createNewCard } from "../../Services";
import { useTranslation } from "react-i18next";

const CreateNewCard = ({ modal, handleModal, companyProfile }) => {
  const { t } = useTranslation();
  // --------------------------------------------------Create Single self profile----------------------------------

  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    height: 350,
    bgcolor: "white",
    // border: '2px solid #000',
    boxShadow: 24,
    border: "none",
    outline: "none",
    borderRadius: "18px",
    // p: "32px",
  };

  let [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  let callBack = () => {
    setData({
      name: "",
      email: "",
      password: "",
    });
    handleModal();
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
          <div className="w-[100%] h-[100%] flex flex-col justify-evenly items-center">
            <h2 className="text-center font-medium text-lg">
              {t("Create new card")}
            </h2>
            <div className="w-[90%] h-[80%] flex flex-col justify-around">
              <input
                type="text"
                className="w-[100%] h-[45px] outline-none bg-[#F2F2F2] rounded-[36px] p-[10px] placeholder:text-xs"
                placeholder={`${t("Name")}*`}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                value={data?.name}
              />

              <input
                type="text"
                className="w-[100%] h-[45px] outline-none bg-[#F2F2F2] rounded-[36px] p-[10px] placeholder:text-xs"
                placeholder={`${t("Email")}*`}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                value={data?.email}
              />

              <input
                type="text"
                className="w-[100%] h-[45px] outline-none bg-[#F2F2F2] rounded-[36px] p-[10px] placeholder:text-xs"
                placeholder={`${t("Password")}*`}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                value={data?.password}
              />
              <div className="w-[100%] h-[45px] flex justify-evenly items-center">
                <button
                  className="w-[45%] h-[45px] outline-none bg-[black] rounded-[36px] p-[10px] placeholder:text-xs text-[white]"
                  onClick={() =>
                    createNewCard(
                      data,
                      callBack,
                      Object.values(companyProfile)?.[0]
                    )
                  }
                >
                  {t("Create")}
                </button>
                <button
                  className="w-[45%] h-[45px] outline-none bg-[black] rounded-[36px] p-[10px] placeholder:text-xs text-[white]"
                  onClick={() => handleModal()}
                >
                  {t("Cancel")}
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default CreateNewCard;
