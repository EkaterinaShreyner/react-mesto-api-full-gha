import React from 'react';
import logo from '../image/Vector.svg';
import { Link, Route, Routes } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import close from '../image/Close Icon.svg';

function Header(props) {

  function onSignOut() {
    props.onSignOut();
  }

  return (
    <>
      <MobileMenu
        onSignOut={onSignOut}
        userEmail={props.userEmail}
        isMobileMenu={props.isMobileMenu}
      />
      <header className="header">
          <img 
            src={logo}
            className="header__logo"
            alt="Логотип проекта место" 
          />
        <Routes>
          <Route 
            path="/sign-up"
            element={
              <Link className="header__button" to="/sign-in">Войти</Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link className="header__button" to="/sign-up">Регистрация</Link>
            }
          />
          <Route
            path="/"
            element={
              <>
              <div className="header__container">
                <p className="header__imail">{props.userEmail}</p>
                <Link
                  className="header__button header__button_type_exit"
                  type="button"
                  onClick={onSignOut}
                  to="sign-in"
                >
                  Выйти
                </Link>
              </div>
              <div className="header__menu-burger"
                onClick={props.handleMobileMenu}
              >
                {props.isMobileMenu 
                  ?
                    <img src={close} className="header__button-close" alt="крестик"/>
                  : 
                  <>
                    <div className="header__menu-burger-item"></div>
                    <div className="header__menu-burger-item"></div>
                    <div className="header__menu-burger-item"></div>
                  </>
                }
              </div>
              </>
            }
          />
        </Routes>
      </header>
    </>
  );
}

export default Header;