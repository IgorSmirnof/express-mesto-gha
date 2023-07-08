const Card = require('../models/card');
const {
  NOT_CORRECT_DATA_ERROR_CODE, DEFAULT_ERROR_CODE, SUCCESS_CODE, NOT_FIND_ERROR_CODE,
} = require('../utils/erroresConstans');

function getCards(_req, res) {
  return Card
    .find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => { err; });
  // res.send(users);
}

function deleteCard(req, res) {
  const { cardId } = req.params;
  const { userId } = req.user; // isOwner?

  Card
    .findById({ _id: cardId })
    .then((card) => card._id === id)
    .catch((err) => { err; });

  res.send(Card._id);
}

function createCard(req, res) {
  console.log(req.body);
  const { name, link } = req.body;
  return Card
    .create({ name, link, owner: req.user })
    .then((card) => res.status(201).send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(NOT_CORRECT_DATA_ERROR_CODE)
          .send({ message: 'Переданы некорректные данные.', error: err.message });
      }
    });
}

function likeCard(req, res) {
  const { cardId } = req.params;
  const { userId } = req.user;

  Card // https://my-js.org/docs/guide/mongoose/   ---> $push $remove
    .findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => { if (card) return res.send(card); })
    .catch((err) => { err; });
}

function dislikeCard(req, res) {
  const { cardId } = req.params;
  const { userId } = req.user;

  Card
    .findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => { if (card) return res.send(card); })
    .catch((err) => { err; });
}

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
