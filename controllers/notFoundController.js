const { NOT_FIND_ERROR_CODE } = require('../utils/erroresConstans');

const notFoundPage = (_req, res) => {
  return res
    .status(NOT_FIND_ERROR_CODE)
    .send({ message: 'Страница не найдена.' })
}

module.exports = { notFoundPage };