const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUser, createUser, updateProfile, updateAvatar, getCurrentUser,
} = require('../../controllers/users');
const URL_REXP = require('../../utils/rexp');
// const {
//   getUsers, getUser, createUser, updateProfile, updateAvatar, login, getCurrentUser,
// } = require('../../controllers/users');

router.get('/me', getCurrentUser);

router.get('/:id', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUser);
router.get('/', getUsers);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(URL_REXP),
    password: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
  }),
}), createUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(URL_REXP),
  }),
}), updateAvatar);

module.exports = router;
