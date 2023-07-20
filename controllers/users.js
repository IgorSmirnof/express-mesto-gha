const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  CREATE_CODE, NOT_CORRECT_DATA, SUCCESS_CODE,
} = require('../utils/erroresConstans');

function getUsers(_req, res, next) {
  return User.find({})
    .then((users) => res.status(SUCCESS_CODE).send(users))
    .catch((err) => next(err));
}

function getUser(req, res, next) {
  const { id } = req.params;
  User
    .findById(id)
    .orFail(() => { throw new Error('NotValidId'); })
    .then((user) => res.status(SUCCESS_CODE).send(user))
    .catch((err) => next(err));
}

function getCurrentUser(req, res, next) {
  User.findById(req.user._id)
    .orFail(() => { throw new Error('NotValidId'); })
    .then((userData) => res.status(SUCCESS_CODE).send({ data: userData }))
    .catch((err) => next(err));
}

function createUser(req, res, next) {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(CREATE_CODE).send({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => next(err));
}

function updateProfile(req, res, next) {
  const { name, about } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then(
      () => {
        res.status(SUCCESS_CODE).send({ name, about });
      },
    )
    .catch((err) => next(err));
}

function updateAvatar(req, res, next) {
  const { avatar } = req.body;
  return User
    .findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then(
      () => {
        res.status(SUCCESS_CODE).send({ avatar });
      },
    )
    .catch((err) => next(err));
}

function login(req, res, next) {
  const { email, password } = req.body;
  console.log('entr:', password, email);
  User
    .findOne({ email })
    .select('+password')
    .orFail(() => new Error('NotFindEmail'))
    .then((user) => {
      bcrypt
        .compare(String(password), user.password)
        .then((matched) => {
          if (matched) {
            console.log('promis ok');
            const token = jwt.sign({ _id: user._id }, 'very-secret-key', { expiresIn: '7d' });
            res.status(SUCCESS_CODE).send({ token, user, message: 'Всё верно, аутентификация успешна!' });
          } else {
            res.status(NOT_CORRECT_DATA).send({ message: 'Неправильные почта или пароль. 000' });
          }
        });
    })
    .catch((err) => next(err));
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getCurrentUser,
};
