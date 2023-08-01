const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regex } = require('../utils/constants');

const {
  getUsers,
  getUserById,
  getCurrentUser,
  patchUser,
  patchUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), patchUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUserById);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(regex),
  }),
}), patchUserAvatar);

module.exports = router;
