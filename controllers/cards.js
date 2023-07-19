const Card = require('../models/card');
const {
  CREATE_CODE, SUCCESS_CODE,
} = require('../utils/erroresConstans');
// const {
//   NOT_CORRECT_DATA_ERROR_CODE, DEFAULT_ERROR_CODE, NOT_FIND_ERROR_CODE,
// } = require('../utils/erroresConstans');

function getCards(_req, res, next) {
  return Card
    .find({})
    .then((cards) => res.status(SUCCESS_CODE).send(cards))
    .catch((err) => next(err));
  // .catch((err) => {
  //   res
  //     .status(DEFAULT_ERROR_CODE)
  //     .send({ message: 'На сервере произошла ошибка.', error: err });
  // });
}

// function deleteCard(req, res) {
//   const { cardId } = req.params;
//   const userId = req.user._id;
//   Card
//     // .findById({ _id: cardId })
//     .findByIdAndDelete(cardId)
//     .orFail(new Error('NotValidId'))
//     .then(() => res.status(SUCCESS_CODE).send({ message: 'Карточка с указанным id удалена' }))
//     .catch((err) => {
//       if (err.message === 'NotValidId') {
//         res
//           .status(NOT_FIND_ERROR_CODE)
//           .send({ message: 'Карточка с указанным id не существует' });
//       } else if (err.name === 'CastError') {
//         res
//           .status(NOT_CORRECT_DATA_ERROR_CODE)
//           .send({ message: 'Переданы некорректные данные.', error: err });
//       } else {
//         res
//           .status(DEFAULT_ERROR_CODE)
//           .send({ message: 'На сервере произошла ошибка.', error: err });
//       }
//       res.end();
//     });
// }

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
      // console.log(cardOwner, userId);
      if (cardOwner === userId) {
        card.deleteOne();
        res.status(SUCCESS_CODE).send({ card });
      } else {
        res.status(403).send({
          message: 'Можно удалить только свою карточку',
        });
      }
    })
    .catch((err) => next(err));
  // .catch((err) => {
  //   if (err.message === 'NotValidId') {
  //     res
  //       .status(NOT_FIND_ERROR_CODE)
  //       .send({ message: 'Карточка с указанным id не существует' });
  //   } else if (err.name === 'CastError') {
  //     res
  //       .status(NOT_CORRECT_DATA_ERROR_CODE)
  //       .send({ message: 'Переданы некорректные данные.', error: err });
  //   } else {
  //     res
  //       .status(DEFAULT_ERROR_CODE)
  //       .send({ message: 'На сервере произошла ошибка.', error: err });
  //   }
  //   res.end();
  // });
}

function createCard(req, res, next) {
  console.log(req.body);
  const { name, link } = req.body;
  return Card
    .create({ name, link, owner: req.user })
    .then((card) => res.status(CREATE_CODE).send({ card }))
    .catch((err) => next(err));
  // .catch((err) => {
  //   if (err.name === 'ValidationError') {
  //     res
  //       .status(NOT_CORRECT_DATA_ERROR_CODE)
  //       .send({ message: 'Переданы некорректные данные.', error: err.message });
  //   }
  // });
}

function likeCard(req, res, next) {
  const { cardId } = req.params;
  console.log(cardId);
  Card
    .findByIdAndUpdate(cardId, { $addToSet: { likes: req.user } }, { new: true })
    // .orFail(new Error('NotValidId'))
    .orFail(() => { throw new Error('NotValidId'); })
    .then((card) => res.status(SUCCESS_CODE).send({ card, message: 'Like was add.' }))
    .catch((err) => next(err));
  // .catch((err) => {
  //   if (err.message === 'NotValidId') {
  //     res
  //       .status(NOT_FIND_ERROR_CODE)
  //       .send({ message: 'Карточка с указанным id не существует' });
  //   } else if (err.name === 'CastError') {
  //     res
  //       .status(NOT_CORRECT_DATA_ERROR_CODE)
  //       .send({ message: 'Переданы некорректные данные.', error: err });
  //   } else {
  //     res
  //       .status(DEFAULT_ERROR_CODE)
  //       .send({ message: 'На сервере произошла ошибка.', error: err });
  //   }
  // });
}

function dislikeCard(req, res, next) {
  const { cardId } = req.params;
  Card
    .findByIdAndUpdate(cardId, { $pull: { likes: req.user } }, { new: true })
    .orFail(new Error('NotValidId'))
    .then((card) => res.status(SUCCESS_CODE).send({ card, message: 'Like was canceled.' }))
    .catch((err) => next(err));
  // .catch((err) => {
  //   if (err.message === 'NotValidId') {
  //     res
  //       .status(NOT_FIND_ERROR_CODE)
  //       .send({ message: 'Карточка с указанным id не существует' });
  //   } else if (err.name === 'CastError') {
  //     res
  //       .status(NOT_CORRECT_DATA_ERROR_CODE)
  //       .send({ message: 'Переданы некорректные данные.', error: err });
  //   } else {
  //     res
  //       .status(DEFAULT_ERROR_CODE)
  //       .send({ message: 'На сервере произошла ошибка.', error: err });
  //   }
  // });
}

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};

// function deleteCard(req, res) {
//   const { cardId } = req.params;
//   Card
//     // .findById({ _id: cardId })
//     .findByIdAndDelete(cardId)
//     .then((data) => {
//       if (data) {
//         return res.status(SUCCESS_CODE).send({ message: 'Карточка с указанным id удалена' });
//       }
//       return res.status(NOT_FIND_ERROR_CODE).send({ message: 'Карточка с указанным id не
// существует' });
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         res
//           .status(NOT_CORRECT_DATA_ERROR_CODE)
//           .send({ message: 'Переданы некорректные данные.', error: err });
//       } else {
//         res
//           .status(DEFAULT_ERROR_CODE)
//           .send({ message: 'На сервере произошла ошибка.', error: err });
//       }
//       res.end();
//     });
// }

// function likeCard(req, res) {
//   const { cardId } = req.params;
//   Card
//     .findByIdAndUpdate(cardId, { $addToSet: { likes: req.user } }, { new: true })
//     .then((card) => {
//       if (card) res.send(card);
//     })
//     .then(() => res.status(NOT_FIND_ERROR_CODE).send({ message:
// 'Карточка с указанным id не найдена' }))
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         res
//           .status(NOT_CORRECT_DATA_ERROR_CODE)
//           .send({ message: 'Переданы некорректные данные.', error: err });
//       } else {
//         res
//           .status(DEFAULT_ERROR_CODE)
//           .send({ message: 'На сервере произошла ошибка.', error: err });
//       }
//     });
// }

// function dislikeCard(req, res) {
//   const { cardId } = req.params;
//   Card
//     .findByIdAndUpdate(cardId, { $pull: { likes: req.user } }, { new: true })
//     .then((card) => {
//       if (card) res.send(card);
//     })
//     .then(() => res.status(NOT_FIND_ERROR_CODE).send({ message:
// 'Карточка с указанным id не найдена' }))
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         res
//           .status(NOT_CORRECT_DATA_ERROR_CODE)
//           .send({ message: 'Переданы некорректные данные.', error: err });
//       } else {
//         res
//           .status(DEFAULT_ERROR_CODE)
//           .send({ message: 'На сервере произошла ошибка.', error: err });
//       }
//     });
// }
