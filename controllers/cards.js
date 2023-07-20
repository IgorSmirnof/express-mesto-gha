const Card = require('../models/card');
const {
  CREATE_CODE, SUCCESS_CODE,
} = require('../utils/erroresConstans');

function getCards(_req, res, next) {
  return Card
    .find({})
    .then((cards) => res.status(SUCCESS_CODE).send(cards))
    .catch((err) => next(err));
}

function deleteCard(req, res, next) {
  const { cardId } = req.params;
  const userId = req.user._id;
  console.log(userId);
  Card
    .findById(cardId)
    // .findByIdAndDelete(cardId)
    .orFail(new Error('NotValidId'))
    .then((card) => {
      const cardOwner = card.owner.toString();
      if (cardOwner === userId) {
        card.deleteOne();
        res.status(SUCCESS_CODE).send({ card });
      } else {
        res.send(() => { throw new Error('NotAccess'); });
        // res.status(403).send({
        //   message: 'Можно удалить только свою карточку',
        // });
      }
    })
    .catch((err) => next(err));
}

function createCard(req, res, next) {
  console.log(req.body);
  const { name, link } = req.body;
  return Card
    .create({ name, link, owner: req.user })
    .then((card) => res.status(CREATE_CODE).send({ card }))
    .catch((err) => next(err));
}

function likeCard(req, res, next) {
  const { cardId } = req.params;
  console.log(cardId);
  Card
    .findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => { throw new Error('NotValidId'); })
    .then((card) => res.status(SUCCESS_CODE).send({ card, message: 'Like was add.' }))
    .catch((err) => next(err));
}

function dislikeCard(req, res, next) {
  const { cardId } = req.params;
  console.log('dislikeCard :', cardId);
  Card
    .findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => { throw new Error('NotValidId'); })
    .then((card) => res.status(SUCCESS_CODE).send({ card, message: 'Like was canceled.' }))
    .catch((err) => next(err));
}

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
