const jwt = require('jsonwebtoken');
const { NOT_CORRECT_DATA } = require('../utils/erroresConstans');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'very-secret-key');
    console.log('success payload:', payload);
  } catch (err) {
    return res
      .status(NOT_CORRECT_DATA)
      .send({ message: 'Необходима авторизация auth' });
  }
  req.user = payload;
  return next();
};

module.exports = auth;
