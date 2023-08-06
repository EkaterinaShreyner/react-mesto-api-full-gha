// export const BASE_URL = "https://auth.nomoreparties.co";
// export const BASE_URL = "http://localhost:4000";
export const BASE_URL = "http://localhost:3000";

// регистрация пользователя
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

// авторизация пользователя
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password})
  })
  .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}

// проверка токена
export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      authorization : `Bearer ${token}`,
    }
  })
  .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
}