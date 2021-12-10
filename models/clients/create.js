const connection = require('../connection');

const create = async (name, cpf, password, balance) => {
  const db = await connection();
  await db.collection('clients').insertOne({ name, cpf, password, balance });
  const res = db.collection('clients').findOne({ cpf });
  return res;
};

module.exports = create;