const {
  NOT_CORRECT_DATA_ERROR_CODE, DEFAULT_ERROR_CODE, SUCCESS_CODE,
} = require('../utils/erroresConstans');
const {
  NOT_FIND_ERROR_CODE, CREATE_CODE, NOT_CORRECT_DATA, CONFLICT_ERROR_CODE,
} = require('../utils/erroresConstans');

module.exports = (err, req, res, next) => {
  console.log(err);
  if (err.name === 'ValidationError') {
    res
      .status(NOT_CORRECT_DATA_ERROR_CODE) //400
      .send({ message: 'Переданы некорректные данные.', error: err.message });
    return
  }

  if(err.code === 11000) {
    res
      .status(CONFLICT_ERROR_CODE) //409
      .send({ message: 'На сервере произошла ошибка.', error: err.message });
    return
  }
  if (err.message === 'NotFindEmail') {
    res
      .status(NOT_CORRECT_DATA)
      .send({ message: 'Неправильные почта или пароль. 001' });
  }
  if (err.message === 'NotValidId') {
    res
      .status(NOT_FIND_ERROR_CODE)
      .send({ message: 'Пользователь с таким id не найден getCurrentUser' });
  }
  // if() {
  //   res
  //     .status(DEFAULT_ERROR_CODE)  //500
  //     .send({ message: 'На сервере произошла ошибка.', error: err.message });
  //   return
  // }

};
