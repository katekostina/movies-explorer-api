require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { devJwtSecret } = require('../config');
const UnauthorizedError = require('../errors/unauthorized-error');
const errorMessages = require('../errors/messages');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(errorMessages.unauthorized);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : devJwtSecret);
  } catch (err) {
    throw new UnauthorizedError(errorMessages.unauthorized);
  }

  req.user = payload;
  next();
};

module.exports = auth;
