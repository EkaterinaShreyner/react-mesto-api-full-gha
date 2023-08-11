/* eslint-disable no-console */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // для создания токена

const { SUCCESS_CREATE__REQUEST } = require('../utils/constants');
const User = require('../models/users'); // импортируем модель user
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

// создание нового пользователя
function createUser(req, res, next) {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10) // хеширование пароля
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(SUCCESS_CREATE__REQUEST).send(
      {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      },
    ))
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь с таким email зарегистрирован'));
      }
      return next(err);
    });
}

// запрос всех пользователей
function getUsers(_req, res, next) {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => next(err));
}

// запрос пользователя по id
function getUserById(req, res, next) {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      console.log(userId);
      if (!user) {
        throw new NotFoundError('Пользователь с таким id не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные id пользователя'));
      }
      return next(err);
    });
}

// запрос текущего пользователя
function getCurrentUser(req, res, next) {
  const userId = req.user._id;
  console.log(userId);
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь c таким id не найден');
      }
      return res.send(user);
    })
    .catch((err) => next(err));
}

// создание контроллера аутентификации
function login(req, res, next) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создание токена
      const token = jwt.sign(
        { _id: user._id }, // зашифрованный в строку объект пользователя
        // 'some-secret-key',
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' }, // действие токена 7 дней
      );
      console.log(token);
      console.log(user);
      // res.send({ token });
      // хранение токена в куки на 7 дней
      // res.cookie('token', token, {
      //   maxAge: 3600000 * 24 * 7,
      //   httpOnly: true,
      // });
      res.send({ token });
    })
    .catch(next);
}

// замена данных пользователя
function patchUser(req, res, next) {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      // upsert: true // если пользователь не найден, он будет создан
    },
  )
    .then((user) => res.send(user))
    // .then((user) => console.log({ name }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
}

// замена аватара пользователя
function patchUserAvatar(req, res, next) {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      // upsert: false // если пользователь не найден, он не будет создан
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
}

module.exports = {
  login,
  getUsers,
  getUserById,
  getCurrentUser,
  createUser,
  patchUser,
  patchUserAvatar,
};
