const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { regex } = require('../utils/constants');
const { login, createUser } = require('../controllers/users');

// роут создания пользователя
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    avatar: Joi.string().regex(regex),
  }),
}), createUser);

// роут аутентификации
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

module.exports = router;
