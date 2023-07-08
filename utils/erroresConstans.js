const NOT_CORRECT_DATA_ERROR_CODE = 400;
const NOT_FIND_ERROR_CODE = 404;
const DEFAULT_ERROR_CODE = 500;
const SUCCESS_CODE = 200;
const CREATE_CODE = 201;

const handleDataError = (err, res) => {
  const { statusCode = NOT_CORRECT_DATA_ERROR_CODE, message } = err;
  res.status(statusCode).send({
    message: statusCode === NOT_CORRECT_DATA_ERROR_CODE ? 'Переданы некорректные данные.' : message,
  });
};

const handleNonFindError = (err, res) => {
  const { statusCode = NOT_FIND_ERROR_CODE, message } = err;
  res.status(statusCode).send({
    message: statusCode === NOT_FIND_ERROR_CODE ? 'Данные не найдены.' : message,
  });
};

const handleDefaultError = (err, res) => {
  const { statusCode = DEFAULT_ERROR_CODE, message } = err;
  res.status(statusCode).send({
    message: statusCode === DEFAULT_ERROR_CODE ? 'На сервере произошла ошибка.' : message,
  });
};

module.exports = {
  handleDataError,
  handleNonFindError,
  handleDefaultError,
  SUCCESS_CODE,
  CREATE_CODE,
};
