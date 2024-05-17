import { Box, Modal } from "@mui/material";
import { push, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import team1 from "../../imgs/team1.png";
import { BsFillPeopleFill } from "react-icons/bs";
// import { db } from "../../Firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { RxCross2 } from "react-icons/rx";
import { createNewCard, createTeam, updateTeam } from "../../Services";
import { GrAddCircle } from "react-icons/gr";
import Cropper from "../Cropper";
import bgplhldr from "../../imgs/bgplhldr.png";
import { useTranslation } from "react-i18next";

const CreateNewTeam = ({ modal, handleModal, singleTeam }) => {
  // --------------------------------------------------Create Single self profile----------------------------------
  const { t } = useTranslation();
  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 350,
    bgcolor: "white",
    // border: '2px solid #000',
    boxShadow: 24,
    border: "none",
    outline: "none",
    borderRadius: "18px",
    // p: "32px",
  };
  const [apiWorking, setapiWorking] = useState(false);

  let [imgKey, setImgKey] = useState(0);
  console.log(singleTeam);

  let [data, setData] = useState({
    name: "",
    img: "",
  });

  useEffect(() => {
    if (singleTeam) {
      setData({ name: singleTeam?.teamName, img: singleTeam?.image });
    }
  }, [singleTeam]);

  let getImg = (value) => {
    setData({ ...data, img: value });
  };

  let callBack = () => {
    handleModal();
  };

  // ----------------------------------------------------State setup for bg img crop---------------------------------------------

  let [bgimg, setbgimg] = useState(null);
  let [bgCropModal, setBgcropModal] = useState(false);
  let [mybgimg, setmybgimg] = useState(null);
  let [cropbg, setCropbg] = useState({
    unit: "%",
    x: 50,
    y: 50,
    width: 25,
    height: 25,
  });

  let handleclosebgcropper = () => {
    setBgcropModal(false);
  };

  let handlebgImageChange = (event) => {
    // profileImage
    setbgimg("");
    const { files } = event.target;

    // setKey(key + 1);
    if (files && files?.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.addEventListener("load", () => {
        setbgimg(reader.result);
        // dispatch(setProfileImg(reader.result))

        setBgcropModal(true);
        setImgKey(imgKey + 1);
      });
    }
  };

  console.log(singleTeam);

  return (
    <div>
      <Modal
        open={modal}
        onClose={() => {
          callBack();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <div className="w-[100%] h-[100%] flex flex-col justify-evenly items-center">
            {/* --------------------------------------------croper for Cover image------------------------------------------------  */}
            <Cropper
              cropModal={bgCropModal}
              handleclosecropper={handleclosebgcropper}
              theimg={bgimg}
              myimg={mybgimg}
              setmyimg={setmybgimg}
              setcrop={setCropbg}
              crop={cropbg}
              aspect={370 / 150}
              setReduxState={getImg}
              isCircle={false}
              isNotRedux={true}
            />
            <h2 className="text-center font-medium text-lg">
              {singleTeam?.teamName === ""
                ? t("Create new team")
                : t("Edit team")}
            </h2>
            <div className="w-[90%] h-[80%] flex flex-col items-center justify-around">
              <div className="h-[150px] w-[90%] rounded-[45px] relative">
                <label
                  htmlFor="prflImg"
                  className="absolute right-[7px] top-0 cursor-pointer"
                >
                  <GrAddCircle style={{ fontSize: "25px" }} />

                  <input
                    type="file"
                    id="prflImg"
                    style={{ opacity: 0, width: "0px", height: "0px" }}
                    onChange={handlebgImageChange}
                    key={imgKey}
                  />
                </label>
                <img
                  src={data?.img ? data?.img : bgplhldr}
                  alt=""
                  className="h-[150px] w-[100%] rounded-[45px] object-cover"
                />
              </div>

              <input
                type="text"
                className="w-[100%] h-[45px] outline-none bg-[#F2F2F2] rounded-[36px] p-[10px] placeholder:text-xs"
                placeholder={`${t("Name")}*`}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                value={data?.name}
              />
              <div className="w-[100%] h-[45px] flex justify-evenly items-center">
                <button
                  className="w-[45%] h-[45px] outline-none bg-[black] rounded-[36px] p-[10px] placeholder:text-xs text-[white]"
                  onClick={() => callBack()}
                >
                  {t("Cancel")}
                </button>
                {singleTeam?.teamName === "" ? (
                  <button
                    className="w-[45%] h-[45px] outline-none bg-[black] rounded-[36px] p-[10px] placeholder:text-xs text-[white]"
                    onClick={() =>
                      !apiWorking && createTeam(data, callBack, setapiWorking)
                    }
                  >
                    {apiWorking ? " Creating..." : t("Create")}
                  </button>
                ) : (
                  <button
                    className="w-[45%] h-[45px] outline-none bg-[black] rounded-[36px] p-[10px] placeholder:text-xs text-[white]"
                    onClick={() =>
                      !apiWorking &&
                      updateTeam(
                        data,
                        callBack,
                        singleTeam?.teamId,
                        setapiWorking
                      )
                    }
                  >
                    {apiWorking ? "Updating..." : t("Update")}
                  </button>
                )}
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      {/* <ToastContainer position="top-center" autoClose={2000} /> */}
    </div>
  );
};

export default CreateNewTeam;
