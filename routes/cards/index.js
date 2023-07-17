const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const URL_REXP = require('../../utils/rexp');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../../controllers/cards');

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(URL_REXP),
  }),
}), createCard);

router.delete('/:cardId', deleteCard);

router.put('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24),
    }),
  }),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24),
    }),
  }),
}), dislikeCard);

// GET /cards — возвращает все карточки
// POST /cards — создаёт карточку
// DELETE /cards/:cardId — удаляет карточку по идентификатору
// PUT /cards/:cardId/likes — поставить лайк карточке
// DELETE /cards/:cardId/likes — убрать лайк с карточки

module.exports = router;
