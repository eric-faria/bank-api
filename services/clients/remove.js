const model = require('../../models/clients');
const jwt = require('jsonwebtoken');
const { key } = require('../../services/login');

const remove = async (authorization) => {
  
  const token = jwt.verify(authorization, key);
  const { cpf } = token;
  await model.remove(cpf);
};

module.exports = remove;