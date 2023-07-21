const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/401-Unauthorized');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация 01'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'very-secret-key');
    console.log('success payload:', payload);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация 02'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
