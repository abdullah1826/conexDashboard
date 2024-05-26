import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { MdArrowDropDown } from "react-icons/md";
import { Tab, Tabs } from "@mui/material";
import AccountSettings from "../components/SettingsComponents/AccountSettings";
import AccountLinks from "../components/SettingsComponents/AccountLinks";
import Organization from "../components/SettingsComponents/Organization";
import CompanyProfile from "../components/SettingsComponents/CompanyProfile";
import NavbarFooter from "./NavbarFooter";
import { getSingleChild } from "../Services";
import { useDispatch } from "react-redux";
import {
  setAddress,
  setBio,
  setColor,
  setCompanyVisible,
  setCoverUrl,
  setDesignation,
  setDirect,
  setDirectMode,
  setEmail,
  setEmailVisible,
  setFormHeader,
  setJobVisible,
  setLead,
  setLinks,
  setLogoUrl,
  setName,
  setNameVisible,
  setNoteVisible,
  setPhone,
  setPhoneVisible,
  setProfilePictureLock,
  setProfileurl,
  setQrColor,
  setQrLogo,
  setTextColor,
  setbioLock,
  setcoverLock,
  setlinkBgColor,
  setlocationLock,
  setlogoLock,
  setnameLock,
  setphoneLock,
} from "../redux/profileInfoSlice";
import { CiLock } from "react-icons/ci";
import HelpModal from "../components/Modals/HelpModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/system";

const textColor = "#000000";
const CustomTabs = styled(Tabs)({
  "& .MuiTab-root": {
    color: "#707070", // default tab color
  },
  "& .Mui-selected": {
    color: textColor, // active tab color
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "black", // indicator color
  },
});

