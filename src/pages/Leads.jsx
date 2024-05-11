import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { BiSearchAlt } from "react-icons/bi";
import { MdArrowDropDown } from "react-icons/md";
import { Checkbox, Menu, Tooltip } from "@mui/material";
import { FaEye, FaSquarePlus } from "react-icons/fa6";
import csv from "../imgs/csv.png";
import zap from "../imgs/zap.png";
import { TfiDownload } from "react-icons/tfi";
import c1 from "../imgs/c1.png";
import c2 from "../imgs/c2.png";
import c3 from "../imgs/c3.png";
import c4 from "../imgs/c4.png";
import c5 from "../imgs/c5.png";
import prfl from "../imgs/prfl.jpeg";
import { FaRegTrashCan } from "react-icons/fa6";
import NavbarFooter from "./NavbarFooter";
import CreateNewTeam from "../components/Modals/CreateNewTeam";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { getAllChilds, getAllTeams, getContacts } from "../Services";
import prsnPlshldr from "../imgs/prsnPlshldr.png";
import SingleLeadModal from "../components/Modals/SingleLeadModal";
// import DeleteContact from "../components/Modals/DeleteContactModal";
import DeleteContactModal from "../components/Modals/DeleteContactModal";
import DownloadCsv from "../components/DownloadCsv";

