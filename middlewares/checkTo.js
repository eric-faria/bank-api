const { StatusCodes } = require('http-status-codes');
const { getByCPF } = require('../models/clients');
const jwt = require('jsonwebtoken');
const { key } = require('../services/login');

const checkTo = async (req, res, next) => {
  try {
    const { to, value } = req.body;
    const { authorization } = req.headers;

    const destination = await getByCPF(to);

    if (!destination) {
        return res.status(StatusCodes.BAD_REQUEST).send({
            message: 'Invalid account. Try again.',
        });
    }

    const token = jwt.verify(authorization, key);
    const { cpf: cpf } = token;
    const client = await getByCPF(cpf);

    if (client.balance < value) {
      return res.status(StatusCodes.BAD_REQUEST).send({
          message: 'Insufficient funds. Try again.',
      });
  }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkTo;