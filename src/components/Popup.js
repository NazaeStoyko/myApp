import React from "react";
import "./popup.css";

const Popup = (props) => {
  return (
    <div className="popup__box">
      <div className="box">
        <button className="btn__close" onClick={props.handleClose}>
          X
        </button>
        {props.content}
      </div>
    </div>
  );
};
export default Popup;
