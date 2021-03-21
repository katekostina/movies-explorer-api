require('dotenv').config();
const rateLimit = require('express-rate-limit');

const { MAX_REQS } = process.env;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: MAX_REQS, // можно совершить максимум MAX_REQS запросов с одного IP
});

module.exports = limiter;
