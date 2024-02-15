import React from "react";
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

// import { removeLink } from "../Redux/Singlelinkslice";

const SocialLinkModal = ({ modal, handleClose }) => {
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

  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isDesktopOrLaptop ? 1000 : "95%",
    height: 600,
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

  return (
    <>
      <Modal
        open={modal}
        onClose={() => {
          //   dispatch(closeAllModal()),
          //     dispatch(removeLink()),
          //     dispatch(setLinkHighlight(false));
          handleClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          {/* {linkModal && ( */}
          <div className="overflow-y-scroll h-[100%] scrollbar-hide">
            <div className="w-[100%] relative ">
              <div
                className="cursor-pointer absolute right-0 top-0 "
                onClick={() => {
                  handleClose();
                  //   dispatch(closeAllModal()),
                  //     dispatch(removeLink()),
                  //     dispatch(setLinkHighlight(false));
                }}
              >
                <RxCross2 className="text-2xl" />
              </div>
            </div>
            <h2 className="text-2xl font-medium">Add Content</h2>
            <p className="text-sm mt-2 text-[#4F4F4F]">
              Select from our wide variety of links and contact info below.
            </p>

            {/* ------------------------------------------Contact icons------------------------------------  */}

            <div className="mt-10">
              <h2 className="font-medium text-[#4F4F4F]">Contact</h2>
              <div className="grid sm:grid-cols-3 grid-cols-1 gap-x-4 ">
                {/* flex justify-around flex-wrap */}
                {contactIcons.map((elm) => {
                  return (
                    <div
                      className=" h-[70px] shadow-sm w-[270px] rounded-xl  bg-[#f7f7f7] hover:bg-white hover:shadow-xl cursor-pointer p-2 flex items-center mt-5  relative"
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
                      {/* {checkAdded(elm?.title) && (
                        <HiBadgeCheck className="absolute right-[-4px] top-[-7px] text-green-500 text-2xl" />
                      )} */}
                      <div className="flex justify-between items-center w-[100%]">
                        <div className="flex h-[100%] items-center">
                          <img src={elm?.img} className="h-[45px] w-[45px] " />
                          <p className="text-sm font-medium ml-[11px]">
                            {elm?.name}
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
                <h2 className="font-medium text-[#4F4F4F]">Social</h2>
                <div className="  grid sm:grid-cols-3 grid-cols-1 gap-x-4">
                  {/* flex justify-around flex-wrap */}
                  {socialIcons.map((elm) => {
                    return (
                      <div
                        className=" h-[70px] shadow-sm w-[270px] rounded-xl   bg-[#f7f7f7] hover:bg-white hover:shadow-xl cursor-pointer p-2 flex items-center mt-5 relative"
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
                        {/* {checkAdded(elm?.title) && (
                            <HiBadgeCheck className="absolute right-[-4px] top-[-7px] text-green-500 text-2xl" />
                          )} */}

                        <div className="flex justify-between items-center w-[100%]">
                          <div className="flex h-[100%] items-center">
                            <img src={elm.img} className="h-[45px] w-[45px] " />
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
                <h2 className="font-medium text-[#4F4F4F]">Music Media</h2>
                <div className="  grid sm:grid-cols-3 grid-cols-1 gap-x-4">
                  {/* flex justify-around flex-wrap */}
                  {media?.map((elm) => {
                    return (
                      <div
                        className=" h-[70px] shadow-sm w-[270px] rounded-xl   bg-[#f7f7f7] hover:bg-white hover:shadow-xl cursor-pointer p-2 flex items-center mt-5 relative"
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
                        {/* {checkAdded(elm?.title) && (
                            <HiBadgeCheck className="absolute right-[-4px] top-[-7px] text-green-500 text-2xl" />
                          )} */}

                        <div className="flex justify-between items-center w-[100%]">
                          <div className="flex h-[100%] items-center">
                            <img src={elm.img} className="h-[45px] w-[45px] " />
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
                <h2 className="font-medium text-[#4F4F4F]">Payment</h2>
                <div className="  grid sm:grid-cols-3 grid-cols-1 gap-x-4">
                  {/* flex justify-around flex-wrap */}
                  {payment?.map((elm) => {
                    return (
                      <div
                        className=" h-[70px] shadow-sm w-[270px] rounded-xl   bg-[#f7f7f7] hover:bg-white hover:shadow-xl cursor-pointer p-2 flex items-center mt-5 relative"
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
                        {/* {checkAdded(elm?.title) && (
                            <HiBadgeCheck className="absolute right-[-4px] top-[-7px] text-green-500 text-2xl" />
                          )} */}

                        <div className="flex justify-between items-center w-[100%]">
                          <div className="flex h-[100%] items-center">
                            <img src={elm.img} className="h-[45px] w-[45px] " />
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
                <h2 className="font-medium text-[#4F4F4F]">More</h2>
                <div className="  grid sm:grid-cols-3 grid-cols-1 gap-x-4">
                  {/* flex justify-around flex-wrap */}
                  {more?.map((elm) => {
                    return (
                      <div
                        className=" h-[70px] shadow-sm w-[270px] rounded-xl   bg-[#f7f7f7] hover:bg-white hover:shadow-xl cursor-pointer p-2 flex items-center mt-5 relative"
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
                        {/* {checkAdded(elm?.title) && (
                            <HiBadgeCheck className="absolute right-[-4px] top-[-7px] text-green-500 text-2xl" />
                          )} */}

                        <div className="flex justify-between items-center w-[100%]">
                          <div className="flex h-[100%] items-center">
                            <img src={elm.img} className="h-[45px] w-[45px] " />
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
            </div>
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
        </Box>
      </Modal>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default SocialLinkModal;
