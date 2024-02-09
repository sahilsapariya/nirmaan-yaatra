import React from "react";
import "../styles/Components.scss";
import { useLocation, useNavigate } from "react-router-dom";

const Card = ({ site }) => {
  const navigate = useNavigate();

  return (
    <div className="card__container">
      <div className="image__container">
        <img src={site.img_url} alt="ddu" />
      </div>

      <div className="card__header">
        <h3>{site.project_name}</h3>
      </div>

      <div className="card__description">
        <p>{site.description}</p>
      </div>

      <div className="card__button">
        <button onClick={() => navigate(`/site/${site.id}`)}>
          View Site
        </button>
      </div>
    </div>
  );
};

export const SiteDetailCard = ({ site }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="site_detailed_card__container">
      <div className="card__header">
        <h3>{site?.title}</h3>
      </div>

      <div className="card__image">
        <img src={site?.img_url} alt={site?.title} />
      </div>

      <div className="card__button">
        <button onClick={() => navigate(`${location.pathname + '/site-detail/' + site.slug}`)}>View Details</button>
      </div>
    </div>
  );
};

export default Card;
