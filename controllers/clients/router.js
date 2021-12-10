const express = require('express');
const validation = require('../../middlewares/validation');

const router = express.Router({ mergeParams: true });

router.post('/', validation, require('./create'));

module.exports = router;