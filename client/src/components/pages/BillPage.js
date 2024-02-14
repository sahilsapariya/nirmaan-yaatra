import React from "react";
import "../styles/BillPage.scss";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

const EditProfilePage = ({ bill }) => {
  return (
    <>
      <div className="edit_profile_heading">
        <div className="sites__heading">
          <span className="heading_red_color">Bill</span> Details
        </div>
      </div>

      <div className="bill_table">
        <table className="bill-table">
          <thead>
            <tr>
              <th>Name</th>
              <td>Water Pipes</td>
            </tr>
            <tr>
              <th>Dealer</th>
              <td>PVC Company</td>
            </tr>
            <tr>
              <th>Bill Amount</th>
              <td>15,000/-</td>
            </tr>
            <tr>
              <th>Bill Date</th>
              <td>01/10/2023</td>
            </tr>
            <tr>
              <th>Description</th>
              <td className="profile_description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                praesentium ducimus possimus laboriosam natus delectus neque
                placeat quae, illo ullam fuga ut, consectetur animi! Dolor
                molestiae labore recusandae quod impedit.
              </td>
            </tr>
            <tr>
              <th>Bill Doc</th>
              <td>
                <button className="bill_download">
                  <span className="download_text">Download</span>{" "}
                  <DownloadForOfflineIcon />
                </button>
              </td>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
};

export default EditProfilePage;
