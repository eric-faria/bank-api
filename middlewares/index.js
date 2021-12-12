const auth = require('./auth');
const checkToken = require('./checkToken');
const checkDeposit = require('./checkDeposit');
const validation = require('./validation');
const checkTo = require('./checkTo');
const checkRemove = require('./checkRemove');

module.exports = {
    auth,
    checkToken,
    checkDeposit,
    validation,
    checkTo,
    checkRemove,
};
