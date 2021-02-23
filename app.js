const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');
const serverErrorHandler = require('./middlewares/serverErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/explorermoviesdb' } = process.env;

const app = express();
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

app.use(requestLogger);
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(serverErrorHandler);

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
