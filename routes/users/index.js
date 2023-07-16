const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUser, createUser, updateProfile, updateAvatar, getCurrentUser,
} = require('../../controllers/users');
const URL_REXP = require('../../utils/rexp');
// const {
//   getUsers, getUser, createUser, updateProfile, updateAvatar, login, getCurrentUser,
// } = require('../../controllers/users');

router.get('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().parrern(URL_REXP),
  }),
}), getUsers);

router.get('/me', getCurrentUser);
router.get('/:id', getUser);
router.post('/', createUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);
// router.post('/signin', login);
// router.post('/signup', createUser);

module.exports = router;