const Company = () => {
  let [value, setValue] = useState(0);
  const { t } = useTranslation();

  let handleTabs = (e, val) => {
    setValue(val);
  };

  let [companyId, setCompanyId] = useState("");
  let conexParent = localStorage.getItem("conexParent");
  let connexUid = localStorage.getItem("connexUid");
  let [companyProfile, setCompanyProfile] = useState({});
  useEffect(() => {
    if (conexParent) {
      setCompanyId(conexParent);
    } else {
      setCompanyId(connexUid);
    }
  }, []);

  useEffect(() => {
    getSingleChild(companyId, setCompanyProfile);
  }, [companyId]);

  let dispatch = useDispatch();

  useEffect(() => {
    if (companyProfile[companyId]) {
      dispatch(setName(companyProfile[companyId]?.name));
      dispatch(setEmail(companyProfile[companyId]?.email));
      dispatch(setColor(companyProfile[companyId]?.color));
      dispatch(setTextColor(companyProfile[companyId]?.textColor));
      dispatch(setPhone(companyProfile[companyId]?.phone));
      dispatch(setCoverUrl(companyProfile[companyId]?.coverUrl));
      dispatch(setProfileurl(companyProfile[companyId]?.profileUrl));
      dispatch(setLogoUrl(companyProfile[companyId]?.logoUrl));
      dispatch(setDesignation(companyProfile[companyId]?.title));
      dispatch(setAddress(companyProfile[companyId]?.address));
      dispatch(setBio(companyProfile[companyId]?.bio));
      if (typeof companyProfile[companyId]?.links === "object") {
        dispatch(setLinks(Object.values(companyProfile[companyId]?.links)));
      }

      dispatch(
        setDirect({
          name: companyProfile[companyId]?.direct?.name,
          value: companyProfile[companyId]?.direct?.value,
          linkID: companyProfile[companyId]?.direct?.linkID,
        })
      );
      dispatch(setDirectMode(companyProfile[companyId]?.directMode));
      dispatch(setQrLogo(companyProfile[companyId]?.qrLogoUrl));
      dispatch(setQrColor(companyProfile[companyId]?.qrColor));
      dispatch(setLead(companyProfile[companyId]?.leadMode));
      dispatch(setFormHeader(companyProfile[companyId]?.formHeader));
      dispatch(setNameVisible(companyProfile[companyId]?.leadForm?.Fname));
      dispatch(setEmailVisible(companyProfile[companyId]?.leadForm?.email));
      dispatch(setPhoneVisible(companyProfile[companyId]?.leadForm?.phone));
      dispatch(setJobVisible(companyProfile[companyId]?.leadForm?.job));
      dispatch(setCompanyVisible(companyProfile[companyId]?.leadForm?.company));
      dispatch(
        setProfilePictureLock(companyProfile[companyId]?.profilePictureLock)
      );
      dispatch(setlogoLock(companyProfile[companyId]?.logoLock));
      dispatch(setcoverLock(companyProfile[companyId]?.coverLock));
      dispatch(setnameLock(companyProfile[companyId]?.nameLock));
      dispatch(setphoneLock(companyProfile[companyId]?.phoneLock));
      dispatch(setbioLock(companyProfile[companyId]?.bioLock));
      dispatch(setlocationLock(companyProfile[companyId]?.locationLock));
    }
    // dispatch(setPoweredVizz(singleProfile?.data?.poweredVizz));
    // dispatch(setlinkBgColor(companyProfile[companyId]?.linkBgColor));
    // dispatch(setbtnColor(singleProfile?.data?.saveBtnColor));
    // dispatch(setShareBtnColor(singleProfile?.data?.shareBtnColor));
    // dispatch(setlinkColor(singleProfile?.data?.linkColor));
  }, [companyProfile?.[companyId]]);

  console.log(companyProfile);

  var screen = window.innerWidth;
  let [helpModal, sethelpModal] = useState(false);
  let handlehelpModal = () => {
    sethelpModal(!helpModal);
  };
  return (
    <div
      className="w-[100%] flex  bg-[#F8F8F8] h-[100vh] max-h-[100vh] relative"
      style={screen <= 450 ? { justifyContent: "center" } : null}
    >
      <HelpModal helpModal={helpModal} handlehelpModal={handlehelpModal} />
      {screen >= 450 ? <Sidebar /> : null}
      <div className="sm:w-[80%] w-[90%] flex flex-col items-center overflow-y-scroll overflow-x-hidden">
        <div className="sm:w-[90%] w-[100%] ">
          <div className="w-[100%] flex justify-between h-[50px]  mt-[30px]">
            <div className="sm:w-[15%] w-[35%] h-[100%] flex items-center">
              <p className="font-[600] sm:text-[20px] text-[16px]">
                {t("Company")}
              </p>
            </div>
            <div
              className="w-[80%] h-[100%] flex justify-end"
              style={screen <= 450 ? { width: "70%" } : null}
            >
              {/* <Menu
                id="lang-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "lang-button",
                  role: "listbox",
                }}
              >
                <MenuItem
                  // key={index}
                  // disabled={index === 0}
                  // selected={index === selectedIndex}
                  // onClick={(event) => handleMenuItemClick(event, index)}
                  onClick={() => {
                    handleClose();
                  }}
                  sx={{ display: "flex" }}
                >
                  <img
                    src={uk}
                    alt=""
                    className="h-[27px] w-[27px] object-cover"
                  />
                  <p className="font-[500] ml-2 text-base">English</p>
                </MenuItem>
                <MenuItem
                  // key={index}
                  // disabled={index === 0}
                  // selected={index === selectedIndex}
                  // onClick={(event) => handleMenuItemClick(event, index)}
                  onClick={() => {
                    handleClose();
                  }}
                  sx={{ display: "flex" }}
                >
                  <img
                    src={fr}
                    alt=""
                    className="h-[27px] w-[27px] object-cover rounded-full"
                  />
                  <p className="font-[500] ml-2 text-base">French</p>
                </MenuItem>
              </Menu> */}
              <div
                className="w-[154px] h-[100%] rounded-[36px] bg-white shadow-xl flex justify-center items-center cursor-pointer"
                // onClick={() => handlehelpModal()}
                onClick={() =>
                  window.open(
                    "https://connexcard.store/pages/support-contact-us"
                  )
                }
              >
                <p className="font-[500] sm:text-[15px] text-[12px] ">
                  {t("Help")} ?
                </p>
                {/* <MdArrowDropDown className="text-2xl ml-1" /> */}
              </div>
            </div>
          </div>
        </div>

        <div className="w-[90%] mt-10 text-black">
          <CustomTabs
            textColor="inherit"
            value={value}
            onChange={handleTabs}
            TabIndicatorProps={{
              style: {
                backgroundColor: "black",
                padding: "0px",
              },
            }}
            // sx={{ border: "1px solid black", pl: 3 }}
          >
            <Tab
              label={t("Account Settings")}
              sx={{
                fontSize: "16px",
                fontWeight: "600",

                ...(screen <= 450
                  ? { width: "50px", whiteSpace: "nowrap", fontSize: "8px" }
                  : {}),
              }}
            />
            {/* <div className="w-[10px]"></div> */}
            <Tab
              label={t("Account Links")}
              sx={{
                fontSize: "16px",
                fontWeight: "600",

                ...(screen <= 450
                  ? { width: "50px", whiteSpace: "nowrap", fontSize: "8px" }
                  : {}),
              }}
            />
            {/* <div className="w-[10px]"></div> */}
            <Tab
              label={t("Organization")}
              sx={{
                fontSize: "16px",
                fontWeight: "600",

                ...(screen <= 450
                  ? { width: "50px", whiteSpace: "nowrap", fontSize: "8px" }
                  : {}),
              }}
            />
            {/* <div className="w-[10px]"></div> */}
            <Tab
              label={t("COMPANY PROFILE")}
              sx={{
                fontSize: "16px",
                fontWeight: "600",

                ...(screen <= 450
                  ? { width: "50px", whiteSpace: "nowrap", fontSize: "8px" }
                  : {}),
              }}
            />
          </CustomTabs>
          <Tabpanel value={value} index={0}>
            {companyProfile && (
              <AccountSettings companyProfile={companyProfile[companyId]} />
            )}
          </Tabpanel>

          <Tabpanel value={value} index={1}>
            <AccountLinks uid={companyId} />
          </Tabpanel>
          <Tabpanel value={value} index={2}>
            <Organization uid={companyId} />
          </Tabpanel>
          <Tabpanel value={value} index={3}>
            <CompanyProfile uid={companyId} />
          </Tabpanel>
        </div>
      </div>
      {screen <= 450 ? <NavbarFooter /> : null}
      {/* <ToastContainer
        position="bottom-left"
        autoClose={1000}
        theme="colored"
        hideProgressBar
      /> */}
    </div>
  );
};

let Tabpanel = ({ children, value, index }) => {
  return <div>{value === index && children}</div>;
};

export default Company;
