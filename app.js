const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./middlewares/limiter');
const routes = require('./routes');
const serverErrorHandler = require('./middlewares/serverErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, MONGO_URL } = process.env;

const app = express();
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(express.static(__dirname));

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(serverErrorHandler);

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
