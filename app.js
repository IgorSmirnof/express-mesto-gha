const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { PORT = 3000 } = process.env;

const bodyParser = require('body-parser');
const routes = require('./routes/router');

const app = express();

app.use(express.json());
app.use(routes);
//mongodb://localhost:27017  mongodb://127.0.0.1:27017
mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('connect with DB mestodb');
  })
  .catch(() => {
    console.log('Error connection with DB mestodb');
  });




// app.use((req, res, next) => {
//   req.user = {
//     _id: '64a5c6739465b4fa2340f175' // вставьте сюда _id созданного в предыдущем пункте пользователя
//   };

//   next();
// });
// module.exports.createCard = (req, res) => {
//   console.log(req.user._id); // _id станет доступен
// };

//console.log('')
//app.use(express.static(path.join(__dirname, 'public')))

// app.get('/', (req, res) => {
//   res.send('hi')
// });

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`)
});


//npx eslint . --fix

// {
//   "name": "test user",
//   "about": "info about",
//   "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyf_zOcxA8xzbXgSLrpyzuBNHQLLwxvJyyEA&usqp=CAU"
// }