const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  CREATE_CODE, SUCCESS_CODE,
} = require('../utils/erroresConstans');
const BadRequestError = require('../utils/errors/400-BadRequest');
const UnauthorizedError = require('../utils/errors/401-Unauthorized');
const NotFoundError = require('../utils/errors/404-NotFound');
const ConflictError = require('../utils/errors/409-Conflict');

function getUsers(_req, res, next) {
  return User.find({})
    .then((users) => res.status(SUCCESS_CODE).send(users))
    .catch(next);
}

function getUser(req, res, next) {
  const { id } = req.params;
  User
    .findById(id)
    .orFail(() => new NotFoundError('Указанного id не существует'))
    .then((user) => res.status(SUCCESS_CODE).send(user))
    .catch(next);
}

function getCurrentUser(req, res, next) {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError('Указанного id не существует'))
    .then((userData) => res.status(SUCCESS_CODE).send({ data: userData }))
    .catch(next);
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
    .catch((err) => {
      console.log(err);
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с данным email уже существует.'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('BadRequestError.'));
      } else {
        next(err);
      }
    });
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
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
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
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
}

function login(req, res, next) {
  const { email, password } = req.body;
  // console.log('entr:', password, email);
  User
    .findOne({ email })
    .select('+password')
    .orFail(() => new UnauthorizedError('Указанного email не существует.orFail'))
    .then((user) => {
      bcrypt
        .compare(String(password), user.password)
        .then((matched) => {
          if (matched) {
            const token = jwt.sign({ _id: user._id }, 'very-secret-key', { expiresIn: '7d' });
            return res.status(SUCCESS_CODE).send({ token, message: 'Всё верно, аутентификация успешна!' });
          }
          return next(new UnauthorizedError('Указанного email не существует unauth'));
        });
    })
    .catch(next);
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
