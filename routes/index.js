const router = require('express').Router();

const usersRoutes = require('./users');
const cardRoutes = require('./cards');
const notFoundRoutes = require('./notFound');
const login = require('./users');
const createUser = require('./users');

router.use('/users', usersRoutes);
router.use('/cards', cardRoutes);
router.post('/signin', login);
router.post('/signup', createUser);
router.use('/', notFoundRoutes);

module.exports = router;
