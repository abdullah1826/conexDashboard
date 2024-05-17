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

const SingleTeamModal = ({
  teamModal,
  handleTeamModal,
  singleTeam,
  singleTeamMembers,
  setSingleTeamMembers,
}) => {
  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 530,
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
          <div className="h-[100%] w-[100%]">
            <div className="w-[99%] flex justify-end mt-1">
              <MdOutlineCancel
                className="text-2xl cursor-pointer"
                onClick={() => onCloseAction()}
              />
            </div>
            <div className="w-[100%] flex justify-center mt-1">
              <div className="h-[200px] w-[90%] border rounded-[40px] relative flex justify-center">
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
            <div className="h-[250px] w-[100%] mt-[50px] flex justify-evenly items-center flex-wrap overflow-y-scroll">
              {members?.map((elm) => {
                return (
                  <div className="w-[30%] h-[240px] rounded-[50px] border mt-5 relative">
                    <div className="w-[100%] rounded-t-[50px] h-[40%] relative flex justify-center">
                      <img
                        src={elm?.profileUrl ? elm?.profileUrl : prsnPlshldr}
                        alt=""
                        className="h-[70px] w-[70px] rounded-full absolute bottom-[-30px]"
                      />
                      <img
                        src={elm?.coverUrl ? elm?.coverUrl : bgplhldr}
                        alt=""
                        className="w-[100%] rounded-t-[50px] h-[100%]"
                      />
                    </div>

                    <div className="w-[100%] flex items-center flex-col mt-9">
                      <h2 className="text-[12px] font-[500]">{elm?.name}</h2>
                      <p className="text-[10px] font-[400] w-[90%] text-center">
                        {splitString(elm?.bio, 70)}
                      </p>
                    </div>

                    <div className="w-[100%] flex justify-center items-center absolute bottom-3 ">
                      <div
                        className="h-[30px] w-[70px] bg-black rounded-[10px] cursor-pointer font-[600] text-[12px] flex justify-center items-center text-white mr-1"
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
                      <div className="h-[30px] w-[70px] bg-black rounded-[10px] cursor-pointer font-[600] text-[12px] flex justify-center items-center text-white">
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
