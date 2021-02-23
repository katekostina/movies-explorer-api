const usersRouter = require('express').Router();
const { getUsers, getProfile, updateProfile } = require('../controllers/users');
const { validateProfileInfo } = require('../middlewares/validations');

usersRouter.get('/secret-route', getUsers); // temporary route for tests
usersRouter.get('/me', getProfile);
usersRouter.patch('/me', validateProfileInfo, updateProfile);

module.exports = usersRouter;
