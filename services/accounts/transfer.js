const model = require('../../models/accounts');
const jwt = require('jsonwebtoken');
const { key } = require('../login');

const transfer = async (to, value, authorization) => {

  const token = jwt.verify(authorization, key);
  const { cpf: cpf } = token;
  
  const client = await model.transfer(cpf, to, value);
  return client;
};

module.exports = transfer;