import React, { useState } from "react";
import {
  MdAddCircleOutline,
  MdColorize,
  MdOutlineCancel,
} from "react-icons/md";
import Cropper from "../Cropper";
import { setQrColor, setQrLogo } from "../../redux/profileInfoSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateQrInfo } from "../../Services";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Qr = ({ uid, handleCancelQr }) => {
  const qrLogo = useSelector((state) => state.profileInfoSlice.qrLogo);
  const qrColor = useSelector((state) => state.profileInfoSlice.qrColor);

  let dispatch = useDispatch();
  // ----------------------------------------------------State setup for profile img crop---------------------------------------------
  let [prflimg, setprflimg] = useState(null);
  let [cropModal, setcropModal] = useState(false);
  let [myprflimg, setmyprflimg] = useState(null);
  let [cropPrfl, setCropPrfl] = useState({
    unit: "%",
    x: 50,
    y: 50,
    width: 25,
    height: 25,
  });

  let handleclosecropper = () => {
    setcropModal(false);
    // settheimg(null)
  };

  let handleLogoImageChange = (event) => {
    // profileImage
    setprflimg("");
    const { files } = event.target;

    // setKey(key + 1);
    if (files && files?.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.addEventListener("load", () => {
        setprflimg(reader.result);
        // dispatch(setProfileImg(reader.result))

        setcropModal(true);
      });
    }
  };

  return (
    <div className="w-[90%] h-[90%] flex flex-col justify-center items-center">
      {/* --------------------------------------------croper for profile image------------------------------------------------  */}
      <Cropper
        cropModal={cropModal}
        handleclosecropper={handleclosecropper}
        theimg={prflimg}
        myimg={myprflimg}
        setmyimg={setmyprflimg}
        setcrop={setCropPrfl}
        crop={cropPrfl}
        aspect={1 / 1}
        setReduxState={setQrLogo}
        isCircle={false}
      />
      <div className="w-[155px] h-[47px] rounded-[36px] shadow-lg font-[600] text-[16px] flex justify-center items-center">
        QR Code
      </div>
      <div className="h-[100px] w-[100px] relative mt-[55px]">
        {qrLogo ? (
          <MdOutlineCancel
            style={{ fontSize: "25px" }}
            className="absolute right-[-4px] top-[-6px] cursor-pointer"
            onClick={() => dispatch(setQrLogo(""))}
          />
        ) : (
          <label
            for="qrimg"
            class="absolute right-[-4px] top-[-6px] cursor-pointer"
          >
            <MdAddCircleOutline className="text-2xl" />
            <input
              type="file"
              name="qrimg"
              id="qrimg"
              class="opacity-0 w-[0px] h-[0px]"
              onChange={handleLogoImageChange}
            />
          </label>
        )}
        <img
          src={qrLogo ? qrLogo : `https://placehold.co/120x120`}
          alt=""
          className="h-[100%] w-[100%] rounded-[25px] "
        />
      </div>

      <h2 className="font-[500] sm:text-[16px] text-[20px] mt-2">
        Add Custom Logo
      </h2>
      <p className="font-[400] text-[12px] text-[#666565] text-center sm:w-[47%] w-[75%]">
        Add custom logo to be displayed in the middle of the Qr Code.
      </p>
      <div className="w-[100%] mt-5 flex justify-center">
        <div className="sm:w-[50%] w-[100%] h-[35px]  rounded-[36px] flex  items-center bg-[#F2F2F2]">
          <div className="w-[22%] h-[100%] font-[500] text-[11px] flex justify-center items-center">
            Card Color
          </div>

          <div className="w-[78%] h-[100%] flex justify-evenly items-center">
            <div className="h-[18px] w-[18px] rounded-full bg-black flex justify-center items-center">
              <MdColorize className="text-[white] text-[14px] cursor-pointer" />
            </div>
            <div
              className="h-[20px] w-[20px] flex justify-center items-center rounded-full"
              onClick={() => dispatch(setQrColor("#E70A0A"))}
              style={{
                border: qrColor === "#E70A0A" ? `1px solid #E70A0A` : null,
              }}
            >
              <div className="h-[14px] w-[14px] rounded-full bg-[#E70A0A] cursor-pointer"></div>{" "}
            </div>
            <div
              className="h-[20px] w-[20px] flex justify-center items-center rounded-full"
              onClick={() => dispatch(setQrColor("#0ED416"))}
              style={{
                border: qrColor === "#0ED416" ? `1px solid #0ED416` : null,
              }}
            >
              <div className="h-[14px] w-[14px] rounded-full bg-[#0ED416] cursor-pointer"></div>{" "}
            </div>
            <div
              className="h-[20px] w-[20px] flex justify-center items-center rounded-full"
              onClick={() => dispatch(setQrColor("#3076FF"))}
              style={{
                border: qrColor === "#3076FF" ? `1px solid #3076FF` : null,
              }}
            >
              <div className="h-[14px] w-[14px] rounded-full bg-[#3076FF] cursor-pointer"></div>{" "}
            </div>
            <div
              className="h-[20px] w-[20px] flex justify-center items-center rounded-full"
              onClick={() => dispatch(setQrColor("#F439D6"))}
              style={{
                border: qrColor === "#F439D6" ? `1px solid #F439D6` : null,
              }}
            >
              <div className="h-[14px] w-[14px] rounded-full bg-[#F439D6] cursor-pointer"></div>{" "}
            </div>
            <div
              className="h-[20px] w-[20px] flex justify-center items-center rounded-full"
              onClick={() => dispatch(setQrColor("#6732FF"))}
              style={{
                border: qrColor === "#6732FF" ? `1px solid #6732FF` : null,
              }}
            >
              <div className="h-[14px] w-[14px] rounded-full bg-[#6732FF] cursor-pointer"></div>{" "}
            </div>
            <div
              className="h-[20px] w-[20px] flex justify-center items-center rounded-full"
              onClick={() => dispatch(setQrColor("#FCE410"))}
              style={{
                border: qrColor === "#FCE410" ? `1px solid #FCE410` : null,
              }}
            >
              <div className="h-[14px] w-[14px] rounded-full bg-[#FCE410] cursor-pointer"></div>{" "}
            </div>
            <div
              className="h-[20px] w-[20px] flex justify-center items-center rounded-full"
              onClick={() => dispatch(setQrColor("#1BE4FF"))}
              style={{
                border: qrColor === "#1BE4FF" ? `1px solid #1BE4FF` : null,
              }}
            >
              <div className="h-[14px] w-[14px] rounded-full bg-[#1BE4FF] cursor-pointer"></div>{" "}
            </div>
            <div
              className="h-[20px] w-[20px] flex justify-center items-center rounded-full"
              onClick={() => dispatch(setQrColor("#DEA527"))}
              style={{
                border: qrColor === "#DEA527" ? `1px solid #DEA527` : null,
              }}
            >
              <div className="h-[14px] w-[14px] rounded-full bg-[#DEA527] cursor-pointer"></div>{" "}
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-[#AEABAB] text-[12px] font-[400] mt-1">
        Choose Color
      </h2>

      <div className="w-[100%] flex justify-center items-center mt-5">
        <button
          className="w-[120px] h-[40px] rounded-[15px] mr-2 font-[600] text-[12px]  shadow-md"
          onClick={() => handleCancelQr()}
        >
          Cancel
        </button>
        <button
          className="w-[120px] h-[40px] rounded-[15px] ml-2 font-[600] text-[12px]  shadow-md bg-black text-white"
          onClick={() => updateQrInfo(uid, qrColor, qrLogo)}
        >
          Update
        </button>
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

export default Qr;
