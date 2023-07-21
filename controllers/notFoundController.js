// const { NOT_FIND_ERROR_CODE } = require('../utils/erroresConstans');
const NotFoundError = require('../utils/errors/404-NotFound');

const notFoundPage = (req, res, next) => next(new NotFoundError('Страница не найдена. 404'));
// (_req, res) => res
// .status(NOT_FIND_ERROR_CODE)
// .send({ message: 'Страница не найдена. 404' });

module.exports = { notFoundPage };
