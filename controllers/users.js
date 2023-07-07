// const { application } = require("express");
const User = require("../models/user");
const NotFindPage = require('../utils/NotFindPage')
const { handleDataError, handleNonFindError, handleDefaultError } = require('../utils/erroresConstans')

function getUsers(_req, res) {
// res.send('test route getUsers')
  return User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      if (err.name == "CastError") {
        handleDataError(err, res) ;
        // res.send(`400 - Переданы некорректные данные при создании пользователя. `);
      } else {
        res.send('500 — Ошибка по умолчанию.');
      }
    });
}

function getUser(req, res) {
  // res.send('test route getUser')
  const { id } = req.params;
  User
    .findById(id)
    .then((user) => { if (user) return res.status(200).send(user) ;
      // throw res.send(new NotFindPage('Пользователь с таким id не найден'));
    })
    .catch((err) => {
      handleDefaultError(err, res) ;

      // if (err.name == "CastError") {
      //   // res.send(new NotFindPage(`Пользователь по указанному id: ${id} не найден.`));

      // } else {
      //   res.send('500 — Ошибка по умолчанию.');
      // }
    });
}

function createUser(req, res, next) {
  res.send('test route createUser')

  // console.log(req.body)
  // const { name, about, avatar } = req.body;
  // //const { userId } = req.user;
  // User
  //   .create({ name, about, avatar })
  //   .then((user) => {res.send({ data: user })
  //     // const { _id } = user;
  //     // res.status(201).send(name, about, avatar, _id)
  //   })
  //   .catch((err) => {
  //     if (err.code === 400) {
  //       next(console.log('Переданы некорректные данные при создании пользователя.'));
  //     } else if (err.name === 500) {
  //       next(console.log(err.message));
  //     } else {
  //       next(err);
  //     }
  //   });
}

function updateProfile(req, res) {
  // res.send('test route updateProfile')

  console.log(req.body)
  const { name, about } = req.body;
  const { userId } = req.user;

  User
    .findByIdAndUpdate(userId, { name, about }, { new: true })
    .then(
    (user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
    if (err.name == "CastError") {
      res.send(`400 - Переданы некорректные данные при обновлении профиля. Пользователь по указанному id: ${id} не найден.`)
    } else {
      res.send('500 — Ошибка по умолчанию.');
    }
  });
}

function updateAvatar(req, res) {
  res.send('test route updateAvatar')

  // const { avatar } = req.body;
  // const { userId } = req.user;

  // return User
  //   .findByIdAndUpdate(userId, { avatar }, { new: true })
  //   .then(
  //   (user) => {
  //     res.status(201).send(user);
  //   }
  // );
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
