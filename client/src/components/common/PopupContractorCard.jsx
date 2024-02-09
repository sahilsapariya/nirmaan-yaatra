import React from "react";
import { onContractorTape } from "../../features/global/globalSlice";
import Close from "../../assets/icons/close.svg";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Popup.scss";

const PopupContractorCard = ({ contractor }) => {
  const trigger = useSelector((state) => state.global.contractorPopupTrigger);
  const dispatch = useDispatch();

  return trigger ? (
    <div className="popup">
      <div className="popup_close_icon">
        <img
          src={Close}
          alt="close"
          onClick={() => dispatch(onContractorTape())}
        />
      </div>

      <div className="popup-inner">
        <div className="card__heading">
          <span className="heading_red_color">Contractor</span> Information
        </div>

        <div className="card_information__container">
          <div className="information__upper_container">
            <div className="card_image__container">
              <img src={contractor?.img_url} alt="contractor" />
            </div>
            <div className="information_table">
              <h2>{contractor?.name}</h2>
              <p>{contractor?.specialization}</p>

              <table>
                <tr>
                  <th>Username</th>
                  <td>{contractor?.username}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{contractor?.email}</td>
                </tr>
                <tr>
                  <th>Contact</th>
                  <td>{contractor?.phone_number}</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>{contractor?.address}</td>
                </tr>
              </table>
            </div>
          </div>
          <div className="information__lower_container">
            <p>{contractor?.description}</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default PopupContractorCard;
