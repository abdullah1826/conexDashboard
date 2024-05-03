import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { MdArrowDropDown } from "react-icons/md";
import { FiInfo } from "react-icons/fi";
import { Chart as ChartJs, ArcElement, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { BarChart } from "@mui/x-charts/BarChart";
import NavbarFooter from "./NavbarFooter";
import {
  getAllChilds,
  getSingleChild,
  getSingleChildAnalytics,
  splitString,
} from "../Services";
import { Menu, MenuItem, Tooltip } from "@mui/material";
import prsnPlshldr from "../imgs/prsnPlshldr.png";
import CompanyProfile from "../components/SettingsComponents/CompanyProfile";
import { MdOutlineFilterList } from "react-icons/md";
import { MoonLoader } from "react-spinners";

const Analytics = () => {
  ChartJs.register(ArcElement);
  let returnGraphData = (val1, val2, clr) => {
    let totalVal = val2 < 1 ? 100 : val2;
    const data = {
      datasets: [
        {
          data: [val1, totalVal],
          backgroundColor: [clr, "#DADADA"],
        },
      ],
    };
    return data;
  };
  var screen = window.innerWidth;

  let [allProfiles, setAllProfiles] = useState([]);

  let getAllProfiles = (obj) => {
    setAllProfiles(Object.values(obj));
  };

  const [anchorEl, setAnchorEl] = useState(null);
  let [loading, setloading] = useState(false);

  const open = Boolean(anchorEl);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl2, setAnchorEl2] = useState(null);

  const open2 = Boolean(anchorEl2);

  const handleClickListItem2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  let [companyId, setCompanyId] = useState("");
  let conexParent = localStorage.getItem("conexParent");
  let connexUid = localStorage.getItem("connexUid");
  let [companyProfile, setCompanyProfile] = useState({});
  let [selectedUser, setSelectedUser] = useState({});
  let [analytics, setAnalytics] = useState(null);
  let [filter, setfilter] = useState("Total");

  useEffect(() => {
    if (conexParent) {
      setCompanyId(conexParent);
    } else {
      setCompanyId(connexUid);
    }
  }, []);
  useEffect(() => {
    getAllChilds(getAllProfiles, () => console.log("test"));
  }, []);
  useEffect(() => {
    getSingleChild(companyId, setCompanyProfile);
  }, [companyId]);
  useEffect(() => {
    setSelectedUser(companyProfile?.[companyId]);
  }, [companyProfile?.[companyId]]);

  console.log(selectedUser);

  useEffect(() => {
    getSingleChildAnalytics(companyId, setAnalytics, setloading);
  }, [companyId]);

  // console.log(analytics);

  let returnAnalyticsData = (filter, value, analyticdata) => {
    if (analyticdata) {
      let data = Object.values(analyticdata)?.[0];
      if (value === "leads") {
        if (filter === "Total") {
          return data?.totalContactsMe;
        } else if (filter === "Past 1 week") {
          return data?.tContactsMePastWk;
        } else if (filter === "Past 1 Month") {
          return data?.tContactsMePastMonth;
        } else if (filter === "Past 1 Year") {
          return data?.tContactsMePastYear;
        } else if (filter === "Today") {
          return data?.tContactsMeCrntDay;
        }
      } else if (value === "views") {
        if (filter === "Total") {
          return data?.totalClicks;
        } else if (filter === "Past 1 week") {
          return data?.tViewsPastWk;
        } else if (filter === "Past 1 Month") {
          return data?.tViewsPastMonth;
        } else if (filter === "Past 1 Year") {
          return data?.tViewsPastYear;
        } else if (filter === "Today") {
          return data?.tContactsMeCrntDay;
        }
      } else if (value === "links") {
        if (filter === "Total") {
          return data?.totalLinksEng;
        } else if (filter === "Past 1 week") {
          return data?.linksEngPastWk;
        } else if (filter === "Past 1 Month") {
          return data?.linksEngPastMonth;
        } else if (filter === "Past 1 Year") {
          return data?.linksEngPastYear;
        } else if (filter === "Today") {
          return data?.linksEngCrntDay;
        }
      }
    } else {
      return 0;
    }
  };
  let filterData = [
    "Total",
    "Today",
    "Past 1 week",
    "Past 1 Month",
    "Past 1 Year",
  ];
  console.log(analytics);
  return (
    <div className="w-[100%] flex bg-[#F8F8F8] h-[100vh] max-h-[100vh] relative">
      {screen >= 450 ? <Sidebar /> : null}
      <div className="sm:w-[80%] w-[100%] flex justify-center overflow-y-scroll">
        <div className="w-[90%] ">
          <div className="w-[100%] flex justify-between h-[50px]  mt-[30px]">
            <div className="w-[15%] h-[100%] flex items-center">
              <p className="font-[600] sm:text-[20px] text-[16px]">
                Analytics{" "}
              </p>
            </div>
            <div
              className="sm:w-[80%] w-[100%] h-[100%] flex justify-end"
              style={screen <= 450 ? { width: "70%" } : null}
            >
              <div
                component="nav"
                aria-label="Device settings"
                id="lang-button2"
                aria-haspopup="listbox"
                aria-controls="filter"
                // aria-expanded={openMenu ? "true" : undefined}
                onClick={handleClickListItem2}
                className="w-[154px] h-[100%] rounded-[36px] bg-white shadow-xl flex justify-around items-center cursor-pointer mr-4"
              >
                {/* <img src={uk} alt="" className="h-[30px] w-[30px]" /> */}
                <p className="font-[500] text-[14px]">{filter}</p>
                <MdOutlineFilterList className="text-2xl" />
              </div>
              <Menu
                id="filter"
                anchorEl={anchorEl2}
                open={open2}
                onClose={handleClose2}
                MenuListProps={{
                  "aria-labelledby": "lang-button2",
                  role: "listbox",
                }}
              >
                {filterData?.map((elm) => {
                  return (
                    <MenuItem
                      // key={index}
                      // disabled={index === 0}
                      // selected={index === selectedIndex}
                      // onClick={(event) => handleMenuItemClick(event, index)}
                      onClick={() => {
                        handleClose2(), setfilter(elm);
                      }}
                      sx={{ display: "flex" }}
                    >
                      {/* <img
                    src={uk}
                    alt=""
                    className="h-[27px] w-[27px] object-cover"
                  /> */}
                      <p className="font-[500] ml-2 text-base">{elm}</p>
                    </MenuItem>
                  );
                })}
              </Menu>

              <div
                component="nav"
                // aria-label="Device settings"
                id="lang-button"
                aria-haspopup="listbox"
                aria-controls="lang-menu"
                // aria-expanded={openMenu ? "true" : undefined}
                onClick={handleClickListItem}
                className="w-[179px] h-[100%] rounded-[36px] bg-white shadow-xl flex justify-evenly items-center cursor-pointer"
              >
                <p className="font-[500] text-[15px]">
                  {selectedUser
                    ? splitString(selectedUser?.name, 11)
                    : "Select User"}
                </p>
                <MdArrowDropDown className="text-2xl" />
              </div>
              <Menu
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
                    setSelectedUser(companyProfile?.[companyId]), handleClose();
                  }}
                  sx={{ display: "flex" }}
                >
                  <img
                    src={
                      companyProfile?.[companyId]?.profileUrl
                        ? companyProfile?.[companyId]?.profileUrl
                        : prsnPlshldr
                    }
                    alt=""
                    className="h-[27px] w-[27px] object-cover"
                  />
                  <p className="font-[500] ml-2 text-base">
                    {companyProfile?.[companyId]?.name}
                  </p>
                </MenuItem>
                {allProfiles?.map((elm, index) => {
                  return (
                    <MenuItem
                      key={index}
                      // disabled={index === 0}
                      // selected={index === selectedIndex}
                      // onClick={(event) => handleMenuItemClick(event, index)}
                      onClick={() => {
                        setSelectedUser(elm),
                          handleClose(),
                          getSingleChildAnalytics(elm?.id, setAnalytics);
                      }}
                      sx={{ display: "flex" }}
                    >
                      <img
                        src={elm?.profileUrl ? elm?.profileUrl : prsnPlshldr}
                        alt=""
                        className="h-[27px] w-[27px] object-cover"
                      />
                      <p className="font-[500] ml-2 text-base">{elm?.name}</p>
                    </MenuItem>
                  );
                })}
              </Menu>
            </div>
          </div>

          <div className="h-[500px] w-[100%] flex justify-between  mt-[40px]">
            {screen >= 450 ? (
              loading ? (
                <div className="h-[100%] w-[64%] shadow-xl rounded-[37px] bg-white items-center flex justify-center">
                  <MoonLoader />
                </div>
              ) : (
                <div className="h-[100%] w-[64%] shadow-xl rounded-[37px] bg-white">
                  <div className="h-[100%] w-[100%] flex justify-center items-center">
                    <BarChart
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
                            returnAnalyticsData("Total", "links", analytics),
                            returnAnalyticsData("Total", "views", analytics),
                            returnAnalyticsData("Total", "leads", analytics),
                          ],
                        },
                      ]}
                      colors={(["#0f42d1"], ["#d10f25"], ["#2cf525"])}
                      width={600}
                      height={400}
                    />
                  </div>
                </div>
              )
            ) : null}
            <div className="h-[100%] sm:w-[34%] w-[100%] flex flex-col justify-between">
              {loading ? (
                <div className="h-[31%] w-[100%] bg-white rounded-[37px] shadow-xl flex justify-center items-center">
                  <MoonLoader size="40" />
                </div>
              ) : (
                <div className="h-[31%] w-[100%] bg-white rounded-[37px] shadow-xl ">
                  <Tooltip title="The number of times people submit the form">
                    <div className="w-[100%] h-[25%]  flex items-end">
                      <p className="flex font-[500] text-[16] ml-4 items-center">
                        Leads Generated
                        <FiInfo className="ml-1 text-[11px] cursor-pointer" />
                      </p>
                    </div>
                  </Tooltip>
                  <div className="w-[100%] h-[75%]  flex justify-around items-center">
                    <h2 className="font-[700] text-[48px] w-[35%]">
                      {returnAnalyticsData(filter, "leads", analytics)}
                    </h2>

                    <div className="w-[30%]">
                      <div
                        className="h-[75px]  w-[75px] mt-1"
                        style={{
                          height: "90px",
                          width: "90px",
                        }}
                      >
                        <Doughnut
                          data={returnGraphData(
                            returnAnalyticsData(filter, "leads", analytics),
                            returnAnalyticsData("Total", "leads", analytics),
                            "#2cf525"
                          )}
                        ></Doughnut>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {loading ? (
                <div className="h-[31%] w-[100%] bg-white rounded-[37px] shadow-xl flex justify-center items-center">
                  <MoonLoader size="40" />
                </div>
              ) : (
                <div className="h-[31%] w-[100%] bg-white rounded-[37px] shadow-xl ">
                  <Tooltip title="The total number of times someone open your links">
                    <div className="w-[100%] h-[25%]  flex items-end">
                      <p className="flex font-[500] text-[16] ml-4 items-center">
                        Link taps
                        <FiInfo className="ml-1 text-[11px] cursor-pointer" />
                      </p>
                    </div>
                  </Tooltip>
                  <div className="w-[100%] h-[75%]  flex justify-around items-center">
                    <h2 className="font-[700] text-[48px] w-[35%]">
                      {returnAnalyticsData(filter, "links", analytics)}
                    </h2>

                    <div className="w-[35%]">
                      <div
                        className="h-[75px]  w-[75px] mt-1"
                        style={{
                          height: "90px",
                          width: "90px",
                        }}
                      >
                        <Doughnut
                          data={returnGraphData(
                            returnAnalyticsData(filter, "links", analytics),
                            returnAnalyticsData("Total", "links", analytics),
                            "#0f42d1"
                          )}
                        ></Doughnut>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {loading ? (
                <div className="h-[31%] w-[100%] bg-white rounded-[37px] shadow-xl flex justify-center items-center">
                  <MoonLoader size="40" />
                </div>
              ) : (
                <div className="h-[31%] w-[100%] bg-white rounded-[37px] shadow-xl ">
                  <Tooltip title="The Total number of times someone land on your Connex Profile">
                    <div className="w-[100%] h-[25%]  flex items-end">
                      <p className="flex font-[500] text-[16] ml-4 items-center">
                        Card Views
                        <FiInfo className="ml-1 text-[11px] cursor-pointer" />
                      </p>
                    </div>
                  </Tooltip>
                  <div className="w-[100%] h-[75%]  flex justify-around items-center">
                    <h2 className="font-[700] text-[48px] w-[35%]">
                      {returnAnalyticsData(filter, "views", analytics)}
                    </h2>

                    <div className="w-[35%]">
                      <div
                        className="h-[75px]  w-[75px] mt-1"
                        style={{
                          height: "90px",
                          width: "90px",
                        }}
                      >
                        <Doughnut
                          data={returnGraphData(
                            returnAnalyticsData(filter, "views", analytics),
                            returnAnalyticsData("Total", "views", analytics),
                            "#d10f25"
                          )}
                        ></Doughnut>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <br />
        </div>
      </div>
      {screen <= 450 ? <NavbarFooter /> : null}
    </div>
  );
};

export default Analytics;
