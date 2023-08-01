import { useEffect } from "react";

function PopupWithForm(props) {

  function handleClickOverlay() {
    props.closeOverlay(false)
  }

  // function handleCloseByEsc(evt) {
  //   if (evt.key === 'Escape') {
  //     props.onClose(false)
  //   }
  // }

  useEffect(() => {
    if (!props.isOpen) return;

    function handleCloseByEsc(evt) {
      if (evt.key === 'Escape') {
        props.onClose(false)
      }
    }
    document.addEventListener('keydown', handleCloseByEsc);
    return() => {
      document.removeEventListener('keydown', handleCloseByEsc)
    }
  }, [props.isOpen]);

  const popupOpened = props.isOpen ? "popup_opened" : "";

  return (
    <section className={`popup ${popupOpened}`} onClick={handleClickOverlay}>
      <div className="popup__container" onClick={evt => evt.stopPropagation()}>
        <button
          className="popup__button-close"
          type="button"
          aria-label="Закрыть окно"
          onClick={props.onClose}
        ></button>
        <form className="popup__form" name={props.form} onSubmit={props.onSubmit}>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button
            className="popup__button"
            type="submit"
            aria-label="Сохранить"
          >
            {props.isLoading ? "Сохранение..." : props.buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
 