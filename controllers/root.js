const express = require('express');

const root = express.Router({ mergeParams: true });

root.use('/clients', require('./clients/router'));
root.use('/login', require('./login/router'));
root.use('/accounts', require('./accounts/router'));
root.use('/history', require('./transactions/router'));


module.exports = root;