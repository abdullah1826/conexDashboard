import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
// import {
//   openLinkModal,
//   openLinkEditModal,
//   openLinkUpdateModal,
//   openModal,
//   closeAllModal,
// } from "../Redux/Modalslice";
// import { addLink, changeLinkName, removeLink } from "../Redux/Singlelinkslice";
import { Box } from "@mui/material";
import {
  contactIcons,
  socialIcons,
  media,
  payment,
  more,
} from "../../assets/ReturnSocialIcons";
import { RxCross2 } from "react-icons/rx";
import { HiBadgeCheck } from "react-icons/hi";
// import Linkeditmodal from "./Linkeditmodal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
// import LinkupdateModal from "./LinkupdateModal";
// import { setLinkDescription, setLinkHighlight } from "../Redux/UserinfoSlice";
import { useMediaQuery } from "react-responsive";
import { MdAddCircleOutline, MdArrowBackIosNew } from "react-icons/md";
import {
  addNewLink,
  renoveLink,
  splitString,
  updateNewLink,
} from "../../Services";
import Mobile from "../Mobile";
import { FaRegTrashAlt } from "react-icons/fa";
import Cropper from "../Cropper";
import { useTranslation } from "react-i18next";

// import { removeLink } from "../Redux/Singlelinkslice";

