const router = require('express').Router();

const {
  getUsers, getUser, createUser, updateProfile, updateAvatar, getCurrentUser,
} = require('../../controllers/users');
// const {
//   getUsers, getUser, createUser, updateProfile, updateAvatar, login, getCurrentUser,
// } = require('../../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);
// router.post('/signin', login);
// router.post('/signup', createUser);
router.get('/me', getCurrentUser);

module.exports = router;
