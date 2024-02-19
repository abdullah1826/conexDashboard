import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { RxCross2 } from "react-icons/rx";
import SelectSearch from "react-select-search";
import "react-select-search/style.css";
import { BiSearchAlt } from "react-icons/bi";
import prsnPlshldr from "../../imgs/prsnPlshldr.png";
import Checkbox from "@mui/material/Checkbox";
import { addTeamMember, getAllChilds } from "../../Services";

const AddMemberModal = ({ addModal, handleAddModal, singleTeam }) => {
  // --------------------------------------------------Create Single self profile----------------------------------

  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    height: 400,
    bgcolor: "white",
    // border: '2px solid #000',
    boxShadow: 24,
    border: "none",
    outline: "none",
    borderRadius: "18px",
    // p: "32px",
  };

  let [allProfiles, setAllProfiles] = useState([]);
  let [filtered, setfiltered] = useState([]);
  let [memberIds, setMemberIds] = useState([]);

  let getAllProfiles = (obj) => {
    setAllProfiles(Object.values(obj));
    setfiltered(Object.values(obj));
  };

  useEffect(() => {
    getAllChilds(getAllProfiles);
  }, []);

  //---------------------------------------------------(search functionality)-----------------------------------------------

  let [search, setsearch] = useState("");

  useEffect(() => {
    const result = allProfiles?.filter((user) => {
      return user?.name.toLowerCase().match(search.toLowerCase());
    });
    setfiltered(result);
    // console.log(result);
  }, [search]);

  //   console.log("single", singleTeam);

  let addRemoveMember = (e, id) => {
    if (singleTeam?.members) {
      let exist = singleTeam?.members?.find((elm) => {
        return elm === id;
      });

      let updatedIds = singleTeam?.members?.filter((elm) => {
        return elm != id;
      });

      if (!exist) {
        setMemberIds([...memberIds, id]);
      } else {
        setMemberIds([...updatedIds]);
      }
    }
  };

  console.log("single", memberIds);

  return (
    <div>
      <Modal
        open={addModal}
        onClose={() => handleAddModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <div className="h-[100%] w-[100%]">
            <div className="w-[100%] flex justify-center mt-4">
              <div className="sm:w-[80%] w-[55%] sm:h-[45px] h-[70%] flex items-center rounded-[36px] bg-white shadow-lg border">
                <input
                  type="text"
                  className="h-[100%] sm:w-[88%] w-[70px] outline-none rounded-[36px] sm:pl-[10px] pl-[0px] ml-2 sm:text[20px] text[11px]"
                  placeholder="Search"
                  onChange={(e) => setsearch(e.target.value)}
                  value={search}
                />

                <BiSearchAlt className="text-[22px] text-[#9B9B9B] mr-2" />
              </div>
            </div>
            <div className="h-[68%] w-[100%]  flex justify-center items-center">
              <div className="h-[85%] w-[90%]" style={{ overflowY: "scroll" }}>
                {filtered?.map((elm) => {
                  return (
                    <div className="h-[50px] w-[100%] mt-2 flex justify-between cursor-pointer hover:bg-slate-100 rounded-md">
                      <div className="h-[100%]  w-[250px] flex items-center">
                        <div className="h-[40px] w-[25%] ml-2">
                          <img
                            src={
                              elm?.profileUrl ? elm?.profileUrl : prsnPlshldr
                            }
                            alt=""
                            className="h-[40px] w-[40px] rounded-full"
                          />
                        </div>

                        <p className="mr-3 w-[70%]">{elm?.name}</p>
                      </div>
                      <div className="h-[100%] w-[50px]  flex justify-center items-center">
                        <Checkbox onClick={() => addRemoveMember(elm?.id)} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="w-[100%] h-[45px] flex justify-evenly items-center">
              {/* <button
                  className="w-[45%] h-[45px] outline-none bg-[black] rounded-[36px] p-[10px] placeholder:text-xs text-[white]"
                  onClick={() => callBack()}
                >
                  Cancel
                </button> */}
              <button
                className="w-[45%] h-[45px] outline-none bg-[black] rounded-[36px] p-[10px] placeholder:text-xs text-[white]"
                onClick={() => addTeamMember(singleTeam, callBack)}
              >
                Add
              </button>
            </div>
          </div>
        </Box>
      </Modal>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default AddMemberModal;
