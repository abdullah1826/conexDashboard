import React from "react";
import { CSVLink } from "react-csv";

const DownloadCsv = ({ data }) => {
  console.log(data);
  const csvData = data?.map((item) => {
    return {
      Contact: item?.name,
      Email: item?.email,
      contactedWith: item?.contactedWith,
      Date: item?.date,
      Job: item?.job,
      Company: item?.company,
      phone: item?.phone,
      note: item?.message,
    };
  });

  return (
    <CSVLink
      data={csvData}
      filename={`MyContacts.csv`}
      style={{ textDecoration: "none", color: "black" }}
    >
      Export CSV
    </CSVLink>
  );
};

export default DownloadCsv;
