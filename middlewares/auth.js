const jwt = require('jsonwebtoken');
const { NOT_CORRECT_DATA } = require('../utils/erroresConstans');

const auth = (req, res, next) => {
  let token;
  let payload;
  try {
    payload = jwt.verify(token, 'very-secret-key');
  } catch (err) {
    return res
      .status(NOT_CORRECT_DATA)
      .send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  next();
};

module.exports = auth;
