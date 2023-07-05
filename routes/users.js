const { getUsers, getUser, createUser } = require('../controllers/users.js');

const router = require('express').Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);

module.exports = router;