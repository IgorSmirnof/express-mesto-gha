require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

// const { PORT = process.env.PORT_APP, DB_URL = process.env.DB_URL_APP } = process.env;
const PORT = 3000;
const DB_URL = 'mongodb://127.0.0.1:27017/mestodb';
// const USER_ID = '64a5c4969465b4fa2340f173';

const routes = require('./routes');

const app = express();

app.use(helmet());
app.use(express.json());

// app.use(bodyParser.json());

// app.use((req, res, next) => {
//   req.user = {
//     _id: USER_ID,
//   };
//   next();
// });

app.use(routes);
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
