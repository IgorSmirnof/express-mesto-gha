const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { PORT = 3000 } = process.env;

const app = express();


mongoose.connect('mongodb://0.0.0.0:27017/mestodb')
  .then(() => {
    console.log('Подключился к БД :-)');
  })
  .catch(() => {
    console.log('Ошибка при подключении к БД :-(');
  });

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.send('hi')
});



app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`)
});
