import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";

import { Box } from "@mui/material";
import { MdArrowBackIos } from "react-icons/md";
import { BiSolidCopy } from "react-icons/bi";
import { PiShare } from "react-icons/pi";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  EmailShareButton,
} from "react-share";
import { toast } from "react-toastify";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { TiSocialLinkedin } from "react-icons/ti";
import { FaXTwitter } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const ShareCardModal = ({ shareModal, handleShareModal, userId, vizzRole }) => {
  // Modal box style
  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 484,
    height: 310,
    backgroundColor: "white",
    borderRadius: "36px",
    outline: "none",
    boxShadow: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  let sliceString = (str) => {
    if (str?.length > 40) {
      return str?.slice(0, 40) + "...";
    } else {
      return str;
    }
  };

  //   let profileUrl = import.meta.env.VITE_PROFILE_URL;
  //   let orgUrl = import.meta.env.VITE_PROFILE_URL_ADMIN;
  let shareUrl = `profile.connexcard.com/${userId}`;
  //   console.log(vizzRole);
  //   console.log(shareUrl);
  const { t } = useTranslation();
  return (
    <>
      <Modal
        open={shareModal}
        onClose={() => handleShareModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <div className="w-[85%] h-[85%]">
            <div
              className="w-[100px] h-[35px] rounded-[36px] bg-[#f7f7f7] flex justify-center items-center cursor-pointer"
              onClick={() => handleShareModal()}
            >
              <MdArrowBackIos style={{ fontSize: "14px" }} />
              <p className="font-inter text-[12px] font-semibold leading-[8px] mr-5">
                {t("Go back")}
              </p>
            </div>

            <h2 className="mt-[20px] font-inter text-[16px] font-semibold leading-[15px]">
              {t("Copy Link")}
            </h2>
            <div className="mt-[12px] w-[397px] h-[37px] rounded-[36px] bg-[#f7f7f7] flex justify-between items-center">
              <p className="ml-[10px] font-inter text-[12px] font-semibold leading-[8px] text-[#898989]">
                {sliceString(shareUrl)}
              </p>
              <div
                className="w-[95px] h-[37px] rounded-[36px] cursor-pointer bg-black flex justify-center items-center"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl),
                    toast.success("Copied to clipboard");
                }}
              >
                <BiSolidCopy style={{ color: "white", fontSize: "18px" }} />
                <p className="font-inter text-[12px] font-semibold leading-[11px] text-white ml-2">
                  {t("Copy")}
                </p>
              </div>
            </div>

            <h2>{t("Share Card")}</h2>
            <div className="w-full flex justify-between items-center mt-[15px]">
              <WhatsappShareButton
                id="whatsapp"
                url={"quote" + "\n" + shareUrl}
                text={"Please find my Profile Link below:"}
                hashtag="#React"
              >
                <div className="w-[128px] h-[37px] rounded-[36px] bg-black flex justify-center items-center cursor-pointer">
                  <div className="flex justify-between items-center w-[85%] h-[80%]">
                    <div className="flex justify-between items-center w-[85%] h-[80%]">
                      {" "}
                      <IoLogoWhatsapp className="text-white" />
                      {/* {returnIcons("Whatsapp", 15)} */}
                    </div>
                    <p className="text-[12px] font-medium leading-[10px] text-white mr-2">
                      Whatsapp
                    </p>
                    <div className="w-[30px]">
                      <PiShare style={{ color: "white", fontSize: "18px" }} />
                    </div>
                  </div>
                </div>
              </WhatsappShareButton>

              <TelegramShareButton
                id="telegram"
                url={"quote" + "\n" + shareUrl}
                text={"Please find my Profile Link below:"}
                hashtag="#React"
              >
                <div className="w-[128px] h-[37px] rounded-[36px] bg-black flex justify-center items-center cursor-pointer">
                  <div className="flex justify-between items-center w-[85%] h-[80%]">
                    <div className="flex justify-between items-center w-[85%] h-[80%]">
                      {" "}
                      {/* {returnIcons("Telegram", 15)} */}
                      <FaTelegramPlane className="text-white" />
                    </div>
                    <p className="text-[12px] font-medium leading-[10px] text-white mr-2">
                      Telegram
                    </p>
                    <div className="w-[30px]">
                      <PiShare style={{ color: "white", fontSize: "18px" }} />
                    </div>
                  </div>
                </div>
              </TelegramShareButton>
              <EmailShareButton
                id="email"
                url={"quote" + "\n" + shareUrl}
                text={"Please find my Profile Link below:"}
                hashtag="#React"
              >
                <div className="w-[128px] h-[37px] rounded-[36px] bg-black flex justify-center items-center cursor-pointer">
                  <div className="flex justify-between items-center w-[85%] h-[80%]">
                    <div className="flex justify-between items-center w-[85%] h-[80%]">
                      {" "}
                      {/* {returnIcons("Email", 15)} */}
                      <MdEmail className="text-white" />
                    </div>
                    <p className="text-[12px] font-medium leading-[10px] text-white mr-2">
                      Email
                    </p>
                    <div className="w-[30px]">
                      <PiShare style={{ color: "white", fontSize: "18px" }} />
                    </div>
                  </div>
                </div>
              </EmailShareButton>
            </div>
            <div className="w-full flex justify-between items-center mt-[15px]">
              <FacebookShareButton
                id="facebook"
                url={"quote" + "\n" + shareUrl}
                text={"Please find my Profile Link below:"}
                hashtag="#React"
              >
                <div className="w-[128px] h-[37px] rounded-[36px] bg-black flex justify-center items-center cursor-pointer">
                  <div className="flex justify-between items-center w-[85%] h-[80%]">
                    <div className="flex justify-between items-center w-[85%] h-[80%]">
                      {" "}
                      {/* {returnIcons("Facebook", 15)} */}
                      <FaFacebookF className="text-white" />
                    </div>
                    <p className="text-[12px] font-medium leading-[10px] text-white mr-2">
                      Facebook
                    </p>
                    <div className="w-[30px]">
                      <PiShare style={{ color: "white", fontSize: "18px" }} />
                    </div>
                  </div>
                </div>
              </FacebookShareButton>
              <LinkedinShareButton
                id="linkedin"
                url={"quote" + "\n" + shareUrl}
                text={"Please find my Profile Link below:"}
                hashtag="#React"
              >
                <div className="w-[128px] h-[37px] rounded-[36px] bg-black flex justify-center items-center cursor-pointer">
                  <div className="flex justify-between items-center w-[85%] h-[80%]">
                    <div className="flex justify-between items-center w-[85%] h-[80%]">
                      {" "}
                      {/* {returnIcons("Linkedin", 15)} */}
                      <TiSocialLinkedin className="text-white" />
                    </div>
                    <p className="text-[12px] font-medium leading-[10px] text-white mr-2">
                      Linkedin
                    </p>
                    <div className="w-[30px]">
                      <PiShare style={{ color: "white", fontSize: "18px" }} />
                    </div>
                  </div>
                </div>
              </LinkedinShareButton>
              <TwitterShareButton
                id="twitter"
                url={"quote" + "\n" + shareUrl}
                text={"Please find my Profile Link below:"}
                hashtag="#React"
              >
                <div className="w-[128px] h-[37px] rounded-[36px] bg-black flex justify-center items-center cursor-pointer">
                  <div className="flex justify-between items-center w-[85%] h-[80%]">
                    <div className="flex justify-between items-center w-[85%] h-[80%]">
                      {" "}
                      {/* {returnIcons("Twitter", 15)} */}
                      <FaXTwitter className="text-white" />
                    </div>
                    <p className="text-[12px] font-medium leading-[10px] text-white mr-2">
                      Twitter
                    </p>
                    <div className="w-[30px]">
                      <PiShare style={{ color: "white", fontSize: "18px" }} />
                    </div>
                  </div>
                </div>
              </TwitterShareButton>
            </div>
          </div>
        </Box>
      </Modal>
      {/* <ToastContainer position="top-center" autoClose={2000} /> */}
    </>
  );
};

export default ShareCardModal;
