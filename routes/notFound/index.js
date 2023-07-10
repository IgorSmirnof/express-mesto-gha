const router = require('express').Router();
const { notFoundPage } = require('../../controllers/notFoundController');

router.use('/', notFoundPage);

module.exports = router;
