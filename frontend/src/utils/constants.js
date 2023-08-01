import pushkin from '../image/pushkin.png';
import ges from '../image/ges2.png';
import hermitage from '../image/Hermitage.png';
import russkiy from '../image/Russkiy.png';
import garage from '../image/garage.png';
import dvorEkaterina from '../image/dvorEkaterina.jpeg';


export const initialCards = [
  {
    name: 'ГМИИ имени Пушкина',
    alt: 'ГМИИ имени Пушкина',
    // link: './image/pushkin.png'
    link: pushkin
  },
  {
    name: 'ГЭС 2',
    alt: 'ГЭС 2',
    // link: './image/ges2.png'
    link: ges
  },
  {
    name: 'Эрмитаж',
    alt: 'Эрмитаж',
    // link: './image/Hermitage.png'
    link: hermitage
  },
  {
    name: 'Русский Музей',
    alt: 'Русский музей',
    // link: './image/Russkiy.png'
    link: russkiy
  },
  {
    name: 'Гараж',
    alt: 'Гараж',
    // link: './image/garage.png'
    link: garage
  },
  {
    name: 'Екатериниский Дворец',
    alt: 'Екатериниский Дворец',
    // link: './image/dvorEkaterina.jpeg'
    link: dvorEkaterina
  }
];

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export const profileEditButton = document.querySelector('.profile__edit-button');
export const cardAddButton = document.querySelector('.profile__add-button');
export const avatarAddButton = document.querySelector('.profile__pen');

export const popupFormEditProfile = document.forms['form-edit-profile'];
export const popupFormCard = document.forms['form-cards'];
export const popupFormAvatar = document.forms['form-avatar'];
export const popupInputUserName = popupFormEditProfile.querySelector('.popup__input_type_name');
export const popupInputUserInfo = popupFormEditProfile.querySelector('.popup__input_type_info');
export const popupInputUserAvatar = popupFormAvatar.querySelector('.popup__input_type_avatar-link');

