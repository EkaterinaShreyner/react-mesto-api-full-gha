import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as mestoAuth from "../utils/MestoAuth.js";
import InfoTooltip from "./InfoTooltip.js";
import icon from "../image/icon.svg";
import union from "../image/Union.svg";

function Register(props) {

  const [formValue, setFormValue] = useState({
    email: "",
    password: ""
  });

  const [isPopupTooltip, setIsPopupTooltip] = useState(false);
  const [successRegister, setSuccessRegister] =useState();

  const navigate = useNavigate();

  function handleChangeInput(evt) {
    const {name, value} = evt.target;
    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  function onRegister(evt) {
    evt.preventDefault();
    const {email, password} = formValue;
    mestoAuth.register(email, password)
      .then((res) => {
        setSuccessRegister(true)
        setIsPopupTooltip(true)
        console.log(res);
      })
      .catch((err) => {
        setSuccessRegister(false)
        setIsPopupTooltip(true)
        console.error(`Ошибка регистрации: ${err}`)
      })
  }
  
  return(
    <>
      <div className="auth">
        <form className="auth__form" name="form-register" onSubmit={onRegister}>
          <h2 className="auth__title">Регистрация</h2>
          <input
            className="auth__input"
            name="email"
            type="email"
            placeholder="Email"
            minLength="5"
            maxLength="30"
            required
            onChange={handleChangeInput}
          />
          <input
            className="auth__input"
            name="password"
            type="password"
            placeholder="Пароль"
            minLength="3"
            maxLength="10"
            required
            onChange={handleChangeInput}
          />
          <button
            className="auth__button"
            type="submit"
            >
              Зарегистрироваться
          </button>
        </form>
        <p className="auth__confirm">
          Уже зарегистрированы?{" "}
          <Link className="auth__link" to="/sign-in">Войти</Link>
        </p>
        <InfoTooltip
          response={successRegister ? "Вы успешно зарегистрировались." : "Что-то пошло не так! Попробуйте еще раз."}
          image={successRegister ? icon : union}
          alt={successRegister ? "Иконка Успешно" : "Иконка Ошибка"}
          isOpen={isPopupTooltip}
          onClose={(() => {
            setIsPopupTooltip(false);
            if (successRegister) {
              navigate('/sign-in', {replace: true});
            }
          })}
        />
    </div>
  </>
  )
}

export default Register;
