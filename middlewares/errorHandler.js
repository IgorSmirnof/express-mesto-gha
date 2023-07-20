const errorHandler = (err, _req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Внутренняя ошибка сервера, Error code: 500' : message,
    });
  next(err);
};

module.exports = errorHandler;
