const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { PORT = 3000 } = process.env;

const bodyParser = require('body-parser');
const routes = require('./routes/router');

//mongodb://localhost:27017  mongodb://127.0.0.1:27017
mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('connect with DB mestodb');
  })
  .catch(() => {
    console.log('Error connection with DB mestodb');
  });

const app = express();
//console.log('')
//app.use(express.static(path.join(__dirname, 'public')))

// app.get('/', (req, res) => {
//   res.send('hi')
// });

app.use(bodyParser.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`)
});


//npx eslint . --fix

// {
//   "name": "test user",
//   "about": "info about",
//   "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyf_zOcxA8xzbXgSLrpyzuBNHQLLwxvJyyEA&usqp=CAU"
// }