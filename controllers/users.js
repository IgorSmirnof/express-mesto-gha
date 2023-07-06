const User = require("../models/user");

function getUsers(_req, res) {
  return User.find({}).then((users) => res.status(200).send(users));
  // res.send(users);
}

function getUser(req, res) {
  const { id } = req.params;
  return User
    .findById(id)
    .then((user) => { res.send({ user }) })
    .catch((err) => {
      if (!user) {
        next(console.log(`Пользователь по указанному id: ${id} не найден.`));
      } else if (err.code === 500) {
        next(console.log(err.mesage));
      } else {
        next(err);
      }
    });
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  //const { userId } = req.user;
  return User
    .create({ name, about, avatar })
    .then((user) => { res.status(201).send(user) })
    .catch((err) => {
      if (err.code === 400) {
        next(console.log('Переданы некорректные данные при создании пользователя.'));
      } else if (err.code === 500) {
        next(console.log(err.mesage));
      } else {
        next(err);
      }
    });
}

function updateProfile(req, res) {
  const { name, about } = req.body;
  const { userId } = req.user;

  return User
    .findByIdAndUpdate(userId, { name, about }, { new: true })
    .then(
    (user) => {
      res.status(201).send(user);
    }
  );
}

function updateAvatar(req, res) {
  const { avatar } = req.body;
  const { userId } = req.user;

  return User
    .findByIdAndUpdate(userId, { avatar }, { new: true })
    .then(
    (user) => {
      res.status(201).send(user);
    }
  );
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
