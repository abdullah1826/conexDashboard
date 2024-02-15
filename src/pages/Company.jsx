import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { MdArrowDropDown } from "react-icons/md";
import { Tab, Tabs } from "@mui/material";
import AccountSettings from "../components/SettingsComponents/AccountSettings";
import AccountLinks from "../components/SettingsComponents/AccountLinks";
import Organization from "../components/SettingsComponents/Organization";
import CompanyProfile from "../components/SettingsComponents/CompanyProfile";
import NavbarFooter from "./NavbarFooter";

const Company = () => {
  let [value, setValue] = useState(0);

  let handleTabs = (e, val) => {
    setValue(val);
  };
  var screen=window.innerWidth
  return (
    <div className="w-[100%] flex  bg-[#F8F8F8] h-[100vh] max-h-[100vh] relative" style={screen <= 450 ? {  justifyContent:'center' }:null}>
    {screen>=450 ? <Sidebar />:null}
      <div className="sm:w-[80%] w-[90%] flex flex-col items-center overflow-y-scroll overflow-x-hidden">
        <div className="sm:w-[90%] w-[100%] ">
          <div className="w-[100%] flex justify-between h-[50px]  mt-[30px]">
            <div className="sm:w-[15%] w-[35%] h-[100%] flex items-center">
              <p className="font-[600] sm:text-[20px] text-[16px]">Company </p>
            </div>
            <div className="w-[80%] h-[100%] flex justify-end" style={screen <= 450 ? {  width:'70%' } : null}>
              <div
                // component="nav"
                // aria-label="Device settings"
                // id="lang-button"
                // aria-haspopup="listbox"
                // aria-controls="lang-menu"
                // aria-expanded={openMenu ? "true" : undefined}
                // onClick={handleClickListItem}
                className="w-[154px] h-[100%] rounded-[36px] bg-white shadow-xl flex justify-evenly items-center cursor-pointer mr-4"
              >
                {/* <img src={uk} alt="" className="h-[30px] w-[30px]" /> */}
                <p className="font-[400] text-[12px]">January,2024</p>
                {/* <MdArrowDropDown className="text-2xl" /> */}
              </div>
              {/* <Menu
                id="lang-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "lang-button",
                  role: "listbox",
                }}
              >
                <MenuItem
                  // key={index}
                  // disabled={index === 0}
                  // selected={index === selectedIndex}
                  // onClick={(event) => handleMenuItemClick(event, index)}
                  onClick={() => {
                    handleClose();
                  }}
                  sx={{ display: "flex" }}
                >
                  <img
                    src={uk}
                    alt=""
                    className="h-[27px] w-[27px] object-cover"
                  />
                  <p className="font-[500] ml-2 text-base">English</p>
                </MenuItem>
                <MenuItem
                  // key={index}
                  // disabled={index === 0}
                  // selected={index === selectedIndex}
                  // onClick={(event) => handleMenuItemClick(event, index)}
                  onClick={() => {
                    handleClose();
                  }}
                  sx={{ display: "flex" }}
                >
                  <img
                    src={fr}
                    alt=""
                    className="h-[27px] w-[27px] object-cover rounded-full"
                  />
                  <p className="font-[500] ml-2 text-base">French</p>
                </MenuItem>
              </Menu> */}
              <div className="w-[154px] h-[100%] rounded-[36px] bg-white shadow-xl flex justify-center items-center cursor-pointer">
                <p className="font-[500] sm:text-[15px] text-[12px] ">Select User</p>
                <MdArrowDropDown className="text-2xl ml-1" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-[90%] mt-10">
          <Tabs
            value={value}
            onChange={handleTabs}
            // sx={{ border: "1px solid black", pl: 3 }}
          >
            <Tab
              label="Account Settings"
              sx={{
                fontSize: "16px",
                fontWeight: "600",
                
                ...(screen <= 450 ? { width: '50px',
                whiteSpace: 'nowrap',fontSize: "8px",} : {}),
              }}
            />
            {/* <div className="w-[10px]"></div> */}
            <Tab
              label="Account Links"
              sx={{
                fontSize: "16px",
                fontWeight: "600",
                
                ...(screen <= 450 ? { width: '50px',
                whiteSpace: 'nowrap',fontSize: "8px",} : {}),
              }}
            />
            {/* <div className="w-[10px]"></div> */}
            <Tab
              label="Organization"
              sx={{
                fontSize: "16px",
                fontWeight: "600",
                
                ...(screen <= 450 ? { width: '50px',
                whiteSpace: 'nowrap',fontSize: "8px",} : {}),
              }}
            />
            {/* <div className="w-[10px]"></div> */}
            <Tab
              label="Company Profile"
              sx={{
                fontSize: "16px",
                fontWeight: "600",
                
                ...(screen <= 450 ? { width: '50px',
                whiteSpace: 'nowrap',fontSize: "8px",} : {}),
              }}
            />
          </Tabs>
          <Tabpanel value={value} index={0}>
            <AccountSettings />
          </Tabpanel>

          <Tabpanel value={value} index={1}>
            <AccountLinks />
          </Tabpanel>
          <Tabpanel value={value} index={2}>
            <Organization />
          </Tabpanel>
          <Tabpanel value={value} index={3}>
            <CompanyProfile />
          </Tabpanel>
        </div>
      </div>
      {screen <= 450 ? <NavbarFooter/> : null}
    </div>
  );
};

let Tabpanel = ({ children, value, index }) => {
  return <div>{value === index && children}</div>;
};

export default Company;
