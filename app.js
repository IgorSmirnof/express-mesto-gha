const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const routes = require('./routes');

const app = express();

app.use(helmet());
app.use(express.json());
// app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64a5c4969465b4fa2340f173',
  };
  next();
});

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
