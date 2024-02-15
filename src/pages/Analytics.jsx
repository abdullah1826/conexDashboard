import React from "react";
import Sidebar from "../components/Sidebar";
import { MdArrowDropDown } from "react-icons/md";
import { FiInfo } from "react-icons/fi";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { BarChart } from "@mui/x-charts/BarChart";
import NavbarFooter from "./NavbarFooter";

const Analytics = () => {
  ChartJs.register(ArcElement);
  let returnGraphData = (val) => {
    const data = {
      datasets: [
        {
          data: [val, "100"],
          backgroundColor: ["#000000", "#DADADA"],
        },
      ],
    };
    return data;
  };
  var screen=window.innerWidth
  return (
    <div className="w-[100%] flex bg-[#F8F8F8] h-[100vh] max-h-[100vh] relative">
    {screen>=450 ? <Sidebar />:null}
      <div className="sm:w-[80%] w-[100%] flex justify-center overflow-y-scroll">
        <div className="w-[90%] ">
          <div className="w-[100%] flex justify-between h-[50px]  mt-[30px]">
            <div className="w-[15%] h-[100%] flex items-center">
              <p className="font-[600] sm:text-[20px] text-[16px]">Analytics </p>
            </div>
            <div className="sm:w-[80%] w-[100%] h-[100%] flex justify-end" style={screen <= 450 ? {  width:'70%' } : null}>
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

          <div className="h-[500px] w-[100%] flex justify-between  mt-[40px]">
          {screen>=450 ? <div className="h-[100%] w-[64%] shadow-xl rounded-[37px] bg-white">
              <div className="graph">
                {/* <BarChart
                  xAxis={[
                    {
                      id: "barCategories",
                      data: ["Total Clicks", "Total Views", "Total Leads"],
                      scaleType: "band",
                    },
                  ]}
                    series={[
                      {
                        data: [
                            analyticsData?.data?.totalClicks,
                            analyticsData?.data?.totalViews,
                            analyticsData?.data?.totalContacts,
                        ],
                      },
                    ]}
                  colors={["#eba21e", "#eba21e", "#eba21e"]}
                  width={600}
                  height={400}
                /> */}
              </div>
            </div>:null}
            <div className="h-[100%] sm:w-[34%] w-[100%] flex flex-col justify-between">
              <div className="h-[31%] w-[100%] bg-white rounded-[37px] shadow-xl ">
                <div className="w-[100%] h-[25%]  flex items-end">
                  <p className="flex font-[500] text-[16] ml-4 items-center">
                    Leads Generated
                    <FiInfo className="ml-1 text-[11px] cursor-pointer" />
                  </p>
                </div>
                <div className="w-[100%] h-[75%]  flex justify-around items-center">
                  <h2 className="font-[700] text-[48px]">75%</h2>

                  <div className="pi-chart">
                    <div
                      className="h-[75px]  w-[75px] mt-1"
                      style={{
                        height: "90px",
                        width: "90px",
                      }}
                    >
                      <Doughnut data={returnGraphData(75)}></Doughnut>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[31%] w-[100%] bg-white rounded-[37px] shadow-xl ">
                <div className="w-[100%] h-[25%]  flex items-end">
                  <p className="flex font-[500] text-[16] ml-4 items-center">
                    Link taps
                    <FiInfo className="ml-1 text-[11px] cursor-pointer" />
                  </p>
                </div>
                <div className="w-[100%] h-[75%]  flex justify-around items-center">
                  <h2 className="font-[700] text-[48px]">75%</h2>

                  <div className="pi-chart">
                    <div
                      className="h-[75px]  w-[75px] mt-1"
                      style={{
                        height: "90px",
                        width: "90px",
                      }}
                    >
                      <Doughnut data={returnGraphData(75)}></Doughnut>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[31%] w-[100%] bg-white rounded-[37px] shadow-xl ">
                <div className="w-[100%] h-[25%]  flex items-end">
                  <p className="flex font-[500] text-[16] ml-4 items-center">
                    Card Views
                    <FiInfo className="ml-1 text-[11px] cursor-pointer" />
                  </p>
                </div>
                <div className="w-[100%] h-[75%]  flex justify-around items-center">
                  <h2 className="font-[700] text-[48px]">75%</h2>

                  <div className="pi-chart">
                    <div
                      className="h-[75px]  w-[75px] mt-1"
                      style={{
                        height: "90px",
                        width: "90px",
                      }}
                    >
                      <Doughnut data={returnGraphData(75)}></Doughnut>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
      {screen <= 450 ? <NavbarFooter/> : null}
    </div>
  );
};

export default Analytics;
