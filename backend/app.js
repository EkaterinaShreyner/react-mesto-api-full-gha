const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const auth = require('./middlewares/auth');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const authorizationRouter = require('./routes/authorization');
const errorsHandler = require('./middlewares/errorsHandler');

const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

// объединение пакетов данных
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

// запуск роутов регистрации и аутентификации
// не требующие авторизации
app.use('/', authorizationRouter);

// авторизация, защита роутов авторизацией
app.use(auth);

// запуск роутера для запросов по строке /users
app.use('/users', usersRouter);
// запуск роутера для запросов по строке /cards
app.use('/cards', cardsRouter);

// роут для несуществующей страницы
app.use('/*', (_req, _res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

// обработчики ошибок celebrate
app.use(errors());

// централизованный обработчик ошибок
app.use(errorsHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Application is running on port ${PORT}`);
});
