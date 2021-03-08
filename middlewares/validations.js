const { celebrate, Joi } = require('celebrate');
const { isEmail, isURL } = require('validator');

const validateEmail = (value, helpers) => {
  if (isEmail(value)) {
    return value;
  }
  return helpers.message('Поле email заполнено неверно');
};

const validateURL = (value, helpers) => {
  if (isURL(value)) {
    return value;
  }
  return helpers.message('Поле со ссылкой заполнено неверно');
};

const validateSignInInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).max(30)
      .custom(validateEmail),
    password: Joi.string().required().min(8).max(50),
  }),
});

const validateSignUpInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).max(30)
      .custom(validateEmail),
    password: Joi.string().required().min(8).max(50),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validatePatchProfileInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).max(30)
      .custom(validateEmail),
    name: Joi.string().min(2).max(30),
  }),
});

const validateMovieInfo = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(50),
    director: Joi.string().required().min(2).max(50),
    duration: Joi.number().required().min(1).max(10000),
    year: Joi.string().required().min(1).max(10),
    description: Joi.string().required().min(1).max(10000),
    image: Joi.string().required().uri().custom(validateURL),
    trailer: Joi.string().required().uri().custom(validateURL),
    thumbnail: Joi.string().required().uri().custom(validateURL),
    movieId: Joi.string().required().min(1).max(50),
    nameRU: Joi.string().required().min(1).max(50),
    nameEN: Joi.string().required().min(1).max(50),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24),
  }),
});

module.exports = {
  validateSignInInfo,
  validateSignUpInfo,
  validatePatchProfileInfo,
  validateMovieInfo,
  validateMovieId,
};
