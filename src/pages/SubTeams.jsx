import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaSquarePlus } from "react-icons/fa6";
import { BiSearchAlt } from "react-icons/bi";
import { GoPerson } from "react-icons/go";
import team1 from "../imgs/team1.png";
import { HiDotsVertical } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import NavbarFooter from "./NavbarFooter";
import CreateNewTeam from "../components/Modals/CreateNewTeam";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllTeams } from "../Services";
import bgplhldr from "../imgs/bgplhldr.png";
import AddMemberModal from "../components/Modals/AddMemberModal";

const SubTeams = () => {
  var screen = window.innerWidth;
  let [modal, setModal] = useState(false);
  let [teams, setTeams] = useState([]);
  let [singleTeam, setSingleTeam] = useState({});

  let handleModal = () => {
    setModal(!modal);
  };

  let getTeams = (value) => {
    setTeams(Object.values(value));
  };

  useEffect(() => {
    getAllTeams(getTeams);
  }, []);

  let [addModal, setAddModal] = useState(false);
  let handleAddModal = () => {
    setAddModal(!addModal);
  };

  console.log(teams);
  return (
    <div className="w-[100%] flex bg-[#F8F8F8] h-[100vh] max-h-[100vh] relative">
      {screen >= 450 ? <Sidebar /> : null}
      <div className="sm:w-[80%] w-[100%] flex justify-center overflow-y-scroll">
        <CreateNewTeam modal={modal} handleModal={handleModal} />
        <AddMemberModal
          addModal={addModal}
          handleAddModal={handleAddModal}
          singleTeam={singleTeam}
        />
        <div className="w-[90%] ">
          <div className="w-[100%] flex justify-between h-[50px]  mt-[30px]">
            <div className="w-[15%] h-[100%] flex items-center">
              <p
                className="font-[600] sm:text-[20px] text-[11px]"
                style={
                  screen <= 450
                    ? {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        whiteSpace: "nowrap",
                        flexDirection: "column",
                        marginTop: "5px",
                      }
                    : null
                }
              >
                Sub Teams{" "}
                <span className="font-[500] sm:text-[10px] text-[12px]  text-[#9B9B9B]">
                  {`(${teams?.length})`}
                </span>
              </p>
            </div>
            <div
              className="sm:w-[75%] w-[80%] h-[100%] flex justify-between"
              style={screen <= 450 ? { alignItems: "center" } : null}
            >
              {"\u00A0"} {"\u00A0"}{" "}
              <div className="sm:w-[65%] w-[55%] sm:h-[100%] h-[70%] flex items-center rounded-[36px] bg-white shadow-xl">
                {screen <= 450 ? (
                  <BiSearchAlt className="text-[22px] text-[#fcb6b6] ml-2" />
                ) : null}
                <input
                  type="text"
                  className="h-[100%] sm:w-[88%] w-[70px] outline-none rounded-[36px] sm:pl-[10px] pl-[0px] ml-2 sm:text[20px] text[11px]"
                  placeholder="Search"
                />
                {screen >= 450 ? (
                  <BiSearchAlt className="text-[22px] text-[#9B9B9B] ml-2" />
                ) : null}
              </div>
              {"\u00A0"}
              <div
                className="w-[185px] sm:h-[100%] h-[70%] rounded-[36px] bg-white shadow-xl flex justify-center items-center cursor-pointer"
                onClick={() => handleModal()}
              >
                <IoMdAdd className="text-[black] mr-1" />{" "}
                <p className="font-[500] text-[12px] text-black mr-1">
                  Add Sub Team
                </p>
              </div>
            </div>
          </div>

          <div className="w-[100%] mt-[50px] h-[68%] overflow-y-scroll ">
            {teams?.map((team) => {
              return (
                <div
                  className="w-[100%] sm:h-[153px] h-[100px] shadow-xl sm:rounded-[50px] rounded-[32px] bg-white flex justify-between mt-[20px]"
                  onClick={() => setSingleTeam(team)}
                >
                  <div
                    className="w-[55%] h-[100%]  rounded-[50px] flex justify-between items-center "
                    style={screen <= 450 ? { alignItems: "end" } : null}
                  >
                    <div className="w-[47%] h-[92%] rounded-[45px]  ml-[7px]">
                      <img
                        src={team?.image ? team?.image : bgplhldr}
                        alt="team"
                        className="sm:h-[100%] sm:w-[100%] h-[83px] w-[90px] object-cover sm:rounded-[45px] rounded-[30px]"
                      />
                    </div>
                    <div className="h-[100%] w-[46%] flex  items-center ">
                      <div>
                        <h2
                          className="sm:text-[24px] text-[12px] font-[400]"
                          style={
                            screen <= 450 ? { whiteSpace: "nowrap" } : null
                          }
                        >
                          {team?.teamName}
                        </h2>
                        <div className="flex items-center text-[#7F7F7F]">
                          <GoPerson className="text-xl" />
                          <p className="ml-1 sm:text-[16px] text-[10px] font-[400]">
                            22 Members
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-[100%] w-[23%] flex justify-around  items-center">
                    <div
                      className="sm:h-[43px] h-[25px] sm:w-[115px] w-[94px] bg-[#F3F3F3] rounded-[21px] cursor-pointer flex justify-center items-center"
                      onClick={() => handleAddModal()}
                    >
                      <p
                        style={
                          screen <= 450
                            ? { fontSize: "12px", fontFamily: "inter" }
                            : null
                        }
                      >
                        Add
                      </p>
                      <div className="sm:h-[12px] sm:w-[12px] h-[10px] w-[10px] bg-white flex justify-center items-center ml-[4px]">
                        <p style={{ marginBottom: "2px" }}>+</p>
                      </div>
                    </div>
                    <HiDotsVertical className="text-[#BDBBBB] text-4xl cursor-pointer" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <ToastContainer
          position="bottom-left"
          autoClose={1000}
          theme="colored"
          hideProgressBar
        />
      </div>
      <br />
      <br />
      <br />
      {screen <= 450 ? <NavbarFooter /> : null}
    </div>
  );
};

export default SubTeams;
