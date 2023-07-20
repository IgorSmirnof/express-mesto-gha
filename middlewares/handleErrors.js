const {
  NOT_CORRECT_DATA_ERROR_CODE, NOT_CORRECT_DATA,
} = require('../utils/erroresConstans');
const {
  CONFLICT_ERROR_CODE, NOT_FIND_ERROR_CODE, ACSSECC_ERROR_CODE,
} = require('../utils/erroresConstans');

module.exports = (err, req, res, next) => {
  console.log('handleErr:', err);

  if (err.message === 'NotValidId') {
    console.log('NotValidId');
    res
      .status(NOT_FIND_ERROR_CODE) // 404
      .send({ message: 'Указанного id не существует' });
    return;
  }

  if (err.name === 'ValidationError') {
    res
      .status(NOT_CORRECT_DATA_ERROR_CODE) // 400
      .send({ message: 'Переданы некорректные данные.', error: err.message });
    return;
  }

  if (err.code === 11000) {
    res
      .status(CONFLICT_ERROR_CODE) // 409
      .send({ message: 'На сервере произошла ошибка. 409', error: err.message });
    return;
  }

  if (err.message === 'NotFindEmail') {
    res
      .status(NOT_CORRECT_DATA) // 401
      .send({ message: 'Неправильные почта или пароль. 001' });
    return;
  }
  if (err.name === 'CastError') {
    res
      .status(NOT_CORRECT_DATA_ERROR_CODE) // 400
      .send({ message: 'Переданы некорректные данные.', error: err });
    return;
  }
  if (err.message === 'NotAccess') {
    res
      .status(ACSSECC_ERROR_CODE) // 403
      .send({ message: 'Можно удалить только свою карточку.', error: err });
  }

  next();
};
