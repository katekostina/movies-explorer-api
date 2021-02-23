const errorMessages = {
  badRequestMovie: 'Произошла ошибка валидации данных нового фильма.',
  notFoundMovie: 'Нет фильма с таким id.',
  notMyMovie: 'Недостаточно прав для удаления фильма.',
  notFoundUser: 'Пользователь не найден.',
  badRequestUser: 'Произошла ошибка валидации данных пользователя.',
  badPassword: 'Пароль должен содержать не менее восьми символов.',
  badNewUser: 'Произошла ошибка валидации данных нового пользователя.',
  duplicateUser: 'Такой пользователь уже есть.',
  unauthorized: 'Необходима авторизация',
  badAuthorization: 'Неправильные почта или пароль',
  notFoundRoute: 'Такой ресурс не найден.',
};

module.exports = errorMessages;
