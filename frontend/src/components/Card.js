import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  
  // проверяем, есть ли лайк пользователя на карточке
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `element__like ${isLiked && 'element__like_active'}`
  );

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleCardLike() {
    props.onCardLike(props.card);
  }

  function handleCardDelete() {
    props.onCardDelete(props.card)
  }

  return(
      <div className="element">
        {isOwn && 
          <button 
            className="element__card-delete"
            type="button"
            aria-label="Удалить"
            onClick={handleCardDelete}
          />} 
        <img className="element__image"
          src={props.card.link}
          alt={props.card.name}
          onClick={handleCardClick}
        />
        <div className="element__line">
          <h2 className="element__title">{props.card.name}</h2>
          <div className="element__section-like">
            <button
              className={cardLikeButtonClassName}
              type="button"
              aria-label="Нравится"
              onClick={handleCardLike}
            >
            </button>
            <p className="element__likes">{props.card.likes.length}</p>
          </div>
        </div>
      </div>
  )
}

export default Card;