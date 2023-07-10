const User = require('../models/user');
const {
  NOT_CORRECT_DATA_ERROR_CODE, DEFAULT_ERROR_CODE, SUCCESS_CODE, NOT_FIND_ERROR_CODE, CREATE_CODE,
} = require('../utils/erroresConstans');

function getUsers(_req, res) {
  return User.find({})
    .then((users) => res.status(SUCCESS_CODE).send(users))
    .catch((err) => {
      res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: 'На сервере произошла ошибка.', error: err.message });
    });
}

// const checkUserId = (user, res) => {
//   if (user) {
//     return res.status(SUCCESS_CODE).send(user);
//   }
//   return res
//     .status(NOT_FIND_ERROR_CODE)
//     .send({ message: 'Пользователь с таким id не найден' });
// };

// function getUser(req, res) {
//   const { id } = req.params;
//   User
//     .findById(id)
//     .then((user) => checkUserId(user, res))
//     .catch((err) => {
//       if (err) {
//         res
//           .status(NOT_CORRECT_DATA_ERROR_CODE)
//           .send({ message: 'На сервере произошла ошибка.', error: err.message });
//       }
//     });
// }

// Спасибо за видео. я встреал orFail, но не разобрался как он работает.
// С ним код выглятид лучше и становится читаемым. еще раз Спасибо!

function getUser(req, res) {
  const { id } = req.params;
  User
    .findById(id)
    .orFail(new Error('NotValidId'))
    .then((user) => res.status(SUCCESS_CODE).send(user))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res
          .status(NOT_FIND_ERROR_CODE)
          .send({ message: 'Пользователь с таким id не найден' });
      } else {
        res
          .status(NOT_CORRECT_DATA_ERROR_CODE)
          .send({ message: 'На сервере произошла ошибка.', error: err.message });
      }
    });
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  User
    .create({ name, about, avatar })
    .then((user) => {
      const { _id } = user;
      res.status(CREATE_CODE).send({
        name, about, avatar, _id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(NOT_CORRECT_DATA_ERROR_CODE)
          .send({ message: 'Переданы некорректные данные.', error: err.message });
      } else {
        res
          .status(DEFAULT_ERROR_CODE)
          .send({ message: 'На сервере произошла ошибка.', error: err.message });
      }
    });
}

function updateProfile(req, res) {
  const { name, about } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then(
      () => {
        res.status(SUCCESS_CODE).send({ name, about });
      },
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(NOT_CORRECT_DATA_ERROR_CODE)
          .send({ message: 'Переданы некорректные данные.', error: err.message });
      } else {
        res
          .status(DEFAULT_ERROR_CODE)
          .send({ message: 'На сервере произошла ошибка.', error: err.message });
      }
    });
}

function updateAvatar(req, res) {
  const { avatar } = req.body;
  return User
    .findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then(
      () => {
        res.status(SUCCESS_CODE).send({ avatar });
      },
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(NOT_CORRECT_DATA_ERROR_CODE)
          .send({ message: 'Переданы некорректные данные.', error: err.message });
      } else {
        res
          .status(DEFAULT_ERROR_CODE)
          .send({ message: 'На сервере произошла ошибка.', error: err.message });
      }
    });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
