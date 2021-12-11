const express = require('express');
const { checkToken, auth, checkDeposit, checkTo } = require('../../middlewares');

const router = express.Router({ mergeParams: true });

router.post('/deposit', checkToken, auth, checkDeposit, require('./deposit'));
router.post('/transfer', checkToken, auth, checkDeposit, checkTo, require('./transfer'));

module.exports = router;