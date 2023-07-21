const Card = require('../models/card');
const {
  CREATE_CODE, SUCCESS_CODE,
} = require('../utils/erroresConstans');
const BadRequestError = require('../utils/errors/400-BadRequest');
const ForbiddenError = require('../utils/errors/403-Forbidden');
const NotFoundError = require('../utils/errors/404-NotFound');

function getCards(_req, res, next) {
  return Card
    .find({})
    .then((cards) => res.status(SUCCESS_CODE).send(cards))
    .catch(next);
}

function deleteCard(req, res, next) {
  const { cardId } = req.params;
  const userId = req.user._id;
  console.log(userId);
  Card
    .findById(cardId)
    .orFail(new NotFoundError('Указанного id не существует'))
    .then((card) => {
      const cardOwner = card.owner.toString();
      if (cardOwner === userId) {
        return card.deleteOne()
          .then(() => res.send({ card }));
      }
      return next(new ForbiddenError('Можно удалить только свою карточку.'));
    })
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  return Card
    .create({ name, link, owner: req.user })
    .then((card) => res.status(CREATE_CODE).send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
}

function likeCard(req, res, next) {
  const { cardId } = req.params;
  Card
    .findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => new NotFoundError('Указанного id не существует'))
    .then((card) => res.status(SUCCESS_CODE).send({ card, message: 'Like was added.' }))
    .catch(next);
}

function dislikeCard(req, res, next) {
  const { cardId } = req.params;
  Card
    .findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => new NotFoundError('Указанного id не существует'))
    .then((card) => res.status(SUCCESS_CODE).send({ card, message: 'Like was canceled.' }))
    .catch(next);
}

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
