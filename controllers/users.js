require('dotenv').config();

const { JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const errorMessages = require('../errors/messages');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

const getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      } else {
        throw new NotFoundError(errorMessages.notFoundUser);
      }
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      // передать обновлённый объект на вход обработчику then
      new: true,
      // валидировать новые данные перед записью в базу
      runValidators: true,
      // если документ не найден, создать его
      upsert: false,
    },
  )
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      } else {
        throw new NotFoundError(errorMessages.notFoundUser);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(errorMessages.badRequestUser));
      } else {
        next(err);
      }
    });
};

const signUp = (req, res, next) => {
  const { email, password, name } = req.body;
  const trimmedPassword = String(password).trim();
  const trimmedEmail = String(email).trim();
  if (trimmedPassword.length < 8) {
    throw new BadRequestError(errorMessages.badPassword);
  }
  bcrypt
    .hash(trimmedPassword, 10)
    .then((hash) => User.create({
      email: trimmedEmail,
      password: hash,
      name,
    }))
    .then((user) => {
      res.status(201).send({ data: { _id: user._id, email: user.email } });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(errorMessages.badNewUser));
      } else if (err.name === 'MongoError' && err.code === 11000) {
        next(new BadRequestError(errorMessages.duplicateUser));
      } else {
        next(err);
      }
    });
};

const signIn = (req, res, next) => {
  const { email, password } = req.body;
  const trimmedPassword = String(password).trim();
  const trimmedEmail = String(email).trim();
  User.findUserByCredentials(trimmedEmail, trimmedPassword)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id }, JWT_SECRET, { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getProfile,
  updateProfile,
  signUp,
  signIn,
};
