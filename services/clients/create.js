const model = require('../../models/clients');

const create = async (name, cpf, password) => {
  const client = await model.create(name, cpf, password, 0.0);
  delete client.password;
  return client;
};

module.exports = create;
