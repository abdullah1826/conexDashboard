import React, { useState } from "react";
import { IoIosCopy } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { GrAddCircle } from "react-icons/gr";
import { MdOutlineCancel } from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";
import { PiUserRectangleFill } from "react-icons/pi";
import { BiImage, BiLockOpenAlt } from "react-icons/bi";
import Cropper from "../Cropper";
import {
  setColor,
  setCoverUrl,
  setLogoUrl,
  setProfilePictureLock,
  setProfileurl,
  setTextColor,
  setcoverLock,
  setlogoLock,
} from "../../redux/profileInfoSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { CgColorPicker } from "react-icons/cg";
import { updateCompanyProfile } from "../../Services";
import MobilePreviewModal from "../Modals/MobilePreviewModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiLock } from "react-icons/ci";
import { BiLockAlt } from "react-icons/bi";
import { Switch } from "@mui/material";

const CompanyProfile = ({ uid }) => {
  var screen = window.innerWidth;

  // ----------------------------------------------------State setup for profile img crop---------------------------------------------
  let [prflimg, setprflimg] = useState(null);
  let [cropModal, setcropModal] = useState(false);
  let [myprflimg, setmyprflimg] = useState(null);
  let [cropPrfl, setCropPrfl] = useState({
    unit: "%",
    x: 50,
    y: 50,
    width: 25,
    height: 25,
  });

  let handleclosecropper = () => {
    setcropModal(false);
    // settheimg(null)
  };

  let handlePrflImageChange = (event) => {
    // profileImage
    setprflimg("");
    const { files } = event.target;

    // setKey(key + 1);
    if (files && files?.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.addEventListener("load", () => {
        setprflimg(reader.result);
        // dispatch(setProfileImg(reader.result))

        setcropModal(true);
      });
    }
  };

  // ----------------------------------------------------State setup for logo img crop---------------------------------------------
  let [logoimg, setlogoimg] = useState(null);
  let [cropLogoModal, setcroplogoModal] = useState(false);
  let [mylogolimg, setmylogolimg] = useState(null);
  let [croplogo, setCroplogo] = useState({
    unit: "%",
    x: 50,
    y: 50,
    width: 25,
    height: 25,
  });

  let handlecloselogocropper = () => {
    setcroplogoModal(false);
    // settheimg(null)
  };

  let handleLogoImageChange = (event) => {
    // profileImage
    setlogoimg("");
    const { files } = event.target;

    // setKey(key + 1);
    if (files && files?.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.addEventListener("load", () => {
        setlogoimg(reader.result);
        // dispatch(setProfileImg(reader.result))

        setcroplogoModal(true);
      });
    }
  };

  // ----------------------------------------------------State setup for bg img crop---------------------------------------------

  let [bgimg, setbgimg] = useState(null);
  let [bgCropModal, setBgcropModal] = useState(false);
  let [mybgimg, setmybgimg] = useState(null);
  let [cropbg, setCropbg] = useState({
    unit: "%",
    x: 50,
    y: 50,
    width: 25,
    height: 25,
  });

  let handleclosebgcropper = () => {
    setBgcropModal(false);
  };

  let handlebgImageChange = (event) => {
    // profileImage
    setbgimg("");
    const { files } = event.target;

    // setKey(key + 1);
    if (files && files?.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.addEventListener("load", () => {
        setbgimg(reader.result);
        // dispatch(setProfileImg(reader.result))

        setBgcropModal(true);
      });
    }
  };

  let dispatch = useDispatch();
  const cover = useSelector((state) => state.profileInfoSlice.coverUrl);
  const profile = useSelector((state) => state.profileInfoSlice.profileUrl);
  const logo = useSelector((state) => state.profileInfoSlice.logoUrl);
  const textColor = useSelector((state) => state.profileInfoSlice.textColor);
  const color = useSelector((state) => state.profileInfoSlice.color);

  const profilePictureLock = useSelector(
    (state) => state.profileInfoSlice.profilePictureLock
  );
  const logoLock = useSelector((state) => state.profileInfoSlice.logoLock);
  const coverLock = useSelector((state) => state.profileInfoSlice.coverLock);

  let [modal, setModal] = useState(false);

  let handleModal = () => {
    setModal(!modal);
  };

  let shareUrl = `profile.connexcard.com/${uid}`;

  return (
    <div className="w-[100%]  mt-7 flex flex-col ml-[30px]">
      {/* --------------------------------------------croper for logo image------------------------------------------------  */}
      <Cropper
        cropModal={cropLogoModal}
        handleclosecropper={handlecloselogocropper}
        theimg={logoimg}
        myimg={mylogolimg}
        setmyimg={setmylogolimg}
        setcrop={setCroplogo}
        crop={croplogo}
        aspect={1 / 1}
        setReduxState={setLogoUrl}
        isCircle={true}
      />
      {/* --------------------------------------------croper for profile image------------------------------------------------  */}
      <Cropper
        cropModal={cropModal}
        handleclosecropper={handleclosecropper}
        theimg={prflimg}
        myimg={myprflimg}
        setmyimg={setmyprflimg}
        setcrop={setCropPrfl}
        crop={cropPrfl}
        aspect={1 / 1}
        setReduxState={setProfileurl}
        isCircle={true}
      />

      {/* --------------------------------------------croper for Cover image------------------------------------------------  */}
      <Cropper
        cropModal={bgCropModal}
        handleclosecropper={handleclosebgcropper}
        theimg={bgimg}
        myimg={mybgimg}
        setmyimg={setmybgimg}
        setcrop={setCropbg}
        crop={cropbg}
        aspect={253 / 150}
        setReduxState={setCoverUrl}
        isCircle={false}
      />
      <MobilePreviewModal modal={modal} handleModal={handleModal} />
      <div className="sm:w-[600px] w-[100%]">
        <h2 className="font-[600] sm:text-[20px] text-[16px] text-[#625F5F]">
          Cover Image
        </h2>
        <p className="font-[400] text-[14px] text-[#707070]">
          Choose an image to display at the top of cardholder profile pages.
        </p>
        <div className="w-[100%] flex cursor-pointer mt-[20px]">
          <div className=" flex flex-col whitespace-nowrap  items-center sm:text-[13px] text-[8px]">
            <span className="flex justify-center items-center mb-1  ">
              Logo {"\u00A0"}
              {/* <RiErrorWarningLine /> */}
              <Switch
                size="small"
                checked={!logoLock}
                onChange={() => dispatch(setlogoLock(!logoLock))}
                // inputProps={{ 'aria-label': 'controlled' }}
              />
            </span>
            {logo ? (
              <div className="sm:w-[120px] sm:h-[120px] w-[70px] h-[70px] border rounded-full flex justify-center items-center flex-col relative">
                <MdOutlineCancel
                  style={{ fontSize: "25px" }}
                  className="absolute right-[15px] top-0"
                  onClick={() => dispatch(setLogoUrl(""))}
                />
                <img
                  src={logo}
                  alt=""
                  className="h-[100%] w-[100%] object-cover rounded-full"
                />
              </div>
            ) : (
              <div className="sm:w-[120px] sm:h-[120px] w-[70px] h-[70px] border rounded-full bg-gray-100 flex justify-center items-center flex-col relative">
                <label
                  htmlFor="prflImg"
                  className="absolute right-[15px] top-0"
                >
                  <GrAddCircle style={{ fontSize: "20px" }} />

                  <input
                    type="file"
                    id="prflImg"
                    style={{ opacity: 0, width: "0px", height: "0px" }}
                    onChange={handleLogoImageChange}
                  />
                </label>
                <BiImage
                  className="sm:text-[30px] text-[20px] "
                  style={{ color: "8F8E8E" }}
                />
              </div>
            )}
          </div>
          {"\u00A0"}
          <div className=" flex flex-col whitespace-nowrap  items-center sm:text-[13px] text-[8px] ml-[9%] ">
            <span className="flex justify-center items-center mb-1 ">
              Profile Picture {"\u00A0"}
              <Switch
                size="small"
                checked={!profilePictureLock}
                onChange={() =>
                  dispatch(setProfilePictureLock(!profilePictureLock))
                }
                // inputProps={{ 'aria-label': 'controlled' }}
              />
              {/* <RiErrorWarningLine /> */}
            </span>

            {profile ? (
              <div className="sm:w-[120px] sm:h-[120px] w-[70px] h-[70px] border rounded-full flex justify-center items-center flex-col relative">
                <MdOutlineCancel
                  style={{ fontSize: "25px" }}
                  className="absolute right-[15px] top-0"
                  onClick={() => dispatch(setProfileurl(""))}
                />
                <img
                  src={profile}
                  alt=""
                  className="h-[100%] w-[100%] object-cover rounded-full"
                />
              </div>
            ) : (
              <div className="sm:w-[120px] sm:h-[120px] w-[70px] h-[70px] border rounded-full bg-gray-100 flex justify-center items-center flex-col relative">
                <label
                  htmlFor="prflImg"
                  className="absolute right-[15px] top-0"
                >
                  <GrAddCircle style={{ fontSize: "20px" }} />

                  <input
                    type="file"
                    id="prflImg"
                    style={{ opacity: 0, width: "0px", height: "0px" }}
                    onChange={handlePrflImageChange}
                  />
                </label>
                <PiUserRectangleFill
                  className="sm:text-[30px] text-[20px]"
                  style={{ color: "8F8E8E" }}
                />
              </div>
            )}
          </div>
          {"\u00A0"}
          <div className=" flex flex-col whitespace-nowrap  items-center sm:text-[13px] text-[8px] ml-[9%]">
            <span className="flex justify-center items-center mb-1 ">
              Cover Picture {"\u00A0"}
              <Switch
                size="small"
                checked={!coverLock}
                onChange={() => dispatch(setcoverLock(!coverLock))}
                // inputProps={{ 'aria-label': 'controlled' }}
              />
              {/* <RiErrorWarningLine /> */}
            </span>
            {cover ? (
              <div className="sm:w-[253px] w-[166px] sm:h-[150px] h-[65px] rounded-[36px]  bg-gray-100 flex justify-center items-center flex-col relative">
                <MdOutlineCancel
                  style={{ fontSize: "25px" }}
                  className="absolute right-[0px] top-[-3px]"
                  onClick={() => dispatch(setCoverUrl(""))}
                />
                <img
                  src={cover}
                  alt=""
                  className="h-[100%] w-[100%] object-cover rounded-[36px]"
                />
              </div>
            ) : (
              <div className="sm:w-[253px] w-[166px] sm:h-[150px] h-[65px] rounded-[36px]  bg-gray-100 flex justify-center items-center flex-col relative">
                <label htmlFor="cvrImg" className="absolute right-[3px] top-0">
                  <GrAddCircle style={{ fontSize: "20px" }} />

                  <input
                    type="file"
                    id="cvrImg"
                    style={{ opacity: 0, width: "0px", height: "0px" }}
                    onChange={handlebgImageChange}
                  />
                </label>
                <IoImageOutline
                  className="sm:text-[30px] text-[20px]"
                  style={{ color: "8F8E8E" }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="mt-7">
          <h2 className="font-[600] sm:text-[20px] text-[16px] text-[#625F5F]">
            Profile page appearance
          </h2>
          <p className="font-[400] text-[14px] text-[#707070]">
            Customise the look of the profile pages of your cardholders. Changes
            will apply to all profile pages belonging to your organisation.
          </p>
        </div>
        <div className="w-[100%] flex justify-center items-center mt-6">
          <div className="sm:w-[95%] w-[100%]">
            <h2 className="font-[600] sm:text-[20px] text-[16px] text-[#625F5F]">
              Colors
            </h2>
            <p className="font-[400] text-[14px] text-[#707070]">
              Create a custom theme for cardholder profile pages. Maintain good
              readability by ensuring there is sufficient contrast between text
              and background colours.
            </p>
            <div className="w-[100%] mt-7">
              <div className="w-[100%] flex justify-between items-center">
                <div>
                  <h2 className="font-[600] sm:text-[15px] text-[12px]">
                    Page background color
                  </h2>
                  <div className="sm:w-[254px] w-[70%] sm:h-[61px] h-[46px] rounded-[36px] bg-white mt-1 flex items-center justify-between">
                    <div className="sm:h-[61px] h-[33px] w-[61px] rounded-full bg-[black]">
                      <label
                        htmlFor="btnclr"
                        className="h-[100%] w-[100%] rounded-full flex justify-center items-center"
                      >
                        <div>
                          <CgColorPicker className="text-[white] text-[30px]" />
                        </div>
                        <input
                          type="color"
                          id="btnclr"
                          style={{
                            opacity: "0px",
                            height: "0px",
                            width: "0px",
                            // backgroundColor: "black",
                            // color: "black",
                          }}
                          onChange={(e) => dispatch(setColor(e.target.value))}
                          value={color}
                        />
                      </label>
                    </div>
                    {"\u00A0"}{" "}
                    <p className="font-[400] sm:text-[16px] text-[14px]">
                      {color}
                    </p>
                    {"\u00A0"}
                    <div
                      className="sm:h-[61px] h-[33px] w-[61px] rounded-full"
                      style={{ backgroundColor: color }}
                    ></div>
                  </div>
                </div>

                <div>
                  <h2 className="font-[600] sm:text-[15px] text-[12px]">
                    Text color
                  </h2>
                  <div className="sm:w-[254px] w-[70%] sm:h-[61px] h-[46px] rounded-[36px] bg-white mt-1 flex items-center justify-between">
                    <div className="sm:h-[61px] h-[33px] w-[61px] rounded-full bg-[black]">
                      <label
                        htmlFor="txtclr"
                        className="h-[100%] w-[100%] rounded-full flex justify-center items-center"
                      >
                        <div>
                          <CgColorPicker className="text-[white] text-[30px]" />
                        </div>
                        <input
                          type="color"
                          id="txtclr"
                          style={{
                            opacity: "0px",
                            height: "0px",
                            width: "0px",
                            // backgroundColor: "black",
                            // color: "black",
                          }}
                          onChange={(e) =>
                            dispatch(setTextColor(e.target.value))
                          }
                          value={textColor}
                        />
                      </label>
                    </div>
                    {"\u00A0"}{" "}
                    <p className="font-[400] sm:text-[16px] text-[14px]">
                      {textColor}
                    </p>
                    {"\u00A0"}
                    <div
                      className="sm:h-[61px] h-[33px]  w-[61px] rounded-full"
                      style={{ backgroundColor: textColor }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="w-[100%] mt-7">
              <div className="w-[100%] flex justify-between items-center">
                <div>
                  <h2 className="font-[600] sm:text-[15px] text-[12px]">
                    Icons Color
                  </h2>
                  <div className="sm:w-[254px] w-[70%] sm:h-[61px] h-[46px] rounded-[36px] bg-white mt-1 flex items-center justify-between">
                    <div className="sm:h-[61px] h-[33px] w-[61px] rounded-full bg-[black]"></div>
                    {"\u00A0"}{" "}
                    <p className="font-[400] sm:text-[16px] text-[14px]">
                      #FFFFFF
                    </p>
                    {"\u00A0"}
                    <div className="sm:h-[61px] h-[33px]  w-[61px] rounded-full bg-[black]"></div>
                  </div>
                </div>

                <div>
                  <h2 className="font-[600] sm:text-[15px] text-[12px]">
                    Icons background color
                  </h2>
                  <div className="sm:w-[254px] w-[70%] sm:h-[61px] h-[46px] rounded-[36px] bg-white mt-1 flex items-center justify-between">
                    <div className="sm:h-[61px] h-[33px]  w-[61px] rounded-full bg-[black]"></div>
                    {"\u00A0"}{" "}
                    <p className="font-[400] sm:text-[16px] text-[14px]">
                      #FFFFFF
                    </p>
                    {"\u00A0"}
                    <div className="sm:h-[61px] h-[33px]  w-[61px] rounded-full bg-[black]"></div>
                  </div>
                </div>
              </div>
            </div> */}

            <div
              className="w-[100%] flex justify-end mt-5"
              style={screen <= 450 ? { justifyContent: "center" } : null}
            >
              <div className="w-[93%] flex justify-between">
                <div
                  className="sm:w-[160px] w-[210px] sm:h-[47px] h-[37px]  shadow-lg rounded-[36px] bg-white flex justify-center items-center cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl),
                      toast.success("Copied to clipboard");
                  }}
                >
                  <p className="font-[500] text-[16px] mr-1">Copy</p>
                  <IoIosCopy className="ml-1" />
                </div>

                <div
                  className="sm:w-[160px] w-[310px] sm:h-[47px] h-[37px] shadow-lg rounded-[36px] bg-white flex justify-center items-center cursor-pointer"
                  style={
                    screen <= 450
                      ? { marginLeft: "20px", marginRight: "20px" }
                      : null
                  }
                  onClick={() => handleModal()}
                >
                  <p className="font-[500] text-[16px] mr-1">Preview</p>
                  <FaEye className="ml-1" />
                </div>

                <div
                  className="sm:w-[160px] w-[210px] sm:h-[47px] h-[37px] shadow-lg rounded-[36px] bg-black flex justify-center items-center cursor-pointer"
                  onClick={() =>
                    updateCompanyProfile(uid, {
                      profileUrl: profile,
                      logoUrl: logo,
                      coverUrl: cover,
                      textColor,
                      color,
                      coverLock,
                      logoLock,
                      profilePictureLock,
                    })
                  }
                >
                  <p className="font-[500] text-[16px] text-white">Save</p>
                  {/* <IoIosCopy /> */}
                </div>
              </div>
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
      </div>
    </div>
  );
};

export default CompanyProfile;
