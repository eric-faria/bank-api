const express = require('express');
const { checkToken, auth } = require('../../middlewares');

const router = express.Router({ mergeParams: true });

router.get('/', checkToken, auth, require('./getAll'));

module.exports = router;