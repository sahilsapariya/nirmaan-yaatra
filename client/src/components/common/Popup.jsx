import React from "react";
import "../styles/Popup.scss";
import { useDispatch, useSelector } from "react-redux";
import { onTape } from "../../features/global/globalSlice";
import Close from "../../assets/icons/close.svg";

const Popup = (props) => {
  const trigger = useSelector((state) => state.global.trigger);
  const dispatch = useDispatch();

  return trigger ? (
    <div className="popup">
      <div className="popup_close_icon">
        <img src={Close} alt="close" onClick={() => dispatch(onTape())} />
      </div>
      <div className="popup-inner">{props.children}</div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
