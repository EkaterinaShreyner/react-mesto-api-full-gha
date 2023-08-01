/* eslint-disable no-console */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Некорректный URL',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Некорректный Email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false, //  по умолчанию хеш пароля пользователя не будет возвращаться из базы
  },
});

// метод findUserByCredentials,принимает на вход почту и пароль и
// возвращает объект пользователя или ошибку
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }) // найти пользователя по почте
    .select('+password')
    .then((user) => {
      if (!user) { // если такого email нет, то ошибка
        return Promise.reject(new UnauthorizedError('Неправильные email или пароль'));
      }
      // если user нашелся сравниваем хеши
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            console.log(password);
            console.log(user.password);
            return Promise.reject(new UnauthorizedError('Неправильные email или пароль'));
          }
          return user;
        });
    });
};

const User = mongoose.model('user', userSchema);

module.exports = User;
