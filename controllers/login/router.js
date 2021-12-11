const express = require('express');

const router = express.Router({ mergeParams: true });

router.post('/', require('./login'));

module.exports = router;