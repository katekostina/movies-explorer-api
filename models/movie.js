const mongoose = require('mongoose');
const { isURL } = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  duration: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 10,
  },
  year: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10000,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неверный формат ссылки на картинку',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неверный формат ссылки на картинку',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неверный формат ссылки на картинку',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  nameRU: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
});

module.exports = mongoose.model('movie', movieSchema);
