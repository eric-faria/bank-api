const model = require('../../models/transactions');
const jwt = require('jsonwebtoken');
const { key } = require('../login');

const getAll = async (authorization) => {
  const token = jwt.verify(authorization, key);
  const { cpf: cpf } = token;

  const transactions = await model.getAll(cpf);
  return transactions;
};

module.exports = getAll;