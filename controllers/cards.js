const Card = require('../models/card')

function getCards(_req, res) {
  return Card
    .find({})
    .then(cards => res.status(200).send(cards))
    .catch((err) => { err });
  // res.send(users);
}

function deleteCard(req, res) {
  const { cardId } = req.params;
  const { userId } = req.user; //isOwner?

  Card
    .findById({ _id: cardId })
    .then(card => card._id === id)
    .catch((err) => { err });

  res.send(Card._id);
}

function createCard(req, res) {
  console.log(req.body);
  const { name, link } = req.body;
  const { userId } = req.user;

  return Card
    .create({ name, link, userId })
    .then(card => res.status(201).send(card))
    .catch((err) => { err });
}

function likeCard(req, res) {
  const { cardId } = req.params;
  const { userId } = req.user;

  Card  //https://my-js.org/docs/guide/mongoose/
    .findByIdAndUpdate(cardId, { $push:{ likes: userId } }, { new: true })
    .then((card) => { if (card) return res.send(card) })
    .catch((err) => { err });
}

function dislikeCard(req, res) {
  const { cardId } = req.params;
  const { userId } = req.user;

  Card
    .findByIdAndUpdate(cardId, { $remove: { likes: userId } }, { new: true })
    .then((card) => { if (card) return res.send(card) })
    .catch((err) => { err });
}


module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard
}
