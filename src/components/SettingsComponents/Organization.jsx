import React from "react";

const Organization = () => {
  return (
    <div className="w-[100%]  mt-7 flex flex-col">
      <div className="sm:w-[600px] w-[100%] ml-[20px]">
        <h2 className="font-[600] sm:text-[20px] text-[16px] text-[#625F5F]">
          Organization Settings
        </h2>
        <p className="font-[400] sm:text-[14px] text-[14px] text-[#707070]">
          You can assign accounts as administrative accounts.
        </p>

        <div className="sm:w-[600px] w-[100%]  sm:h-[101px] h-[83px] outline-none bg-white rounded-[36px] mt-3 flex justify-center items-center ">
          <div className="h-[80%] w-[90%] flex justify-between items-center">
            <div>
              <h2 className="font-[500] sm:text-[16px] text-[12px]">
                Jhon Mike
              </h2>
              <p className="font-[400] sm:text-[16px] text-[12px]">
                Johnmike@gmail.com
              </p>
            </div>

            <div className="w-[107px] h-[47px] border border-black rounded-[36px] flex justify-center items-center font-[400] sm:text-[15px] text-[12px]">
              Admin
            </div>
          </div>
        </div>

        <div className="sm:w-[600px] w-[100%]  sm:h-[101px] h-[83px] outline-none bg-white rounded-[36px] mt-3 flex justify-center items-center ">
          <div className="h-[80%] w-[90%] flex justify-between items-center">
            <div>
              <h2 className="font-[500] sm:text-[16px] text-[12px]">
                Jhon Mike
              </h2>
              <p className="font-[400] sm:text-[16px] text-[12px]">
                Johnmike@gmail.com
              </p>
            </div>

            <div className="w-[107px] h-[47px] border border-black rounded-[36px] flex justify-center items-center font-[400] sm:text-[15px] text-[12px]">
              Admin
            </div>
          </div>
        </div>
        <div className="mt-7">
          <h2 className="font-[600] sm:text-[20px] text-[16px] text-[#625F5F]">
            Invite user
          </h2>
          <p className="font-[400] sm:text-[14px] text-[14px] text-[#707070]">
            Admins have full access to the entire dashboard and all other
            accounts.
          </p>
        </div>

        <div className="w-[100%] mt-3">
          <div className="w-[100%] ">
            <h2 className="font-[600] text-[14px] ml-2">Email</h2>
            <input
              type="text"
              className="w-[99%] pl-[4%] h-[46px] outline-none bg-white rounded-[36px] mt-1"
            />
          </div>
        </div>

        <div className="sm:w-[600px] w-[100%]  h-[46px] outline-none bg-white rounded-[36px] mt-3 flex justify-end">
          <div className="w-[25%] h-[100%] rounded-[36px] bg-black flex justify-center items-center text-white cursor-pointer">
            Invite
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

export default Organization;
