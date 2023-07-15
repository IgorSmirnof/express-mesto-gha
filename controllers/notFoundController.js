const { NOT_FIND_ERROR_CODE } = require('../utils/erroresConstans');

const notFoundPage = (_req, res) => res
  .status(NOT_FIND_ERROR_CODE)
  .send({ message: 'Страница не найдена. 404' });

module.exports = { notFoundPage };
