import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function PopupConfirm(props) {

  function submitForm(evt) {
    evt.preventDefault();
    props.onConfirmDeleteCard();
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      buttonText="Да"
      form="form-confirm"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={submitForm}
      closeOverlay={props.closeOverlay}
      ></PopupWithForm>
  )
} 

export default PopupConfirm;