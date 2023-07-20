const router = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');

const URL_REXP = require('../utils/rexp');
const usersRoutes = require('./users');
const cardRoutes = require('./cards');
const notFoundRoutes = require('./notFound');

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(URL_REXP),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

// router.use('/users', usersRoutes);
// router.use('/cards', cardRoutes);
router.use('/users', auth, usersRoutes);
router.use('/cards', auth, cardRoutes);

router.use('/', auth, notFoundRoutes);
router.use(errors());

module.exports = router;
