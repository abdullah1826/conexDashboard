import React from "react";
import Mobile from "../Mobile";
import { useTranslation } from "react-i18next";

const MobileContainer = ({ id }) => {
  const { t } = useTranslation();

  return (
    <div className="h-[100%] w-[100%] flex flex-col justify-center items-center">
      <p className="text-[#ACACAC] text-[10px] font-[500]">
        {t("Live Preview")}
      </p>
      <button
        className="w-[90px] h-[30px] mt-1 rounded-[11px] border-black border font-[500] text-[12px]"
        onClick={() => window.open(`https://www.profile.connexcard.com/${id}`)}
      >
        {t("View Card")}
      </button>
      <Mobile />
    </div>
  );
};

export default MobileContainer;
