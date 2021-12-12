const express = require('express');
const { validation, checkToken, auth, checkRemove } = require('../../middlewares/');

const router = express.Router({ mergeParams: true });

router.post('/', validation, require('./create'));
router.delete('/', checkToken, auth, checkRemove, require('./remove'));

module.exports = router;