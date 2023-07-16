const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      // const { _id } = user;
      res.status(CREATE_CODE).send({
        name, about, avatar, email, password,
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

function login(req, res) {
  const { email, password } = req.body;
  console.log('entr:', password, email);
  User
    .findOne({ email })
    .orFail(new Error('NotFindEmail'))
    .then((user) => {
      bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // хеши не совпали — отклоняем промис
            // console.log('promis rej');
            Promise.reject(new Error('Неправильные почта или пароль'));
          }
          // аутентификация успешна
          // console.log('promis ok');
          const token = jwt.sign({ _id: user._id }, 'very-secret-key', { expiresIn: '7d' });
          res.send({ token, user, message: 'Всё верно!' });
        })
      })
    // .then((user) => res.status(SUCCESS_CODE).send({email, password}))
    .catch((err) => {
      if (err.message === 'NotFindEmail') {
        res
          .status(NOT_FIND_ERROR_CODE)
          .send({ message: 'Пользователь с таким email не найден' });
      } else {
        res
          .status(NOT_CORRECT_DATA_ERROR_CODE)
          .send({ message: 'На сервере произошла ошибка. login', error: err.message });
      }
    });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
};
