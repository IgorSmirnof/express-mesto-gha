require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');

// const { PORT = process.env.PORT_APP, DB_URL = process.env.DB_URL_APP } = process.env;
const PORT = 3000;
const DB_URL = 'mongodb://127.0.0.1:27017/mestodb';

const routes = require('./routes');

const app = express();

app.use(helmet());
app.use(express.json());

// const USER_ID = '64b5421883077f255cbb7948';
// app.use((req, res, next) => {
//   req.user = {
//     _id: USER_ID,
//   };
//   next();
// });

app.use(routes);

app.use(errors());
app.use(require('./middlewares/handleErrors'));

// app.use(bodyParser.json());

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('connect with DB mestodb');
  })
  .catch(() => {
    console.log('Error connection with DB mestodb');
  });

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
