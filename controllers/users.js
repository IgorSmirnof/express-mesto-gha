const User = require("../models/user");

function getUsers(_req, res) {
  return User.find({}).then((users) => res.status(200).send(users));
  // res.send(users);
}

function getUser(req, res) {
  const { id } = req.params;
  return User
    .findById(id)
    .then((user) => {res.send({ user }) })
}

function createUser(req, res) {
  console.log(req.body);
  return User
    .create({ ...req.body })
    .then((user) => {res.status(201).send(user) });
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
