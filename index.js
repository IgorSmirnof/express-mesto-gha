const express = require('express');
const { PORT = 3000 } = process.env;

const app = express();

app.get('/', (req, res) => {
  res.send('hi')
});



app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`)
});
