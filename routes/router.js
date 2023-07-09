const router = require('express').Router();
const usersRoutes = require('./users');
const cardRoutes = require('./cards');
const notFoundRoutes = require('./notFound');

router.use('/users', usersRoutes);
router.use('/cards', cardRoutes);
router.use('/', notFoundRoutes);

module.exports = router;
