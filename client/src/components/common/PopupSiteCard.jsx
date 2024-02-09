import React from "react";
import { onSiteTape } from "../../features/global/globalSlice";
import Close from "../../assets/icons/close.svg";
import { useDispatch, useSelector } from "react-redux";

const PopupSiteCard = ({ site }) => {
  const trigger = useSelector((state) => state.global.sitePopupTrigger);
  const dispatch = useDispatch();

  return trigger ? (
    <div className="popup">
      <div className="popup_close_icon">
        <img src={Close} alt="close" onClick={() => dispatch(onSiteTape())} />
      </div>
      <div className="popup-inner">
        <div className="card__heading">
          <span className="heading_red_color">Site</span> Information
        </div>

        <div className="card_information__container">
          <div className="information__upper_container">
            <div className="card_image__container">
              <img src={site.img_url} alt="site" id="site-image" />
            </div>
            <div className="information_table">
              <h2>{site.project_name}</h2>
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
      </div>
    </div>
  ) : (
    ""
  );
};

export default PopupSiteCard;
