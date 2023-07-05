const User = require('../models/user')

function getUsers(req, res) {
  return User.find({}).then(users => res.status(200).send(users));
  // res.send(users);
}

function getUser(req, res) {
  const { id } = req.params;
  const user = users.find(user => user._id === id)
  res.send(user);
}

function createUser(req, res) {
  console.log(req.body);
  return User.create({ ...req.body })
    .then(user => {
      res.status(201).send(user);
    })

}

module.exports = {
  getUsers, getUser, createUser
}
