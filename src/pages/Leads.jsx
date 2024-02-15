import React from "react";
import Sidebar from "../components/Sidebar";
import { BiSearchAlt } from "react-icons/bi";
import { MdArrowDropDown } from "react-icons/md";
import { Menu } from "@mui/material";
import { FaSquarePlus } from "react-icons/fa6";
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

const Leads = () => {
  var screen=window.innerWidth
  return (
    <div className="w-[100%] flex bg-[#F8F8F8] h-[100vh] max-h-[100vh] relative">
    {screen>=450 ? <Sidebar />:null}
      <div className="sm:w-[80%] w-[100%] flex justify-center overflow-y-scroll">
        <div className="w-[90%] ">
          <div className="w-[100%] flex justify-between h-[50px]  mt-[30px]" style={screen <= 450 ? { alignItems:'center',height:'42px' } : null}>
            <div className="w-[25%] h-[100%] flex items-center">
              <p className="font-[600] sm:text-[20px] text-[11px]" style={screen <= 450 ? { display: 'flex', justifyContent: 'center',alignItems:'center', whiteSpace:'nowrap',flexDirection:'column' } : null}>
                Leads Generated{" "}
                <span className="font-[500] sm:text-[10px] text-[12px] text-[#9B9B9B]">
                  (120)
                </span>
              </p>
            </div>
            <div className="w-[72%] h-[100%] flex justify-between">
            {'\u00A0'} <div className="sm:w-[254px] sm:h-[100%] w-[100px] h-[33px] flex items-center rounded-[36px] bg-white shadow-xl">
              {screen <= 450 ? <BiSearchAlt className="text-[22px] text-[#9B9B9B] ml-2" />:null}
              <input
                  type="text"
                  className="h-[100%] sm:w-[77%] w-[40px] outline-none rounded-[36px] sm:pl-[10px] pl-[0px] sm:ml-2 " style={screen <= 450 ? { fontSize:'11px' } : null}
                  placeholder="Search"
                />
                {screen >= 450 ? <BiSearchAlt className="text-[22px] text-[#9B9B9B] ml-2" />:null}
                </div>
                {'\u00A0'}
              <div className="sm:w-[185px] sm:h-[100%] w-[100px] h-[33px] rounded-[36px] bg-white shadow-xl flex justify-around items-center cursor-pointer">
                <img src={csv} alt="" className="sm:h-[37px] h-[20px] sm:w-[37px] w-[20px]" style={screen <= 450 ? { marginLeft:'-4px' } : null} />
                <p className="font-[500] sm:text-[15px] text-[8px]" style={screen <= 450 ? { marginLeft:'-14px',whiteSpace:'nowrap' } : null}>Export CSV</p>
                {screen>=450 ?<TfiDownload className="text-lg mr-2" />:null}
              </div>
              {'\u00A0'}
              <div className="sm:w-[185px] sm:h-[100%] w-[100px] h-[33px] rounded-[36px] bg-white shadow-xl flex justify-evenly items-center cursor-pointer">
                <img src={zap} alt="" className="sm:h-[37px] sm:w-[37px] h-[20px] w-[20px]" style={screen <= 450 ? { marginLeft:'0px' } : null} />
                <p className="font-[500] sm:text-[15px] text-[8px]" style={screen <= 450 ? { marginLeft:'0px',whiteSpace:'nowrap' } : null}>Export Zapier</p>
                {screen>=450 ? <TfiDownload className="text-lg mr-2" /> :null}
              </div>
            </div>
          </div>

          <div className="w-[100%] h-[47px] rounded-[36px] bg-[#ECEBEA] mt-[50px] flex justify-around items-center">
            <div className="w-[15%] ml-5">
              <p className="font-[500] sm:text-[16px] text-[12px]">Contact</p>
            </div>
            {screen >= 450 ? <div className="w-[15%] ">
              <p className="font-[500] text-[16px]">Email</p>
            </div>: null}
            <div className="w-[15%] ">
              <p className="font-[500] sm:text-[16px] text-[12px]" style={screen <= 450 ? {  whiteSpace:'nowrap',marginLeft:'-13px' } : null}>Contacted with</p>
            </div>
            {screen >= 450 ? <div className="w-[15%] ">
              <p className="font-[500] text-[16px]">Date</p>
            </div>: null}
            <div className="w-[15%] flex">
              <p className="font-[500] sm:text-[16px] text-[12px]">Actions</p>
            </div>
          </div>

          <div className="w-[100%] h-[83px] rounded-[37px] bg-[white] flex justify-around items-center shadow-xl mt-4 cursor-pointer">
            <div className="flex items-center w-[16%] ">
              <img
                src={c3}
                alt=""
                className="h-[46px] w-[46px] rounded-full object-cover"
              />
              <p className="text-[12px] font-[500] ml-[5px]">Kakashi Hatake</p>
            </div>
            {screen >= 450 ? <div className="w-[15%] ml-2">
              <p className="font-[500] text-[12px]">Name@gmail.com</p>
            </div>:null}
            <div className="flex items-center w-[16%] ">
              <img
                src={c4}
                alt=""
                className="h-[46px] w-[46px] rounded-full object-cover"
              />
              <p className="text-[12px] font-[500] ml-[5px]">Gaara</p>
            </div>
            {screen >= 450 ?<div className="w-[15%]">
              <p className="font-[500] text-[12px]">January 25, 2023</p>
            </div>:null}
            <div className="w-[15%] flex ">
              <FaRegTrashCan className="text-2xl ml-3" />
            </div>
          </div>

          <div className="w-[100%] h-[83px] rounded-[37px] bg-[white] flex justify-around items-center shadow-xl mt-4 cursor-pointer">
            <div className="flex items-center w-[16%] ">
              <img
                src={c2}
                alt=""
                className="h-[46px] w-[46px] rounded-full object-cover"
              />
              <p className="text-[12px] font-[500] ml-[5px]">Hinata Hyuga</p>
            </div>
            {screen >= 450 ?<div className="w-[15%] ml-2">
              <p className="font-[500] text-[12px]">Name@gmail.com</p>
            </div>:null}
            <div className="flex items-center w-[16%] ">
              <img
                src={c5}
                alt=""
                className="h-[46px] w-[46px] rounded-full object-cover"
              />
              <p className="text-[12px] font-[500] ml-[5px]">Sakura Haruno</p>
            </div>
            {screen >= 450 ? <div className="w-[15%]">
              <p className="font-[500] text-[12px]">January 25, 2023</p>
            </div>:null}
            <div className="w-[15%] flex ">
              <FaRegTrashCan className="text-2xl ml-3" />
            </div>
          </div>

          <div className="w-[100%] h-[83px] rounded-[37px] bg-[white] flex justify-around items-center shadow-xl mt-4 cursor-pointer">
            <div className="flex items-center w-[16%] ">
              <img
                src={c1}
                alt=""
                className="h-[46px] w-[46px] rounded-full object-cover"
              />
              <p className="text-[12px] font-[500] ml-[5px]">
                Hiruzen Sarutobi
              </p>
            </div>
            {screen >= 450 ?<div className="w-[15%] ml-2">
              <p className="font-[500] text-[12px]">Name@gmail.com</p>
            </div>:null}
            <div className="flex items-center w-[16%] ">
              <img
                src={c3}
                alt=""
                className="h-[46px] w-[46px] rounded-full object-cover"
              />
              <p className="text-[12px] font-[500] ml-[5px]">Kakashi Hatake</p>
            </div>
            {screen >= 450 ? <div className="w-[15%]">
              <p className="font-[500] text-[12px]">January 25, 2023</p>
            </div>:null}
            <div className="w-[15%] flex ">
              <FaRegTrashCan className="text-2xl ml-3" />
            </div>
          </div>

          <div className="w-[100%] h-[83px] rounded-[37px] bg-[white] flex justify-around items-center shadow-xl mt-4 cursor-pointer">
            <div className="flex items-center w-[16%] ">
              <img
                src={prfl}
                alt=""
                className="h-[46px] w-[46px] rounded-full object-cover"
              />
              <p className="text-[12px] font-[500] ml-[5px]">Naruto Uzumaki</p>
            </div>
            {screen >= 450 ? <div className="w-[15%] ml-2">
              <p className="font-[500] text-[12px]">Name@gmail.com</p>
            </div>:null}
            <div className="flex items-center w-[16%] ">
              <img
                src={c5}
                alt=""
                className="h-[46px] w-[46px] rounded-full object-cover"
              />
              <p className="text-[12px] font-[500] ml-[5px]">Sakura Haruno</p>
            </div>
            {screen >= 450 ?  <div className="w-[15%]">
              <p className="font-[500] text-[12px]">January 25, 2023</p>
            </div>:null}
            <div className="w-[15%] flex ">
              <FaRegTrashCan className="text-2xl ml-3" />
            </div>
          </div>
          <br />
        </div>
      </div>
      {screen <= 450 ? <NavbarFooter/> : null}
    </div>
  );
};

export default Leads;
