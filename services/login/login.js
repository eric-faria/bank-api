const jwt = require('jsonwebtoken');
const model = require('../../models/clients');

const key = 'magicKey';

const config = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const login = async (cpf, password) => {
  const client = await model.getByCPF(cpf);
  if (!client || client.password !== password) {
    return { err: true, message: 'Incorrect username or password', token: null };
  }

  delete client.password;
  const token = jwt.sign(client, key, config);
  return { err: false, message: '', token };
};

  module.exports = { login, key};
  