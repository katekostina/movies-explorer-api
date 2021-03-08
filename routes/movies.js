const moviesRouter = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateMovieInfo, validateMovieId } = require('../middlewares/validations');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', validateMovieInfo, createMovie);
moviesRouter.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = moviesRouter;
