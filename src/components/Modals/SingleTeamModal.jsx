import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.min.css";
import { RxCross2 } from "react-icons/rx";
import SelectSearch from "react-select-search";
import { BiSearchAlt } from "react-icons/bi";
import prsnPlshldr from "../../imgs/prsnPlshldr.png";
import Checkbox from "@mui/material/Checkbox";
import {
  addTeamMember,
  getAllChilds,
  getAllTeamMembers,
  removeTeamMember,
  splitString,
} from "../../Services";
import bgplhldr from "../../imgs/bgplhldr.png";
import { MdOutlineCancel } from "react-icons/md";
import { useTranslation } from "react-i18next";

const SingleTeamModal = ({
  teamModal,
  handleTeamModal,
  singleTeam,
  singleTeamMembers,
  setSingleTeamMembers,
}) => {
  const { t } = useTranslation();
  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 570,
    bgcolor: "white",
    // border: '2px solid #000',
    boxShadow: 24,
    border: "none",
    outline: "none",
    borderRadius: "18px",
    // p: "32px",
  };

  let [members, setmembers] = useState([]);

  // useEffect(() => {
  //   setmembers([]);
  // }, []);

  let onCloseAction = () => {
    handleTeamModal();
  };

  useEffect(() => {
    if (singleTeamMembers) {
      getAllTeamMembers(singleTeamMembers, setmembers, members);
    } else {
      setmembers([]);
    }
  }, [singleTeamMembers]);
  console.log(singleTeamMembers);

  let removeMemberLocaly = (id) => {
    let remainingMembers = members?.filter((elm) => {
      return id != elm?.id;
    });
    setmembers(remainingMembers);
    if (singleTeamMembers) {
      let remainingMembersIds = Object.values(singleTeamMembers)?.filter(
        (elm) => {
          return id != elm;
        }
      );
      setSingleTeamMembers(remainingMembersIds);
    }
  };

  // ---------------------------------------Search functionality--------------------------------------------

  let [filtered, setfiltered] = useState([]);
  useEffect(() => {
    setfiltered(members);
  }, [members]);
  let [search, setsearch] = useState("");

  useEffect(() => {
    const result = members?.filter((contact) => {
      return contact?.name.toLowerCase().match(search.toLowerCase());
    });

    setfiltered(result);
  }, [search]);

  return (
    <div>
      <Modal
        open={teamModal}
        onClose={() => {
          onCloseAction();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <div className="h-[100%] w-[100%] relative">
            <div className="w-[99%] flex justify-end absolute top-1 z-10">
              <MdOutlineCancel
                className="text-2xl cursor-pointer"
                onClick={() => onCloseAction()}
              />
            </div>
            <div className="w-[100%] flex flex-col items-center mt-3">
              <div className="h-[250px] w-[90%] rounded-[40px] relative flex justify-center">
                <div className="w-[300px] h-[75px] rounded-[25px] border border-black absolute bottom-[-40px] bg-white flex justify-center items-center">
                  <p className="text-[32px] font-[500]">
                    {splitString(singleTeam?.teamName, 15)}
                    {/* {singleTeam?.teamName} */}
                  </p>
                </div>
                <img
                  src={singleTeam?.image ? singleTeam?.image : bgplhldr}
                  alt=""
                  className="h-[100%] w-[100%] object-cover rounded-[40px]"
                />
              </div>
            </div>
            {/* <div className="h-[40px] w-[200px] border ml-3 mt-4"></div> */}
            {members?.length > 0 && (
              <div className="w-[100%] flex justify-center mt-12">
                <div className="w-[320px] h-[40px] flex items-center rounded-[36px] bg-white shadow-xl border mr-3 ">
                  <input
                    type="text"
                    className="h-[100%] w-[77%] outline-none rounded-[36px] pl-[10px] ml-2"
                    placeholder={t("Search")}
                    onChange={(e) => setsearch(e.target.value)}
                    value={search}
                  />
                  <BiSearchAlt className="text-[22px] text-[#9B9B9B] ml-6" />
                </div>
              </div>
            )}
            <div className="h-[200px] w-[100%] mt-[10px] flex justify-evenly  flex-wrap overflow-y-scroll">
              {filtered?.map((elm) => {
                return (
                  <div className="w-[21%] h-[160px] rounded-[22px] border mt-3 relative">
                    <div className="w-[100%] rounded-t-[22px] h-[40%] relative flex justify-center">
                      <img
                        src={elm?.profileUrl ? elm?.profileUrl : prsnPlshldr}
                        alt=""
                        className="h-[45px] w-[45px] rounded-full absolute bottom-[-20px]"
                      />
                      <img
                        src={elm?.coverUrl ? elm?.coverUrl : bgplhldr}
                        alt=""
                        className="w-[100%] rounded-t-[22px] h-[100%] object-cover"
                      />
                    </div>

                    <div className="w-[100%] flex items-center flex-col mt-7">
                      <h2 className="text-[12px] font-[500]">{elm?.name}</h2>
                      {/* <p className="text-[10px] font-[400] w-[90%] text-center">
                        {splitString(elm?.bio, 70)}
                      </p> */}
                    </div>

                    <div className="w-[100%] flex justify-center items-center absolute bottom-2 gap-3">
                      <div
                        className="h-[23px] w-[55px] bg-black rounded-[7px] cursor-pointer font-[400] text-[10px] flex justify-center items-center text-white"
                        onClick={() =>
                          removeTeamMember(
                            elm,
                            elm?.id,
                            singleTeam?.teamId,
                            Object.values(singleTeamMembers),
                            removeMemberLocaly
                          )
                        }
                      >
                        Delete
                      </div>
                      <div
                        className="h-[23px] w-[55px] bg-black rounded-[7px] cursor-pointer font-[400] text-[10px] flex justify-center items-center text-white"
                        onClick={() =>
                          window.open(
                            `https://www.profile.connexcard.com/${elm?.id}`
                          )
                        }
                      >
                        Open
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* <div className="w-[27%] h-[210px] rounded-[50px] border mt-5"></div>
              <div className="w-[27%] h-[210px] rounded-[50px] border mt-5"></div>
              <div className="w-[27%] h-[210px] rounded-[50px] border mt-5"></div>
              <div className="w-[27%] h-[210px] rounded-[50px] border mt-5"></div> */}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SingleTeamModal;
