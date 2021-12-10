const { StatusCodes } = require('http-status-codes');
const CPF = require('cpf');
const { getByCPF } = require('../models/clients')

const validation = async (req, res, next) => {
  try {
    const { name, cpf, password } = req.body;

    if (!name || !cpf || !password) {
        return res.status(StatusCodes.BAD_REQUEST).send({
            message: 'All fields must be filled.',
        });
    }


    if (!CPF.isValid(cpf)) {
        return res.status(StatusCodes.BAD_REQUEST).send({
            message: 'Invalid CPF. Try again.',
        });
    }

    const validCPF = await getByCPF(cpf);

    if (validCPF) {
        return res.status(StatusCodes.CONFLICT).send({
            message: 'CPF already registered.',
        });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validation;