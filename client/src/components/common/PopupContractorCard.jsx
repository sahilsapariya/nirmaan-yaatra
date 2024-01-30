import React from "react";
import ContractorImg from "../../assets/images/contractor.png";

const PopupContractorCard = ({ contractor }) => {
  return (
    <>
      <div className="card__heading">
        <span className="heading_red_color">Contractor</span> Information
      </div>

      <div className="card_information__container">
        <div className="information__upper_container">
          <div className="card_image__container">
            <img src={ContractorImg} alt="contractor" />
          </div>
          <div className="information_table">
            <h2>{contractor.name}</h2>
            <p>{contractor.specialization}</p>

            <table>
              <tr>
                <th>Username</th>
                <td>{contractor.username}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{contractor.email}</td>
              </tr>
              <tr>
                <th>Contact</th>
                <td>{contractor.phone_number}</td>
              </tr>
              <tr>
                <th>Location</th>
                <td>{contractor.location}</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="information__lower_container">
          <p>{contractor.description}</p>
        </div>
      </div>
    </>
  );
};

export default PopupContractorCard;
