const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { key } = require('../services/login');

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    jwt.verify(authorization, key);
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).send({
        message: 'jwt malformed',
    });
  }
};

module.exports = auth;