const SocialLinkModal = ({ modal, handleClose, uid, allProfiles }) => {
  //   console.log(link);
  //   const linkModal = useSelector((state) => state.modalHandeler.linkmodal);
  //   const linkEditmodal = useSelector(
  //     (state) => state.modalHandeler.linkeditmodal
  //   );
  //   const linkupdateModal = useSelector(
  //     (state) => state.modalHandeler.linkupdateModal
  //   );
  //   const modal = useSelector((state) => state.modalHandeler.modal);
  const dispatch = useDispatch();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const links = useSelector((state) => state.profileInfoSlice.links);

  console.log(links);

  let [linkEdit, setLinkEdit] = useState(false);
  let [linkInfo, setLinkInfo] = useState({});
  // let [link, setLink] = useState({
  //   image: "",
  //   linkID: "",
  //   name: "",
  //   value: "",
  //   shareable: true,
  // });

  let [linkValue, setLinkValue] = useState({
    value: "",
    shareable: true,
  });

  let handleLinkEditModal = () => {
    setLinkEdit(!linkEdit);
    setLinkValue({ value: "", shareable: true });
    setcustomImg("");
  };

  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: linkEdit ? 900 : 1000,
    height: linkEdit ? 550 : 600,
    bgcolor: "white",
    borderRadius: "18px",
    // overflow: 'auto',
    // border: '2px solid #000',
    boxShadow: 24,
    // p: linkModal ? "30px" : "2px",
    p: "30px",
  };

  //   let checkAdded = (name) => {
  //     return link?.some((elm) => {
  //       return elm?.title === name;
  //     });

  //   };

  //   let addlinkname = async (name) => {
  //     let findlink = await link?.filter((item) => {
  //       return item?.title === name;
  //     });

  //     console.log(findlink);
  //     dispatch(changeLinkName(findlink[0]?.name));
  //     dispatch(setLinkDescription(findlink[0]?.description));
  //     dispatch(setLinkHighlight(findlink[0]?.isHighLighted));
  //   };

  let checkAdded = (linkid) => {
    if (links) {
      let ifAdded = links?.some((elm) => {
        return elm?.linkID === linkid;
      });
      return ifAdded;
    }
  };

  let checkIfCstmAdded = (linkid) => {
    if (links) {
      let ifAdded = links?.find((elm) => {
        return elm?.linkID === linkid;
      });
      return ifAdded;
    }
  };
  let addAlreadyExist = (link, index) => {
    setLinkValue({ value: "", shareable: true });
    let addedLink = links.find((elm) => {
      return elm?.linkID === link?.linkID;
    });

    if (addedLink) {
      console.log("true");
      setLinkValue({
        value: addedLink?.value,
        shareable: addedLink?.shareable,
        index,
      });
      setLinkInfo({
        name: addedLink?.name,
        image: addedLink?.image ? addedLink?.image : link?.img,
        linkID: link?.linkID,
        placeholder: link?.placeholder,
      });
    } else {
      console.log("false");
      setLinkInfo({ ...link, image: link?.img });
    }
  };

  let [customImg, setcustomImg] = useState("");

  let handleImageChange = (result) => {
    setLinkInfo({ ...linkInfo, image: result });
  };

  // ----------------------------------------------------State setup for logo img crop---------------------------------------------
  let [logoimg, setlogoimg] = useState(null);
  let [cropLogoModal, setcroplogoModal] = useState(false);
  let [mylogolimg, setmylogolimg] = useState(null);
  let [croplogo, setCroplogo] = useState({
    unit: "%",
    x: 50,
    y: 50,
    width: 25,
    height: 25,
  });
  let [logoKey, setLogoKey] = useState(0);
  let handlecloselogocropper = () => {
    setcroplogoModal(false);
    // settheimg(null)
  };

  let handleLogoImageChange = (event) => {
    // profileImage
    setlogoimg("");
    const { files } = event.target;
    setLogoKey(logoKey + 1);
    if (files && files?.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.addEventListener("load", () => {
        setlogoimg(reader.result);
        // dispatch(setProfileImg(reader.result))

        setcroplogoModal(true);
      });
    }
  };

  console.log(linkInfo?.image);

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

  const ifCompany = (uid) => {
    return uid === companyId ? true : false;
  };
  console.log(ifCompany());

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const { t } = useTranslation();

  const ifCustom = (id) => {
    if (id === 49 || id === 50 || id === 51 || id === 52) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <Modal
        open={modal}
        onClose={() => {
          //   dispatch(closeAllModal()),
          //     dispatch(removeLink()),
          //     dispatch(setLinkHighlight(false));
          handleClose();
          setLinkEdit(false);
          setcustomImg("");
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          {/* {linkModal && ( */}
          <div className="overflow-y-scroll h-[100%] scrollbar-hide">
            <div className="w-[100%] flex justify-between ">
              {linkEdit ? (
                <div className="w-[60%] flex justify-between items-center">
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => handleLinkEditModal()}
                  >
                    <MdArrowBackIosNew className="text-xl" />
                    <p className="ml-1 text-lg">{t("Back")}</p>
                  </div>
                  <FaRegTrashAlt
                    className="text-2xl hover:text-red-500 cursor-pointer"
                    onClick={() =>
                      renoveLink(
                        {
                          image: "",
                          linkID: linkInfo?.linkID,
                          name: linkInfo?.name,
                          value: linkValue?.value,
                          shareable: linkValue?.shareable,
                        },
                        uid,
                        links,
                        () => setLinkEdit(false),
                        ifCompany,
                        allProfiles
                      )
                    }
                  />
                </div>
              ) : (
                <div></div>
              )}
              <div
                className="cursor-pointer"
                onClick={() => {
                  handleClose();
                  setLinkEdit(false);
                  //   dispatch(closeAllModal()),
                  //     dispatch(removeLink()),
                  //     dispatch(setLinkHighlight(false));
                }}
              >
                <RxCross2 className="text-2xl" />
              </div>
            </div>

            {/* {
    name: "Skype",
    title: "Skype",
    img: skype,
    placeholder: "Skype*",
    linkID: 12,
  }, */}

            {linkEdit ? (
              <div className="w-[100%] h-[93%] flex">
                {/* --------------------------------------------croper for logo image------------------------------------------------  */}
                <Cropper
                  cropModal={cropLogoModal}
                  handleclosecropper={handlecloselogocropper}
                  theimg={logoimg}
                  myimg={mylogolimg}
                  setmyimg={setmylogolimg}
                  setcrop={setCroplogo}
                  crop={croplogo}
                  aspect={1 / 1}
                  setReduxState={handleImageChange}
                  isCircle={false}
                  isNotRedux={true}
                />
                <div className="w-[64%] h-[100%]">
                  <div className="mt-10 w-[90%] flex justify-center">
                    <div className="h-[120px] w-[120px] relative ">
                      <img
                        src={linkInfo?.image}
                        alt=""
                        className="h-[120px] w-[120px] rounded-3xl object-cover"
                      />
                      {linkInfo?.linkID === 49 ||
                      linkInfo?.linkID === 50 ||
                      linkInfo?.linkID === 51 ||
                      linkInfo?.linkID === 52 ? (
                        <label
                          for="qrimg"
                          class="absolute right-[-2px] top-[-2px] cursor-pointer"
                        >
                          <MdAddCircleOutline className="text-2xl" />
                          <input
                            type="file"
                            name="qrimg"
                            id="qrimg"
                            className="opacity-0 w-[0px] h-[0px]"
                            onChange={handleLogoImageChange}
                            key={logoKey}
                          />
                        </label>
                      ) : null}
                    </div>
                  </div>

                  {/* <div className="mt-8">
                    <h2 className="text-sm font-medium">Link Title*</h2>
                    <input
                      type="text"
                      className="mt-2 outline-none border-none w-[500px]  h-[50px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
                    />
                  </div> */}

                  <div className="mt-8">
                    <h2 className="text-sm font-medium ">
                      {t(linkInfo?.placeholder)}
                    </h2>
                    <input
                      type={
                        linkInfo?.linkID === 6 || linkInfo?.linkID === 10
                          ? "number"
                          : "text"
                      }
                      className="mt-2 outline-none border-none w-[90%]  h-[50px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
                      onChange={(e) =>
                        setLinkValue({ ...linkValue, value: e.target.value })
                      }
                      value={linkValue?.value}
                    />
                    {linkInfo?.linkID === 49 ||
                    linkInfo?.linkID === 50 ||
                    linkInfo?.linkID === 51 ||
                    linkInfo?.linkID === 52 ? (
                      <>
                        <h2 className="text-sm font-medium mt-4">Title*</h2>
                        <input
                          type="text"
                          className="mt-2 outline-none border-none w-[90%]  h-[50px] bg-[#f7f7f7] rounded-lg p-5 placeholder:text-sm"
                          onChange={(e) =>
                            setLinkInfo({
                              ...linkInfo,
                              name: e.target.value,
                            })
                          }
                          value={linkInfo?.name}
                        />
                      </>
                    ) : null}

                    <div className="w-[90%] flex justify-center items-center mt-5">
                      <div
                        className="h-[38px] w-[110px] rounded-full cursor-pointer font-[500] flex justify-center items-center mr-1 bg-[#f0f0f0]"
                        onClick={() => handleLinkEditModal()}
                      >
                        {t("Cancel")}
                      </div>
                      {checkAdded(linkInfo?.linkID) ? (
                        <>
                          <div
                            className="h-[38px] w-[110px] rounded-full cursor-pointer font-[500] flex justify-center items-center ml-1 bg-black text-white"
                            onClick={() =>
                              updateNewLink(
                                {
                                  image: linkInfo?.image,
                                  linkID: linkInfo?.linkID,
                                  name: linkInfo?.name,
                                  value: linkValue?.value,
                                  shareable: linkValue?.shareable,
                                },
                                uid,
                                links,
                                () => setLinkEdit(false),
                                ifCompany,
                                allProfiles,
                                t("Link updated successfully")
                              )
                            }
                          >
                            {t("Update")}
                          </div>

                          {/* <div
                            className="h-[38px] w-[110px] rounded-full cursor-pointer font-[500] flex justify-center items-center ml-2 border border-red-500 text-red-500"
                            onClick={() =>
                              renoveLink(
                                {
                                  image: "",
                                  linkID: linkInfo?.linkID,
                                  name: linkInfo?.name,
                                  value: linkValue?.value,
                                  shareable: linkValue?.shareable,
                                },
                                uid,
                                links,
                                () => setLinkEdit(false)
                              )
                            }
                          >
                            Delete
                          </div> */}
                        </>
                      ) : (
                        <div
                          className="h-[38px] w-[110px] rounded-full cursor-pointer font-[500] flex justify-center items-center ml-1 bg-black text-white"
                          onClick={() => {
                            if (linkInfo?.linkID === 20) {
                              if (isValidEmail(linkValue?.value)) {
                                addNewLink(
                                  {
                                    image: linkInfo?.image,
                                    linkID: linkInfo?.linkID,
                                    name: linkInfo?.name,
                                    value: linkValue?.value,
                                    shareable: linkValue?.shareable,
                                  },
                                  uid,
                                  links,
                                  handleLinkEditModal,
                                  ifCompany,
                                  allProfiles,
                                  t("Link added successfully")
                                );
                              } else {
                                toast.error("please enter valid email");
                              }
                            } else {
                              addNewLink(
                                {
                                  image: linkInfo?.image,
                                  linkID: linkInfo?.linkID,
                                  name: linkInfo?.name,
                                  value: linkValue?.value,
                                  shareable: linkValue?.shareable,
                                },
                                uid,
                                links,
                                handleLinkEditModal,
                                ifCompany,
                                allProfiles,
                                t("Link added successfully")
                              );
                            }
                          }}
                        >
                          {t("Add")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-[34%] h-[100%]">
                  <Mobile
                    linkInfo={linkInfo}
                    ifAdded={checkAdded(linkInfo?.linkID)}
                  />
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-medium">{t("Add Content")}</h2>
                <p className="text-sm mt-2 text-[#4F4F4F]">
                  {t(
                    "Select from our wide variety of links and contact info below"
                  )}
                </p>
                <div className="mt-10">
                  <h2 className="font-medium text-[#4F4F4F]">{t("Contact")}</h2>
                  <div className="grid sm:grid-cols-3 grid-cols-1 gap-x-4 ">
                    {/* flex justify-around flex-wrap */}
                    {contactIcons.map((elm, i) => {
                      return (
                        <div
                          className=" h-[70px] shadow-sm w-[270px] rounded-xl  bg-[#f7f7f7] hover:bg-white hover:shadow-xl cursor-pointer p-2 flex items-center mt-5  relative"
                          onClick={() => {
                            handleLinkEditModal(), addAlreadyExist(elm, i);
                          }}
                          // onClick={
                          //   checkAdded(elm?.name)
                          //     ? () => {
                          //         addlinkname(elm?.name),
                          //           dispatch(openLinkUpdateModal()),
                          //           dispatch(addLink(elm));
                          //       }
                          //     : () => {
                          //         dispatch(openLinkEditModal()),
                          //           dispatch(addLink(elm));
                          //       }
                          // }
                        >
                          {checkAdded(elm?.linkID) && (
                            <HiBadgeCheck className="absolute right-[-4px] top-[-7px] text-green-500 text-2xl" />
                          )}
                          <div className="flex justify-between items-center w-[100%]">
                            <div className="flex h-[100%] items-center">
                              <img
                                src={elm?.img}
                                className="h-[45px] w-[45px] "
                              />
                              <p className="text-sm font-medium ml-[11px]">
                                {t(elm?.name)}
                              </p>
                            </div>
                            <div className="h-[32px] w-[64px] bg-white  flex justify-center items-center border rounded-2xl hover:bg-[#f7f7f7]">
                              +
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* ------------------------------------------Social icons------------------------------------  */}

                  <div className="mt-10">
                    <h2 className="font-medium text-[#4F4F4F]">
                      {t("Social")}
                    </h2>
                    <div className="  grid sm:grid-cols-3 grid-cols-1 gap-x-4">
                      {/* flex justify-around flex-wrap */}
                      {socialIcons.map((elm, i) => {
                        return (
                          <div
                            className=" h-[70px] shadow-sm w-[270px] rounded-xl   bg-[#f7f7f7] hover:bg-white hover:shadow-xl cursor-pointer p-2 flex items-center mt-5 relative"
                            onClick={() => {
                              handleLinkEditModal(), addAlreadyExist(elm, i);
                            }}
                            //   onClick={
                            //     checkAdded(elm?.name)
                            //       ? () => {
                            //           dispatch(openLinkUpdateModal()),
                            //             dispatch(addLink(elm));
                            //         }
                            //       : () => {
                            //           dispatch(openLinkEditModal()),
                            //             dispatch(addLink(elm));
                            //         }
                            //   }
                          >
                            {checkAdded(elm?.linkID) && (
                              <HiBadgeCheck className="absolute right-[-4px] top-[-7px] text-green-500 text-2xl" />
                            )}

                            <div className="flex justify-between items-center w-[100%]">
                              <div className="flex h-[100%] items-center">
                                <img
                                  src={elm.img}
                                  className="h-[45px] w-[45px] "
                                />
                                <p className="text-sm font-medium ml-[11px]">
                                  {elm.name}
                                </p>
                              </div>
                              <div className="h-[32px] w-[64px] bg-white  flex justify-center items-center border rounded-2xl hover:bg-[#f7f7f7]">
                                +
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ------------------------------------------Music icons------------------------------------  */}

                  <div className="mt-10">
                    <h2 className="font-medium text-[#4F4F4F]">
                      {t("Multimedia")}
                    </h2>
                    <div className="  grid sm:grid-cols-3 grid-cols-1 gap-x-4">
                      {/* flex justify-around flex-wrap */}
                      {media?.map((elm, i) => {
                        return (
                          <div
                            className=" h-[70px] shadow-sm w-[270px] rounded-xl   bg-[#f7f7f7] hover:bg-white hover:shadow-xl cursor-pointer p-2 flex items-center mt-5 relative"
                            onClick={() => {
                              handleLinkEditModal(), addAlreadyExist(elm, i);
                            }}
                            //   onClick={
                            //     checkAdded(elm?.title)
                            //       ? () => {
                            //           dispatch(openLinkUpdateModal()),
                            //             dispatch(addLink(elm));
                            //         }
                            //       : () => {
                            //           dispatch(openLinkEditModal()),
                            //             dispatch(addLink(elm));
                            //         }
                            //   }
                          >
                            {checkAdded(elm?.linkID) && (
                              <HiBadgeCheck className="absolute right-[-4px] top-[-7px] text-green-500 text-2xl" />
                            )}

                            <div className="flex justify-between items-center w-[100%]">
                              <div className="flex h-[100%] items-center">
                                <img
                                  src={elm.img}
                                  className="h-[45px] w-[45px]"
                                />
                                <p className="text-sm font-medium ml-[11px]">
                                  {elm.name}
                                </p>
                              </div>
                              <div className="h-[32px] w-[64px] bg-white  flex justify-center items-center border rounded-2xl hover:bg-[#f7f7f7]">
                                +
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ------------------------------------------Payment icons------------------------------------  */}
                  <div className="mt-10">
                    <h2 className="font-medium text-[#4F4F4F]">
                      {t("Payment")}
                    </h2>
                    <div className="  grid sm:grid-cols-3 grid-cols-1 gap-x-4">
                      {/* flex justify-around flex-wrap */}
                      {payment?.map((elm, i) => {
                        return (
                          <div
                            className=" h-[70px] shadow-sm w-[270px] rounded-xl   bg-[#f7f7f7] hover:bg-white hover:shadow-xl cursor-pointer p-2 flex items-center mt-5 relative"
                            onClick={() => {
                              handleLinkEditModal(), addAlreadyExist(elm, i);
                            }}
                            //   onClick={
                            //     checkAdded(elm?.title)
                            //       ? () => {
                            //           dispatch(openLinkUpdateModal()),
                            //             dispatch(addLink(elm));
                            //         }
                            //       : () => {
                            //           dispatch(openLinkEditModal()),
                            //             dispatch(addLink(elm));
                            //         }
                            //   }
                          >
                            {checkAdded(elm?.linkID) && (
                              <HiBadgeCheck className="absolute right-[-4px] top-[-7px] text-green-500 text-2xl" />
                            )}

                            <div className="flex justify-between items-center w-[100%]">
                              <div className="flex h-[100%] items-center">
                                <img
                                  src={elm.img}
                                  className="h-[45px] w-[45px] "
                                />
                                <p className="text-sm font-medium ml-[11px]">
                                  {elm.name}
                                </p>
                              </div>
                              <div className="h-[32px] w-[64px] bg-white  flex justify-center items-center border rounded-2xl hover:bg-[#f7f7f7]">
                                +
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ------------------------------------------More icons------------------------------------  */}
                  <div className="mt-10">
                    <h2 className="font-medium text-[#4F4F4F]">{t("More")}</h2>
                    <div className="  grid sm:grid-cols-3 grid-cols-1 gap-x-4">
                      {/* flex justify-around flex-wrap */}
                      {more?.map((elm, i) => {
                        return (
                          <div
                            className=" h-[70px] shadow-sm w-[270px] rounded-xl   bg-[#f7f7f7] hover:bg-white hover:shadow-xl cursor-pointer p-2 flex items-center mt-5 relative"
                            onClick={() => {
                              handleLinkEditModal(), addAlreadyExist(elm, i);
                            }}
                            //   onClick={
                            //     checkAdded(elm?.title)
                            //       ? () => {
                            //           dispatch(openLinkUpdateModal()),
                            //             dispatch(addLink(elm));
                            //         }
                            //       : () => {
                            //           dispatch(openLinkEditModal()),
                            //             dispatch(addLink(elm));
                            //         }
                            //   }
                          >
                            {checkAdded(elm?.linkID) && (
                              <HiBadgeCheck className="absolute right-[-4px] top-[-7px] text-green-500 text-2xl" />
                            )}

                            <div className="flex justify-between items-center w-[100%]">
                              <div className="flex h-[100%] items-center">
                                <img
                                  src={
                                    ifCustom(elm?.linkID) &&
                                    checkAdded(elm?.linkID) &&
                                    checkIfCstmAdded(elm?.linkID)?.image
                                      ? checkIfCstmAdded(elm?.linkID)?.image
                                      : elm.img
                                  }
                                  className="h-[45px] w-[45px] rounded-lg object-cover"
                                />
                                <p className="text-sm font-medium ml-[11px]">
                                  {ifCustom(elm?.linkID) &&
                                  checkAdded(elm?.linkID) &&
                                  checkIfCstmAdded(elm?.linkID)?.name
                                    ? splitString(
                                        t(checkIfCstmAdded(elm?.linkID)?.name),
                                        33
                                      )
                                    : t(elm.name)}

                                  {/* {elm.name} */}
                                </p>
                              </div>
                              <div className="h-[32px] w-[64px] bg-white  flex justify-center items-center border rounded-2xl hover:bg-[#f7f7f7]">
                                +
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* )} */}
          {/* {linkEditmodal && (
            <Linkeditmodal
              user={user}
              link={link}
              isDesktopOrLaptop={isDesktopOrLaptop}
            />
          )}
          {linkupdateModal && (
            <LinkupdateModal
              user={user}
              link={link}
              isDesktopOrLaptop={isDesktopOrLaptop}
            />
          )} */}
          <ToastContainer
            position="bottom-left"
            autoClose={1000}
            theme="colored"
            hideProgressBar
          />
        </Box>
      </Modal>
    </>
  );
};

export default SocialLinkModal;
