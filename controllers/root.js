const express = require('express');

const root = express.Router({ mergeParams: true });

root.use('/clients', require('./clients/router'));


module.exports = root;