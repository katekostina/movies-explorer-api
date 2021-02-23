const { celebrate, Joi } = require('celebrate');

const validateSignInInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(8).max(50),
  }),
});

const validateProfileInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(8).max(50),
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
    image: Joi.string().required().uri(),
    trailer: Joi.string().required().uri(),
    thumbnail: Joi.string().required().uri(),
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
  validateSignInInfo, validateProfileInfo, validateMovieInfo, validateMovieId,
};
