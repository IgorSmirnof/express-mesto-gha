const router = require('express').Router();
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');

const usersRoutes = require('./users');
const cardRoutes = require('./cards');
const notFoundRoutes = require('./notFound');

router.post('/signin', auth, login);
router.post('/signup', auth, createUser);

router.use('/users', usersRoutes);
router.use('/cards', cardRoutes);

router.use('/', notFoundRoutes);

module.exports = router;
