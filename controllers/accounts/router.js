const express = require('express');
const { checkToken, auth, checkDeposit } = require('../../middlewares');

const router = express.Router({ mergeParams: true });

router.post('/deposit', checkToken, auth, checkDeposit, require('./deposit'));

module.exports = router;