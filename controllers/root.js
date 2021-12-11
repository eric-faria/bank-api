const express = require('express');

const root = express.Router({ mergeParams: true });

root.use('/clients', require('./clients/router'));
root.use('/login', require('./login/router'));


module.exports = root;