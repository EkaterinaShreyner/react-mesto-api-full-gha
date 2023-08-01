import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup(props) {

  const [namePlace, setNamePlace] = useState('')
  const [link, setLink] = useState('')

  // Очистка формы после добавления новой карточки
  // происходит только после успешной отправки запроса.
  useEffect(() => {
    setNamePlace('')
    setLink('')
  }, [props.isOpen])

  function submitForm(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name: namePlace,
      link: link
    })
  }

  function handleChangeInputNamePlace(evt) {
    setNamePlace(evt.target.value)
  }

  function handleChangeInputLink(evt) {
    setLink(evt.target.value)
  }

  return (
    <PopupWithForm
            form="form-cards"
            title="Новое место"
            buttonText="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={submitForm}
            isLoading={props.isLoading}
            closeOverlay={props.closeOverlay}
          >
            <input
              className="popup__input popup__input_card_name"
              name="name"
              type="text"
              placeholder="Название"
              minLength="2"
              maxLength="30"
              required
              id="card-name-input"
              value={namePlace}
              onChange={handleChangeInputNamePlace}
            />
            <span className="popup__input-error card-name-input-error"></span>
            <input
              className="popup__input popup__input_card_link"
              name="link"
              type="url"
              placeholder="Ссылка на картинку"
              required
              id="card-link-input"
              value={link}
              onChange={handleChangeInputLink}
            />
            <span className="popup__input-error card-link-input-error"></span>
          </PopupWithForm>
  )
}

export default AddPlacePopup;