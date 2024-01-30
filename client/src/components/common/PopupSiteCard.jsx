import React from "react";
import SiteImg from "../../assets/images/site.png";

const PopupSiteCard = ({ site }) => {
  return (
    <>
      <div className="card__heading">
        <span className="heading_red_color">Site</span> Information
      </div>

      <div className="card_information__container">
        <div className="information__upper_container">
          <div className="card_image__container">
            <img src={SiteImg} alt="site" id="site-image" />
          </div>
          <div className="information_table">
            <h2>{site.name}</h2>
            <p>{site.city}</p>

            <table>
              <tr>
                <th>Client name</th>
                <td>{site.client_name}</td>
              </tr>
              <tr>
                <th>Budget</th>
                <td>{site.budget}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{site.status}</td>
              </tr>
              <tr>
                <th>Location</th>
                <td>{site.location}</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="information__lower_container">
          <p>{site.description}</p>
        </div>
      </div>
    </>
  );
};

export default PopupSiteCard;
