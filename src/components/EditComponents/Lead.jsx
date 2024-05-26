import styled from "@emotion/styled";
import { FormControlLabel, Switch } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormHeader,
  setNameVisible,
  setEmailVisible,
  setCompanyVisible,
  setNoteVisible,
  setJobVisible,
  setPhoneVisible,
  setLead,
} from "../../redux/profileInfoSlice";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { updateLead, updateLeadMode } from "../../Services";
import { useTranslation } from "react-i18next";
const Lead = ({ uid }) => {
  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 50,
    height: 26,
    padding: 0,
    // position: "relative",
    // right: 0,
    // marginLeft: "50px",
    // border: "1px solid black",

    "& .MuiSwitch-switchBase": {
      padding: 0,
      marginTop: 2,
      marginLeft: 2,
      //   marginRight: -5,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(24px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme?.palette?.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme?.palette?.mode === "light"
            ? theme?.palette?.grey[100]
            : theme?.palette?.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme?.palette?.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme?.palette?.mode === "light" ? "#E9E9EA" : "#BBBBBB",
      opacity: 1,
      transition: theme?.transitions?.create(["background-color"], {
        duration: 500,
      }),
    },
  }));
  let dispatch = useDispatch();
  const formHeader = useSelector((state) => state.profileInfoSlice.formHeader);

  const nameVisible = useSelector(
    (state) => state.profileInfoSlice.nameVisible
  );
  const emailVisible = useSelector(
    (state) => state.profileInfoSlice.emailVisible
  );
  const companyVisible = useSelector(
    (state) => state.profileInfoSlice.companyVisible
  );
  const jobVisible = useSelector((state) => state.profileInfoSlice.jobVisible);
  const noteVisible = useSelector(
    (state) => state.profileInfoSlice.noteVisible
  );
  const phoneVisible = useSelector(
    (state) => state.profileInfoSlice.phoneVisible
  );

  const leadMode = useSelector((state) => state.profileInfoSlice.leadMode);

  console.log(phoneVisible);
  let changeVisibility = (cb, value) => {
    let noteVisibles = [
      nameVisible,
      emailVisible,
      companyVisible,
      jobVisible,
      noteVisible,
      phoneVisible,
    ].filter((elem) => {
      return elem === false;
    });

    if (value === true) {
      if (noteVisibles.length < 4) {
        dispatch(cb(false));
      } else {
        toast.error("Form should contain atleast two fields");
      }
    } else {
      dispatch(cb(true));
    }
  };
  let leadForm = {
    Fname: nameVisible,
    company: emailVisible,
    email: companyVisible,
    job: jobVisible,
    note: noteVisible,
    phone: phoneVisible,
  };
  const { t } = useTranslation();
  return (
    <div className="w-[85%] h-[95%]">
      <div className="w-[159px] h-[47px] rounded-[36px] shadow-lg font-[600] text-[16px] flex justify-center items-center">
        {t("Lead Capture")}
      </div>
      <div className="w-[100%] flex justify-between mt-4">
        <div className="w-[75%]">
          <h2 className="text-[15px] font-[500]">{t("Lead Capture Mode")}</h2>
          <p className="font-[400] text-[11px] text-[#7D7C7C] sm:w-[90%] w-[100%]">
            {t(
              "When lead capture mode is enabled, the lead form will popup as soon as your profile is shared"
            )}
          </p>
        </div>
        <div className="sm:w-[15%] w-[2%]  flex justify-center items-center">
          <FormControlLabel
            control={
              <IOSSwitch
                checked={leadMode}
                onChange={() => updateLeadMode(leadMode, uid)}
              />
            }
          />
        </div>
      </div>
      <div className="mt-5">
        <h2 className="font-[600] text-[12px]">{t("Form Header")}</h2>
        <input
          type="text"
          name=""
          id=""
          className="w-[210px] h-[34px] outline-none bg-[#F3F3F3] border border-[#ACABAB] rounded-[10px] p-[10px] mt-1"
          onChange={(e) => dispatch(setFormHeader(e.target.value))}
          value={formHeader}
        />
      </div>

      <div className="w-[100%] mt-5">
        <div className="w-[75%]">
          <h2 className="text-[15px] font-[500]">{t("Input Fields")}</h2>
          <p className="font-[400] text-[11px] text-[#7D7C7C] sm:w-[90%] w-[127%]">
            {t(
              "Select or unselect the fields that you want your leads to complete on your lead capture form"
            )}
          </p>

          <div className="sm:w-[429px] w-[132%] h-[163px] border rounded-[26px] shadow-xl mt-3 flex flex-col justify-center items-center">
            <div className="h-[70%] w-[90%]  flex flex-col justify-between">
              <div className="w-[100%] flex justify-between ">
                <div
                  className="w-[30%] h-[48px] rounded-[36px] border border-[#737373] font-[500] sm:text-[12px] text-[10px] hover:bg-black flex justify-center items-center hover:text-white cursor-pointer"
                  onClick={() => changeVisibility(setNameVisible, nameVisible)}
                  style={
                    nameVisible === true
                      ? { backgroundColor: "black", color: "white" }
                      : null
                  }
                >
                  {t("Full Name")}
                </div>
                <div
                  className="w-[30%] h-[48px] rounded-[36px] border border-[#737373] font-[500] sm:text-[12px] text-[10px] hover:bg-black flex justify-center items-center hover:text-white cursor-pointer"
                  onClick={() =>
                    changeVisibility(setEmailVisible, emailVisible)
                  }
                  style={
                    emailVisible === true
                      ? { backgroundColor: "black", color: "white" }
                      : null
                  }
                >
                  {t("Email")}
                </div>
                <div
                  className="w-[30%] h-[48px] rounded-[36px] border border-[#737373] font-[500] sm:text-[12px] text-[10px] hover:bg-black flex justify-center items-center hover:text-white cursor-pointer text-center"
                  onClick={() =>
                    changeVisibility(setPhoneVisible, phoneVisible)
                  }
                  style={
                    phoneVisible === true
                      ? { backgroundColor: "black", color: "white" }
                      : null
                  }
                >
                  {t("Phone Number")}
                </div>
              </div>

              <div className="w-[100%] flex justify-between ">
                <div
                  className="w-[30%] h-[48px] rounded-[36px] border border-[#737373] font-[500] sm:text-[12px] text-[10px] hover:bg-black flex justify-center items-center hover:text-white cursor-pointer"
                  onClick={() => changeVisibility(setJobVisible, jobVisible)}
                  style={
                    jobVisible === true
                      ? { backgroundColor: "black", color: "white" }
                      : null
                  }
                >
                  {t("Job Title")}
                </div>
                <div
                  className="w-[30%] h-[48px] rounded-[36px] border border-[#737373] font-[500] sm:text-[12px] text-[10px] hover:bg-black flex justify-center items-center hover:text-white cursor-pointer"
                  onClick={() =>
                    changeVisibility(setCompanyVisible, companyVisible)
                  }
                  style={
                    companyVisible === true
                      ? { backgroundColor: "black", color: "white" }
                      : null
                  }
                >
                  {t("Company")}
                </div>
                <div
                  className="w-[30%] h-[48px] rounded-[36px] border border-[#737373] font-[500] sm:text-[12px] text-[10px] hover:bg-black flex justify-center items-center hover:text-white cursor-pointer"
                  onClick={() => changeVisibility(setNoteVisible, noteVisible)}
                  style={
                    noteVisible === true
                      ? { backgroundColor: "black", color: "white" }
                      : null
                  }
                >
                  {t("Note")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[100%] flex justify-end items-center mt-5">
        <button
          className="w-[120px] h-[40px] rounded-[15px] mr-2 font-[600] text-[12px]  shadow-md"
          // onClick={() => handleCancelQr()}
        >
          {t("Cancel")}
        </button>
        <button
          className="w-[120px] h-[40px] rounded-[15px] ml-2 font-[600] text-[12px]  shadow-md bg-black text-white"
          onClick={() =>
            updateLead(
              uid,
              formHeader,
              leadForm,
              t("Information updated sucessfuly")
            )
          }
        >
          {t("Update")}
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

export default Lead;
