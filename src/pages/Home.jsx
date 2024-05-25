import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { BiSearchAlt } from "react-icons/bi";
import uk from "../imgs/uk.png";
import fr from "../imgs/fr.png";
import { MdArrowDropDown } from "react-icons/md";
import { FaSquarePlus } from "react-icons/fa6";
import { ListItem, Menu, MenuItem } from "@mui/material";
import MemberCard from "../components/MemberCard";
import c1 from "../imgs/c1.png";
import c2 from "../imgs/c2.png";
import c3 from "../imgs/c3.png";
import prfl from "../imgs/prfl.jpeg";
import "./Home.css";
import { FaRegPlusSquare } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";

import NavbarFooter from "./NavbarFooter";
import CreateNewCard from "../components/Modals/CreateNewCard";
import {
  changeLanguage,
  getAllChilds,
  getAllCompanies,
  getSingleChild,
} from "../Services";
import ShareCardModal from "../components/Modals/ShareCardModal";
import { MoonLoader } from "react-spinners";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
// import { changeLanguage } from "i18next";

const Home = () => {
  let [openMenu, setopenMenu] = useState(false);
  let [allProfiles, setAllProfiles] = useState([]);

  let getAllProfiles = (obj) => {
    setAllProfiles(Object.values(obj));
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  var screen = window.innerWidth;
  let conexParent = localStorage.getItem("conexParent");
  let connexUid = localStorage.getItem("connexUid");
  let [modal, setModal] = useState(false);
  let [loading, setloading] = useState(false);
  let handleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (conexParent === "superAdmin") {
      getAllCompanies(getAllProfiles, setloading);
    } else {
      getAllChilds(getAllProfiles, setloading);
    }
  }, []);

  let [companyId, setCompanyId] = useState("");

  let [companyProfile, setCompanyProfile] = useState({});

  useEffect(() => {
    if (conexParent) {
      setCompanyId(conexParent);
    } else {
      setCompanyId(connexUid);
    }
  }, []);

  useEffect(() => {
    getSingleChild(companyId, setCompanyProfile, setloading);
  }, [companyId]);

  console.log(allProfiles);

  // ---------------------------------------Search functionality--------------------------------------------

  let [filtered, setfiltered] = useState([]);
  useEffect(() => {
    setfiltered(allProfiles);
  }, [allProfiles]);
  let [search, setsearch] = useState("");

  useEffect(() => {
    const result = allProfiles?.filter((contact) => {
      return contact?.name.toLowerCase().match(search.toLowerCase());
    });

    setfiltered(result);
  }, [search]);
  const { i18n, t } = useTranslation();
  const i18Change = (lang) => {
    i18n.changeLanguage(lang?.toLowerCase());
  };

  const language = localStorage.getItem("connexLanguage");

  return (
    <div
      className="w-[100%] flex bg-[#F8F8F8] sm:h-[100vh] max-h-[100vh] relative"
      style={
        screen <= 450 ? { display: "flex", justifyContent: "center" } : null
      }
    >
      <CreateNewCard
        modal={modal}
        handleModal={handleModal}
        companyProfile={companyProfile}
      />
      {screen >= 450 ? <Sidebar /> : null}
      {loading ? (
        <div className="sm:w-[80%] w-[90%] items-center flex justify-center">
          <MoonLoader />
        </div>
      ) : (
        <div className="sm:w-[80%] w-[90%]  flex justify-center overflow-y-scroll">
          <div className="sm:w-[90%] w-[100%] ">
            <div
              className="w-[100%] flex justify-between h-[50px]  mt-[30px]"
              style={screen <= 450 ? { alignItems: "center" } : null}
            >
              <div className="sm:w-[15%] w-[22%] h-[100%] flex items-center">
                <p
                  className="font-[600] sm:text-[20px] text-[14px]"
                  style={
                    screen <= 450
                      ? { display: "flex", alignItems: "center" }
                      : null
                  }
                >
                  {t("Members")}{" "}
                  <span className="font-[500] sm:text-[10px] text-[15px] text-[#9B9B9B]">
                    ({allProfiles?.length})
                  </span>
                </p>
              </div>
              {screen >= 450 ? (
                <div className="sm:w-[66%] w-[60%]  h-[100%] flex justify-between">
                  <div className="w-[274px] h-[100%] flex items-center rounded-[36px] bg-white shadow-xl">
                    <input
                      type="text"
                      className="h-[100%] w-[77%] outline-none rounded-[36px] pl-[10px] ml-2"
                      placeholder={screen >= 450 ? t("Search") : null}
                      onChange={(e) => setsearch(e.target.value)}
                      value={search}
                    />
                    <BiSearchAlt className="text-[22px] text-[#9B9B9B] ml-2" />
                  </div>
                  {conexParent != "superAdmin" && (
                    <>
                      <div
                        component="nav"
                        // aria-label="Device settings"
                        id="lang-button"
                        aria-haspopup="listbox"
                        aria-controls="lang-menu"
                        aria-expanded={openMenu ? "true" : undefined}
                        onClick={handleClickListItem}
                        className="w-[129px] h-[100%] rounded-[36px] bg-white shadow-xl flex justify-evenly items-center cursor-pointer"
                      >
                        <img
                          src={language === "fr" ? fr : uk}
                          alt=""
                          className="h-[30px] w-[30px] object-cover"
                        />
                        <p className="font-[500] text-[15px]">
                          {language === "fr" ? "French" : "English"}
                        </p>
                        <MdArrowDropDown className="text-2xl" />
                      </div>
                      <Menu
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
                            changeLanguage(companyId, "en", () =>
                              i18Change("en")
                            );
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
                            changeLanguage(companyId, "fr", () =>
                              i18Change("fr")
                            );
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
                      </Menu>
                    </>
                  )}
                  {/* <div className="w-[129px] h-[100%] rounded-[36px] bg-white shadow-xl flex justify-center items-center cursor-pointer">
                  <p className="font-[500] text-[15px] ml-2">Members</p>
                  <MdArrowDropDown className="text-2xl ml-1" />
                </div> */}
                  <div
                    className="w-[185px] h-[100%] rounded-[36px] bg-black shadow-xl flex justify-center items-center cursor-pointer"
                    onClick={() => handleModal()}
                  >
                    <p className="font-[400] text-[14px] text-white mr-1 text-center">
                      {t("Add New Member")}
                    </p>

                    {language === "en" && (
                      <FaSquarePlus className="text-[white] ml-1" />
                    )}
                  </div>
                </div>
              ) : null}
              {screen <= 450 ? (
                <div className="menu">
                  <div className="search" style={{}}>
                    <BiSearchAlt />
                  </div>
                  {"\u00A0"}

                  <div className="add">
                    <IoMdAdd />
                  </div>
                  {"\u00A0"}

                  <div className="country">
                    <img src={uk} style={{ width: "44%" }} />
                    <IoMdArrowDropdown />
                  </div>
                  {"\u00A0"}

                  <div className="member">
                    <p>{t("Members")}</p>
                    <IoMdArrowDropdown />
                  </div>
                </div>
              ) : null}
            </div>

            <div className="w-[100%] flex justify-start gap-x-[6%] flex-wrap sm:mt-[40px] mt-[20px] sm:h-[78%] h-[68%] overflow-y-scroll">
              {filtered?.map((profile) => {
                return (
                  <MemberCard
                    profile={profile}
                    companyProfile={companyProfile?.[companyId]}
                  />
                );
              })}
              {/* <MemberCard img={prfl} name="Naruto" />
            <MemberCard img={c1} name="Hiruzen Sarutobi" />
            <MemberCard img={c2} name="Hinata Hyuga" />
            <MemberCard img={c3} name="Kakashi Hatake" /> */}
            </div>

            <br />
          </div>
        </div>
      )}
      {screen <= 450 ? <NavbarFooter /> : null}
    </div>
  );
};

export default Home;
