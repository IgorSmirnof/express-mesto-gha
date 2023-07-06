const router = require('express').Router();
const usersRoutes = require('./users');
const cardRoutes = require('./cards');


router.use('/users', usersRoutes);
router.use('/cards', cardRoutes);


module.exports = router;