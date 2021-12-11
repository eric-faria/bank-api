const model = require('../../models/accounts');
const jwt = require('jsonwebtoken');
const { key } = require('../login');

const deposit = async (value, authorization) => {

  const token = jwt.verify(authorization, key);
  const { cpf: cpf } = token;
  
  const client = await model.deposit(cpf, value);
  return client;
};

module.exports = deposit;
