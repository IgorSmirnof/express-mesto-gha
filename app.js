const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { PORT = 3000 } = process.env;

const app = express();


mongoose.connect('mongodb://0.0.0.0:27017/mestodb')
  .then(() => {
    console.log('connect with DB mestodb');
  })
  .catch(() => {
    console.log('Error connection with DB mestodb');
  });

//app.use(express.static(path.join(__dirname, 'public')))

// app.get('/', (req, res) => {
//   res.send('hi')
// });



app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`)
});
