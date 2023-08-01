import { useEffect, useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function EditProfilePopup(props) {

  const [name, setName] = useState('')
  const [about, setAbout] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about)
  }, [currentUser, props.isOpen]);

  function handleChangeInputName(evt) {
    setName(evt.target.value);
  }

  function handleChangeInputAbout(evt) {
    setAbout(evt.target.value);
  }

  function submitForm(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: name,
      about: about,
    })
  }

  return (
    <PopupWithForm
      form="form-edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={submitForm}
      isLoading={props.isLoading}
      closeOverlay={props.closeOverlay}
    >
      <input
        className="popup__input popup__input_type_name"
        name="name"
        type="text"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        id="profile-name"
        onChange={handleChangeInputName}
        value={name || ""}
      />
      <span className="popup__input-error profile-name-error"></span>
      <input
        className="popup__input popup__input_type_info"
        name="about"
        type="text"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        id="profile-info"
        onChange={handleChangeInputAbout}
        value={about || ""}
      />
      <span className="popup__input-error profile-info-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;