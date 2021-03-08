const router = require('express').Router();
const NotFoundError = require('../errors/not-found-error');

const moviesRouter = require('./movies');
const usersRouter = require('./users');
const auth = require('../middlewares/auth');
const { signUp, signIn } = require('../controllers/users');
const { validateSignInInfo, validateSignUpInfo } = require('../middlewares/validations');
const errorMessages = require('../errors/messages');

// open routes for not-authorized users
router.post('/signin', validateSignInInfo, signIn);
router.post('/signup', validateSignUpInfo, signUp);

// check if user authorized
router.use(auth);

// protected by authorization routes below
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use((req, res, next) => {
  next(new NotFoundError(errorMessages.notFoundRoute));
});

module.exports = router;
