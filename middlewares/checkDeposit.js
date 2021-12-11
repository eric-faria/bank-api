const { StatusCodes } = require('http-status-codes');
const CPF = require('cpf');
const { getByCPF } = require('../models/clients')

const checkDeposit = async (req, res, next) => {
  try {
    const { value } = req.body;

    if (!value) {
        return res.status(StatusCodes.BAD_REQUEST).send({
            message: 'Value must be filled.',
        });
    }

    if (value < 0 || value > 2000) {
        return res.status(StatusCodes.BAD_REQUEST).send({
            message: 'Invalid value. Try again.',
        });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkDeposit;