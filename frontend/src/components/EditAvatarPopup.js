import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const inputAvatar = useRef(null);

  function submitForm(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: inputAvatar.current.value
    })
  }

  return (
    <PopupWithForm
      form="form-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={submitForm}
      isLoading={props.isLoading}
      closeOverlay={props.closeOverlay}
      >
      <input
        className="popup__input popup__input_type_avatar-link"
        name="avatar"
        type="url"
        placeholder="Ссылка на аватар"
        required
        id="avatar-link-input"
        ref={inputAvatar}
      />
      <span className="popup__input-error avatar-link-input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;