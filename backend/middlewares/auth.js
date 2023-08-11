/* eslint-disable no-console */
const jwt = require('jsonwebtoken'); // для создания токена
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
function auth(req, _res, next) {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что token есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    // return res.status(401).send({ message: 'В заголовке нет токена' });
    throw new UnauthorizedError('В заголовке нет токена');
  }
  // извлеваем токен, в переменную token запишется только JWT
  const token = authorization.replace('Bearer ', '');
  // верифицируем токен, вернёт пейлоуд токена
  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    // отправим ошибку, если не получилось
    console.log(err);
    // return res.status(401).send({ message: 'Неверный токен' });
    next(new UnauthorizedError('Неверный токен'));
  }
  // записываем пейлоуд в объект запроса
  req.user = payload;
  // пропускаем запрос дальше
  next();
}

module.exports = auth;
