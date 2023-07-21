const errorHandler = (err, _req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Внутренняя ошибка сервера' : err.message;
  res
    .status(statusCode)
    .send({ message });
  next();
};

module.exports = errorHandler;
