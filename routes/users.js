const { getUsers, getUser, createUser, updateProfile, updateAvatar } = require('../controllers/users.js');

const router = require('express').Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;