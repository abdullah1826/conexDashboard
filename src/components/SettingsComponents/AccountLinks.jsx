import React, { useEffect, useState } from "react";
import { MdDragIndicator } from "react-icons/md";
import Linkedin from "../../imgs/Linkedin.png";
import { IoMdAdd } from "react-icons/io";
import SocialLinkModal from "../Modals/SocialLinkModal";
import { useSelector } from "react-redux";
import { returnIcons } from "../../assets/ReturnSocialIcons";
import { getAllChilds, renoveLink, updateLinkShareAble } from "../../Services";
import { FormControlLabel, Switch, styled } from "@mui/material";
import DeleteModal from "../Modals/DeleteModal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { set, ref } from "firebase/database";

import { db } from "../../firebase";
import { setLinks } from "../../redux/profileInfoSlice";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const AccountLinks = ({ uid }) => {
  let [modal, setmodal] = useState(false);
  let handleModal = () => {
    setmodal(!modal);
  };

  // -------------------------------------------------Mui customize switch-----------------------------------

  const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" {...props} />
  ))(({ theme }) => ({
    width: 38,
    height: 22,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
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
      width: 18,
      height: 18,
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

  const links = useSelector((state) => state.profileInfoSlice.links);
  let [deleteModal, setdeleteModal] = useState(false);
  let [teamId, setteamId] = useState("");

  let handledeleteModal = () => {
    setdeleteModal(!deleteModal);
  };
  let dispatch = useDispatch();
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(links);
  }, [links]);

  // -----------------------getting all users----------------------
  let [allProfiles, setAllProfiles] = useState([]);

  let getAllProfiles = (obj) => {
    setAllProfiles(Object.values(obj));
  };

  useEffect(() => {
    getAllChilds(getAllProfiles, () => console.log("test"));
  }, []);
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, movedItem);
    // dispatch(Addlinks(updatedItems))
    setItems(updatedItems);
    dispatch(setLinks(updatedItems));
    // Convert array of object into object of object
    // const objectOfObjects = {};

    // updatedItems.forEach((obj,index)  => {
    //   const { title, ...rest } = obj;
    //   objectOfObjects[title] = {title,...rest,index};
    // });

    // updating at firebase

    set(ref(db, `Users/${uid}/links/`), [...updatedItems]).then(() => {});
  };

  let updateLinks = () => {
    if (links?.length < 2) {
      dispatch(setLinks([]));
      setItems([]);
    }
  };
  const { t } = useTranslation();
  return (
    <div className="h-[400px] w-[100%]  mt-7 flex flex-col  relative">
      <SocialLinkModal
        modal={modal}
        handleClose={handleModal}
        uid={uid}
        allProfiles={allProfiles}
      />
      <DeleteModal
        deleteModal={deleteModal}
        handledeleteModal={handledeleteModal}
        text={t("Are you sure to delete this link?")}
        func={() =>
          renoveLink(
            {
              linkID: teamId,
            },
            uid,
            links,
            updateLinks,
            () => true,
            allProfiles
          )
        }
      />

      <div className="overflow-y-scroll h-[85%] ">
        <DragDropContext
          onDragEnd={handleDragEnd}
          // className="w-[100%]  flex justify-start gap-x-6 flex-wrap mt-2"
        >
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="w-[100%]  "
              >
                {/* allLinks */}
                {items?.map((elm, index) => (
                  <Draggable
                    key={elm.name}
                    draggableId={elm.name}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        // className="w-[30%]"
                      >
                        <>
                          <div className="sm:w-[70%] w-[100%] h-[57px] bg-white rounded-[36px] shadow-lg flex justify-center items-center mt-4">
                            <div className="w-[95%] h-[80%] flex justify-between">
                              <div className="w-[35%] flex items-center">
                                <MdDragIndicator className="text-[#E1E1E1] text-xl" />
                                <div className="w-[30px]">
                                  <img
                                    src={
                                      elm?.image
                                        ? elm?.image
                                        : returnIcons(elm?.linkID)
                                    }
                                    alt=""
                                    className="h-[29px]  w-[29px]"
                                    style={{
                                      borderRadius: elm?.image ? "8px" : "0px",
                                    }}
                                  />
                                </div>

                                <p className="font-[600] text-[14px] ml-2">
                                  {elm?.name}
                                </p>
                              </div>
                              <div className="w-[155px] flex items-center justify-around">
                                <div
                                  className="w-[74px] h-[30px] rounded-[36px] shadow-lg font-[600] text-[8px] flex justify-center items-center cursor-pointer border"
                                  onClick={() => {
                                    handledeleteModal(), setteamId(elm?.linkID);
                                  }}
                                >
                                  {t("Remove Link")}
                                </div>
                                {/* <div className="w-[74px] h-[30px] rounded-[36px] shadow-lg bg-black text-white font-[600] text-[8px] flex justify-center items-center cursor-pointer border">
                  Open Link
                </div> */}
                                {/* <Switch
                                  checked={elm?.shareable}
                                  onChange={() =>
                                    updateLinkShareAble(
                                      uid,
                                      elm?.linkID,
                                      elm?.shareable,
                                      links
                                    )
                                  }
                                  className="ml-1"
                                /> */}

                                <FormControlLabel
                                  control={
                                    <IOSSwitch
                                      checked={elm?.shareable}
                                      onChange={() =>
                                        updateLinkShareAble(
                                          uid,
                                          elm?.linkID,
                                          elm?.shareable,
                                          links,
                                          allProfiles
                                        )
                                      }
                                      className="ml-8"
                                    />
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <br />
      </div>
      {/* {links?.map((elm) => {
        return (
          <div className="sm:w-[70%] w-[100%] h-[57px] bg-white rounded-[36px] shadow-lg flex justify-center items-center mt-4">
            <div className="w-[95%] h-[80%] flex justify-between">
              <div className="w-[129px] flex items-center ">
                <MdDragIndicator className="text-[#E1E1E1] text-xl" />
                <div className="w-[30px]">
                  <img
                    src={returnIcons(elm?.linkID)}
                    alt=""
                    className="h-[29px]  w-[29px]"
                  />
                </div>

                <p className="font-[600] text-[14px] ml-2">{elm?.name}</p>
              </div>
              <div className="w-[155px] flex items-center justify-around">
                <div
                  className="w-[74px] h-[30px] rounded-[36px] shadow-lg font-[600] text-[8px] flex justify-center items-center cursor-pointer border"
                  onClick={() => {
                    handledeleteModal(), setteamId(elm?.linkID);
                  }}
                >
                  Remove Link
                </div>
               
                <Switch
                 
                  checked={elm?.shareable}
                  onChange={() =>
                    updateLinkShareAble(uid, elm?.linkID, elm?.shareable, links)
                  }
                  
                  className="ml-1"
                />
              </div>
            </div>
          </div>
        );
      })} */}

      <div
        className="sm:w-[70%] w-[100%] h-[57px] bg-white rounded-[36px] shadow-lg flex justify-center items-center  absolute bottom-2 cursor-pointer"
        onClick={() => handleModal()}
      >
        <IoMdAdd className="text-[#878787] " />
        <p className="text-[12px] font-[500] text-[#878787] ml-[2px]">
          {t("Add Links and Contacts")}
        </p>
      </div>
    </div>
  );
};

export default AccountLinks;
