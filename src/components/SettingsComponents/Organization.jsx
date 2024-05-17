import React, { useEffect, useState } from "react";
import {
  adminAccess,
  getAllChilds,
  getSingleChild,
  removeAdmin,
} from "../../Services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "../Modals/DeleteModal";
import { useTranslation } from "react-i18next";

const Organization = ({ uid }) => {
  let [email, setEmail] = useState("");
  let [allProfiles, setAllProfiles] = useState([]);
  let [loading, setLoading] = useState(false);
  let [crntUser, setCrntUser] = useState({});
  let [crntParent, setCrntParent] = useState({});
  let [admins, setAdmins] = useState([]);
  let crntUserId = localStorage.getItem("connexUid");
  let crntParentId = localStorage.getItem("conexParent");
  console.log(crntParentId);
  let getAllProfiles = (obj) => {
    setAllProfiles(Object.values(obj));
  };
  useEffect(() => {
    getAllChilds(getAllProfiles, setLoading);
    if (!crntParentId) {
      getSingleChild(crntUserId, setCrntUser);
      getSingleChild(crntUserId, setCrntParent);
    } else {
      getSingleChild(crntUserId, setCrntUser);
      getSingleChild(crntParentId, setCrntParent);
    }
  }, []);
  console.log(crntParent);

  useEffect(() => {
    let filtered = allProfiles?.filter((elm) => {
      return elm?.isAdmin === true;
    });
    setAdmins(filtered);
  }, [allProfiles]);

  console.log(admins);

  let [deleteModal, setdeleteModal] = useState(false);
  let [adminId, setAdminId] = useState("");

  let handledeleteModal = () => {
    setdeleteModal(!deleteModal);
  };

  const { t } = useTranslation();

  return (
    <div className="w-[100%]  mt-7 flex flex-col">
      <div className="sm:w-[600px] w-[100%] ml-[20px]">
        <DeleteModal
          deleteModal={deleteModal}
          handledeleteModal={handledeleteModal}
          text="Are you sure to remove this user as Admin?"
          func={() => removeAdmin(adminId)}
        />
        <h2 className="font-[600] sm:text-[20px] text-[16px] text-[#625F5F]">
          {t("Organization Settings")}
        </h2>
        <p className="font-[400] sm:text-[14px] text-[14px] text-[#707070]">
          {t("You can assign accounts as administrative accounts.")}
        </p>
        <div className="sm:w-[600px] w-[100%] min-h-[150px] max-h-[350] overflow-y-scroll ">
          <div className="sm:w-[600px] w-[100%]  sm:h-[101px] h-[83px] outline-none bg-white rounded-[36px] mt-3 flex justify-center items-center ">
            <div className="h-[80%] w-[90%] flex justify-between items-center">
              <div>
                <h2 className="font-[500] sm:text-[16px] text-[12px]">
                  {Object.values(crntParent)?.[0]?.name}
                </h2>
                <p className="font-[400] sm:text-[16px] text-[12px]">
                  {Object.values(crntParent)?.[0]?.email}
                </p>
              </div>
              <div className="flex gap-2">
                <div className="w-[107px] h-[47px] border border-black rounded-[36px] flex justify-center items-center font-[400] sm:text-[15px] text-[12px]">
                  {t("Admin")}
                </div>

                {/* <div
                      className="w-[107px] h-[47px] border border-red-500 text-red-500 rounded-[36px] flex justify-center items-center font-[400] sm:text-[15px] text-[12px] cursor-pointer"
                      onClick={() => {
                        handledeleteModal(), setAdminId(elm?.id);
                      }}
                    >
                      Remove
                    </div> */}
              </div>
            </div>
          </div>
          {admins?.map((elm) => {
            return (
              <div className="sm:w-[600px] w-[100%]  sm:h-[101px] h-[83px] outline-none bg-white rounded-[36px] mt-3 flex justify-center items-center ">
                <div className="h-[80%] w-[90%] flex justify-between items-center">
                  <div>
                    <h2 className="font-[500] sm:text-[16px] text-[12px]">
                      {elm?.name}
                    </h2>
                    <p className="font-[400] sm:text-[16px] text-[12px]">
                      {elm?.email}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-[107px] h-[47px] border border-black rounded-[36px] flex justify-center items-center font-[400] sm:text-[15px] text-[12px]">
                      {t("Admin")}
                    </div>
                    {Object.values(crntUser)?.[0]?.isCompany && (
                      <div
                        className="w-[107px] h-[47px] border border-red-500 text-red-500 rounded-[36px] flex justify-center items-center font-[400] sm:text-[15px] text-[12px] cursor-pointer"
                        onClick={() => {
                          handledeleteModal(), setAdminId(elm?.id);
                        }}
                      >
                        {t("Remove")}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-7">
          <h2 className="font-[600] sm:text-[20px] text-[16px] text-[#625F5F]">
            {t("Invite user")}
          </h2>
          <p className="font-[400] sm:text-[14px] text-[14px] text-[#707070]">
            {t(
              "Admins have full access to the entire dashboard and all other accounts."
            )}
          </p>
        </div>

        <div className="w-[100%] mt-3">
          <div className="w-[100%] ">
            <h2 className="font-[600] text-[14px] ml-2">{t("Email")}</h2>
            <input
              type="text"
              className="w-[99%] pl-[4%] h-[46px] outline-none bg-white rounded-[36px] mt-1"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
        </div>

        <div className="sm:w-[600px] w-[100%]  h-[46px] outline-none bg-white rounded-[36px] mt-3 flex justify-end">
          <div
            className="w-[25%] h-[100%] rounded-[36px] bg-black flex justify-center items-center text-white cursor-pointer"
            onClick={() => adminAccess(uid, email, setEmail)}
          >
            {t("Invite")}
          </div>
        </div>
        <ToastContainer
          position="bottom-left"
          autoClose={1000}
          theme="colored"
          hideProgressBar
        />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default Organization;
