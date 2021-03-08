const usersRouter = require('express').Router();
const { getUsers, getProfile, updateProfile } = require('../controllers/users');
const { validatePatchProfileInfo } = require('../middlewares/validations');

usersRouter.get('/secret-route', getUsers); // temporary route for tests
usersRouter.get('/me', getProfile);
usersRouter.patch('/me', validatePatchProfileInfo, updateProfile);

module.exports = usersRouter;
