import React from "react";
import { useState } from "react";
import * as mestoAuth from "../utils/MestoAuth.js"
import { useNavigate } from "react-router-dom";

function Login(props) {

  const [formValue, setFormValue] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  function handleChangeInput(evt) {
    const {name, value} = evt.target;
    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  function onLogin(evt) {
    evt.preventDefault();
    props.handleLogin();
    const {email, password} = formValue;
    mestoAuth.authorize(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        props.userEmail(email);
        props.handleLogin();   
        navigate("/");
      })
      .catch((err) => {
        console.error(`Ошибка авторизации: ${err}`)
      })
  }

  return(
    <div className="auth">
      <form className="auth__form" name="form-register" onSubmit={onLogin}>
        <h2 className="auth__title">Вход</h2>
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
            Войти
        </button>
      </form>
    </div>
  )
}

export default Login;