const { StatusCodes } = require('http-status-codes');
const { getByCPF } = require('../models/clients');
const jwt = require('jsonwebtoken');
const { key } = require('../services/login');

const checkRemove = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = jwt.verify(authorization, key);
    const { cpf } = token;
    const client = await getByCPF(cpf);

    if (client.balance > 0) {
      return res.status(StatusCodes.BAD_REQUEST).send({
          message: 'Available funds. Unable to remove account.',
      });
  }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkRemove;