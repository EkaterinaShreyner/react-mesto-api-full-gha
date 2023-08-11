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
  getCards(token) {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      // headers: this._headers
      headers: {
        ...this._headers,
        authorization : `Bearer ${token}`,
      }
    })
      .then(this._getResponse)
  }

  // получить данные пользователя
  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      // headers: this._headers
      headers: {
        ...this._headers,
        authorization : `Bearer ${token}`,
      }
    })
    .then(this._getResponse)
  }

  // отправить новые данные пользователя
  patchUserInfo(data, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      // headers: this._headers,
      headers: {
        ...this._headers,
        authorization : `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about, 
      })  
    }) 
    .then(this._getResponse)
  }
// добавление новой карточки 
   postNewCard({name, link}, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      // headers: this._headers,
      headers: {
        ...this._headers,
        authorization : `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._getResponse)
  }

  // обновить аватар
  patchAvatar({avatar}, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      // headers: this._headers,
      headers: {
        ...this._headers,
        authorization : `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar
      })
    })
    .then(this._getResponse)
  }

  // установка лайка
  putLike(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      // headers: this._headers,
      headers: {
        ...this._headers,
        authorization : `Bearer ${token}`,
      }
    })
    .then(this._getResponse)
  }

  // удаление лайка
  deleteLike(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      // headers: this._headers,
      headers: {
        ...this._headers,
        authorization : `Bearer ${token}`,
      }
    })
    .then(this._getResponse)
  }

  // удаление карточки 
  deleteCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      // headers: this._headers,
      headers: {
        ...this._headers,
        authorization : `Bearer ${token}`,
      }
    })
    .then(this._getResponse)
  }

  // проверка на лайк
  changeLikeCardStatus(cardId, isLiked, token) {
    if (isLiked) {
      return this.deleteLike(cardId, token);
    } else {
      return this.putLike(cardId, token);
    }
  }
}

// export default Api;

const api = new Api({
  // url: 'http://localhost:4000',
  // url: 'http://localhost:3000',
  url: 'https://api.mesto.project.nomoreparties.co',
  headers: {
    // authorization: 'eb88a784-5abe-4513-8117-377adafa9ddc',
    // authorization: `Bearer ${localStorage.getItem("token")}`,
    'Content-Type': 'application/json'
  }
})

export default api;
