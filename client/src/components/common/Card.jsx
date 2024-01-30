import React from "react";
import "../styles/Components.scss";
import { useDispatch } from "react-redux";
import { onTape } from "../../features/global/globalSlice";

const Card = ({ site }) => {
  const dispatch = useDispatch();

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
        <button onClick={() => dispatch(onTape())}>View Site</button>
      </div>
    </div>
  );
};

export default Card;