const Leads = () => {
  let [leads, setLeads] = useState([]);
  var screen = window.innerWidth;

  let connexUid = localStorage.getItem("connexUid");
  useEffect(() => {
    getContacts(connexUid, setLeads);
  }, []);

  let [leadModal, setleadModal] = useState(false);
  let handleLeadModal = () => {
    setleadModal(!leadModal);
  };
  let [lead, setLead] = useState({});
  let [deleteModal, setdeleteModal] = useState(false);

  const handleDeleteModal = () => {
    setdeleteModal(!deleteModal);
  };

  let [filtered, setfiltered] = useState([{}]);
  useEffect(() => {
    setfiltered(leads);
  }, [leads]);

  //---------------------------------------------------(search functionality)-----------------------------------------------

  console.log(filtered);

  let [search, setsearch] = useState("");

  useEffect(() => {
    const result = leads?.filter((contact) => {
      return contact?.name.toLowerCase().match(search.toLowerCase());
    });

    setfiltered(result);
  }, [search]);

  // -----------------------getting all subteams----------------------

  let [teams, setTeams] = useState([]);
  let [loading, setloading] = useState(false);
  let getTeams = (value) => {
    if (value) {
      setTeams(Object.values(value));
    }
  };

  useEffect(() => {
    getAllTeams(getTeams, setloading);
  }, []);

  let removeLastLead = () => {
    if (leads?.length < 2) {
      setLeads([]);
      setfiltered([]);
    }
  };
  let [teamId, setTeamId] = useState("all");
  let [userId, setUserId] = useState("all");

  // -----------------------getting all users----------------------
  let [allProfiles, setAllProfiles] = useState([]);

  let getAllProfiles = (obj) => {
    setAllProfiles(Object.values(obj));
  };

  useEffect(() => {
    getAllChilds(getAllProfiles, () => console.log("test"));
  }, []);

  const getMemberbyId = (id) => {
    const member = Object.values(allProfiles)?.find((elm) => {
      return elm?.id === id;
    });
    return member;
  };

  // -----------------------filters----------------------

  useEffect(() => {
    if (teamId === "all") {
      setfiltered(leads);
    } else {
      const filtered = leads?.filter((item) =>
        getMemberbyId(item?.userid)?.teams?.includes(teamId)
      );
      setfiltered(filtered);
    }
  }, [teamId]);

  useEffect(() => {
    if (userId === "all") {
      setfiltered(leads);
    } else {
      const filtered = leads?.filter((item) => item?.userid === userId);
      setfiltered(filtered);
    }
  }, [userId]);

  const returnDate = (milliseconds) => {
    const date = new Date(milliseconds);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  };

  let [startDate, setStartDate] = useState("");
  let [endDate, setEndDate] = useState("");

  const convertDateToMilli = (date) => {
    const selectedDate = new Date(date);
    const dateMilliseconds = selectedDate.getTime();
    console.log(dateMilliseconds);
    return dateMilliseconds;
  };

  useEffect(() => {
    if (startDate !== "" && endDate !== "") {
      const firstDate = convertDateToMilli(startDate);
      const lastDate = convertDateToMilli(endDate);
      console.log(firstDate);
      console.log(lastDate);
      const filterOnDate = leads?.filter((elm) => {
        return elm?.date >= firstDate && elm?.date <= lastDate;
      });
      setfiltered(filterOnDate);
    }
  }, [startDate, endDate]);

  return (
    <div className="w-[100%] flex bg-[#F8F8F8] h-[100vh] max-h-[100vh] relative">
      <DeleteContactModal
        deleteModal={deleteModal}
        handledeleteModal={handleDeleteModal}
        lead={lead}
        cb={removeLastLead}
      />
      <SingleLeadModal
        leadModal={leadModal}
        handleLeadModal={handleLeadModal}
        singleLead={lead}
      />

      {screen >= 450 ? <Sidebar /> : null}

      <div className="sm:w-[80%] w-[100%] flex justify-center overflow-y-scroll">
        <div className="w-[90%] ">
          <div
            className="w-[100%] flex justify-between h-[80px]  mt-[30px]  "
            style={
              screen <= 450 ? { alignItems: "center", height: "42px" } : null
            }
          >
            {/* <div className="w-[25%] h-[100%] flex items-center">
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
                      }
                    : null
                }
              >
                Leads Generated{" "}
                <span className="font-[500] sm:text-[10px] text-[12px] text-[#9B9B9B]">
                  ({leads?.length})
                </span>
              </p>
            </div> */}

            <div className="w-[100%] h-[100%] flex justify-between items-end">
              <div className="h-[50px] mb-[20px]">
                <p className="text-sm">Start Date</p>
                <div className="sm:w-[130px] sm:h-[100%] p-2   w-[100px] h-[33px] rounded-[36px] bg-white shadow-xl flex justify-around items-center cursor-pointer">
                  <input
                    type="date"
                    className="h-[90%] w-[90%] text-xs rounded-[36px]"
                    onChange={(e) => setStartDate(e.target.value)}
                    value={startDate}
                  />
                </div>
              </div>
              <div className="h-[50px] mb-[20px]">
                <p className="text-sm">End Date</p>
                <div className="sm:w-[130px] sm:h-[100%] p-2   w-[100px] h-[33px] rounded-[36px] bg-white shadow-xl flex justify-around items-center cursor-pointer">
                  <input
                    type="date"
                    className="h-[90%] w-[90%] text-xs rounded-[36px]"
                    onChange={(e) => setEndDate(e.target.value)}
                    value={endDate}
                  />
                </div>
              </div>
              {/* <p>End Date</p>
              <div className="sm:w-[130px] sm:h-[100%] p-2  w-[100px] h-[33px] rounded-[36px] bg-white shadow-xl flex justify-around items-center cursor-pointer">
                <input
                  type="date"
                  className="h-[90%] w-[90%] text-xs rounded-[36px]"
                />
              </div> */}

              <Tooltip title="Filter by Team">
                <div className="sm:w-[130px] sm:h-[50px]   w-[100px] h-[33px] rounded-[36px] bg-white shadow-xl flex justify-around items-center cursor-pointer">
                  <select
                    name=""
                    id=""
                    className="w-[90%] outline-none"
                    onChange={(e) => setTeamId(e.target.value)}
                  >
                    <option
                      value="all"
                      // onClick={() => dispatch(getSingleLeadContacts(elm?.id))}
                    >
                      All
                    </option>
                    {Object.values(teams)?.map((elm) => {
                      return (
                        <option value={elm?.teamId}>{elm?.teamName}</option>
                      );
                    })}
                  </select>
                </div>
              </Tooltip>
              <Tooltip title="Filter by Name">
                <div className="sm:w-[130px] sm:h-[50px]  w-[100px] h-[33px] rounded-[36px] bg-white shadow-xl flex justify-around items-center cursor-pointer">
                  <select
                    name=""
                    id=""
                    className="w-[90%] outline-none"
                    onChange={(e) => setUserId(e.target.value)}
                  >
                    <option
                      value="all"
                      // onClick={() => dispatch(getSingleLeadContacts(elm?.id))}
                    >
                      All
                    </option>
                    {Object.values(allProfiles)?.map((elm) => {
                      return <option value={elm?.id}>{elm?.name}</option>;
                    })}
                  </select>
                </div>
              </Tooltip>
              <div className="sm:w-[254px] sm:h-[50px] w-[100px] h-[33px] flex items-center rounded-[36px] bg-white shadow-xl">
                {screen <= 450 ? (
                  <BiSearchAlt className="text-[22px] text-[#9B9B9B] ml-2" />
                ) : null}
                <input
                  type="text"
                  className="h-[100%] sm:w-[77%] w-[40px] outline-none rounded-[36px] sm:pl-[10px] pl-[0px] sm:ml-2 "
                  style={screen <= 450 ? { fontSize: "11px" } : null}
                  placeholder="Search"
                  onChange={(e) => setsearch(e.target.value)}
                  value={search}
                />
                {screen >= 450 ? (
                  <BiSearchAlt className="text-[22px] text-[#9B9B9B] ml-2" />
                ) : null}
              </div>

              <div className="sm:w-[185px] sm:h-[50px] border  w-[100px] h-[33px] rounded-[36px] bg-white shadow-xl flex justify-around items-center cursor-pointer">
                <img
                  src={csv}
                  alt=""
                  className="sm:h-[37px] h-[20px] sm:w-[37px] w-[20px]"
                  style={screen <= 450 ? { marginLeft: "-4px" } : null}
                />
                <p
                  className="font-[500] sm:text-[15px] text-[8px]"
                  style={
                    screen <= 450
                      ? { marginLeft: "-14px", whiteSpace: "nowrap" }
                      : null
                  }
                >
                  {filtered ? <DownloadCsv data={filtered} /> : "Export CSV"}
                </p>
                {screen >= 450 ? (
                  <TfiDownload className="text-lg mr-2" />
                ) : null}
              </div>
            </div>
          </div>

          <div className="w-[100%] h-[47px] rounded-[36px] bg-[#ECEBEA] mt-[50px] flex justify-around items-center">
            {/* <div className="w-[5%]">
              <Checkbox defaultChecked color="default" />
            </div> */}

            <div className="w-[15%] ml-5">
              <p className="font-[500] sm:text-[16px] text-[12px]">Contact</p>
            </div>
            {screen >= 450 ? (
              <div className="w-[15%] ">
                <p className="font-[500] text-[16px]">Email</p>
              </div>
            ) : null}
            <div className="w-[15%] ">
              <p
                className="font-[500] sm:text-[16px] text-[12px]"
                style={
                  screen <= 450
                    ? { whiteSpace: "nowrap", marginLeft: "-13px" }
                    : null
                }
              >
                Connected with
              </p>
            </div>
            {screen >= 450 ? (
              <div className="w-[15%] ">
                <p className="font-[500] text-[16px]">Date</p>
              </div>
            ) : null}
            <div className="w-[15%] flex">
              <p className="font-[500] sm:text-[16px] text-[12px]">Actions</p>
            </div>
          </div>
          {filtered?.map((contact) => {
            return (
              <div
                className="w-[100%] h-[83px] rounded-[37px] bg-[white] flex justify-around items-center shadow-xl mt-4 cursor-pointer"
                onClick={() => setLead(contact)}
              >
                <div className="flex items-center w-[16%] ">
                  <img
                    src={prsnPlshldr}
                    alt=""
                    className="h-[46px] w-[46px] rounded-full object-cover"
                  />
                  <p className="text-[12px] font-[500] ml-[5px]">
                    {contact?.name}
                  </p>
                </div>
                {screen >= 450 ? (
                  <div className="w-[15%] ml-2">
                    <p className="font-[500] text-[12px]">{contact?.email}</p>
                  </div>
                ) : null}
                <div className="flex items-center w-[16%] ">
                  <img
                    src={prsnPlshldr}
                    alt=""
                    className="h-[46px] w-[46px] rounded-full object-cover"
                  />
                  <p className="text-[12px] font-[500] ml-[5px]">
                    {getMemberbyId(contact?.userid)?.name}
                  </p>
                </div>
                {screen >= 450 ? (
                  <div className="w-[15%]">
                    <p className="font-[500] text-[12px]">
                      {returnDate(contact?.date)}
                    </p>
                  </div>
                ) : null}
                <div className="flex w-[15%]">
                  <div onClick={() => handleDeleteModal()}>
                    <FaRegTrashCan className="text-2xl ml-3" />
                  </div>
                  <div className=" flex" onClick={() => handleLeadModal()}>
                    <FaEye className="text-2xl ml-3" />
                  </div>
                </div>
              </div>
            );
          })}

          <br />
        </div>
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
      {screen <= 450 ? <NavbarFooter /> : null}
    </div>
  );
};

export default Leads;
