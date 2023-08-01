import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__pen">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар"
            onClick={props.onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <div className="profile__header">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="Редактировать профиль"
              onClick={props.onEditProfile}
            >
            </button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить место"
          onClick={props.onAddPlace}
        >
        </button>
      </section>
      <div className="elements">
        {props.cards.map((card) => (
          <Card
          key={card._id}
          card={card}
          onCardClick={props.onCardClick}
          onCardDelete={props.onCardDelete}
          onCardLike={props.onCardLike}
          />
        ))}
      </div>
    </main>
  );
}

export default Main;
