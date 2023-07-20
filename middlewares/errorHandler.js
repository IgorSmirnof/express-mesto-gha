const errorHandler = (err, _req, res, next) => {
  // const { statusCode = 500, message } = err;
  // res
  //   .status(statusCode)
  //   .send({
  //     message: statusCode === 500
  //       ? 'Внутренняя ошибка сервера, Error code: 500' : message,
  //   });
  // next(err);

  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Внутренняя ошибка сервера' : err.message;
  res
    .status(statusCode)
    .send({ message });
  next();
};

module.exports = errorHandler;
