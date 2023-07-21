const NotFoundError = require('../utils/errors/404-NotFound');

const notFoundPage = (req, res, next) => next(new NotFoundError('Страница не найдена. 404'));

module.exports = { notFoundPage };
