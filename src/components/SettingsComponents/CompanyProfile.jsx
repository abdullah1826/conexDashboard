import React from "react";
import { IoIosCopy } from "react-icons/io";
import { FaEye } from "react-icons/fa";

const CompanyProfile = () => {
  var screen=window.innerWidth
  return (
    <div className="w-[100%]  mt-7 flex flex-col items-center">
      <div className="sm:w-[600px] w-[100%]">
        <h2 className="font-[600] sm:text-[20px] text-[16px] text-[#625F5F]">Cover Image</h2>
        <p className="font-[400] text-[14px] text-[#707070]">
          Choose an image to display at the top of cardholder profile pages.
        </p>
        <div className="w-[100%] h-[168px] mt-3 rounded-[38px] relative">
          <img
            src="https://placehold.co/134x134"
            alt=""
            className="h-[134px] w-[134px] rounded-full absolute border border-dashed border-black bottom-[-30px] left-[30px]"
          />
          <img
            src="https://placehold.co/600x168"
            alt=""
            className="sm:h-[100%] h-[80%] w-[100%] border border-dashed border-black rounded-[36px]"
          />
        </div>
        <div className="mt-10">
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
            <h2 className="font-[600] sm:text-[20px] text-[16px] text-[#625F5F]">Colors</h2>
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
                    <div className="sm:h-[61px] h-[33px] w-[61px] rounded-full bg-[black]"></div>
                    {'\u00A0'} <p className="font-[400] sm:text-[16px] text-[14px]">#FFFFFF</p>{'\u00A0'}
                    <div className="sm:h-[61px] h-[33px] w-[61px] rounded-full bg-[black]"></div>
                  </div>
                </div>

                <div>
                  <h2 className="font-[600] sm:text-[15px] text-[12px]">Text color</h2>
                  <div className="sm:w-[254px] w-[70%] sm:h-[61px] h-[46px] rounded-[36px] bg-white mt-1 flex items-center justify-between">
                    <div className="sm:h-[61px] h-[33px] w-[61px] rounded-full bg-[black]"></div>
                    {'\u00A0'} <p className="font-[400] sm:text-[16px] text-[14px]">#FFFFFF</p>{'\u00A0'}
                    <div className="sm:h-[61px] h-[33px]  w-[61px] rounded-full bg-[black]"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[100%] mt-7">
              <div className="w-[100%] flex justify-between items-center">
                <div>
                  <h2 className="font-[600] sm:text-[15px] text-[12px]">Icons Color</h2>
                  <div className="sm:w-[254px] w-[70%] sm:h-[61px] h-[46px] rounded-[36px] bg-white mt-1 flex items-center justify-between">
                    <div className="sm:h-[61px] h-[33px] w-[61px] rounded-full bg-[black]"></div>
                    {'\u00A0'} <p className="font-[400] sm:text-[16px] text-[14px]">#FFFFFF</p>{'\u00A0'}
                    <div className="sm:h-[61px] h-[33px]  w-[61px] rounded-full bg-[black]"></div>
                  </div>
                </div>

                <div>
                  <h2 className="font-[600] sm:text-[15px] text-[12px]">
                    Icons background color
                  </h2>
                  <div className="sm:w-[254px] w-[70%] sm:h-[61px] h-[46px] rounded-[36px] bg-white mt-1 flex items-center justify-between">
                    <div className="sm:h-[61px] h-[33px]  w-[61px] rounded-full bg-[black]"></div>
                    {'\u00A0'} <p className="font-[400] sm:text-[16px] text-[14px]">#FFFFFF</p>{'\u00A0'}
                    <div className="sm:h-[61px] h-[33px]  w-[61px] rounded-full bg-[black]"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[100%] flex justify-end mt-5" style={screen <= 450 ? {  justifyContent:'center' }:null}>
              <div className="w-[93%] flex justify-between">
                <div className="sm:w-[160px] w-[210px] sm:h-[47px] h-[37px]  shadow-lg rounded-[36px] bg-white flex justify-center items-center cursor-pointer">
                  <p className="font-[500] text-[16px] mr-1">Copy</p>
                  <IoIosCopy className="ml-1" />
                </div>

                <div className="sm:w-[160px] w-[310px] sm:h-[47px] h-[37px] shadow-lg rounded-[36px] bg-white flex justify-center items-center cursor-pointer" style={screen <= 450 ? {  marginLeft:'20px',marginRight:'20px' }:null}>
                  <p className="font-[500] text-[16px] mr-1">Preview</p>
                  <FaEye className="ml-1" />
                </div>

                <div className="sm:w-[160px] w-[210px] sm:h-[47px] h-[37px] shadow-lg rounded-[36px] bg-black flex justify-center items-center cursor-pointer">
                  <p className="font-[500] text-[16px] text-white">Save</p>
                  {/* <IoIosCopy /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default CompanyProfile;
