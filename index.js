const express = require('express');
const path = require('path');
const { PORT = 3000 } = process.env;

const app = express();


app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.send('hi')
});



app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`)
});
