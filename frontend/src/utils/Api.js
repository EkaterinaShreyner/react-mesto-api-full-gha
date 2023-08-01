class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

    //ответ от сервера 
  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
    
  }

  //получить массив объектов с карточками
  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._getResponse)
  }

  // получить данные пользователя
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._getResponse)
  }

  // отправить новые данные пользователя
  patchUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about, 
      })  
    }) 
    .then(this._getResponse)
  }
// добавление новой карточки 
   postNewCard({name, link}) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._getResponse)
  }

  // обновить аватар
  patchAvatar({avatar}) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then(this._getResponse)
  }

  // установка лайка
  putLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._getResponse)
  }

  // удаление лайка
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._getResponse)
  }

  // удаление карточки 
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._getResponse)
  }

  // проверка на лайк
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.deleteLike(cardId);
    } else {
      return this.putLike(cardId);
    }
  }
}

// export default Api;

const api = new Api({
  // url: 'https://nomoreparties.co/v1/cohort-65',
  url: 'http://localhost:4000',
  headers: {
    // authorization: 'eb88a784-5abe-4513-8117-377adafa9ddc',
    authorization: `Bearer ${localStorage.getItem("token")}`,
    'Content-Type': 'application/json'
  }
})

export default api;
