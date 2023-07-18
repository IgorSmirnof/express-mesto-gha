const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUser, createUser, updateProfile, updateAvatar, getCurrentUser,
} = require('../../controllers/users');
const URL_REXP = require('../../utils/rexp');
// const {
//   getUsers, getUser, createUser, updateProfile, updateAvatar, login, getCurrentUser,
// } = require('../../controllers/users');

router.get('/', getUsers);

router.get('/me', getCurrentUser);
router.get('/:id', getUser);
router.post('/', createUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    // name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(URL_REXP),
  }),
}), updateAvatar);

module.exports = router;
