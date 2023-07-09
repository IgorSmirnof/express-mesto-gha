const Card = require('../models/card');
const {
  NOT_CORRECT_DATA_ERROR_CODE, CREATE_CODE, DEFAULT_ERROR_CODE, SUCCESS_CODE, NOT_FIND_ERROR_CODE,
} = require('../utils/erroresConstans');

function getCards(_req, res) {
  return Card
    .find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => { err; });
  // res.send(users);
}


// console.log('1st', cardId, req.params.cardId);
//const { userId } = req.user; // isOwner?
//console.log('findByIdAndDelete', cardId);
// console.log('2nd', cardId);
//console.log('1st', card);
//{ message: 'Карточка с указанным id удалена' }

function deleteCard(req, res) {
  const { cardId } = req.params;
  Card
    // .findById({ _id: cardId })
    .findByIdAndDelete(cardId)
    .then((data) => {
      if (data) {
        return res.status(SUCCESS_CODE).send({ message: 'Карточка с указанным id удалена' });
      } else {
        return res.status(NOT_FIND_ERROR_CODE).send({ message: 'Карточка с указанным id не существует' });
      }
    })
    .catch((err) => {
      // res.send(err.message)
      if (err.name === 'CastError') {
        res
          .status(NOT_CORRECT_DATA_ERROR_CODE)
          .send({ message: 'Переданы некорректные данные.', error: err });
      } else {
        res
          .status(DEFAULT_ERROR_CODE)
          .send({ message: 'На сервере произошла ошибка.', error: err });
      }
      res.end();
    });

  // res.send(Card._id);
}

function createCard(req, res) {
  console.log(req.body);
  const { name, link } = req.body;
  return Card
    .create({ name, link, owner: req.user })
    .then((card) => res.status(CREATE_CODE).send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(NOT_CORRECT_DATA_ERROR_CODE)
          .send({ message: 'Переданы некорректные данные.', error: err.message });
      }
    });
}

// const checkCardId = (card, res) => {
//   if (card) {
//     console.log('test', card);
//     return res.status(SUCCESS_CODE).send(card);
//   }
//   console.log(card);
//   return res.send(card);
//     // .status(NOT_FIND_ERROR_CODE)
//     // .send({ message: 'Карточка с таким id не найдена' });
// };

function likeCard(req, res) {
  const { cardId } = req.params;
  // const { userId } = req.user;
  // console.log(cardId);
  Card
    .findByIdAndUpdate(cardId, { $addToSet: { likes: req.user } }, { new: true })
    // .then(console.log(cardId))
    .then((card) => {
      if (card) res.send(card);
    })
    .then(() => res.status(NOT_FIND_ERROR_CODE).send({ message: 'Карточка с указанным id не найдена' }))
    // .then((card) => res.send(card)) //checkCardId(card, res)
    .catch((err) => {
      // res.send(err.message)
      if (err.name === 'CastError') {
        res
          .status(NOT_CORRECT_DATA_ERROR_CODE)
          .send({ message: 'Переданы некорректные данные.', error: err });
      } else {
        res
          .status(DEFAULT_ERROR_CODE)
          .send({ message: 'На сервере произошла ошибка.', error: err });
      }
    });
}

function dislikeCard(req, res) {
  const { cardId } = req.params;
  // const { userId } = req.user;

  Card
    .findByIdAndUpdate(cardId, { $pull: { likes: req.user } }, { new: true })
    .then((card) => {
      if (card) res.send(card);
    })
    .then(() => res.status(NOT_FIND_ERROR_CODE).send({ message: 'Карточка с указанным id не найдена' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(NOT_CORRECT_DATA_ERROR_CODE)
          .send({ message: 'Переданы некорректные данные.', error: err });
      } else {
        res
          .status(DEFAULT_ERROR_CODE)
          .send({ message: 'На сервере произошла ошибка.', error: err });
      }
    });
}

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
