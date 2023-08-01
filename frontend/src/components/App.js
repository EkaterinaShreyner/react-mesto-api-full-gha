import { useEffect, useState } from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import PopupConfirm from "./PopupConfirm.js";
import AddPlacePopup from "./AddPlacePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Register from "./Register.js";
import Login from "./Login.js";
import ProtectedRoute from "./ProtectedRoute.js";
import * as mestoAuth from "../utils/MestoAuth.js";

function App() {

  // авторизованный пользователь
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  
  // попапы
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPopupConfirmOpen, setIsPopupConfirmOpen] = useState(false);

  // выбранная карточка
  const [selectedCard, setSelectedCard] = useState(null);

  // данные пользователя
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState('');

  // мобильное меню
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  // массив карточек
  const [cards, setCards] = useState([]);

  // загрузка лодинг
  const [isLoading, setIsLoading] = useState(false);

  // карточка для удаления
  const [selectedConfirmDeleteCard, setSelectedConfirmDeleteCard] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([dataUser, cards]) => {
          setCurrentUser(dataUser);
          setCards(cards);
        })
        .catch((err) => {
          console.error(`Ошибка ${err}`);
        });
    }
    
  }, [isLoggedIn]);

  const navigate = useNavigate();

  // запрос на проверку валидности токена
  function checkToken() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      mestoAuth.getContent(token)
      .then((res) => {
        if (res) {
          setUserEmail(res.data.email) // получаем значение переменной состояния после сабмита
          setIsLoggedIn(true);
          navigate("/")
        }
        return;
      })
      .catch((err) => {
        console.error(`Ошибка валидности токена: ${err}`)
        setIsLoggedIn(false)
      })
    }
  }

  // срабатывает функция проверка токена единыжды при отрисовки компонента App
  useEffect(() => {
    checkToken();
  }, []);

  // Если токен еще не прошел проверку, при перезагрузке страницы отрисовыввется компонент Loading
  // if (isLoggedIn === null) {
  //   return <Loading />
  // }

  function onSignOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserEmail("");
    navigate("/sign-in", {replace: true})
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPopupConfirmOpen(false)
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((el) => el._id === card._id ? newCard : el))
      })
  }

  function handleCardDelete(card) {
    setSelectedConfirmDeleteCard(card);
    setIsPopupConfirmOpen(true);
  }

  function handleConfirmDeleteCard() {
    api.deleteCard(selectedConfirmDeleteCard._id)
      .then(() => {
        const newCards = cards.filter((el) => el !== selectedConfirmDeleteCard)
        setCards(newCards)
        setIsPopupConfirmOpen(false)
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`)
      })
      .finally(() => {
        setIsPopupConfirmOpen(false)
      })
  }

  function handleUpdateUser(dataUser) {
    setIsLoading(true)
    api.patchUserInfo(dataUser) 
      .then((dataUser) => {
        setCurrentUser({
          name: dataUser.name,
          about: dataUser.about,
          avatar: dataUser.avatar
        })
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleUpdateAvatar({avatar}) {
    setIsLoading(true)
    api.patchAvatar({avatar})
      .then((dataUser) => {
        setCurrentUser({
          avatar: dataUser.avatar,
          name: dataUser.name,
          about: dataUser.about
        })
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleAddPlaceSubmit({name, link}) {
    setIsLoading(true)
    api.postNewCard({name, link})
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleMobileMenu() {
    setIsMobileMenu(!isMobileMenu)
    console.log(isMobileMenu)
    
  }

  return (
    <div className="root">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            isLoggedIn={isLoggedIn}
            userEmail={userEmail}
            onSignOut={onSignOut}
            isMobileMenu={isMobileMenu}
            handleMobileMenu={handleMobileMenu}
    
          />
          <Routes>
            <Route path="/sign-up" element={<Register />} />
            <Route 
              path="/sign-in"
              element={
                <Login
                  userEmail={(email) => setUserEmail(email)}
                  handleLogin={() => setIsLoggedIn(true)}
                  
                />
              }
            />
            <Route path="/" 
              element={
                <>
                  <ProtectedRoute 
                    element={Main}
                    isLoggedIn={isLoggedIn}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                  <Footer />
                </>
              }
            />
            <Route path="*"
              element={!isLoggedIn ? <Navigate to="/sign-in" /> : <Navigate to="/" />}
            />
          </Routes>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
            closeOverlay={setIsEditProfilePopupOpen}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
            closeOverlay={setIsEditAvatarPopupOpen}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
            closeOverlay={setIsAddPlacePopupOpen}
          />
          <PopupConfirm
            isOpen={isPopupConfirmOpen}
            onClose={closeAllPopups}
            onConfirmDeleteCard={handleConfirmDeleteCard}
            closeOverlay={setIsPopupConfirmOpen}
          ></PopupConfirm>
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            closeOverlay={setSelectedCard}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
