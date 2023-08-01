import React from "react";

function ImagePopup(props) {
  const popupOpened = props.card ? "popup_opened" : "";

  function handleClickOverlay() {
    props.closeOverlay(null)
  }

  return (
    <section className={`popup ${popupOpened}`} onClick={handleClickOverlay}>
      <div className="popup__container" onClick={evt => evt.stopPropagation()}>
        <button
          className="popup__button-close"
          type="button"
          aria-label="Закрыть окно"
          onClick={props.onClose}
        >
        </button>
        <img
          className="popup__image-full"
          src={props.card?.link} // опциональную цепочку, остановит вычисление если значение перед ?. равно null или undefined
          alt={props.card?.name}
        />
        <h2 className="popup__title popup__title_image-full">{props.card?.name}</h2>
      </div>
    </section>
  )
}

export default ImagePopup;