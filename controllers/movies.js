const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const errorMessages = require('../errors/messages');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200).send({ data: movies }))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(200).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.log(err);
        next(new BadRequestError(errorMessages.badRequestMovie));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const me = req.user._id;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(errorMessages.notFoundMovie);
      }
      if (me.toString() !== movie.owner.toString()) {
        throw new ForbiddenError(errorMessages.notMyMovie);
      }
      Movie.findByIdAndRemove(movieId)
        .then((deletedMovie) => {
          res.status(200).send({ data: deletedMovie });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = { getMovies, createMovie, deleteMovie };