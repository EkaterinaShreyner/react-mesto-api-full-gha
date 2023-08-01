import React from "react";

function InfoTooltip(props) {

const popupOpened = props.isOpen ? "popup_opened" : "";

  return(
    <section className={`popup ${popupOpened}`}>
      <div className="popup__container">
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        ></button>
        <div className="popup__tooltip-container">
          <img
            className="popup__tooltip-image"
            src={props.image}
            alt={props.alt}
          />
          <p className="popup__tooltip-message">
            {props.response}
          </p>
        </div>
      </div>
    </section>
  )
}

export default InfoTooltip;