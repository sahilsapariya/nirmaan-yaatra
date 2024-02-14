import React from "react";
import "../styles/Components.scss";
import { useLocation, useNavigate } from "react-router-dom";

const Card = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="card__container">
      <div className="image__container">
        <img src={data.img_url} alt="ddu" />
      </div>

      <div className="card__header">
        <h3>{data.project_name}</h3>
      </div>

      <div className="card__description">
        <p>{data.description}</p>
      </div>

      <div className="card__button">
        <button onClick={() => navigate(`/site/${data.id}`)}>View Site</button>
      </div>
    </div>
  );
};

export const SiteDetailCard = ({ data }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="site_detailed_card__container">
      <div className="card__header">
        <h3>{data?.title}</h3>
      </div>

      <div className="card__image">
        <img src={data?.img_url} alt={data?.title} />
      </div>

      <div className="card__button">
        <button
          onClick={() =>
            navigate(`${location.pathname + "/site-detail/" + data.slug}`)
          }
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export const BillTable = ({ bill }) => {
  return (
    <table className="bill-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Dealer</th>
          <th>Bill Amount</th>
          <th>Bill Date</th>
          <th>Description</th>
          <th>Bill Doc</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{bill.name}</td>
          <td>{bill.dealer}</td>
          <td>{bill.billAmount}</td>
          <td>{bill.billDate}</td>
          <td>{bill.description}</td>
          <td>
            <button className="download-button">Download</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Card;
