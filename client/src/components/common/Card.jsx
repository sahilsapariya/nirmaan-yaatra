import React from "react";
import "../styles/Components.scss";

const Card = ({ site }) => {
  return (
    <div className="card__container">
      <div className="image__container">
        <img src={site.img_url} alt="ddu" />
      </div>

      <div className="card__header">
        <h3>{site.title}</h3>
      </div>

      <div className="card__description">
        <p>{site.description}</p>
      </div>

      <div className="card__button">
        <button>View Site</button>
      </div>
    </div>
  );
};

export default Card;
