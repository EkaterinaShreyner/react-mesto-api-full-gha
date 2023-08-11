/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const authorizationRouter = require('./routes/authorization');
const errorsHandler = require('./middlewares/errorsHandler');

const NotFoundError = require('./errors/NotFoundError');

// const { PORT = 4000 } = process.env;
const { PORT = 3000 } = process.env;
const app = express();

// поддержка cors, разрешенные источники
// app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cors({ origin: ['http://localhost:3001', 'https://mesto.project.nomoreparties.co'] }));
// app.use(cors({ origin: 'http://localhost:3001' }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
})
  .then(() => {
    console.log('БД подключена');
  })
  .catch((err) => {
    console.error(`Ошибка при подключении к БД: ${err.massage}`);
  });

// объединение пакетов данных
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

// Логгер запросов нужно подключить до всех обработчиков роутов
app.use(requestLogger);
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

// логгер ошибок подключаем после обработчиков роутов и до обработчиков ошибок
app.use(errorLogger);

// обработчики ошибок celebrate
app.use(errors());

// централизованный обработчик ошибок
app.use(errorsHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Application is running on port ${PORT}`);
});
