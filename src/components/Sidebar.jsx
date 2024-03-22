import React, { useEffect, useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { BiHelpCircle } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { BsBox2Fill } from "react-icons/bs";
import logo from "../imgs/logo.png";
import { FaKey } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import { SiGoogleanalytics } from "react-icons/si";
import { BsFillBuildingsFill } from "react-icons/bs";
import { RiLogoutCircleLine } from "react-icons/ri";
import { handleLogout } from "../Services";
import DeleteModal from "./Modals/DeleteModal";

const Sidebar = () => {
  let navigate = useNavigate();

  let [user, setuser] = useState({});
  let [modal, setModal] = useState(false);

  let handleModal = () => {
    setModal(!modal);
  };

  // --------------------------geting the user data from firebase------------------------

  // useEffect(() => {
  //   let getingdata = async () => {
  //     const starCountRef = ref(db, `/User/${userId}`);
  //     onValue(starCountRef, async (snapshot) => {
  //       const data = await snapshot.val();

  //       setuser(data);
  //     });
  //   };

  //   getingdata();
  // }, []);

  let logOut = () => {
    let promise = new Promise((res, rej) => {
      res(localStorage.removeItem("inventoryKey"));
    });

    promise.then(() => {
      navigate("/Login");
    });
    window.location.reload();
    // setModal(!modal);
  };

  let currentPath = window.location.href;

  let [deleteModal, setdeleteModal] = useState(false);
  let handledeleteModal = () => {
    setdeleteModal(!deleteModal);
  };

  return (
    <div className="w-[20%] h-[100vh]  flex flex-col sticky shadow-2xl bg-white">
      <DeleteModal
        deleteModal={deleteModal}
        handledeleteModal={handledeleteModal}
        text="Are you sure to logout ? "
        func={() => handleLogout(navigate("/signin"))}
      />
      <div className="h-[94vh]  w-[100%] flex flex-col justify-between items-center">
        <div className="h-[75%]  w-[90%] flex flex-col">
          <div className="h-[15%]  w-[100%] flex items-center justify-center mt-3">
            <img src={logo} alt="conex" className="h-[30px] w-[123px]" />
            {/* <h2 class=" text-xl font-medium ml-2 text-black">Inventory</h2> */}
          </div>
          <div className="h-max  w-[100%]   mt-5 ">
            <div
              className="hover:bg-[black] text-[#8F8E8E] hover:text-[white] h-[55px]  w-[100%] rounded-[18px] flex items-center cursor-pointer "
              onClick={() => navigate("/home")}
              style={
                currentPath.includes("/home") || currentPath.includes("/edit")
                  ? { backgroundColor: "black", color: "white" }
                  : null
              }
            >
              <div className=" flex items-center rounded-md  ml-2">
                <FaUser className="text-xl ml-2 " />
                <p className="ml-[10px] text-[13px] font-[600]">Team Members</p>
              </div>
            </div>

            <div
              className="hover:bg-[black] text-[#8F8E8E] hover:text-[white] h-[55px]  w-[100%] rounded-[18px] flex items-center cursor-pointer mt-4"
              onClick={() => navigate("/subteams")}
              style={
                currentPath.includes("/subteams")
                  ? { backgroundColor: "black", color: "white" }
                  : null
              }
            >
              <div className=" flex items-center rounded-md   ml-2">
                <IoIosPeople className="text-3xl ml-2 " />
                <p className="ml-[10px] text-[13px] font-[600]">Sub Teams</p>
              </div>
            </div>

            <div
              className="hover:bg-[black] text-[#8F8E8E] hover:text-[white] h-[55px]  w-[100%] rounded-[18px] flex items-center cursor-pointer mt-4"
              onClick={() => navigate("/leads")}
              style={
                currentPath.includes("/leads")
                  ? { backgroundColor: "black", color: "white" }
                  : null
              }
            >
              <div className=" flex items-center rounded-md ml-2">
                <FaFilter className=" text-xl ml-2 " />
                <p className="ml-[10px] text-[13px] font-[600]">
                  Leads Generated
                </p>
              </div>
            </div>

            <div
              className="hover:bg-[black] text-[#8F8E8E] hover:text-[white] h-[55px]  w-[100%] rounded-[18px] flex items-center cursor-pointer mt-4"
              onClick={() => navigate("/analytics")}
              style={
                currentPath.includes("/analytics")
                  ? { backgroundColor: "black", color: "white" }
                  : null
              }
            >
              <div className=" flex items-center rounded-md   ml-2">
                <SiGoogleanalytics className=" text-xl ml-2 " />
                <p className="ml-[10px] text-[13px] font-[600]">Analytics</p>
              </div>
            </div>

            <div
              className="hover:bg-[black] text-[#8F8E8E] hover:text-[white] h-[55px]  w-[100%] rounded-[18px] flex items-center cursor-pointer mt-4"
              onClick={() => navigate("/company")}
              style={
                currentPath.includes("/company")
                  ? { backgroundColor: "black", color: "white" }
                  : null
              }
            >
              <div className=" flex items-center rounded-md   ml-2">
                <BsFillBuildingsFill className=" text-xl ml-2 " />
                <p className="ml-[10px] text-[13px] font-[600]">Company</p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[10%]  w-[90%] flex flex-col justify-end">
          <div
            className="h-[36px]  w-[95px]  flex items-center pl-[10px] rounded-[34px] cursor-pointer ml-2 border bg-black"
            onClick={() => handledeleteModal()}
          >
            <RiLogoutCircleLine className="text-white text-lg " />
            <p className="font-[600] text-[12px] text-white ml-2">Logout</p>
          </div>
        </div>
      </div>
      {/* <LogoutModal
        modal={modal}
        handleModal={handleModal}
        logoutFunc={logOut}
      /> */}
    </div>
  );
};

export default Sidebar;
